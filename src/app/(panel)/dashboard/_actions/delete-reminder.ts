"use server"


import prisma from '@/lib/prisma'

import { z } from 'zod'
import {revalidatePath} from 'next/cache'

const formSchema = z.object({
 reminderId: z.string().min(1, {message: "O id do lembrete é obrigatório"}),
 
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteReminder(formData: FormSchema){

 const schema = formSchema.safeParse(formData);

 if(!schema.success){
   return {
    error: schema.error.issues[0].message,
   }
 }
 try{

     await prisma.reminder.delete({
        where: {
            id: formData.reminderId
        }
    })

    revalidatePath("/dashboard")
   
    return {
        data: "Lembrete deletado scom sucesso"
    }
 }
 catch (err) {
    console.error("Erro ao criar serviço:", err)
    return { error: "Erro ao criar serviço. Tente novamente mais tarde." }
  }

}