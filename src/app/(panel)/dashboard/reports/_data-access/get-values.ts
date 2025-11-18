import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

interface Props {
  userId: string
}

type AppointmentWithService = {
  id: string
  userId: string
  appointmentsDate: Date
  time: string
  service: {
    name: string
    price: number
  } | null
}


export async function getAppointments({ userId }: Props): Promise<AppointmentWithService[]> {
  const session = await auth()

  if (!session?.user?.id) {
    console.error("Sessão negada — usuário não autenticado.")
    return [] 
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return appointments
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
    return []
  }
}
