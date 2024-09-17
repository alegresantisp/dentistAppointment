"use strict";
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
exports.loginUser = exports.getUserById = exports.getUser = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if (!userData.name || !userData.email || !userData.birthdate || !userData.nDni || !userData.username || !userData.password) {
        return res.status(400).json({ message: 'Faltan datos requeridos para crear el usuario' });
    }
    try {
        const newUser = yield (0, userService_1.createUserService)(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUserService)();
        res.json(users);
    }
    catch (error) {
        console.error('Error al encontrar usuarios:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }
    }
    catch (error) {
        console.error(`Error al encontar usuario con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.getUserById = getUserById;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const resultado = yield (0, userService_1.loginService)({
            username, password
        });
        /*   if (resultado) {
              const { login, user } = resultado;
              return res.status(200).json({
                  message: 'Autenticación exitosa', login, user});
              
          } */
        //agrego esto de prueba:
        if (resultado) {
            const { login, user } = resultado;
            return res.status(200).json({
                message: 'Autenticación exitosa',
                userId: user.id,
                username: user.credential.username,
                login: login
            });
        }
    }
    catch (error) {
        console.error('Error en el controlador de login:', error);
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
});
exports.loginUser = loginUser;
