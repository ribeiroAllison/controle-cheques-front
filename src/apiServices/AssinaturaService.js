import { baseURL } from "@/utils/url";

export default class Assinatura {
  // USER CREATION
  static criarAssinaturaBoleto = async (user_id, plan_id) => {
    try {
      const response = await fetch(`${baseURL}/assinaturas/assinatura-boleto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          plan_id: plan_id,
        }),
      });
      const responseData = await response.json();
      return responseData;
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
          cardInfo: cardInfo
        }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }

  static editarEnderecoAssinante = async (user_id, address) => {
    try {
      const response = await fetch(`${baseURL}/usuarios/endereco`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          address: address,
        }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}
