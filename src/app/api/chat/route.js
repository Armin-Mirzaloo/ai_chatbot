import { prisma } from "@/utils/prisma-client"
import { res } from "@/utils/route-handler-response"

export async function POST(req){

  const {userId,title} = await req.json()

  const createConversation = await prisma.user.update({
    where:{
      id:userId
    },
    data:{
      conversations:{
        create:{
          title,
        }
      }
    },
    select:{
        conversations:true
    }
  })

  return res.json(createConversation)
}