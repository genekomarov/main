/** Делит числа или возвращает ноль */
export function calcPercentOrZero(dividend: number, divider: number): number {
    return divider ? dividend / divider * 100 : 0;
}