import { connection } from "@/utils/connection";

export class Grupo {

  // QUERY ALL GROUPS IN DB
  static async getAllGrupos() {
    try {
      const response = await connection.get('/grupos');
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // CREATES A GROUP IN DB
  static async createGroup(formValues) {
    try {
      const response = await connection.post('/grupos',
        { nome: formValues.nome });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // DELETES A GROUP IN DB
  static async deleteGroup(groupId) {
    try {
      const response = await connection.delete('/grupos', {
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
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}