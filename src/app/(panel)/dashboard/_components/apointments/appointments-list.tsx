"use client"

import { useState } from "react"
import {  useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent,CardHeader,CardTitle,CardDescription } from "@/components/ui/card"
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import {format} from 'date-fns'
import { Prisma } from "@/generated/prisma"
import { Button } from "@/components/ui/button"
import { Eye, X } from "lucide-react"
import { cancelAppointments } from "../../_actions/cancel-appointments"
import { toast } from "sonner"
import {Dialog, DialogTrigger} from "@/components/ui/dialog"
import { DialogAppointment } from "./dialog-appointments"
import { ButtonPickerAppointments } from "./button-date"

export type AppointmentsWithServices = Prisma.AppointmentGetPayload<{
  include: {
    service: true
  }
}>

interface AppointmentsListProps{
  times: string[]
}

export function AppointmentsList({times}: AppointmentsListProps){
   
   const searchParams = useSearchParams();
   const date = searchParams.get("date")
   const queryClint = useQueryClient()

   const [isDialogOpen, setIsDiologOpen] = useState(false)
   const [detailAppointments, setDetailAppointments] = useState<AppointmentsWithServices | null>(null)
   
   const {data, isLoading, refetch} = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async ()=>{
      
     let activeDate = date;

     if(!activeDate){
      const today = format(new Date(), "yyyy-MM-dd")
      activeDate = today
     }

     const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`
     const response = await fetch(url)
     const json = await response.json() as AppointmentsWithServices[];

     if(!response.ok){
      return []
     }
     return json
    },
    staleTime: 20000,
    refetchInterval: 60000,
   })


   const ocupantMap: Record<string, AppointmentsWithServices> = {}

   if(data && data.length > 0 ){
     for(const appointment of data){
      const requiredSlots = Math.ceil(appointment.service.duration / 30);
      const startIndex = times.indexOf(appointment.time);

      if(startIndex !== -1){
        for(let i = 0; i < requiredSlots; i ++){
          const slotIndex = startIndex + i
          if(slotIndex < times.length){
            ocupantMap[times[slotIndex]] = appointment
          }
        }
      }
     }
   }

    async function handleCancelAppointment(appointmentId: string){
     const response = await cancelAppointments({appointmentId: appointmentId})
     if(response.error){
      toast.error(response.data)
      return;
     }
     queryClint.invalidateQueries({queryKey: ["get-appointments"]})
    refetch()
     toast.success(response.data)
    }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDiologOpen}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold">
          Agendamentos
        </CardTitle>
        <ButtonPickerAppointments/>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
          {isLoading ? (
            <p>Carregando agenda...</p>
          ): (
             times.map((slot)=>{

              const occupant = ocupantMap[slot]

              if(occupant){
                return(
              <div key={slot}
             className="flex items-center py-2 border-t last:border-b gap-4"
             >
              <div className="w-16 text-sm font-semibold">{slot}</div>
              <div className="flex-1 text-sm text-gray-500">
               <div className="font-semibold">
                 {occupant.name}
               </div>
               <div className="text-sm text-gray-500">{occupant.phone}</div>
                </div>

                <div className="ml-auto">
                  <div className="flex items-center gap-1">
                    <Button 
                    size="icon"
                    className="bg-red-400 cursor-pointer"
                    onClick={()=> handleCancelAppointment(occupant.id)}
                    ><X/>
                    </Button>
                    <DialogTrigger>
                      <Button 
                    
                    size="icon"
                    className="bg-[#0096C7]"
                    onClick={()=> setDetailAppointments(occupant)}
                    >
                    
                      <Eye/>
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
            </div>
                )
              }
               return (
             <div key={slot}
             className="flex items-center py-2 border-t last:border-b gap-4"
             >
              <div className="w-16 text-sm font-semibold">{slot}</div>
              <div className="flex-1 text-sm text-gray-500">
                Disponível</div>
            </div>
           )
             })
          
          )}
        </ScrollArea>
      </CardContent>
    </Card>

    <DialogAppointment appointment={detailAppointments} />
    </Dialog>
  )
}