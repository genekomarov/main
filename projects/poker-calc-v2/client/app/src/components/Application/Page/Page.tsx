import React from "react";
import theme from 'components/Common/themes/dark/theme.module.scss';
import WidthProvider from 'components/Common/WidthProvider/WidthProvider';
import FixedStepBlock from "components/Common/FixedStepBlock/FixedStepBlock";
import Content from "components/Application/Content/Content";

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
                alignItems: 'center',
                minWidth: '300px'
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