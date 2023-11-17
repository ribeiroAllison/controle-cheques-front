import { baseURL, token } from "@/utils/pagseguro";

class PagSeguroAPI {
  static criarAssinante = async (
    name,
    email,
    tax_id,
    phones,
    birth_date,
    billing_info
  ) => {
    try {
      const response = await fetch(`${baseURL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          tax_id: tax_id,
          phones: phones,
          birth_date: birth_date,
          billing_info: billing_info,
        }),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  static editarAssinante = async (userData) => {
    try {
        const response = await fetch(`${baseURL}/customers`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            name: userData.name | null,
            email: userData.email | null,
            tax_id: userData.tax_id | null,
            phones: userData.phones | null,
            birth_date: userData.birth_date | null,
            billing_info: userData.billing_info | null,
          }),
        });
  
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } catch (error) {
        console.error(error);
      }
  }
}

export default PagSeguroAPI;
