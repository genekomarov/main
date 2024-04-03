import {genSpaceString, genString, stringFromArray} from 'src/common';
import {RUNKS} from 'src/deal';

/** Количество разделителей строк */
const ROW_SEP_COUNT = 0;
/** Количество разделителей столбцов */
const COLUMN_SEP_COUNT = 1;
/** Длина элементов аннотаций */
const ANNOTATION_ELEMENT_LENGTH = 2;

/** Номиналы карт по убыванию */
const REVERSED_RUNKS = [...RUNKS].reverse();

/** Преобразовать данные таблицы вероятностей к строке */
export function toString(chartData: string[][], elementSize: number): string {
    const rows: string[] = [];

    // Делаем верхнюю строку с аннотациями
    rows.push(getAnnotationRow(elementSize));

    // Делаем строки с данными
    rows.push(...REVERSED_RUNKS.map((runk, i) => {
        const prefix = runk + genSpaceString(COLUMN_SEP_COUNT + 1);
        const dataRows = chartData[i].map((element) => {

            // Обрабатываем отдельный элемент строки
            return genSpaceString(elementSize - element.length) + element;
        });

        // Навешиваем префикс строки
        return prefix + stringFromArray(dataRows, genSpaceString(COLUMN_SEP_COUNT));
    }));

    // Склеиваем все строки
    return stringFromArray(rows, '\n' + genString(ROW_SEP_COUNT, '\n'));
}

/** Сформировать строку с аннотациями */
function getAnnotationRow(elementLength: number): string {
    const prefix = 'o\\s' + genSpaceString(ANNOTATION_ELEMENT_LENGTH + COLUMN_SEP_COUNT - 3);
    const runks = REVERSED_RUNKS.map((runk) => {
        const resizedRunk = genSpaceString(elementLength - runk.length) + runk;
        return resizedRunk;
    });
    const data = stringFromArray(runks, genSpaceString(COLUMN_SEP_COUNT));
    return prefix + data;
}