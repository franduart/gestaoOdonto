"use server"

import { Subscription } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "@/utils";
import {checkSubscriptionExpired} from "@/utils/permissions/checkSubscriptionExpired" 
import { ResultPermissionProp } from "./canPermission";

export async function canCreateService(subscription: Subscription | null, session: Session): Promise<ResultPermissionProp>{
  try{
   const serviceCount = await prisma.services.count({
    where:{
      userId: session?.user?.id
    }
   })

   if(subscription && subscription.status === "active"){
    const plan = subscription.plan
    const planLimits = await getPlan(plan)
    console.log("limites do seu plano", planLimits)

     return {
      hasPermission: planLimits.maxServices === null || serviceCount <= planLimits.maxServices,
      planId: subscription.plan,
      expired:true,
      plan: PLANS[subscription.plan]
}
   }

    const checkUserLimit = await checkSubscriptionExpired(session)
    
    return checkUserLimit

  }catch(erro){
  return {
      hasPermission: false,
      planId: "EXPIRED",
      expired:false,
      plan: null
}
  }
}