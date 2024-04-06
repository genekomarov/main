import {IGameResult, getNashKeyByCards} from 'src/nash';
import {IDeal, ICard, TCardName} from 'src/deal';
import {TABLE_COUNT} from 'src/_oddsUtils/consts';
import pokerCalc from 'poker-calc';

/** Состояние игры по игракам */
interface IPlayerCardsMap {
    [playerId: string]: {
        cards: ICard[],
        isWin: boolean
    };
}

/** Провести одну игру */
export function game(deal: IDeal, desk: IDeal, playerCount: number): Partial<IGameResult> {
    deal.shuffle();
    const tableCardsLength = desk.length;
    if (tableCardsLength > TABLE_COUNT) {
        throw(new Error(`Количество карт на столе превышает ${TABLE_COUNT}`));
    }
    desk.push(deal.pullCount(TABLE_COUNT - tableCardsLength));
    const playerCardsMap: IPlayerCardsMap = {};
    for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
        playerCardsMap[String(playerIndex)] = {
            cards: deal.pullCount(2).cards,
            isWin: false
        };
    }
    const result = pokerCalc.getHoldemWinner({
        boardCards: desk.cardNames.map((cardName) => cardName.replace('T', '10') as TCardName),
        playerCards: Object.entries(playerCardsMap).map((entrie) => {
            const [playerId, value] = entrie;
            const cardObjects = value.cards;
            const isWin = value.isWin;
            return {
                playerId,
                cards: cardObjects.map((cardObject) => cardObject.toString().replace('T', '10') as TCardName),
                isWin
            };
        })
    }, {compactCards: true});
    result.forEach((winner) => {
        playerCardsMap[winner.playerId].isWin = true;
    });
    const gameResult: IGameResult = {} as IGameResult;
    Object.entries(playerCardsMap).forEach((entrie) => {
        const value = entrie[1];
        const {isWin, cards} = value;
        const nashKey = getNashKeyByCards(cards[0], cards[1]);
        if (!gameResult[nashKey]) {
            gameResult[nashKey] = {
                wins: 0,
                count: 0
            };
        }
        if (isWin) {
            gameResult[nashKey].wins ++;
        }
        gameResult[nashKey].count ++;
    });
    return gameResult;
}