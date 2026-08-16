import { prisma } from "@/utils/prisma-client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "@/utils/config" 
import { cookies } from "next/headers"

export async function POST(req) {
    const { username, password } = await req.json()

    const checkUser = await prisma.user.findFirst({
        where: { username }
    })

    if (!checkUser) {
        return NextResponse.json({ error: "کاربری یافت نشد!" }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser.password)

    if (!isPasswordValid) {
        return NextResponse.json({ error: "رمزعبور اشتباه است!" }, { status: 401 })
    }

    const token = jwt.sign(
        { 
            id: checkUser.id, 
            username: checkUser.username, 
        },
        SECRET_KEY,
        { expiresIn: "24h" }
    )

    const user = {
        id: checkUser.id,
        username: checkUser.username,
        name: checkUser.name,
        token
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            tokens: {
                create: {
                    token,
                    device_id: "device"
                }
            }
        }
    })

    const cookieStore = await cookies()
    cookieStore.set("token", token)

    return NextResponse.json(user)
}