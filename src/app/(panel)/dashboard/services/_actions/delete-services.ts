"use server"

import { auth } from "@/lib/auth"
import prisma from '@/lib/prisma'
import { error } from "console"
import { z } from 'zod'
import {revalidatePath} from 'next/cache'

const formSchema = z.object({
 serviceId: z.string().min(1, "O id é obrigatório")
})

type FromSchema = z.infer<typeof formSchema>

export async function deleService(formData: FromSchema){
  const session = await auth();

 if(!session?.user?.id){
   return {
    error: "Falha ao deletar serviçoS",

   }
 }

  const schema = formSchema.safeParse(formData);
  if(!schema.success){
    return {
     error: schema.error.issues[0].message,
    }
  }

    try{
     await prisma.services.update({
        where: {
            id: formData.serviceId,
            userId: session?.user.id,
        },
        data: {
            status: false
        }
     })
     
     revalidatePath('/dashboard/services')
     return {
        data: 'Serviço deletado com sucesso!'
     }

    }catch(err){
        return {
            error: 'Falha ao deletar tarefa'
        }
    }


}