import { passwordHasher } from "@/utils/passwordHasher"
import { prisma } from "@/utils/prisma-client"
import { NextResponse } from "next/server"


export async function POST(req) {
    const {name,username,email,password} = await (req.json())

    const findUserByEmail = await prisma.user.findFirst({
        where: {
            email
        }
    })
    const findUserByUsername = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (findUserByEmail) {
       return NextResponse.json({error:"کاربر با ایمیل وارد شده تکراری است"}, {status: 400})
    }

    if (findUserByUsername) {
       return NextResponse.json({error:"کاربر با یوزرنیم وارد شده تکراری است"}, {status: 400})
    }

    const hashedPassword = await passwordHasher(password)

    const createNewUser = await prisma.user.create({
        data:{
            name,
            username,
            email,
            password: hashedPassword,
        }
    })

    return NextResponse.json(createNewUser)
}