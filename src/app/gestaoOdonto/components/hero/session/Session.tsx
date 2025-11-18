import Painel from '@/../../public/painel.png'
import Mobile from '@/../../public/link-mobile.png'
import Agenda from '@/../../public/agenda.png'
import Leads from '@/../../public/leads.jpg'
import Servicos from '@/../../public/serviços.png'
import Login from '@/../../public/login.jpg'
import Beneficios from '@/../../public/beneficios.jpg'

export function Session(){
  return(
    <>
    <section className="w-full flex flex-col md:flex-row items-center justify-around gap-8 p-4 py-5 bg-white shadow ">
  <div className="flex flex-col gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl">O sistema que trabalha por você</h2>
    <h3 className="font-medium">Gerenciar uma clínica não precisa ser complicado.</h3>
    <p className="text-[1.2rem]">
      O Gestão Odonto foi criado para dentistas que querem 
      <strong> ganhar tempo</strong>, 
      <strong> evitar erros </strong> 
      e ter uma operação realmente <strong>profissional</strong>.
    </p>
    <strong>Sem burocracia, sem complicação.</strong>
  </div>

  <img 
    src={Painel.src}
    alt="dashboard"
    className="w-full max-w-md md:max-w-lg rounded-xl object-cover"
  />
</section>


   <section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-[#E0E9F8]">

  <div className="flex flex-col gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl">
      Link personalizado para agendamentos (seu consultório aberto 24h)
    </h2>

    <h4 className="font-medium text-zinc-700">
      Chega de responder mensagens como:
    </h4>

    <p className="leading-relaxed">
      "Tem horário amanhã?" <br />
      "Atende no sábado?" <br />
      "Que dia tem consulta pra limpeza?"
    </p>

    <p className="text-[1.2rem] font-medium text-zinc-800">
      Com o link exclusivo da sua clínica, o paciente:
    </p>

    <ul className="flex flex-col gap-2 text-zinc-700">
      <li>✔ visualiza horários disponíveis</li>
      <li>✔ escolhe o serviço desejado</li>
      <li>✔ faz o agendamento sozinho</li>
      <li>✔ visualiza horários disponíveis</li>
    </ul>

    <strong className="text-zinc-900">
      Seu consultório funciona mesmo quando você está offline — e você descansa sem culpa.
    </strong>
  </div>


  <img
    src={Mobile.src}
    alt="dashboard"
    className="w-full  max-w-md md:max-w-3xs rounded-xl object-cover"
  />
</section>



    <section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-white">

      <div className='w-full mt-4 h-full flex-col md:flex-row  items-center justify-around m-auto gap-4 p-4'>
      <h2 className='font-medium text-2xl text-[#0096C7]'>Agenda dinâmica e inteligente</h2>


      <h4>Sua rotina nunca mais será a mesma.</h4>
    
     <p className='text-[1.2rem]'>A agenda inteligente do Gestão Odonto permite:</p>
     <ul>
      <li>✔ visualizar todos os horários por dia, semana ou mês</li>
      <li>✔ bloquear horários indisponíveis</li>
      <li>✔ evitar conflitos de agendamento</li>
      <li>✔ editar ou remover consultas com apenas um clique</li>
      <li>✔ enviar mensagem diretamente no WhatsApp do paciente</li>
     </ul>


     </div>

     <img src={Agenda.src} 
     className=' w-full  max-w-md md:max-w-3xs rounded-xl object-cover'
     alt="dashboard" />
    </section>


    <section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-[#E0E9F8]">

      <div className='w-full mt-4 h-full flex-col md:flex-row  items-center justify-around m-auto p-4'>
      <h2 className='font-medium text-2xl text-[#0096C7]'>Captação de leads integrada</h2>


      <h4>Transforme cada visita em oportunidade de negócio.</h4>
    
     <p className='text-[1.2rem]'>O sistema registra automaticamente:</p>
     <ul>
      <li>✔ nome do paciente</li>
      <li>✔ e-mail</li>
      <li>✔ telefone</li>
      <li>✔ serviço de interesse</li>
      <li>✔ data do agendamento</li>
     </ul>

     <strong className='my-4 '>Ou seja: cada consulta marcada vira um lead para futuras campanhas.</strong>

     <p className='text-[1.2rem] my-4'>Você pode usar esses contatos para:</p>
     <ul>
      <li>✔ lembretes</li>
      <li>✔ promoções</li>
      <li>✔ recall de pacientes</li>
      <li>✔ recuperação de abandonos</li>
     </ul>

     <h3>Seu marketing fica muito mais estratégico.</h3>


     </div>
     <img src={Leads.src} 
     className='w-full  max-w-md md:max-w-3xs rounded-full object-cover shadow-2xl'
     alt="dashboard" />

    </section>

    <section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-white">


  <div className="w-full flex flex-col gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl text-[#0096C7]">
      Cadastro de serviços e valores
    </h2>

    <h4 className="text-zinc-700">Deixe claro tudo que você oferece.</h4>

    <p className="text-[1.2rem] font-medium text-zinc-800">
      Crie e organize os serviços da clínica com:
    </p>

    <ul className="flex flex-col gap-2 text-zinc-700">
      <li>✔ nome</li>
      <li>✔ valor do serviço</li>
      <li>✔ tempo de duração</li>
    </ul>

    <p>Isso ajuda o paciente a entender o que está sendo agendado e reduz dúvidas no atendimento.</p>
  </div>

  <img
    src={Servicos.src}
    alt="dashboard"
    className="w-full max-w-xs md:max-w-2xs rounded-xl object-cover shadow-2xl"
  />
</section>


<section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-[#E0E9F8]">


  <div className="w-full flex flex-col gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl text-[#0096C7]">
      Login seguro com Google
    </h2>

    <h4 className="text-zinc-700">Não precisa lembrar de senha.</h4>

    <p className="text-[1.2rem] font-medium text-zinc-800">
      A clínica acessa tudo usando o Google, com segurança e facilidade.
    </p>
  </div>

  <img
    src={Login.src}
    alt="dashboard"
    className="w-full max-w-xs md:max-w-80 rounded-full object-cover shadow-2xl"
  />
</section>

<section className="w-full mt-4 flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-white">

  <img
    src={Beneficios.src}
    alt="dashboard"
    className="w-full max-w-80 md:max-w-96 rounded-full object-cover shadow-2xl"
  />

  <div className="w-full flex flex-col gap-4 max-w-xl text-center md:text-left">
    <h2 className="font-medium text-2xl text-[#0096C7]">
      Benefícios imediatos
    </h2>

    <h4 className="text-zinc-700">Com o Gestão Odonto, você terá:</h4>


    <ul className="flex flex-col gap-2 text-zinc-700">
      <li>✔ menos mensagens no WhatsApp</li>
      <li>✔ mais pacientes chegando até você</li>
      <li>✔ mais tempo para atender</li>
      <li>✔ menos erros de agenda</li>
      <li>✔ mais profissionalismo</li>
    </ul>
  </div>

</section>


    </>
  )
}