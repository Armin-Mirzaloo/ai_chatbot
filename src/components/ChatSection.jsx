"use client";
import { useEffect, useState } from "react";
import { ArrowUpCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { message } from "antd";
import { res } from "@/utils/route-handler-response";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";

export const ChatSection = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState("");
  const [loadMessages, setLoadMessages] = useState(false)
  const {user} = useAuth()
  const {setConversationsList} = useLayout()

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    if(chatId) {

      axios.post(`${BASE_URL}/chat/${chatId}/message`, {conversation_id:parseInt(chatId), sender:"USER", content:input})
      .then((res) => {console.log(res)
         setMessages(res.data.messages);
      })
      .catch((err) => {console.log(err)})

    } else {

      axios.post(`${BASE_URL}/chat`, {user_id:parseInt(user.id), title:"title1"})
      .then((res) => {console.log(res)
      //      setMessages(res.data.messages);
        setConversationsList(res.data.conversations)
      })
      .catch((err) => {console.log(err)})

    }



    setInput("");
  };

  // useEffect(() => {
  //   if (chatId) {
  //     axios
  //       .get(`${BASE_URL}/chat/${chatId}`)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data?.messages) {
  //           setMessages(res.data.messages.map((m) => m.content));
  //         }
  //       })
  //       .catch((err) => {
  //         const errorData = err.response?.data;
  //         console.log(errorData?.error);
          
  //         if (errorData?.error === "CONVERSATION_NOT_FOUND") {
  //           messageApi.error(errorData.message);
  //         } else {
  //           messageApi.error("خطایی در دریافت گفتگو رخ داد");
  //         }
  //       });
  //   }
  // }, [chatId]); 
  useEffect(() => {
  if (chatId && loadMessages === false && messages.length === 0) {
    //console.log("Fetch Messages")
    setLoadMessages(true)
    axios
      .get(`${BASE_URL}/chat/${chatId}`)
      .then((res) => {
        console.log(res);
        setMessages(res.data.messages);
        setLoadMessages(false)
      })
      .catch((err) => {
        if (err.response.data.error === "CONVERSATION_NOT_FOUND") {
          messageApi.error(err.response.data.message);
        }
        setLoadMessages(false)
        // console.log(err.response.data.error);
      })
  }
})

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {contextHolder}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 shadow-md mb-3 w-fit max-w-xs"
            style={{ alignSelf: "flex-end" }}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 bg-gray-100 px-4 py-3">
        <div className="flex items-center bg-gray-200 rounded-full px-3 py-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-right"
          />
          <button
            onClick={handleSendMessage}
            className="bg-black text-white p-2 rounded-full hover:bg-blue-700 transition shrink-0 flex items-center justify-center"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;