const baseURL = (path) => `https://viacep.com.br/ws/${path}/json/`;

export async function fetchCEP(cep) {
  try {
    const response = await fetch(baseURL(cep));
    if (!response.ok) {
      throw new Error(`Failed to fetch CEP. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching CEP: ${error.message}`);
    return error;
  }
}
