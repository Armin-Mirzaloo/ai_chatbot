import ChatSection from "@/components/ChatSection";


export default async function ChatPage({params}) {
    const {chatId} = await params

    return (
        <div className="flex p-2">
            <ChatSection chatId={chatId}/>
        </div>
    )
}