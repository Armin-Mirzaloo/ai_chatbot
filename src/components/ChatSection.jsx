"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useLayout } from "@/context/LayoutContext";
import { useRouter } from "next/navigation";

export const ChatSection = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [input, setInput] = useState("");
  const [loadMessages, setLoadMessages] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user, token } = useAuth();
  const { refreshConversations } = useLayout();
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const formatTime = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (chatId && loadMessages === false) {
      setLoadMessages(true);
      axios
        .get(`${BASE_URL}/chat/${chatId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setMessages(res.data?.messages || []);
          setLoadMessages(false);
        })
        .catch((err) => {
          if (err.response?.data?.error === "CONVERSATION_NOT_FOUND") {
            messageApi.error(err.response.data.message);
          }
          setLoadMessages(false);
        });
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (input.trim() === "" || isGenerating) return;

    const userText = input;
    setInput("");

    if (chatId) {
      setMessages((prev) => [
        ...prev,
        { sender: "USER", content: userText, created: new Date().toISOString() },
      ]);
      setIsGenerating(true);

      axios
        .post(
          `${BASE_URL}/chat/${chatId}/message`,
          {
            conversation_id: parseInt(chatId),
            sender: "USER",
            content: userText,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (res.data?.messages) {
            setMessages(res.data.messages);
          }
        })
        .catch((err) => {
          console.error(err);
          messageApi.error("خطا در ارسال پیام");
        })
        .finally(() => {
          setIsGenerating(false);
        });
    } else {
      setIsGenerating(true);
      axios
        .post(
          `${BASE_URL}/chat`,
          {
            user_id: parseInt(user.id),
            content: userText,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          refreshConversations(user?.id, token);
          const newConvId = res.data.conversations[0]?.id;
          if (newConvId) {
            router.push(`/chat/${newConvId}`);
          }
        })
        .catch((err) => {
          console.error(err);
          messageApi.error("خطا در ساخت گفتگو");
          setIsGenerating(false);
        });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50/50 w-full relative">
      {contextHolder}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => {
          const isUser = msg.sender?.toUpperCase() === "USER";

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isUser ? "items-end" : "items-start"
              } w-full`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 shadow-sm border transition-all ${
                  isUser
                    ? "bg-white border-gray-100 text-gray-800 rounded-tr-none"
                    : "bg-[#EAFBF1] border-emerald-100 text-gray-900 rounded-tl-none"
                }`}
              >
                <div
                  className={`text-xs font-semibold mb-2 pb-1.5 border-b ${
                    isUser
                      ? "text-gray-400 border-gray-100 text-right"
                      : "text-emerald-700/80 border-emerald-200/50 text-left"
                  }`}
                >
                  {formatTime(msg.created)}
                </div>

                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex flex-col items-start w-full animate-pulse">
            <div className="bg-[#EAFBF1] border border-emerald-100 rounded-2xl rounded-tl-none p-4 max-w-sm flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-xs text-emerald-800 font-medium">
                در حال پردازش و تولید پاسخ...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-gray-300 transition">
          <input
            type="text"
            value={input}
            disabled={isGenerating}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-right text-gray-800 placeholder-gray-400 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={isGenerating}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:bg-gray-300 transition shrink-0 flex items-center justify-center cursor-pointer"
          >
            <ArrowUpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;