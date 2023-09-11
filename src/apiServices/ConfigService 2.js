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

    static async createNewConfig(formValues){
        try{
            const response = await connection.post('/configuracao', {
                tolerancia_venc: Number(formValues.tolerancia_venc),
                tolerancia_comp: Number(formValues.tolerancia_comp),
            }, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            return response
        } catch(error){
            return error.response
        }
    }

    static async updateConfig(formValues){
        try{
            const response = await connection.put('/configuracao', {
                tolerancia_venc: Number(formValues.tolerancia_venc),
                tolerancia_comp: Number(formValues.tolerancia_comp),
            }, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            return response
        } catch(error){
            return error.response
        }
    }
}
