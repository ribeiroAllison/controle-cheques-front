import { connection } from "@/utils/connection";

export class Tipo {

  // QUERY ALL DESTINATIONS IN DB
  static async getAllTipos() {
    try {
      const response = await connection.get('/tipos');
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // CREATE A NEW DESTINATION
  static async createNewTipo(formValues) {
    try {
      const response = await connection.post('/tipos', {
        nome: formValues.nome
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // DELETE A DESTINATION
  static async deleteTipo(destinationId) {
    try {
      const response = await connection.delete('/tipos', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { id: destinationId }
      });

      return response;
    } catch (error) {
      return error.response;
    }
  }

  // EDIT A DESTINATION IN DB
  static async editTipo(destinationId, destinationName) {
    try {
      const response = await connection.put('/tipos', {
        id: destinationId,
        nome: destinationName
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      return response;
    } catch (error) {
      return error.response;
    }
  }
}