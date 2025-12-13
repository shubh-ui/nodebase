import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";


export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialoOpen, setDialogOpen] = useState(false);

    const handleOpenSettings = () => setDialogOpen(true);
    return (
        <>
         <ManualTriggerDialog open={dialoOpen} onOpenChange={setDialogOpen}/>
         <BaseTriggerNode 
          {...props}
          icon={MousePointerIcon}
          name="When clicking 'Execute Workflow'"
        //   status={nodeStatus}
          onDoubleClick={handleOpenSettings}
          onSettings={handleOpenSettings}
         />
        </>
    )
})

ManualTriggerNode.displayName = "ManualTriggerNode"