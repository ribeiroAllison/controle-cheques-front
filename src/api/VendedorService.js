import { connection } from "@/utils/connection";

export class Vendedor {
  static async getAllVendedores() {
    try {
      const response = await connection.get('/vendedores');
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async createVendedor(salesmen) {
    try {
      const response = await connection.post('/vendedores',
        {
          nome: salesmen.nome,
        })
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async deleteVendedor(id) {
    try {
      const response = await connection.delete('/vendedores', {
        data: { id: id }
      })
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async editVendedor(id, nome) {
    try {
      const response = await connection.put('/vendedores', {
        id: id,
        nome: nome
      })
      return response;
    } catch (error) {
      return error.response;
    }
  }
}