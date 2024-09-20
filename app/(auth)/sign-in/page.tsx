import { signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGoogle } from 'react-icons/fa6'

const page = () => {
  return (
    <div className="w-[300px] h-[100px] px-4 border rounded-md flex flex-col gap-2 justify-center">
    <h4 className="text-center text-xl font-semibold">Sign In To CodeSnip</h4> 
   <form action={async () => {
    'use server'
    await signIn("github")
   }} 
   className='self-center'
   >
   <Button type="submit" className="gap-2"><FaGoogle/>Sign In WIth Github</Button>
   </form>
    </div>
  )
}

export default page