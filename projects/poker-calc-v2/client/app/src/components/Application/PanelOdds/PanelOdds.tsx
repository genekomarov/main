import React from "react";
import {IOddItem} from 'interface/IOddItem';
import Header from 'components/Application/PanelOdds/Header/Header';
import Content from 'components/Application/PanelOdds/Content/Content';

interface IProps {
    rowNames: string[];
    items: IOddItem[][];
}

export default function PanelOdds(props: IProps): React.ReactElement {
    const {items, rowNames} = props;

    return (
        <div
            style={{
                backgroundColor: 'gray',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 13fr 1fr',
                gridTemplateRows: '1fr 13fr 1fr',
                gap: '1px 1px'
            }}
        >

            <div style={{ backgroundColor: 'black' }} />

            <Header
                names={rowNames}
            />

            <div style={{ backgroundColor: 'black' }} />

            <Header
                names={rowNames}
                vertical={true}
            />

            <Content
                items={items}
            />

            <div style={{ backgroundColor: 'white' }} />

            <div style={{ backgroundColor: 'black' }} />

            <div style={{ backgroundColor: 'white' }} />

            <div style={{ backgroundColor: 'black' }} />
        </div>
    );
}