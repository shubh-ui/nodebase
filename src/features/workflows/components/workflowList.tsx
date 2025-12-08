"use client"
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenceWorkflows } from "../hooks/use-workflows"
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "../hooks/use-entity-search";

export const WorkflowList = () => {
    const workflows = useSuspenceWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>{JSON.stringify(workflows.data, null, 2)}</p>
        </div>
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