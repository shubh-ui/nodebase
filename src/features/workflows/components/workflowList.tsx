"use client"
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenceWorkflows } from "../hooks/use-workflows"

export const WorkflowList = () => {
    const workflows = useSuspenceWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>{JSON.stringify(workflows.data, null, 2)}</p>
        </div>
    )
}

export const WorkflowsHeader = ({disabled} : {disabled?: boolean}) => {
    const creatWorkflow = useCreateWorkflow();
    const handleCreateWorkflow = () => {
    creatWorkflow.mutate(undefined, {
        onError:(err) => { // <--- Handler 2 (The second one)
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

export const WorkflowsContainer = ({children} : {children: React.ReactNode}) => {
    return(
        <EntityContainer
         header={<WorkflowsHeader />}
         search={<></>}
         pagination={<></>}
          >
            {children}
        </EntityContainer>
    )
}