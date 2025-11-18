import { 
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle, 
} from "@/components/ui/dialog"
import { AppointmentsWithServices } from "./appointments-list"
import { format } from "date-fns"
import { formatCurrrency } from "@/utils/formatCurrency"
import { Pencil, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { UseAppointmentForm } from "@/app/(public)/clinica/[id]/_components/schedule-form"
import { useEffect, useState } from "react"
import { UpdateAppointment } from "../../_actions/update-appointments"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllServices } from "../../services/_data-access/getAll-services"
import {  ScheduleContentProps } from "@/app/(public)/clinica/[id]/_components/schedule-content"
import { MessageCircleMore } from 'lucide-react';
interface DialogAppointmentsProps {
  appointment: AppointmentsWithServices | null;
}

interface PatientExtraData {
  endereco: string
  nascimento: string
  documento: string
}

function serviceAll ({clinic}: ScheduleContentProps){
   const clinicInfo = clinic.services
   console.log("SERVIÇOS AQUII",clinicInfo)
}

export function DialogAppointment({ appointment }: DialogAppointmentsProps) {
  const form = UseAppointmentForm()

   const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    endereco: "",
    nascimento: "",
    documento: "",
    paymentStatus: "",
    serviceName: "",
    servicePrice: 0,
  })




useEffect(() => {
    if (appointment) {
      setFormData({
        name: appointment.name ?? "",
        email: appointment.email ?? "",
        phone: appointment.phone ?? "",
        date: new Date(appointment.appointmentsDate).toISOString().split("T")[0],
        time: appointment.time ?? "",
        endereco: appointment.endereco ?? "",
        nascimento: appointment.nascimento
          ? new Date(appointment.nascimento).toISOString().split("T")[0]
          : "",
        documento: appointment.documento ?? "",
        paymentStatus: appointment.paymentStatus ?? "",
        serviceName: appointment.service.name ?? "",
        servicePrice: appointment.service.price ? appointment.service.price / 100 : 0,
      })
    }
  }, [appointment])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, 
      [name]: name === "servicePrice" ? Number(value): value, }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!appointment) return

    const data = {
      id: appointment.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: new Date(formData.date),
      serviceId: appointment.servicesId,
      time: formData.time,
      clinicId: appointment.userId,
      endereco: formData.endereco,
      nascimento: formData.nascimento,
      documento: formData.documento,
      paymentStatus: formData.paymentStatus,
      servicePrice: Math.round(formData.servicePrice * 100),
    }

    const response = await UpdateAppointment(data)
    
    

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success("Agendamento atualizado com sucesso!")
    }
  }


return (
    <DialogContent className="w-full">
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>Veja e edite todos os dados do agendamento</DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[350px] w-full pr-2 flex-1">
        {appointment && (
          <Form {...form}>
            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="block font-semibold">Nome:</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-between">
                  <div>
                  <label className="block font-semibold">Telefone:</label>
                 <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                  </div>
                  <a href={`https://wa.me/55${formData.phone.replace(/\D/g, "")}`} 
                  target="_blank" 
                  className="flex items-center p-0.7 pl-2 text-[0.8rem] font-medium border-2 border-green-700 rounded-2xl">
                    <Send 
                  className="text-[0.7rem]"/> Mandar mensagem</a>
                </div>

                <label className="block font-semibold">Email:</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label className="block font-semibold">Data do agendamento:</label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />

                <label className="block font-semibold">Horário:</label>
                <Input
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />

                <section className="flex justify-between bg-gray-100 mt-4 p-3 rounded-md">
                  <div>
                    <strong>Serviço:</strong> 
                    <h3>{appointment.service.name}</h3>
                  </div>
                  

                  <div>
                  <strong>Valor:</strong>
                  <h3>{formatCurrrency(appointment.service.price / 100)}</h3>
                  </div>
              
                </section>

                <label className="block font-semibold">Endereço:</label>
                <Input
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                />

                <label className="block font-semibold">Data de nascimento:</label>
                <Input
                  name="nascimento"
                  type="date"
                  value={formData.nascimento}
                  onChange={handleChange}
                />

                <label className="block font-semibold">Documento (RG / CPF):</label>
                <Input
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                />

                <label className="block font-semibold">Status de pagamento:</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                >
                  <option value="">Selecione...</option>
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="parcial">Parcial</option>
                </select>
              </div>

              <Button className="bg-blue-700 w-full" type="submit">
                Atualizar dados do paciente
              </Button>
            </form>
          </Form>
        )}
      </ScrollArea>
    </DialogContent>
  )

}
