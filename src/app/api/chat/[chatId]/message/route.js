import { prisma } from "@/utils/prisma-client"
import { res } from "@/utils/route-handler-response"

export async function POST(req){

  const {conversation_id, content, sender} = await req.json()

  const createMessage = await prisma.conversation.update({
    where:{
      id: conversation_id
    },
    data:{
      messages:{
        create:{
          content,
          sender,
        }
      }
    },
    select:{
        messages:true
    }
  })

  return res.json(createMessage)
}