"use server"

import { auth } from "@/lib/auth"
import prisma from '@/lib/prisma'
import { error } from "console"
import { z } from 'zod'
import {revalidatePath} from 'next/cache'

const formSchema = z.object({
 name: z.string().min(1, {message: "O nome do serviço é obrigatório"}),
 price: z.number().min(1, {message: "digite o valor do serviço"}),
 duration: z.number(),
})

type FromSchema = z.infer<typeof formSchema>

export async function createNewServices(formData: FromSchema){
 const session = await auth();
 if(!session?.user?.id){
   return {
    error: "Usuário não encontrado",

   }
 }

 const schema = formSchema.safeParse(formData);
 if(!schema.success){
   return {
    error: schema.error.issues[0].message,
   }
 }
 try{
    const newService = await prisma.services.create({
        data: {
            name: formData.name,
            price: formData.price,
            duration: formData.duration,
            userId: session?.user?.id
        }
    })
    revalidatePath("/dashboard/services")
    return {
        data: newService
    }
 }
 catch (err) {
    console.error("Erro ao criar serviço:", err)
    return { error: "Erro ao criar serviço. Tente novamente mais tarde." }
  }

}