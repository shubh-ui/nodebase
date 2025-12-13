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

/**
* Hook to fetch a single workflow using suspense
*/
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({
        id
    }));
}


export const useUpdateWorkflowName = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();


    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess:(data) => {
                toast.success(`Workflow ${data.name} updated successfully.`)
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}));
            },
            onError:(err) => {
                toast.error(`Failed to updated workflow ${err.message}`)
            }
        })
    )
}


export const useUpdateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();


    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess:(data) => {
                toast.success(`Workflow ${data.name} saved successfully.`)
                queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
                queryClient.invalidateQueries(trpc.workflows.getOne.queryOptions({id: data.id}));
            },
            onError:(err) => {
                toast.error(`Failed to save workflow ${err.message}`)
            }
        })
    )
}

//Time 10:53