import { connection } from "@/utils/connection";
import { baseURL } from "@/utils/url";
import { headers } from "../../next.config";

export default class Assinatura {
  // USER CREATION
  static criarAssinaturaBoleto = async (user_id, plan_id) => {
    try {

      const response = await fetch(`${baseURL}/assinaturas/assinatura-boleto`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user_id,
          plan_id: plan_id
        })
      })
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
}
