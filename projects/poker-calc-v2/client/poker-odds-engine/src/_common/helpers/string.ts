export function stringFromArray(array: string[], join?: string): string {
    return array.join(join ?? '');
}

export function genString(length: number, fill: string, join?: string): string {
    return new Array(length).fill(fill).join(join ?? '');
}

export function genSpaceString(length: number): string {
    return genString(length, ' ');
}