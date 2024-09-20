import { auth as middleware } from "./auth"
import { NextResponse } from "next/server"

export default middleware(async (req) => {
    const protectedRoutes = ['/home']
    if(!req.auth && protectedRoutes.includes(req.nextUrl.pathname)){
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()

 
})