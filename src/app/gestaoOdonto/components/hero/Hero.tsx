import HeroImg from '@/../../public/14852068_5524778.jpg'

export function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-4 bg-[#E0E9F8]">
      
      <div className="w-full flex flex-col gap-6 max-w-xl px-4">
        <h1 className="text-3xl text-[#51A2FF] font-medium text-center md:text-left">
          A gestão da sua clínica odontológica em um só lugar
        </h1>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="font-medium text-zinc-800 leading-relaxed">
            <strong>Organize atendimentos</strong>, <strong>reduza mensagens no WhatsApp</strong> 
            e permita que seus <strong>pacientes agendem sozinhos</strong> com um link personalizado.
          </p>

          <strong className="text-[#51A2FF] font-medium text-[1.2rem]">
            Automatize sua rotina, aumente sua captação de leads e ofereça uma experiência moderna para seus pacientes.
          </strong>
        </div>
      </div>


      <img
        src={HeroImg.src}
        alt="dentista"
        className="w-full max-w-xs md:max-w-sm object-cover rounded-full"
      />
    </section>
  )
}
