import Dashboard from "@/components/Dashboard"
import { prisma } from "@/utils/prisma"

const page = async () => {

  return (
    <div className="flex flex-col gap-4 p-2 w-full">

      <Dashboard/>
    </div>
  )
}

export default page