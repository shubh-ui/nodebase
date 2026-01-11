import prisma from "@/lib/db";
import { inngest } from "./client";
import { NonRetriableError } from "inngest";


export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflow/execute.workflow" },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId;
    const nodes = await step.run("prepare workflow", async () => {
      const workflow = await prisma.workflow.findUnique({
        where : {
          id: workflowId
        },
        include :{
          nodes: true,
          connections: true
        }
      })

      if(!workflow) {
        throw new NonRetriableError("Workflow not found.")
      }

      return workflow.nodes;
    })

    return { nodes }
  },
);