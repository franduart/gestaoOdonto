"use client"

import { Button } from "@/components/ui/button"
import { Plan } from "@/generated/prisma"
import {createSubscription} from '../_actions/create-subsctipion'
import { toast } from "sonner"
import {getStripe} from '@/utils/stripe-js'

interface SubscriptonButtonProps {
  type: Plan
}

export function SubscriptionButton({type}: SubscriptonButtonProps){
  async function handleCreateBilling(){
    const {sessionId, error, url} = await createSubscription({type: type})
   if(error){
    toast.error(error)
    return
   }
    
    const stripe = await getStripe();

    if(stripe && url){
      window.location.href = url
    }

  }
  
  return(
     <Button 
     
     className={`cursor-pointer w-full bg-black ${type === "PROFESSIONAL" && "bg-[#0096C7]"}`}
     onClick={handleCreateBilling}
     >
      Ativar Assinatura</Button>
  )

}