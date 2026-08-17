import { prisma } from "@/utils/prisma-client"
import { res } from "@/utils/route-handler-response"

export async function POST(req){

  const {user_id,title} = await req.json()

  const createConversation = await prisma.user.update({
    where:{
      id:user_id
    },
    data:{
      conversations:{
        create:{
          title,
        }
      }
    },
    select:{
        conversations:{
          select: {
            id: true,
            title: true,
          }
        }
    }
  })

  return res.json(createConversation)
}

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const user_id = searchParams.get("user_id")

  if (!user_id) {
    return res.json({ error: "UNAUTHORIZED" }, { status: 403 })
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      user_id: parseInt(user_id)
    },
    select: {
      id: true,
      title: true
    }
  })

  return res.json(conversations)
}
