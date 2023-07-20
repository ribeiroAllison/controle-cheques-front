import { getCookie } from '@/utils/cookie';
import { connection } from '../utils/connection';
import { isCompensado, isCompensadoVar, isVencido, isVencidoVar, transformValue } from '@/utils/utils';

const token = getCookie('token');

export class Cheques {

    // QUERY ALL CHEQUES
    static async getAllCheques() {
        try {
            const response = await connection.get('/cheques/all');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // QUERY CHEQUES ACCORDING TO SEARCH PARAMS
    static async getSearchedCheques(formValues) {
        try {
            const searchParams = new URLSearchParams({
                cliente_cod: formValues.cliente_cod ? formValues.cliente_cod : '',
                data_init: formValues.data_init ? formValues.data_init : '',
                data_fim: formValues.data_fim ? formValues.data_fim : '',
                compensado: formValues.compensado ? formValues.compensado : '',
                destino_id: formValues.destino_id ? formValues.destino_id : '',
                vencido: formValues.vencido ? formValues.vencido : '',
                pedido: formValues.pedido ? formValues.pedido : '',
                grupo: formValues.grupo ? formValues.grupo : '',
                número_cheque: formValues.número_cheque ? formValues.número_cheque : ''
            })

            const response = await connection.get(`/cheques?${searchParams.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // QUERY CHECKS WITH ISSUES
    static async getEstornos() {
        try {
            const response = await connection.get('/cheques/linha');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // QUERY CHECKS WITHOUT DESTINATION
    static async getSemDestino() {
        try {
            const response = await connection.get('/cheques/sem-destino');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // QUERY CHECKS WITH NEAR DUE DATE
    static async getVencimentoProximo() {
        try {
            const response = await connection.get('/cheques/a-vencer');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // CREATE ONE OR MORE CHECKS IN DB
    static async addNewCheck(formValues, qtdCheques) {
        try {
            let checksList = [];
            let responses = [];

            for (let i = 0; i < qtdCheques; i++) {
                const response = await connection.post('/cheques', {
                    num: formValues[`num${i}`],
                    valor: formValues[`valor${i}`].replace(',', '.'),
                    data_rec: formValues.data_rec,
                    tipo: formValues.tipo,
                    cliente_cod: formValues.cliente_cod,
                    pedido: formValues.pedido ? formValues.pedido : null,
                    linha: formValues[`linha${i}`] ? formValues[`linha${i}`] : null,
                    destino_id: formValues.destino_id ? formValues.destino_id : null,
                    terceiro: formValues.terceiro,
                    obs: formValues.obs ? formValues.obs : null,
                    vendedor_id: formValues.vendedor_id ? formValues.vendedor_id : null,
                    compensado: isCompensadoVar(formValues, 15, i),
                    vencido: isVencidoVar(formValues, 4, i),
                    data_venc: formValues[`data_venc${i}`] ? formValues[`data_venc${i}`] : null,
                    data_compen: formValues[`data_compen${i}`] ? formValues[`data_compen${i}`] : null,
                    data_destino: formValues.data_destino ? formValues.data_destino : null
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                responses.push(response);
                checksList.push(formValues[`num${i}`]);
            }
            return responses;
        } catch (error) {
            return error.response;
        }
    }

    // EDIT CHECK DATA
    static async editCheck(editFormValues, chequeId) {
        try {
            const response = await connection.put('/cheques', {
                id: chequeId,
                cliente: editFormValues.cliente_cod,
                numCheque: editFormValues.número_cheque,
                valor: transformValue(editFormValues.valor),
                data_venc: editFormValues.data_venc,
                compensado: isCompensado(editFormValues, 15),
                vencido: isVencido(editFormValues, 4),
                linha: editFormValues.linha,
                destino: editFormValues.destino_id,
                obs: editFormValues.obs,
                data_compen: editFormValues.data_compen,
                pedido: editFormValues.pedido
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // DELETE A CHECK IN DB
    static async deleteCheck(chequeId) {
        try {
            const response = await connection.delete('/cheques', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: { id: chequeId }
            })

            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async clearObs(id) {
        try {
            const response = await connection.put('/cheques/obs', {
                id: id,
                obs: null
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async editObs(id, obs) {
        try {
            const response = await connection.put('/cheques/obs', {
                id: id,
                obs: obs
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}