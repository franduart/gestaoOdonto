import HeroImg from '@/../../public/14852068_5524778.jpg'

export function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-[#E0E9F8]">
      
      {/* Texto */}
      <div className="w-full flex flex-col gap-6 max-w-xl">
        <h1 className="text-3xl text-[#51A2FF] font-medium text-center md:text-left">
          A gestão da sua clínica odontológica em um só lugar
        </h1>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <p className="font-medium text-zinc-800 leading-relaxed">
            <strong>Organize atendimentos</strong>, <strong>reduza mensagens no WhatsApp</strong> 
            e permita que seus <strong>pacientes agendem sozinhos</strong> com um link personalizado.
          </p>

          <strong className="text-[#51A2FF] font-medium text-lg">
            Automatize sua rotina, aumente sua captação de leads e ofereça uma experiência moderna para seus pacientes.
          </strong>

          <h4 className="text-zinc-700">
            Clique no botão abaixo e comece agora.
          </h4>

          <p className="font-medium text-2xl">
            15 dias grátis <br /> cancele quando quiser
          </p>

          <a
            href="https://gestao-odonto-cyan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2F5FFF] py-2 px-4 font-medium rounded-2xl text-white text-lg shadow-2xl hover:scale-105 transition"
          >
            Testar agora mesmo
          </a>
        </div>
      </div>

      {/* Imagem */}
      <img
        src={HeroImg.src}
        alt="Dentista usando sistema odontológico"
        className="w-full max-w-xs md:max-w-sm object-cover rounded-full"
      />
    </section>
  )
}
