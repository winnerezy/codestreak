import { auth as middleware } from "@/auth"
import { NextResponse } from "next/server"

export default middleware((req) => {
    const protectedRoutes = ['/home', '/profile']
    if(!req.auth && protectedRoutes.includes(req.nextUrl.pathname)){
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    return NextResponse.next()
})