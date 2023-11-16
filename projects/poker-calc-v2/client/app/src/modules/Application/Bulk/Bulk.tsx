import React from "react";

interface IProps {
    containerWidth: number;
    children: React.JSX.Element
}

export default function Bulk(props: IProps): React.JSX.Element {
    
    return (
        <div
            style={{
                width: "700px"
            }}
        >
            {React.cloneElement(props.children, {})}
        </div>
    );
}
