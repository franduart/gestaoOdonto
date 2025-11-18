"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Prisma } from "@/generated/prisma"

export async function GetAppointments() {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." }
  }

  try {

    const appointments: Prisma.AppointmentGetPayload<{
      include: { service: true }
    }>[] = await prisma.appointment.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return appointments
  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err)
    return {
      error: "Erro ao carregar agendamentos.",
    }
  }
}
