import { prisma } from "@/utils/prisma-client";
import { res } from "@/utils/route-handler-response";

export async function GET(req, { params }) {
  const { chatId } = await params;

  const checkConversation = await prisma.conversation.findFirst({
    where: {
      id: parseInt(chatId),
    },
    include: {
      messages: true,
    },
  });

  if (checkConversation) {
    return res.json(checkConversation);
  }

    return res.json({ error: "CONVERSATION_NOT_FOUND", message: "گفتگو یافت نشد" }, { status: 404 });
}

export async function DELETE(req,{params}){
    const { chatId } = await params;

    const deleteConversation = await prisma.conversation.delete({
        where:{
            id:parseInt(chatId)
        }
    })

    return res.json(deleteConversation)
}

export async function PUT(req) {
    const { conv_id, content, sender, created } = await req.json()

    const updateMessage = await prisma.messages.update({
        where: {
            created_conversation_id: {
                conversation_id: conv_id,
                created
            }
        },
        data: {
            content,
            sender,
        }
    })

    return res.json(updateMessage)
}