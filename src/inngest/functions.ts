import { inngest } from "./client";


export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflow/execute.workflow" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment-Ai-call", "5s");
  },
);