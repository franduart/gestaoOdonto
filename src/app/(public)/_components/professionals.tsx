import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Foto from '../../../../public/foto1.png'
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {  Prisma } from "@/generated/prisma"
import { PremiumCardBadge } from "./premium-clinic"

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {     
    subscription: true,

  }
}>

interface ProfessionalsProps {
  professionals: UserWithSubscription[]
}



export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-gray-50 py-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clínicas disponíveis</h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {professionals.map((clinic) => (
            <Card className="overflow-hidden hover:shadow-lg" key={clinic.id}>
              <CardContent>
                <div className="relative h-48">
                  <Image
                    src={clinic.image ?? Foto}
                    alt="dentistas"
                    fill
                    className="object-cover "
                  />

                  {clinic?.subscription?.status === "active" && clinic?.subscription?.plan === "PROFESSIONAL" && <PremiumCardBadge/>}

                </div>
                <div className="p-4 space-y-4 min-h-[160px] flex flex-col justify-between">
                  <div className="flex items-center justify-between ">
                    <div>
                      <h3 className="font-bold">{clinic.name}</h3>
                      <p className="text-zinc-600 line-clamp-2"> {clinic.addres ?? "Endereço não informado"}</p>
                    </div>

                  

                  </div>
                  <Link
                    className="w-full rounded bg-[#0096C7] hover:bg-[#096e8f] 
                    text-white flex items-center justify-center py-2 text-sm md:text-base"
                    href={`/clinica/${clinic.id}`}
                    target="_blank"
                  ><ArrowRight /> Agendar Horário</Link>

                </div>
              </CardContent>
            </Card>
          ))}

        </section>
      </div>

    </section>
  )
}