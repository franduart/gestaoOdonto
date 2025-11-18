"use server"

import { auth } from "@/lib/auth"
import prisma from '@/lib/prisma'
import { error } from "console"
import { z } from 'zod'
import {revalidatePath} from 'next/cache'

const formSchema = z.object({
 servicesId: z.string().min(1, {message: "O ID do serviço é obrigatório"}),
 name: z.string().min(1, {message: "O nome do serviço é obrigatório"}),
 price: z.number().min(1, {message: "digite o valor do serviço"}),
 duration: z.number(),
})

type FromSchema = z.infer<typeof formSchema>

export async function updateService(formData: FromSchema){
  const session = await auth();
   if(!session?.user?.id){
     return {
      error: "Falha ao atualizar",
  
     }
   }
  
   const schema = formSchema.safeParse(formData);
   if(!schema.success){
     return {
      error: schema.error.issues[0].message,
     }
   }

   try{
     
    const service = await prisma.services.update({
        where: {
            id: formData.servicesId,
            userId: session?.user?.id
        },
        data: {
            name: formData.name,
            price: formData.price,
            duration: formData.duration < 30 ? 30 : formData.duration 
        }
    })
     revalidatePath("/dashboard/services")
    return {
        data: 'Sucesso atualizado'
    }
   }catch(err){
    console.log(err);
    return {
        error: 'Falha ao atualizar'
    }
   }
}