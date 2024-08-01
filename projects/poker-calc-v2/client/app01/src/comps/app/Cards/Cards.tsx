import React from "react";
import Card from "comps/app/Card/Card";
import { ThemeContext } from "comps/app/Theme/Theme";

function Cards(): React.ReactElement {

    const theme = React.useContext(ThemeContext);
    
    const flopCards = new Array(3).fill(true);
    const handCards = new Array(2).fill(true);

    return (
        <div>
            Cards
            <div className={theme.flex}>
                <div className={theme.flex}>
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
            <div className={theme.flex}>
                <div className={theme.flex}>
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