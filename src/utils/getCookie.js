"use server"


import { cookies } from "next/headers"


export const getCookie = async(name) => {
    const cookie = (await cookies()).get(name)

    return cookie.value
}