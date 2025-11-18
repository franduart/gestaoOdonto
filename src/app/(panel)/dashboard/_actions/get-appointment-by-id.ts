"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GetAppointmentById(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." }
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    })

    if (!appointment) {
      return { error: "Agendamento não encontrado." }
    }


    if (appointment.userId !== session.user.id) {
      return { error: "Você não tem permissão para visualizar este agendamento." }
    }

    return { data: appointment }
  } catch (err) {
    console.error("Erro ao carregar agendamento:", err)
    return { error: "Erro ao carregar o agendamento." }
  }
}
