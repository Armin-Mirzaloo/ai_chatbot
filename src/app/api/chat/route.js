import { OllamaConnector } from "@/utils/ollama-connector";
import { prisma } from "@/utils/prisma-client";
import { res } from "@/utils/route-handler-response";

export async function POST(req) {
  const { user_id, content } = await req.json();

  const autoTitle =
    content.length > 30 ? content.slice(0, 30).trim() + "..." : content.trim();

  const { response } = await OllamaConnector(content);

  let cleanedResponse = response
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const createConversation = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      conversations: {
        create: {
          title: autoTitle,
          messages: {
            create: {
              content,
              sender: "USER",
            },
          },
        },
      },
    },
    select: {
      conversations: {
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          created: "desc",
        },
      },
    },
  });

  await prisma.conversation.update({
    where: {
      id: createConversation.conversations[0].id,
    },
    data: {
      messages: {
        create: {
          content: cleanedResponse,
          sender: "BOT",
        },
      },
    },
  });

  return res.json(createConversation);
}

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return res.json({ error: "UNAUTHORIZED" }, { status: 403 });
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      created: "desc",
    },
  });

  return res.json(conversations);
}