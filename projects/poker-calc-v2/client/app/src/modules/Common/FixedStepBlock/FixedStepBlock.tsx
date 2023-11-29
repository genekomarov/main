import React, {useEffect} from "react";

export default function FixedStepBlock(props: {
    children: React.ReactElement,
    availableWidth?: number,
    widthRange: number[]
}): React.ReactElement {
    const {children, availableWidth, widthRange} = props;

    const [currentWidth, setCurrentWidth] = React.useState<number>(0);
    useEffect(() => {
        const reversedWidthRange = [...widthRange].reverse();
        const width: number = reversedWidthRange.find((widthElement) => {
            return widthElement + 20 <= (availableWidth || 0);
        }) || widthRange[0];
        setCurrentWidth(width);
    }, [availableWidth, widthRange]);
    
    return (
        <div
            style={{width: `${currentWidth}px`}}
        >{children}</div>
    );
}