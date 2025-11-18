"use client"

import { Subscription } from "@/generated/prisma";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'

import {subscriptionPlans} from "@/utils/index"
import { features } from "process";
import { Button } from "@/components/ui/button";

import { createPortalCustomer } from "../_actions/create-portal-customer";

interface SubscriptionProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription}:SubscriptionProps){
  const subscriptionInfo = subscriptionPlans.find(plan => plan.id === subscription.plan)
  
  async function handleMenageSubscription() {
    const portal = await createPortalCustomer()
    if(portal.error){
      
      toast.error("Ocorreu um erro ao criar o portal do cliente")
      return;
    }
    window.location.href= portal.sessionId
  }

  return(
    <Card className="w-full mx-auto ">
    <CardHeader>
      <CardTitle className="text-2xl">Seu plano atual</CardTitle>
      <CardDescription>
        Sua assinatura está ativa
      </CardDescription>
    </CardHeader>
    <CardContent>
     <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg md:text-xl">
      {subscription.plan === "BASIC" ? "BASIC" : "Profissional" }
     </h3>

     <div className="bg-[#0096C7] text-white w-fit px-4 py-1 rounded-md">
      {subscription.status === "active" ? "Ativo" : "Inativo"}
     </div>
     </div>

     <ul className="list-disc list-inside space-y-2 mb-4">
      {subscriptionInfo && subscriptionInfo.features.map(feature => (
        <li key={feature}>{feature}</li>
      ))}
     </ul>

     <Button onClick={handleMenageSubscription}>Gerenciar assinatura</Button>

    </CardContent>
  </Card>
  )
}