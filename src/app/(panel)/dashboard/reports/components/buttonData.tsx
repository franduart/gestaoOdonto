"use client"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { format, subDays } from "date-fns"
import { AppointmentsWithServices } from "../../_components/apointments/appointments-list"
import { ButtonPickerAppointments } from "../../_components/apointments/button-date"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function ButtonData() {

  const searchParams = useSearchParams()
  const date = searchParams.get("date")

  const { data, isLoading } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date || format(subDays(new Date(), +1), "yyyy-MM-dd")

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`
      const response = await fetch(url)

      if (!response.ok) return []
      return (await response.json()) as AppointmentsWithServices[]
    },
    staleTime: 20000,
    refetchInterval: 60000,
  })

  const filtered = (data || []).filter((appointment) => {
    const day = new Date(appointment.createdAt)
    const currentMonth = new Date().getMonth()
    return day.getMonth() === currentMonth
  })

  const total = filtered.reduce(
    (acc, a) => acc + (a.service?.price || 0),
    0
  )

  //  Função para corrigir datas salvas como UTC
  function fixUTC(dateString: string | Date) {
    const d = new Date(dateString)
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
    return d
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-between">

      <ButtonPickerAppointments />

      {isLoading && <p>Carregando...</p>}
      {!isLoading && data?.length === 0 && (
        <p>Nenhum agendamento encontrado.</p>
      )}

      {!isLoading && data && (
        <section>
          <Table>
            <TableCaption>
              <h3 className="text-[#2B7FFF] font-medium text-[1rem] md:text-[1.2rem]">
                Agendamentos do mês atual
              </h3>
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Data do agendamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((invoice) => {
                const correctedDate = fixUTC(invoice.appointmentsDate)

                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-light">{invoice.name}</TableCell>

                    <TableCell className="font-light">
                      {format(correctedDate, "dd/MM/yyyy")}
                    </TableCell>

                    {invoice.paymentStatus === null && (
                      <TableCell className="text-red-400 font-medium">Não informado</TableCell>
                    )}

                    {invoice.paymentStatus === "pendente" && (
                      <TableCell className="text-orange-500 font-medium">{invoice.paymentStatus}</TableCell>
                    )}

                    {invoice.paymentStatus === "pago" && (
                      <TableCell className="text-green-700 font-medium">{invoice.paymentStatus}</TableCell>
                    )}

                    {invoice.paymentStatus === "parcial" && (
                      <TableCell className="text-blue-500 font-medium">{invoice.paymentStatus}</TableCell>
                    )}

                    <TableCell>{invoice.service.name}</TableCell>

                    <TableCell className="text-right">
                      {(invoice.service.price / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right font-semibold">
                  {(total / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      )}
    </div>
  )
}
