import UserDto from "../dto/UserDto";
import { CredentialModel, UserModel } from "../config/data-source";
import { createCredential, authenticateUser } from "./credentialService";
import { User } from "../entities/User";
import CredentialDto from "../dto/CredentialDto";
import { Credential } from "../entities/Credential";

export const getUserService = async (): Promise<User[]>=> {
    try {
        const users : User[] = await UserModel.find({ relations: ["appointments"] });
        return users;
    } catch (error) {
        console.error('Error al encontrar usuarios:', error);
        throw new Error('Error en el servicio');
    }
};  

export const getUserByIdService = async (id: number):Promise<User|null> => {
    try {
        const user: User | null  = await UserModel.findOne({  where: { id },
            relations: ["appointments"]});

            //modificacion de await UserModel.findOneBy({id})
        return user || null;
    } catch (error) {
        console.error(`Error al encontrar usuario con id ${id}:`, error);
        throw new Error('Error en el servicio');
    }
};

export const createUserService = async (userData: UserDto): Promise<User> => {
    try {
        // Crear las credenciales para el usuario
        const credentials = {
            username: userData.username,
            password: userData.password
        };
        const credentialsId = await createCredential(credentials);

        // Crear el nuevo usuario con el ID de las credenciales
        const newUser = await UserModel.create({
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni,
            credentialId: credentialsId.id // Asignar el ID de las credenciales
        });

        await UserModel.save(newUser);
        return newUser;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error en el servidor');
    }
};
    
export const loginService = async (credentialData: CredentialDto) => {
    try {
        // Autenticar al usuario y obtener el Credential
        const crede: Credential | null = await authenticateUser(credentialData);

        if (crede) {
            // Buscar el usuario por el credentialId
            const user = await UserModel.findOne({
                where: {
                    credentialId: crede.id
                },
                relations: ["credential"]
                
            }); 

            if (user) {
                crede.login = true;
                await CredentialModel.save(crede);

                const resultado = {
                    login: crede.login, 
                    user: user
                };

                return resultado;
            }else {
                throw new Error('Usuario no encontrado para las credenciales dadas');
            }
        } else {
            throw new Error('Autenticación fallida: Credenciales inválidas');

        }

        
    } catch (error) {
        console.error("Error al intentar hacer login:", error);
        throw new Error("Error al logearte: Credencial inválida");
    }
};


        


