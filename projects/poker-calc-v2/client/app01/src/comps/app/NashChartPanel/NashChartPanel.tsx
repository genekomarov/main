import React from "react";
import NashOdd from "comps/app/NashOdd/NashOdd";

function NashChartPanel(): React.ReactElement {

    const items: boolean[][] = new Array(13).fill(new Array(13).fill(true));

    return (
        <div>
            NashChartPanel
            <div style={{
                width: '350px',
                height: '350px',
                display: 'grid',
                gridTemplateColumns: 'repeat(13, 1fr)',
                gridTemplateRows: 'repeat(13, 1fr)',
                gap: '1px'
            }}>
                {items.flat().map((item, index) => {
                    return <NashOdd key={index}/>;
                })}
            </div>
        </div>
    );
}

export default NashChartPanel;