import React from "react";

interface IProps {
    height?: number;
}

const DEFAILT_HEIGHT = 60;

function Card(props: IProps): React.ReactElement {
    const {height} = props;
    return (
        <div style={{
            height: `${height ?? DEFAILT_HEIGHT}px`,
            aspectRatio: '2 / 3'
        }}>Card</div>
    );
}

export default Card;