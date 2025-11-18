import { redirect } from "next/navigation"
import { getPermissionToReports } from "./_data-access/get-permission-reports"
import getSession from "@/lib/getSession"
import { checkSubscription } from "@/utils/permissions/checkSubscription"
import Link from "next/link"
import { ArrowUpRight, SearchIcon } from 'lucide-react';
import { getAppointments } from "./_data-access/get-values"
import { Card } from "@/components/ui/card"
import { GetAppointments } from "../_actions/get-appointments"
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

import { ButtonData } from "./components/buttonData"

export default async function Reports() {
  const session = await getSession()
  const subscription = await checkSubscription(session?.user?.id!)


  if (!session) {
    redirect("/")
  }


  const appointments = await getAppointments({ userId: session.user.id })


  const data = await GetAppointments()
  console.log(data)

  if ("error" in data) {
    return <p className="text-red-500">{data.error}</p>
  }

  const user = await getPermissionToReports({ userId: session?.user?.id! })



  if (!user) {
    return (
      <main>
        {subscription?.subscriptionStatus === "EXPIRED" && (
          <div className="w-full p-1 rounded-md mt-1 bg-red-500 text-white flex flex-col  md:flex-row items-center justify-between">
            <p className="font-bold text-[1.2rem]">Limite de serviços atingido </p>
            <Link href={"/dashboard/plans"} className="bg-black text-white p-1 rounded-md text-sm">

              Assinar plano
            </Link>
          </div>
        )}

        {subscription?.subscriptionStatus === "TRIAL" && (
          <div className="w-full p-1 rounded-md mt-1 bg-green-500 text-white flex flex-col  md:flex-row items-center justify-between">
            <p className="font-bold text-[1.1rem]">{subscription.message} </p>
            <Link href="/dashboard/plans" className="bg-black text-white p-1 rounded-md text-sm flex gap-0.5 items-center">
              <ArrowUpRight /> Assinar plano
            </Link>
          </div>
        )}

        {subscription?.subscriptionStatus !== "EXPIRED" && subscription?.subscriptionStatus === "TRIAL" && (
          <Card className="my-4 p-4 flex flex-col justify-between">

            <div>
                <ButtonData/>
              
            </div>
            <div>
              {appointments.length === 0 ? (
                <p>Nenhum agendamento encontrado.</p>
              ) : (
                <>
                  <Table>
                    <TableCaption className="text-[#2B7FFF] font-medium md:text-[1.2rem] text-[1rem]">Tabela de finanças {session?.user?.name}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] ">Paciente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.filter((invoice)=> {
                        const day = new Date(invoice.createdAt)
                        const mesAtual = new Date().getMonth()
                        return day.getMonth() === mesAtual
                      })
                      
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-light">{invoice.name}</TableCell>
                          {
                            invoice.paymentStatus === " " && null && (
                              <TableCell className="text-red-400 font-medium">Não informado</TableCell>
                            )
                          }
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
                          <TableCell className="text-right">{((invoice.service.price) / 100).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",

                          })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{(
                          appointments.reduce((acc, a) => acc + (a.service?.price || 0), 0) / 100
                        ).toFixed(2)}</TableCell>

                      </TableRow>
                    </TableFooter>
                  </Table>
                </>
              )}


              <section className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-center justify-between gap-4 py-4">

                <div className="border-3 border-green-500 p-3 rounded-md ">
                
                <div className="flex flex-col items-center justify-between">
                 <strong className="font-medium text-[1.5rem]">R$ {
                    (data.filter((item) => item.paymentStatus === "pago").reduce((acc, a) => acc + (a.service?.price || 0), 0) / 100
                    ).toFixed(2).replace(".", ",")
                  }</strong>
                  <h3>Receita</h3>
                </div>
              </div>

               <div className="border-3 border-orange-400 p-3 rounded-md ">
                
                <div className="flex flex-col items-center justify-between">
                 <strong className="font-medium text-[1.5rem]">R$ {
                    (data.filter((item) => item.paymentStatus === "pendente").reduce((acc, a) => acc + (a.service?.price || 0), 0) / 100
                    ).toFixed(2).replace(".", ",")
                  }</strong>
                  <h3>Pendente</h3>
                </div>
              </div>

               <div className="border-3 border-blue-600 p-3 rounded-md ">
                
                <div className="flex flex-col items-center justify-between">
                 <strong className="font-medium text-[1.5rem]">R$ {
                    (data.filter((item) => item.paymentStatus === "parcial").reduce((acc, a) => acc + (a.service?.price || 0), 0) / 100
                    ).toFixed(2).replace(".", ",")
                  }</strong>
                  <h3>Pagamento Parcial</h3>
                </div>
              </div>
              </section>

            </div>
            
          </Card>
        )}

      </main>
    )
  }
}