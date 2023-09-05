import { connection } from '../utils/connection';

export class Configuracao{

    static async getConfig(){
        try {
            const response = await connection.get('/configuracao');
            return response;
        } catch (error) {
            return error.response;
        }
    }
}
