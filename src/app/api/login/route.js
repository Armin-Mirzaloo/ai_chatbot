import { prisma } from "@/utils/prisma-client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"


export async function POST(req) {
    const {username,password} = await (req.json())

    const checkUser = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (!checkUser) {
        return NextResponse.json({error: "نام کاربری یافت نشد"},{status: 404})
    }

    console.log("Input Password:", password);
console.log("DB Stored Password:", checkUser.password);

    const isPasswordValid = await bcrypt.compare(password,checkUser.password)
    console.log("Password match result:", isPasswordValid)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "رمز عبور وارد شده اشتباه است" },
        { status: 401 }
      )
    }

    return NextResponse.json(checkUser)

}