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
exports.loginService = exports.createUserService = exports.getUserByIdService = exports.getUserService = void 0;
const data_source_1 = require("../config/data-source");
const credentialService_1 = require("./credentialService");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield data_source_1.UserModel.find({ relations: ["appointments"] });
        return users;
    }
    catch (error) {
        console.error('Error al encontrar usuarios:', error);
        throw new Error('Error en el servicio');
    }
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield data_source_1.UserModel.findOne({ where: { id },
            relations: ["appointments"] });
        //modificacion de await UserModel.findOneBy({id})
        return user || null;
    }
    catch (error) {
        console.error(`Error al encontrar usuario con id ${id}:`, error);
        throw new Error('Error en el servicio');
    }
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Crear las credenciales para el usuario
        const credentials = {
            username: userData.username,
            password: userData.password
        };
        const credentialsId = yield (0, credentialService_1.createCredential)(credentials);
        // Crear el nuevo usuario con el ID de las credenciales
        const newUser = yield data_source_1.UserModel.create({
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentialId: credentialsId.id // Asignar el ID de las credenciales
        });
        yield data_source_1.UserModel.save(newUser);
        return newUser;
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error en el servidor');
    }
});
exports.createUserService = createUserService;
const loginService = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Autenticar al usuario y obtener el Credential
        const crede = yield (0, credentialService_1.authenticateUser)(credentialData);
        if (crede) {
            // Buscar el usuario por el credentialId
            const user = yield data_source_1.UserModel.findOne({
                where: {
                    credentialId: crede.id
                },
                relations: ["credential"]
            });
            if (user) {
                crede.login = true;
                yield data_source_1.CredentialModel.save(crede);
                const resultado = {
                    login: crede.login,
                    user: user
                };
                return resultado;
            }
            else {
                throw new Error('Usuario no encontrado para las credenciales dadas');
            }
        }
        else {
            throw new Error('Autenticación fallida: Credenciales inválidas');
        }
    }
    catch (error) {
        console.error("Error al intentar hacer login:", error);
        throw new Error("Error al logearte: Credencial inválida");
    }
});
exports.loginService = loginService;
