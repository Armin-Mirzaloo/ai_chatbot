"use client";
import { useState } from "react";
import { ArrowUpCircle } from "lucide-react";

export const ChatSection = ({chatId}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  console.log(chatId, " is chatID")

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 shadow-md mb-3 w-fit max-w-xs"
            style={{ alignSelf: "flex-end" }}
          >
            {message}
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
                className="bg-black text-white p-2 rounded-full hover:bg-blue-700 transition shrink-0 flex items-center justify-center">
                <ArrowUpCircle className="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChatSection;