/** Делит числа или возвращает переданное значение */
export function calcPercentOrZero(dividend: number, divider: number, value: number): number {
    return divider ? dividend / divider * 100 : value;
}