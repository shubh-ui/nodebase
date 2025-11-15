"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
// import { requireSession } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
// import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  // requireSession()
  const { data } = authClient.useSession();
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const {data: workflow} =  useQuery(trpc.getWorkflow.queryOptions());
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflow.queryOptions())
    }
  }))
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <div>.</div>
      <div className="flex flex-col gap-3">
      <span>{JSON.stringify(workflow)}</span>

      {<Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>}
    
      {data && <Button onClick={() => authClient.signOut()}>Logout</Button>}
      </div>
    </div>
  )
}

export default Page;