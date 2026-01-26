import { NodeType } from "@/generated/prisma/enums";

export const executorRegistry :Record<NodeType, unknown> = {
[NodeType.MANUAL_TRIGGER] : () => {},
[NodeType.HTTP_REQUEST] : () => {}
}