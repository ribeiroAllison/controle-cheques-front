import { connection } from "@/utils/connection";

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
      const response = await connection.post("/assinaturas/assinatura-cartao", {
        user_id,
        plan_id,
        cardInfo,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static ativarAssinatura = async (sub_id) => {
    try {
      const response = await connection.put("/assinaturas/ativar", {
        sub_id,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static suspenderAssinatura = async (sub_id) => {
    try {
      const response = await connection.put("/assinaturas/suspender", {
        sub_id,
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static alterarAssinatura = async (sub_id, plan_id) => {
    try {
      const response = await connection.put("/assinaturas/alterar-assinatura", {
        sub_id,
        plan: {
          id: plan_id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  static alterarCartaoAssinante = async (user_id, card) => {
    try {
      const response = await connection.put("/assinaturas/alterar-cartao", {
        user_id,
        card
      })
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
}
