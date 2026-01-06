

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

        <div className="w-full flex flex-col items-center gap-4 max-w-xl text-center md:text-left">
          <h2 className="font-medium text-2xl text-[#0096C7]">
            Pronto para modernizar sua clínica?
          </h2>

          <h4 className="text-zinc-700">Clique no botão abaixo e comece agora.</h4>
          <p className="font-medium text-2xl text-center">15 dias grátis <br /> cancele quando quiser</p>
          <a href='#' className="bg-[#2F5FFF] p-1.5 font-medium rounded-2xl text-center text-white text-[1.2rem] shadow-2xl">Testar agora mesmo </a>
        </div>
        
      </div>

    </section>
  )
}
