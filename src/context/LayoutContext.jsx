"use client";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/config";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [conversationsList, setConversationsList] = useState([]);

  const refreshConversations = async (userId, token) => {
    if (!userId) return;
    try {
      const res = await axios.get(`${BASE_URL}/chat?user_id=${userId}`, {
        headers: { Authorization: token },
      });
      setConversationsList(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        loading,
        conversationsList,
        setLoading,
        setConversationsList,
        refreshConversations,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);