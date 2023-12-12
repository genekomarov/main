import React from "react";

export default function WidthProvider(props: {
    children: React.ReactElement
}): React.JSX.Element {
    const {children} = props;

    const ref = React.createRef<HTMLDivElement>();
    const [width, setWidth] = React.useState<number>(0);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
        });
        if (!ref.current) {
            return;
        }
        resizeObserver.observe(ref.current);
        return (): void => {
            if (!ref.current) {
                return;
            }
            resizeObserver.unobserve(ref.current);
        };
    }, [ref]);
    
    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            {React.cloneElement(children, {availableWidth: width})}
        </div>
    );
}