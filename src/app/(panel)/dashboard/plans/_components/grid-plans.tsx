import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import {subscriptionPlans} from '@/utils/index'
import { SubscriptionButton } from './subsction-buton'

export function GridPlans(){
  return(
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5'>
      {subscriptionPlans.map((plan, index)=>(
        <Card key={plan.id} className='flex flex-col w-full mx:auto'>
          <CardHeader>
            {index === 1 && (
              <div className='bg-[#0096C7] py-3 text-center rounded-t-xl'>
                <p className='font-semibold text-white '>Promoção exclusiva</p>
              </div>
            )}
            <CardTitle className='text-xl md:text-2xl'>
              {plan.name}
            </CardTitle>
            <CardDescription>
              {plan.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {plan.features.map((feature, index)=>(
              <li key={index}>{feature}</li>
              ))}
            </ul>

            <div className='mt-4 '>
              <p className='text-gray-600 line-through'>{plan.oldPrice}</p>
              <p className='text-black text-2xl font-bold'>{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
           <SubscriptionButton type={plan.id === "BASIC" ? "BASIC": "PROFESSIONAL"}/>
          </CardFooter>
        </Card>
      ))}



      <div>
        <Card className='flex flex-col w-full mx:auto'>
  <CardHeader>
    <div className='bg-[#0096C7] py-3 text-center rounded-t-xl'>
      <p className='font-semibold text-white'>Promoção exclusiva</p>
    </div>

    <CardTitle className='text-xl md:text-2xl'>
      Site Profissional
    </CardTitle>

    <CardDescription>
      <h5>Crie uma presença online completa para sua clínica!</h5>
      <p>Pagamento único de R$ 600 + R$ 59,90/mês</p>
    </CardDescription>

    <p className='mt-2'>
      No plano profissional você recebe um <strong>site exclusivo</strong>, totalmente personalizado com:
    </p>

    <ul className='mt-2 space-y-1'>
      <li>✔ Fotos da clínica e dos profissionais</li>
      <li>✔ História da clínica</li>
      <li>✔ Serviços oferecidos</li>
      <li>✔ Depoimentos de pacientes</li>
      <li>✔ Mapa de localização integrado</li>
      <li>✔ Botões de WhatsApp e redes sociais</li>
      <li>✔ Integração total com seu link de agendamento</li>
    </ul>
  </CardHeader>

  <CardContent>
    <p className='font-semibold mb-2'>O que está incluído?</p>
    <ul className='space-y-1'>
      <li>✔ Design exclusivo e moderno</li>
      <li>✔ Criado para gerar conversões</li>
      <li>✔ Otimizado para ranquear no Google</li>
      <li>✔ Estrutura ideal para anúncios e tráfego pago</li>
      <li>✔ Landing Page Profissional personalizada</li>
      <li>✔ Integração direta com sua agenda online</li>
    </ul>

    <div className='mt-4'>
      <p className='text-gray-600 line-through'>R$ 1.200,00</p>
      <p className='text-black text-2xl font-bold'>R$ 600,00</p>
    </div>
  </CardContent>

  <div className='px-6'>
    <h4 className='font-semibold mb-1'>Como funciona?</h4>
    <p>
      Após contratar, nossa equipe entra em contato para marcar uma reunião 
      ou você pode enviar tudo diretamente pelo WhatsApp.
      <br /><br />
      É só enviar fotos, textos, história da clínica, cores desejadas e qualquer detalhe importante — nós criamos tudo para você!
    </p>
  </div>

  <CardFooter className='flex flex-col gap-3'>
    <p>Seu site pronto, integrado ao sistema e otimizado para captar mais pacientes.</p>

    <Button>
      <a href="https://www.instagram.com/gestao_odonto_sistema/">
        Quero meu site
      </a>
    </Button>
  </CardFooter>
</Card>

       
      </div>
    </section>
  )
}