"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const BaseSource_1 = __importDefault(require("../src/BaseSource"));
const BulkOperationsUnit_1 = __importDefault(require("../src/BulkOperationsUnit"));
// const set1 = [];
describe('CheckEngine/CheckSource/BaseSource', () => {
    describe('Один источник', () => {
        beforeEach(() => {
            firstUnit = new BulkOperationsUnit_1.default();
            baseSource = new BaseSource_1.default([firstUnit]);
        });
        let firstUnit;
        let baseSource;
        it('test', () => {
            // firstUnit.addBulk(set1, true);
        });
    });
});
