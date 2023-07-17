import { connection } from "@/utils/connection";
import { getCookie } from "@/utils/cookie";

const token = getCookie('token');

export class Grupo {

  // QUERY ALL GROUPS IN DB
  static async getAllGrupos() {
    try {
      const response = await connection.get('/grupos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // CREATES A GROUP IN DB
  static async createGroup(formValues) {
    try {
      const response = await connection.post('/grupos',
        { nome: formValues.nome },
        {
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

  // DELETES A GROUP IN DB
  static async deleteGroup(groupId) {
    try {
      const response = await connection.delete('/grupos', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: { id: groupId }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // EDITS A GROUP IN DB
  static async editGroup(groupId, groupName) {
    try {
      const response = await connection.put('/grupos', {
        id: groupId,
        nome: groupName
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