"use server"

import { Plan } from "@/generated/prisma"
import { PlanProps } from "@/utils/index"

export interface PlanDetailInfo {
  maxServices: number;
}
const PLANS_LIMITS: PlanProps ={
 BASIC:{
    maxServices: 10,
  },
  PROFESSIONAL: {
   maxServices: 100,
  }

}

export async function getPlan(planId: Plan){
  return PLANS_LIMITS[planId]
}