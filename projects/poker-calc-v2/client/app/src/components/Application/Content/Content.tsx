import React from "react";
import Panel from "components/Application/Panel/Panel";
import PanelOdds from "components/Application/PanelOdds/PanelOdds";

export default function Content(): React.ReactElement {
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
            <Panel><PanelOdds/></Panel>
            <Panel>panel 2</Panel>
            <Panel>panel 3</Panel>
        </div>
    );
}