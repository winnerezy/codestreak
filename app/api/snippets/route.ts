import { auth } from "@/auth";
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {

        const session = await auth()

        
        if(!session?.user){
            return NextResponse.redirect(new URL('/sign-in', req.url))
        }

        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email!
            }
        })

        const snippets = await prisma.snippet.findMany({
            where: {
                userId: user?.id!,
            }
        })

        return NextResponse.json(snippets)
        
    } catch (error: any) {
        return NextResponse.json(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}