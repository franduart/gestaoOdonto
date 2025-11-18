"use server"

import  prisma from '@/lib/prisma'
import {addDays, differenceInDays, isAfter} from 'date-fns'
import {TRIAL_DAYS} from '@/utils/permissions/triel-limits'

export async function checkSubscription(userId: string){
  const user = await prisma.user.findFirst({
    where:{
      id: userId,
    },
    include: {
      subscription: true,
    }
  })

  if(!user){
    throw new Error("Usuário não encontrado")
  }

  if(user.subscription && user.subscription.status === "active"){
     return{
      subscriptionStatus: "active",
      message: "Assinatura ativa.",
      planId: user.subscription.plan
    }
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAYS)

  if(isAfter(new Date(), trialEndDate)){
    return{
      subscriptionStatus: "EXPIRED",
      message: "Seu plano de teste expirou.",
      planId: "TRIAL"
    }
  }

  const daysRemain = differenceInDays(trialEndDate, new Date())

  return{
      subscriptionStatus: "TRIAL",
      message: `Você está no período de teste gratuito. Faltam ${daysRemain + 1} dias para expirar.`,
      planId: "TRIAL"
    }
}