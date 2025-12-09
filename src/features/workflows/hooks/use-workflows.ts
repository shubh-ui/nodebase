import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowParams } from "./use-workflow-params";

export const useSuspenceWorkflows = () => {
    const trpc = useTRPC()
    const [params] = useWorkflowParams();
    console.log(params)

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [params] = useWorkflowParams();


    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess:(data) => {
                toast.success(`Workflow ${data.name} created successfully.`)
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions(params))
            },
            onError:(err) => {
                toast.error(`Failed to create workflow ${err.message}`)
            }
        })
    )
}


export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    
    return useMutation(
        trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" removed.`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id: data.id}));
        }
    })
    )

}