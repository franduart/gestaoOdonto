export type PlanDetailProps= {
  maxServices: number;
}

export type PlanProps = {
  BASIC: PlanDetailProps;
  PROFESSIONAL: PlanDetailProps;
}

export const PLANS : PlanProps = {
  BASIC:{
    maxServices: 50,
  },
  PROFESSIONAL: {
   maxServices: 100,
  }
}

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Basic",
    description: "Perfeito para clínicas menores",
    oldPrice: "R$ 79,90",
    price: "R$ 59,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      'Agenda online inteligente',
      'Link personalizado para agendamentos',
      '✔ Paciente marca sozinho dia e horário com 1 clique',
      '✔ Painel completo de agendamentos',
      '✔ Cadastro e gestão de serviços',
      '✔ Captação automática de leads',
      '✔ Painel financeiro com controle de pagamentos',
      '✔ Suporte prioritário',
      '✔ Agendamentos ilimitados',
      '✔ Perfil público no marketplace de clínicas',
      '✔ Dados salvos com segurança na nuvem',
      '✔ Suporte pelo WhatsApp',
      '✔ Cadastro completo da clínica (nome, endereço, CRO, foto, etc..)',
      '✔ 15 dias grátis – cancele quando quiser',
    ]
  }
]