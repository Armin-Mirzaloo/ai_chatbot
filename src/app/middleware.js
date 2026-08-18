import { res } from "@/utils/route-handler-response"

export function middleware(req){

    const pathname = req.nextUrl.pathname
    const token = req.headers.get("Authorization")

    if(!token){
        return res.json({error:"UNAUTHORIZED",message:"برای ارسال پیام ابتدا وارد شوید!"},{status:401})
    }

    return res.next()
}

export const config = {
    matcher:"/api/chat/:path*"
}