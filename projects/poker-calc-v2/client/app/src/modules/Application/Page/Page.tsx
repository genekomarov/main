import React, { useEffect } from "react";
import theme from '@/Common/themes/dark/theme.module.scss';

interface IState {
    panelCount: number;
    panelWidth: number;
    panelMargin: number;
    contentPading: number;
    contentMargin: number;
}

const state: IState = {
    panelCount: 3,
    panelWidth: 200,
    panelMargin: 5,
    contentPading: 15,
    contentMargin: 15
};

export default function Page(): React.ReactElement {

    const [widthRange] = React.useState<number[]>(calcWidthRange(state));

    return (
        <div className={theme.dark}
            style={{
                backgroundColor: 'var(--bgColor1)',
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center'
            }}
        >
            <WidthProvider>
                <FixedStepBlock widthRange={widthRange}>
                    <Content/>
                </FixedStepBlock>
            </WidthProvider>
        </div>
        
    );
}

function calcWidthRange(state: IState): number[] {
    const {panelCount, panelWidth, panelMargin, contentPading, contentMargin} = state;
    const range: number[] = [];
    for (let count = 1; count <= panelCount; count++) {
        range.push(panelWidth * count + panelMargin * count * 2 + (contentPading + contentMargin) * 2);
    }
    return range;
} 

export function WidthProvider(props: {
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

export function FixedStepBlock(props: {
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

export function Content(): React.ReactElement {
    return (
        <div
            style={{
                padding: '15px',
                margin: '15px',
                backgroundColor: 'var(--bgColor2)',
                borderRadius: 'var(--radius1)',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            <Panel />
            <Panel />
            <Panel />
        </div>
    );
}

export function Panel(): React.ReactElement {
    return (
        <div
            style={{
                width: '200px',
                aspectRatio: 1,
                backgroundColor: 'var(--bgColor1)',
                margin: '5px',
                flexShrink: 0
            }}
        />
    );
}
