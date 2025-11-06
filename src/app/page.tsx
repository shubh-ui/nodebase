import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { caller } from "@/trpc/server";

const Page = async () => {
  const user = await caller.getUsers()
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <span>{JSON.stringify(user)}</span>
      <Button>Click me</Button>
    </div>
  )
}

export default Page;