import React from "react";

interface IProps {
    names: string[];
    vertical?: boolean;
}

export default function Header(props: IProps): React.ReactElement {
    const {names, vertical} = props;

    return (
        <div style={{
            backgroundColor: 'white',
            display: 'grid',
            gridTemplateColumns: !vertical ? 'repeat(13, 1fr)' : '',
            gridTemplateRows: vertical ? 'repeat(13, 1fr)' : '',
            gap: '1px'
        }}>
            {
                names.map((name, index) => {
                    return <div
                        style={{
                            fontSize: '8px'
                        }}
                        key={index}>
                        {name}
                    </div>;
                })
            }
        </div>
    );
}
