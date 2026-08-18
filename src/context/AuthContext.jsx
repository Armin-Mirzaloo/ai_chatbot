"use client"

import { getCookie, removeCookie } from "@/utils/getCookie"
import { tokenDecoder } from "@/utils/tokenDecoder"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getUserInfo = async() => {
       const token = getCookie("token")
       setToken(token)
    if (token) {
      setUser(await tokenDecoder(token))
    }  

    }
    getUserInfo()
  }, [])

  const login = async (token) => {
    setUser(await tokenDecoder(token))
    router.push("/")
  }

  const logout = async () => {
    setUser(null)
    await removeCookie("token")
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)