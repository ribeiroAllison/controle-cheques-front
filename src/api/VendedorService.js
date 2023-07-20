import { connection } from "@/utils/connection";
import { getCookie } from "@/utils/cookie";

const token = getCookie('token');

export class Vendedor {
  static async getAllVendedores() {
    try {
      const response = await connection.get('/vendedores', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async deleteVendedor(id) {
    try {
      const response = await connection.delete('/vendedores', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
      } , {
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
}