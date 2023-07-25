import { connection } from "@/utils/connection";

export class Cliente {

    // QUERY ALL CLIENTS
    static async getAllClients() {
        try {
            const response = await connection.get('/clientes');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // QUERY ALL SERIAL IDS
    static async getAllSerialId() {
        try {
            const response = await connection.get('/clientes_id');
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // CREATE RANDOM ID
    static async createRandomId(){
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let idArray = [];
        for(let i = 0 ; i < 5; i++){
            idArray.push(alphabet[Math.floor(Math.random() * alphabet.length)])
        }

        for(let i = 0 ; i < 5; i++){
            idArray.push(Math.floor(Math.random() * 10))
        }
        return idArray.join('');
    }

    // CREATE A CLIENT
    static async createClient(client, grupoId) {
        const randomId = await this.createRandomId();
        try {
            const response = await connection.post('/clientes', {
                cod: client.codigo || randomId,
                nome: client.nome,
                doc: client.doc,
                grupo_id: grupoId ? grupoId : null,
                status_pagador: client.status
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
                data: { cod: cod }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    // GET TOP TEN CLIENTS
    static async getTopTen() {
        try {
            const response = await connection.get('/clientes/top10');
            return response;
        } catch (error) {
            return error.response;
        }
    }
}