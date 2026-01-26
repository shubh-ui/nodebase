import { NodeType } from "@/generated/prisma/enums";

export const executorRegistry :Record<NodeType, unknown> = {
[NodeType.MANUAL_TRIGGER] : () => {},
[NodeType.HTTP_REQUEST] : () => {},
[NodeType.INITIAL] : () => {}
}


export const getExecutor = (type: NodeType) : unknown => {
    const executor = executorRegistry[type];
    if(!executor) {
        throw new Error(`No executor registry found for node type: ${type}`)
    }

    return executor;
}