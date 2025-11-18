"use server"

import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from "@/lib/auth"


const formSchema = z.object({
  id: z.string().min(1, 'O ID do agendamento é obrigatório'),
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('O email é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
  time: z.string().min(1, 'O horário é obrigatório'),
  clinicId: z.string().min(1, 'O id é obrigatório'),
  endereco: z.string().optional(),
  nascimento: z.string().optional(),
  documento: z.string().optional(),
  paymentStatus: z.string().optional(),
  servicePrice: z.number().optional(),

})

type FormSchema = z.infer<typeof formSchema>


export async function UpdateAppointment(formData: FormSchema) {
  const session = await auth()


  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." }
  }


  const schema = formSchema.safeParse(formData)
  if (!schema.success) {
    return { error: schema.error.issues[0].message }
  }



  try {
   
    const updated = await prisma.appointment.update({
      where: { id: formData.id },
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentsDate: formData.date,
        servicesId: formData.serviceId,
        userId: formData.clinicId,
        endereco: formData.endereco,
        nascimento: formData.nascimento,
        documento: formData.documento,
       paymentStatus: formData.paymentStatus || undefined,

      },
    })

    revalidatePath("/dashboard")

    return { data: updated }
    
  } catch (err) {
    console.error("Erro ao atualizar agendamento:", err)
    return { error: "Erro ao atualizar o agendamento. Tente novamente mais tarde." }
  }
}
