"use server"

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateServices";

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED"

export interface ResultPermissionProp {
  hasPermission: boolean,
      planId: PLAN_PROP,
      expired: boolean,
      plan: PlanDetailInfo | null
}

type TypeCheck = "service";

interface CanPermissionProp{
  type: TypeCheck;
}

export async function canPermission({type}: CanPermissionProp): Promise<ResultPermissionProp>{
  const session = await auth()

  if(!session?.user?.id){
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired:true,
      plan: null
}
  }

  const subscription = await prisma.subscription.findFirst({
    where:{
      userId: session?.user?.id,
    }
  })
  switch(type){
    case "service": 
    const permission = await canCreateService(subscription, session)
    
    return permission;
   default: 
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired:true,
      plan: null
}
  }
}