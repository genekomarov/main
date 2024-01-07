"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const BaseSource_1 = __importDefault(require("../src/BaseSource"));
const BulkOperationsUnit_1 = __importDefault(require("../src/BulkOperationsUnit"));
describe('CheckEngine/CheckSource/BaseSource', () => {
    beforeEach(() => {
        firstUnit = new BulkOperationsUnit_1.default();
        secondUnit = new BulkOperationsUnit_1.default();
        baseSource = new BaseSource_1.default([firstUnit, secondUnit]);
    });
    let firstUnit;
    let secondUnit;
    let baseSource;
    it('test', () => {
        return;
    });
});
