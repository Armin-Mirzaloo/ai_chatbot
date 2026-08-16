"use server"


import { cookies } from "next/headers"


export const getCookie = async(name) => {
    const cookie = (await cookies()).get(name)
    if (cookie?.value){
        return cookie.value
    }
    return null
}

export const removeCookie = async(name) => {
    (await cookies()).delete(name)
}