export default class Timer {

    /** Начало замера */
    private _startTime: number;
    /** Общее время */
    private _totalTime: number | null = null;

    constructor() {
        this._startTime = new Date().getTime();
    }

    stop(): number {
        return new Date().getTime() - this._startTime;
    }
}