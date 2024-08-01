import React from "react";
import Card from 'comps/app/Card/Card';
import { ThemeContext } from "comps/app/Theme/Theme";

function CardSelector(): React.ReactElement {

    const theme = React.useContext(ThemeContext);

    const cards: boolean[][] = new Array(14).fill(new Array(4).fill(true));

    return (
        <div>
            CardSelector
            <div>
                {
                    cards.map((cardRow, cardRowIndex) => {
                        return <div className={theme.flex} key={cardRowIndex}>
                            {
                                cardRow.map((card, cardIndex) => {
                                    return <Card height={50} key={cardIndex}/>;
                                })
                            }
                        </div>;
                    })
                }
            </div>
        </div>
    );
}

export default CardSelector;