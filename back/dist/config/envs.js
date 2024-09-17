"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
exports.DB_USER = process.env.DB_USER || 'postgres';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_NAME = process.env.DB_NAME || 'base_turnos';
