import { baseURL, token } from "@/utils/pagseguro";

class PagSeguroAPI {

    static criarAssinante = async (name, email, tax_id, phones, birth_date, billing_info) => {
        try{
            const response = await fetch(`${baseURL}/customers`, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    'authorization': token,
                },
                body:
                    JSON.stringify(
                        {
                            "name": name,
                            "email": email,
                            "tax_id": tax_id,
                            "phones": phones,
                            "birth_date": birth_date,
                            "billing_info": billing_info
                        }
                    )
            });
            
                const jsonResponse = await response.json();
                console.log(jsonResponse);
            
        } catch(error) { 
            console.error(error);
        }
    }

}

export default PagSeguroAPI;

