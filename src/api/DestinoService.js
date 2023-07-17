import { connection } from "@/utils/connection";
import { getCookie } from "@/utils/cookie";

const token = getCookie('token');

export class Destino {

  // QUERY ALL DESTINATIONS IN DB
  static async getAllDestinos() {
    try {
      const response = await connection.get('/destinos', {
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

  // CREATE A NEW DESTINATION
  static async createNewDestino(formValues) {
    try {
      const response = await connection.post('/destinos', {
        nome: formValues.nome
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

  // DELETE A DESTINATION
  static async deleteDestino(destinationId) {
    try {
      const response = await connection.delete('/destinos', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: { id: destinationId }
      });

      return response;
    } catch (error) {
      return error.response;
    }
  }

  // EDIT A DESTINATION IN DB
  static async editDestino(destinationId, destinationName) {
    try {
      const response = await connection.put('/destinos', {
        id: destinationId,
        nome: destinationName
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
}