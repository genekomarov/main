import React from "react";

interface IProps {
    children: React.ReactNode
}

export default function Panel(props: IProps): React.ReactElement {
    const {children} = props;
    return (
        <div
            style={{
                width: '200px',
                aspectRatio: 1,
                backgroundColor: 'var(--bgColor1)',
                margin: '5px',
                flexShrink: 0
            }}
        >
            {children}
        </div>
    );
}