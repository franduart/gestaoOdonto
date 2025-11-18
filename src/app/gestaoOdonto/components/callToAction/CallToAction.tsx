
export default async function CallToAction(){
  
  return(
    <section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-white">

  
  <div className="w-full flex flex-col items-center gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl text-[#0096C7]">
     Pronto para modernizar sua clínica?
    </h2>

    <h4 className="text-zinc-700">Clique no botão abaixo e comece agora.</h4>
  <p className="font-medium text-2xl text-center">15 dias grátis <br /> cancele quando quiser</p>
    <a href='#' className="bg-[#2F5FFF] p-1.5 font-medium rounded-2xl text-center text-white text-[1.2rem] shadow-2xl">Testar agora mesmo </a>
  </div>


</section>
  )
}