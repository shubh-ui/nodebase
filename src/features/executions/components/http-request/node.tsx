"use client";


import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { type FormType, HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
}


type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const [diologOpen, setDialogOpen] = useState(false);
    const { setNodes ,getNodes } = useReactFlow();
    const nodeData = props.data as HttpRequestNodeData;
    console.log({nodeData})
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured";
    const nodeStatus = "initial";

    const handleDialogOpen = () => setDialogOpen(true);
    const handleSubmit  = (values: FormType) => {
        console.log(values)
        setNodes((currNode) => currNode.map((node) => {
            if(node.id == props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body
                    }
                }
            }
            return node;
        }))
    }

    return (
        <>
         <HttpRequestDialog 
            open={diologOpen} 
            onOpenChange={setDialogOpen}
            defaultEndpoint={nodeData.endpoint}
            defaultMethod={nodeData.method}
            onSubmit={handleSubmit}
            defaultBody={nodeData.body} />
         <BaseExecutionNode 
          {...props}
          id={props.id}
          icon={GlobeIcon}
          description={description}
          status={nodeStatus}
          name="HTTP Request"
          onDoubleClick={handleDialogOpen}
          onSettings={handleDialogOpen}
         />
        </>
    )
});

HttpRequestNode.displayName = "HttpRequestNode";