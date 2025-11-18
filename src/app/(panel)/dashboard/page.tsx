import { Button } from "@/components/ui/button"
import getSession from "@/lib/getSession"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ButtonCopyLink } from "./_components/button-copy-link"
import { Reminders } from "./_components/reminder/reminders"
import { Appointments } from "./_components/apointments/appointments"
import { checkSubscription } from "@/utils/permissions/checkSubscription"

export default async function Dashboard() {
  const session = await getSession()
  if (!session) {
    redirect("/")
  }

  const subscription = await checkSubscription(session?.user?.id!)


  return (
    <main>
      <div className="space-x-2 flex items-center justify-end">

        {subscription ? (
          <Button className="cursor-pointer bg-[#0096C7] flex-1 md:flex-[0]">
            <Calendar className="w-5 h-5" />
            <Link
              href={`/clinica/${session?.user?.id}`} target="_blank">Novo agendamento</Link>
          </Button>
        ) : (
          <Button asChild className="cursor-pointer bg-[#0096C7] flex-1 md:flex-[0]">
            <Link href="/dashboard/plans">Assinar plano</Link>
          </Button>
        )}

        <ButtonCopyLink userId={session.user?.id} />
      </div>

      {subscription?.subscriptionStatus === "EXPIRED" && (
        <div className="w-full p-1 rounded-md mt-1 bg-red-500 text-white flex flex-col  md:flex-row items-center justify-between">
          <p className="font-bold text-[1.2rem]">Limite de serviços atingido </p>
          <Link href={"/dashboard/plans"} className="bg-black text-white p-1 rounded-md text-sm">

            Assinar plano
          </Link>
        </div>
      )}

      {subscription?.subscriptionStatus === "TRIAL" &&(
        <div className="w-full p-1 rounded-md mt-1 bg-green-500 text-white flex flex-col  md:flex-row items-center justify-between">
          <p className="font-bold text-[1.1rem]">{subscription.message} </p>
          <Link href={"/dashboard/plans"} className="bg-black text-white p-1 rounded-md text-sm">
            Assinar plano
          </Link>
        </div>
      )}

      {subscription?.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
          <Appointments userId={session.user?.id} />
          <Reminders userId={session.user?.id} />
        </section>
      )}
    </main>
  )
}
