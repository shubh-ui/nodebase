"use client";


import type { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: string;
    [key: string]: unknown;
}


type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
    const [diologOpen, setDialogOpen] = useState(false);
    const nodeData = props.data as HttpRequestNodeData;
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured";
    const nodeStatus = "success";

    const handleDialogOpen = () => setDialogOpen(true);


    return (
        <>
         <HttpRequestDialog 
            open={diologOpen} 
            onOpenChange={setDialogOpen}
            defaultEndpoint={nodeData.endpoint}
            defaultMethod={nodeData.method}
            onSubmit={() => {}}
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