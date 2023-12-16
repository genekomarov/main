import React from "react";
import Panel from "components/Application/Panel/Panel";
import PanelOdds from "components/Application/PanelOdds/PanelOdds";
import {useSelector} from 'react-redux';
import {IAppState} from 'rdx/store';
import {IState as IOddsTableState} from 'rdx/oddsTable/state';

export default function Content(): React.ReactElement {

    const oddsTableState = useSelector<IAppState, IOddsTableState>((store) => {
        return store.oddsTable;
    });
    const {items, rowNames} = oddsTableState;

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
            <Panel>
                <PanelOdds
                    rowNames={rowNames}
                    items={items}
                />
            </Panel>
            <Panel>panel 2</Panel>
            <Panel>panel 3</Panel>
        </div>
    );
}