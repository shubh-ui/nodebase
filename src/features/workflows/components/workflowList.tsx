"use client"
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenceWorkflows } from "../hooks/use-workflows"
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "../hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const WorkflowList = () => {
    const workflows = useSuspenceWorkflows();
    return (
        <EntityList
            items={workflows.data.items}
            getKey={(workflows) => workflows.id}
            renderItem={(workflows) => <WorkflowItem data={workflows} />}
            emptyView={<WorkflowsEmpty />}
        />
    )
}

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowParams();
    const {searchValue, onSearchChnage} = useEntitySearch({params, setParams})
    return (
        <EntitySearch
        value={searchValue}
        onChange={onSearchChnage}
        placeholder="Search workflows"
        />
    )
}

export const WorkflowsHeader = ({disabled} : {disabled?: boolean}) => {
    const creatWorkflow = useCreateWorkflow();
    const router = useRouter();

    const handleCreateWorkflow = () => {
        creatWorkflow.mutate(undefined, {
        onSuccess: (data) => {
            router.push(`/workflows/${data.id}`);

        },
        onError: (err) => { // <--- Handler 2 (The second one)
                //Todo open upgrate modal
                console.log(err)
            }
        })
    }
    return (
        <>
         <EntityHeader 
            title="Workflows"
            description="Create and manage your workflows"
            onNew={handleCreateWorkflow}
            newButtonLable="New workflow"
            disabled={disabled}
            isCreating={creatWorkflow.isPending}
         />
        </>
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenceWorkflows();
    const [params, setParams] = useWorkflowParams();

    return (
        <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => setParams({...params, page})}
        />
    )
}

export const WorkflowsContainer = ({children} : {children: React.ReactNode}) => {
    return(
        <EntityContainer
         header={<WorkflowsHeader />}
         search={<WorkflowsSearch />}
         pagination={<WorkflowsPagination />}
          >
            {children}
        </EntityContainer>
    )
}

export const WorkflowsLoading = () => {
    return <LoadingView message="Loading workflows..." />
}


export const WorkflowsError = () => {
    return <ErrorView message="Error loading workflows..." />
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const router = useRouter();
    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                console.error(error)
               // handleError(error)
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            }
            })
}; 
    return <EmptyView message="No workflows found. Get started by creating your first workflow. " onNew={handleCreate} />
}


export const WorkflowItem = ({data} : {data: Workflow}) => {
    return (
        <EntityItem 
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={
                <>
                 Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})} {" "}
                 &bull; Created {" "} {formatDistanceToNow(data.createdAt, {addSuffix: true})}
                </>
            }
            image={
                <div className="size-8 flex items-center justify-center">
                    <WorkflowIcon className="size-5 text-muted-foreground" />
                </div>
            }
            onRemove={() => {}}
            isRemoving={false}
        />
    )
}