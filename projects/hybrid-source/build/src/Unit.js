"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const StructureElement_1 = __importStar(require("./StructureElement"));
/** Класс для работы с разбитой по родителям структурой */
class Unit {
    constructor() {
        this._structure = {};
    }
    /** Добавление элементов */
    add(params) {
        var _a;
        const { parent, items, reSort } = params;
        this._initNode(parent);
        (_a = this._getNode(parent)) === null || _a === void 0 ? void 0 : _a.add(items, reSort);
    }
    /** Произвольное чтение */
    get(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { parent, limit, offset } = params;
            return (_b = (_a = this._getNode(parent)) === null || _a === void 0 ? void 0 : _a.get(limit, offset)) !== null && _b !== void 0 ? _b : null;
        });
    }
    /** Последовательное чтение */
    getNext(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { parent, limit, remove } = params;
            return (_b = (_a = this._getNode(parent)) === null || _a === void 0 ? void 0 : _a.getNext(limit, remove)) !== null && _b !== void 0 ? _b : null;
        });
    }
    /** Получить метаинформацию по следующему элементу */
    getNextMeta(parent) {
        if (this._hasNode(parent)) {
            const node = this._getNode(parent);
            if (node) {
                return node.getNextMeta();
            }
            else {
                return new StructureElement_1.Meta(false, null);
            }
        }
        else {
            return new StructureElement_1.Meta(true, null);
        }
    }
    _initNode(parent) {
        if (!this._hasNode(parent)) {
            this._structure[parent] = new StructureElement_1.default(parent);
        }
    }
    _hasNode(parent) {
        return this._structure.hasOwnProperty(parent);
    }
    _getNode(parent) {
        if (!this._hasNode(parent)) {
            return null;
        }
        return this._structure[parent];
    }
}
exports.default = Unit;
