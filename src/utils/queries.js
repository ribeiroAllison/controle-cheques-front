

export async function getAllClients(setState) {
    try {
        const response = await fetch(`${baseURL}/clientes`);

        if (response.ok) {
            let jsonResponse = await response.json();
            setState(jsonResponse);
        }

    } catch (error) {
        console.log(error);
    }
}