const baseURL = (path) => `https://viacep.com.br/ws/${path}/json/`;

const cache = new Map();

export async function fetchCEP(cep) {
  if (cache.has(cep)) {
    return cache.get(cep);
  }

  const response = await fetch(baseURL(cep));
  const data = await response.json();

  // Cache the result before returning it
  cache.set(cep, data);
  return data;
}
