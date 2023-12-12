import React from "react";

export default function PanelOdds(): React.ReactElement {
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

            <div style={{ backgroundColor: 'white' }} />

            <div style={{ backgroundColor: 'black' }} />

            <div style={{ backgroundColor: 'white' }} />

            <div style={{
                backgroundColor: 'white',
                display: 'grid',
                gridTemplateColumns: 'repeat(13, 1fr)',
                gridTemplateRows: 'repeat(13, 1fr)',
                gap: '1px'
            }}
            >
                {new Array(169).fill(null).map((_, index) => {
                    return <div
                        style={{ backgroundColor: 'lightblue' }}
                        key={index}
                    />;
                })}
            </div>

            <div style={{ backgroundColor: 'white' }} />

            <div style={{ backgroundColor: 'black' }} />

            <div style={{ backgroundColor: 'white' }} />

            <div style={{ backgroundColor: 'black' }} />
        </div>
    );
}