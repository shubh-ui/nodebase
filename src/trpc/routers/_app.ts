import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getWorkflow: protectedProcedure
    .query(() => {
      return prisma?.workflow?.findMany();
    }),
    createWorkflow: protectedProcedure.mutation(async () => {
      await inngest.send({
        name:"test/hello.world",
        data:{
          email: "shubh@gmail.com"
        }
      })
      return prisma.workflow.create(
        {
          data : {name: "New workflow created"}
        }
      )
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;
