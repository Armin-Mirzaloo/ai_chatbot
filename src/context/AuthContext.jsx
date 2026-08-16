"use client"

import { getCookie } from "@/utils/getCookie"
import { tokenDecoder } from "@/utils/tokenDecoder"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUserInfo = async() => {
       const token = getCookie("token")
    if (token) {
      setUser(await tokenDecoder(token))
    }  

    }
    getUserInfo()
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)