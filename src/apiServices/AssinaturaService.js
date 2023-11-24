import { connection } from "@/utils/connection";

export default class Assinatura {
  // USER CREATION
  static criarAssinaturaBoleto = async (user_id, plan_id) => {
    try {
      const response = await connection.post("/assinaturas/assinatura-boleto", {
        user_id,
        plan_id,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static editarEnderecoAssinante = async (user_id, address) => {
    try {
      const response = await connection.put("/assinantes/endereco", {
        user_id,
        address,
      });
      console.log("Resposta axios => ", response)
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}
