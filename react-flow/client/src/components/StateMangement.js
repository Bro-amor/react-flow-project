import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";

import FlowSpace from "./FlowSpace";

const StateMangement = (props) => {
    return (
        <ReactFlowProvider>
            <FlowSpace groupInDir={props.groupInDir} componentNode={props.componentNode} />
        </ReactFlowProvider>
    );
};

export default StateMangement;