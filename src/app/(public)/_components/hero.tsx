import { Button } from "@/components/ui/button";
import Img from '../../../../public/dentista.jpg'
import Image from "next/image";
export function Hero(){
    return(
        <section className="bg-green-50 ">
        <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
           
           <main className="flex items-center justify-center">
            <article className="max-w-3xl space-y-8 flex-[2] flex-col items-center justify-center ">
                <h1 className=" font-bold text-5xl max-w-2xl lg:text-4xl tracking-tight">O dentista ideal para você está aqui. <br />Agende em minutos.</h1>
                <p className="text-base md:text-lg text-gray-700">Compare profissionais, confira preços e escolha o dentista ideal para você. <br /> Rápido, seguro e sem complicação.</p>
                <Button className="bg-[#0096C7] w-fit px-5 font-semibold">
                    Encontre uma clínica
                </Button>

            </article>
            <div className="hidden lg:block">
                    <Image
                    width={308}
                    height={512}
                    className="object-contain rounded-full "
                    quality={100}
                    src={Img}
                    priority
                    alt="Foto ilustrativa profissional dentista"
                    />
                </div>

           </main>
        </div>
        </section>
    )
}
