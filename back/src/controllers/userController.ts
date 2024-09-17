import { Request, Response } from "express";
import { createUserService, getUserService, getUserByIdService, loginService } from "../services/userService";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import CredentialDto from "../dto/CredentialDto";


export const createUser = async (req: Request, res: Response) => {
    const userData: UserDto = req.body;

    if (!userData.name || !userData.email || !userData.birthdate || !userData.nDni || !userData.username || !userData.password ) {
        return res.status(400).json({ message: 'Faltan datos requeridos para crear el usuario' });
    }
    
    try {
        const newUser: User = await createUserService(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUserService();
        res.json(users);
    } catch (error) {
        console.error('Error al encontrar usuarios:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user:User | null = await getUserByIdService(Number(id));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
        }

    } catch (error) {
        console.error(`Error al encontar usuario con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    
    try {
        const {username, password}:CredentialDto = req.body;
        const resultado  = await loginService({
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
        
    } catch (error) {
        console.error('Error en el controlador de login:', error);
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
};
