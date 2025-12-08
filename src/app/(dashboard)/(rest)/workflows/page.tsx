import { WorkflowList, WorkflowsContainer, WorkflowsLoading } from "@/features/workflows/components/workflowList";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireSession } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
    searchParams :  Promise<SearchParams>
}
const Page = async ({searchParams} : Props) => {
    await requireSession()
    const params = await workflowsParamsLoader(searchParams)
    await prefetchWorkflows(params);

    return (
        <WorkflowsContainer>
            <HydrateClient>
            <ErrorBoundary fallback={<p>Error!</p>}>
                <Suspense fallback={<WorkflowsLoading />}>
                    <WorkflowList />
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </WorkflowsContainer>
    )
}

export default Page;