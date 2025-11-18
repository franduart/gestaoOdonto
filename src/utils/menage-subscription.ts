import prisma from '@/lib/prisma'
import { Plan } from '@/generated/prisma'
import {stripe} from '@/utils/stripe'
import { revalidatePath } from 'next/cache'

/**
 * Salvar, atualizar e deletar informações das 
 * assinaturas (subscription) no banco de dados, sincronizando com a stripe
 * @async
 * @function menageSubscription
 * @param {string} subscriptionId
 * @param {string} customerId
 * @param {boolean} createAction
 * @param {Plan} [type]
 * @returns {Promise<Response|void>}
 */
export async function menageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: Plan
){
  
  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId
    }
  })

  if(!findUser){
    return Response.json({error: "falha ao realizar assinatura"}, {status: 400})
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC"
  }

  if(subscriptionId && deleteAction){
    await prisma.subscription.delete({
      where:{
        id: subscriptionId
      }
    })
    revalidatePath("/dashboard/plans")
    return
  }
  if(createAction){
    try{
      await prisma.subscription.create({
        data: subscriptionData
      })
    }catch(error){
      return {error: "erro ao salvar assinatura"}
    }
    
  }else{
    try{
      const findSubscription = await prisma.subscription.findFirst({
        where:{
          id: subscriptionId,
        }
      })
      if(!findSubscription) return;

    await prisma.subscription.update({
      where:{
        id: findSubscription.id
      },
      data:{
        status: subscription.status,
        priceId:subscription.items.data[0].price.id,
      }
    })


    }catch(err){
       return {error: "erro ao atualizar assinatura"}
    }
  }

} 