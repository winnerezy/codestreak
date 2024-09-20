'use server'

import { auth } from "@/auth"
import { prisma } from "@/utils/prisma"
import { revalidatePath } from "next/cache"

export const saveSnippet = async (content: string, language: string) => {
    try {
        const session = await auth()

        if(!session) return
    
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email!
            }
        })
        await prisma.snippet.create({
            data: {
                content,
                language,
                userId: user?.id!
            }
        })
        revalidatePath('/home')
    } catch (error: any) {
        console.log(error.message)
    }
}