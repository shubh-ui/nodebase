import { NodeExecutor } from "@/features/executions/types";

type HttpRequestData = Record<string, unknown>
export const httpRequestExecutor: NodeExecutor <HttpRequestData> = async ({
    nodeld,
    context,
    step
}) => {
    //TODO publish loading state for http request

    const result = await step.run("http-request", async() => context);

    //TODO publish 'success' state for manual 

    return result;
}