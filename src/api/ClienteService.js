import { connection } from "@/utils/connection";
import { getCookie } from "@/utils/cookie";

const token = getCookie('token');

export class Cliente {

    // QUERY ALL CLIENTS
    static async getAllClients() {
        try {
            const response = await connection.get('/clientes', {
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

    // QUERY ALL SERIAL IDS
    static async getAllSerialId() {
        try {
            const response = await connection.get('/clientes_id', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // CREATE A NEW SERIAL ID
    static async createSerialId(lastClientId) {
        try {
            await connection.post('/clientes_id', {
                id: lastClientId + 1
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        } catch (error) {
            return error.response;
        }
    }

    // CREATE A CLIENT
    static async createClient(client, lastClientId, grupoId) {
        try {
            const response = await connection.post('/clientes', {
                cod: client.codigo || `IT${lastClientId}`,
                nome: client.nome,
                doc: client.doc,
                grupo_id: grupoId ? grupoId : null,
                status_pagador: client.status
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

    // EDIT A CLIENT
    static async editClient(client) {
        try {
            const response = await connection.put('/clientes', {
                cod: client.cod,
                nome: client.nome,
                doc: client.doc,
                grupo_id: client.grupoId,
                status_pagador: client.status
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

    // DELETE A CLIENT
    static async deleteClient(cod) {
        try {
            const response = await connection.delete('/clientes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: { cod: cod }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}