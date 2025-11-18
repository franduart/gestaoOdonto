import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function GET(request: NextRequest){
     const {searchParams} = request.nextUrl
    
     const userId = searchParams.get('userId')
     const dateParam = searchParams.get('date')

     if(!userId ||userId === "null" || !dateParam || dateParam === 'null'){
        return NextResponse.json({
            error:"Nenhum agendamento econtrado"
        },
        {
            status: 400
        })
     }

     try{
       const [year, month, day] = dateParam.split("-").map(Number)
       const startDate = new Date(Date.UTC(year, (month - 1), day, 0, 0, 0))
       const endDate = new Date(Date.UTC(year, (month - 1), day, 23, 59, 59 , 999))
      
       const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
       })

       if(!user){
        return NextResponse.json({
            error:"Nenhum agendamento encontrado"
        },
        {
            status: 400
        })
       }

       const appointments = await prisma.appointment.findMany({
        where: {
            userId: userId,
            appointmentsDate: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            service: true
        }
       })

       const blockedsSlots = new Set<string>()

       for (const apt of appointments){
        const requiredSlots = Math.ceil(apt.service.duration / 30)
        const startIndex = user.times.indexOf(apt.time)

        if(startIndex !== -1){
            for (let i = 0 ; i < requiredSlots; i++){
                const blockedSlot = user.times[startIndex + i]
                if(blockedSlot){
                    blockedsSlots.add(blockedSlot)
                }
            }
        }
       }

       const blockedsTimes = Array.from(blockedsSlots)
       console.log(blockedsTimes)
       return NextResponse.json(blockedsTimes)


     }
     catch(err){
console.log(err)
    return NextResponse.json({
            error:"Nenhum agendamento econtrado"
        },
        {
            status: 400
        })
     }


    return NextResponse.json({
        ok: true
    })
}