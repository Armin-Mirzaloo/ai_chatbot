"use client"
const { createContext, useState, useContext } = require("react");

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [conversationsList, setConversationsList] = useState([]);

  return (
    <LayoutContext.Provider
      value={{ loading, conversationsList, setLoading, setConversationsList }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);