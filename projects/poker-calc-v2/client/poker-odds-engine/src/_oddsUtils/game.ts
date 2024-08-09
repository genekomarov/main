import { IGameResult, getNashKeyByCards } from 'src/nash';
import { IDeal, ICard, TCardName } from 'src/deal';
import { TABLE_COUNT } from 'src/_oddsUtils/consts';
import { TCombKey } from 'src/nash';
import pokerCalc from 'poker-calc';

/** Состояние игры по игракам */
interface IPlayerCardsMap {
    [playerId: string]: {
        cards: ICard[],
        isWin: boolean,
        winningComb: TCombKey | null
    };
}

/** Параметры */
interface IGameParams {
    deal: IDeal;
    desk: IDeal;
    playerCount: number;
}

/** Провести одну игру */
export function game(params: IGameParams): Partial<IGameResult> {
    const { deal, desk, playerCount } = params;
    deal.shuffle();
    const tableCardsLength = desk.length;
    if (tableCardsLength > TABLE_COUNT) {
        throw (new Error(`Количество карт на столе превышает ${TABLE_COUNT}`));
    }
    desk.push(deal.pullCount(TABLE_COUNT - tableCardsLength));
    const playerCardsMap: IPlayerCardsMap = {};
    for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
        playerCardsMap[String(playerIndex)] = {
            cards: deal.pullCount(2).cards,
            isWin: false,
            winningComb: null
        };
    }
    const playerCards = Object.entries(playerCardsMap)
        .map((entrie) => {
            const [playerId, value] = entrie;
            const cardObjects = value.cards;
            return {
                playerId,
                cards: cardObjects.map((cardObject) => cardObject.toString().replace('T', '10') as TCardName)
            };
        });
    const result = pokerCalc.getHoldemWinner({
        boardCards: desk.cardNames.map((cardName) => cardName.replace('T', '10') as TCardName),
        playerCards
    }, { compactCards: true });
    result.forEach((winner) => {
        playerCardsMap[winner.playerId] = {
            ...playerCardsMap[winner.playerId],
            isWin: true,
            winningComb: winner.hand.handInfo.type
        };
    });
    const gameResult: IGameResult = {} as IGameResult;

    // TODO Не забыть накатить winningComb !!!
    Object.entries(playerCardsMap).forEach((entrie) => {
        const value = entrie[1];
        const { isWin, cards } = value;
        const nashKey = getNashKeyByCards(cards[0], cards[1]);
        if (!gameResult[nashKey]) {
            gameResult[nashKey] = {
                wins: 0,
                count: 0
            };
        }
        if (isWin) {
            gameResult[nashKey].wins++;
        }
        gameResult[nashKey].count++;
    });
    return gameResult;
}