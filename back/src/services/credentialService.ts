import CredentialDto from '../dto/CredentialDto';
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";

export const createCredential = async (credentialData: CredentialDto): Promise<Credential> => {
        const newCredential:Credential = await CredentialModel.create(credentialData);
        newCredential.login = false;
        await CredentialModel.save(newCredential);

        return newCredential;
};


export const authenticateUser = async (credentialData: CredentialDto): Promise<Credential | null> => {
    try {
        const credUser: Credential | null= await CredentialModel.findOne({
            where: {
                username: credentialData.username,
               
            },
        });
        
        if (credUser && credUser.password === credentialData.password) {
            return credUser; 
        }

        return null; 
    } catch (error) {
        console.error('Error al validar credenciales:', error);
        throw new Error('Error en el servidor');
    }
};


