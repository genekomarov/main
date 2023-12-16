import React from "react";
import {IOddItem} from 'interface/IOddItem';

interface IProps {
    items: IOddItem[][];
}

export default function Content(props: IProps): React.ReactElement {
    const {items} = props;

    return (
        <div style={{
            backgroundColor: 'white',
            display: 'grid',
            gridTemplateColumns: 'repeat(13, 1fr)',
            gridTemplateRows: 'repeat(13, 1fr)',
            gap: '1px'
        }}>
            {
                items.flat().map((item, index) => {
                    return <div
                        style={{
                            backgroundColor: 'lightblue',
                            fontSize: '6px'
                        }}
                        key={index}
                    >
                        {item.name}
                    </div>;
                })
            }
        </div>
    );
}
