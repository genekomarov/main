import React from "react";
import Card from "comps/app/Card/Card";

function Cards(): React.ReactElement {
    
    const flopCards = new Array(3).fill(true);
    const handCards = new Array(2).fill(true)

    return (
        <div>
            Cards
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                    {
                        flopCards.map((card, index) => {
                            return <Card key={index}/>;
                        })
                    }
                </div>
                <div>
                    <Card/>
                </div>
                <div>
                    <Card/>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                    {
                        handCards.map((card, index) => {
                            return <Card key={index}/>;
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Cards;