import { OllamaConnector } from "@/utils/ollama-connector"
import { prisma } from "@/utils/prisma-client"
import { res } from "@/utils/route-handler-response"

export async function POST(req){

  const {conversation_id, content, sender} = await req.json()

  const {created_at, response} = await OllamaConnector(content)

  let cleanedResponse = response
  .replace(/<think>[\s\S]*?<\/think>/g, "")
  .replace(/\n{2,}/g, "\n")
  .trim();

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

  const createBotMessage = await prisma.conversation.update({
    where:{
      id: conversation_id
    },
    data:{
      messages:{
        create:{
          content: cleanedResponse,
          sender: "BOT",
        //  created: created_at
        }
      }
    },
    select:{
        messages:true
    }
  })

  return res.json(createBotMessage)
}