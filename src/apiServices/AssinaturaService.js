import { connection } from "@/utils/connection";
import { baseURL } from "@/utils/url";

export default class Assinatura {
  // USER CREATION
  static criarAssinaturaBoleto = async (user_id, plan_id, address) => {
    try {
      const response = await connection.post("/assinaturas/assinatura-boleto", {
        user_id,
        plan_id,
        address,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static criarAssinaturaCartao = async (user_id, plan_id, cardInfo) => {
    try {
      const response = await fetch(`${baseURL}/assinaturas/assinatura-cartao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          plan_id: plan_id,
          cardInfo: cardInfo,
        }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static cancelarAssinatura = async (plan_id) => {
    try {
      const response = await connection.put("/assinaturas/cancelamento", {
        plan_id,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}
