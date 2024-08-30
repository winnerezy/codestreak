import Dashboard from "@/components/Dashboard"
import { getCurrentUser } from "@/utils/actions"
const page = async () => {

  const user = await getCurrentUser()

  return (
    <section className="w-full flex flex-col h-[100vh-48px] gap-8">
      <h3 className="text-3xl font-semibold self-start mt-24 w-full">Welcome back, {user?.username}</h3>
     <Dashboard/>
    </section>
  )
}

export default page