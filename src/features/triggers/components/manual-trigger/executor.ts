import { NodeExecutor } from "@/features/executions/types";

type ManulTriggerData = Record<string, unknown>
export const manualTriggerExecutor: NodeExecutor <ManulTriggerData> = async ({
    nodeld,
    context,
    step
}) => {
    //TODO publish loading state for manual trigger

    const result = await step.run("manual-trigger", async() => context);

    //TODO publish 'success' state for manual 

    return result;
}