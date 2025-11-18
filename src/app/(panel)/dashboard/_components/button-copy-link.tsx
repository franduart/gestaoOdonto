"use client"

import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"
import { toast } from "sonner"

export function ButtonCopyLink({userId}:{userId: string}){

  async function handleCopyLink(){
   await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/clinica/${userId}`)
  toast('Link de agendamento copiado!')
  }

  return(
    <Button onClick={handleCopyLink} className="cursor-pointer w-fit h-fit  bg-black">
      <LinkIcon className="w-full bg-black "/>
    </Button>
  )
}