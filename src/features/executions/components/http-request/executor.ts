import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { Options as KyOptions } from "ky";

type HttpRequestData = {
    variableName?: string;
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
}
export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
    data,
    nodeld,
    context,
    step
}) => {
    //TODO publish loading state for http request
    if (!data.endpoint) {
        //Todo publish the error state
        throw new NonRetriableError("HTTP Request node : No endpoint configured");
    }

    if (!data.variableName) {
        //Todo publish the error state
        throw new NonRetriableError("HTTP Request node : No Variable Name configured");
    }

    const result = await step.run("http-request", async () => {
        const endpoint = data.endpoint!;
        const method = data.method || "GET";
        const options: KyOptions = { method };

        if (['POST', 'PATCH', 'PUT'].includes(method)) {
            options.body = data.body;
            options.headers = {
                'ontent-type': 'application/json'
            }
        }

        const response = await ky(endpoint, options);
        const contentType = response.headers.get('content-type');
        const responseData = contentType?.includes('application/json') ? await response.json() : await response.text();

        const responsePayload = {
            httpResponse: {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            }
        }
        if (data.variableName) {
            return {
                ...context,
                [data.variableName]: responsePayload
            }
        }

        return {
            ...context,
            httpResponse: {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            }
        }

    });


    //TODO publish 'success' state for manual 

    return result;
}