

"use server"

import prisma from "@/lib/prisma"
import { z } from "zod"

const appointmentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("O email é obrigatório"),
  phone: z.string().min(1, "O telefone é obrigatório"),
  date: z.coerce.date(),
  serviceId: z.string().min(1, "O serviço é obrigatório"),
  time: z.string().min(1, "O horário é obrigatório"),
  clinicId: z.string().min(1, "O id é obrigatório"),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

export async function createNewAppoitment(formData: AppointmentFormData) {
  const parsed = appointmentSchema.safeParse(formData)


  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {

    const selectedDate = new Date(formData.date)
    const appointmentDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    )

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentsDate: appointmentDate,
        servicesId: formData.serviceId,
        userId: formData.clinicId,
      },
    })

   console.log(newAppointment.servicesId)
    return { data: newAppointment }

  } catch (err) {
    console.error("Erro ao criar agendamento ou enviar e-mail:", err)
    return { error: "Erro ao cadastrar agendamento ou enviar e-mail." }
  }
}
