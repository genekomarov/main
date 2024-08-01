import React from "react";
import theme from 'comps/themes/light/theme.module.scss';
import Card from 'comps/app/Card/Card';

function CardSelector(): React.ReactElement {

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
                                    return <Card height={55} key={cardIndex}/>;
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