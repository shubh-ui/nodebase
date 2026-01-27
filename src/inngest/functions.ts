import prisma from "@/lib/db";
import { inngest } from "./client";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { NodeType } from "@/generated/prisma/enums";


export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflow/execute.workflow" },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId;
    const sortedNodes = await step.run("prepare workflow", async () => {
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

      return topologicalSort(workflow.nodes, workflow.connections);
    })

    let context = event.data.initialData || {};

    for(const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeld: node.id,
        context,
        step
      })
    }

    return { sortedNodes }
  },
);