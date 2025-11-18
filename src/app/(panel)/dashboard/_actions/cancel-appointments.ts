"use server"

import prisma from '@/lib/prisma'
import { z } from 'zod'
import {revalidatePath} from 'next/cache'

import { auth } from "@/lib/auth"
import { error } from 'console'


const formSchema = z.object({
 appointmentId: z.string().min(1, "O Id é obrigatório"),
 
})

type FormSchema = z.infer<typeof formSchema>

export async function cancelAppointments(formData: FormSchema){
  const schema = formSchema.safeParse(formData)

  if(!schema.success){
    return {
      error: schema.error.issues[0]?.message
    }
  }

  const session = await auth();
  if(!session?.user?.id){
    return{
      error: "O usuario não foi encontrado!"
    }
  }
  try{
   await prisma.appointment.delete({
    where:{
      id: formData.appointmentId,
      userId: session.user?.id
    }

   })

    revalidatePath("/dashboard")
    
   return {
    data: "Agendamento deletado com sucesso"
   }


  }catch(err){
    return {
      error: "Ocorreu um erro ao deletar este agendamento"
    }
  }
}