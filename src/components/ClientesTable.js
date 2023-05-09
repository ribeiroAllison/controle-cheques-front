import { useEffect, useState } from "react"
import { baseURL } from "../../utils/url"




export default function ClientesTable(){
    const url = baseURL+"/clientes"

    const [clientList, setClientList] = useState('');

    async function getAllClients(){
    try{
        const response = await fetch(url);

        if(response.ok){
            let jsonResponse = await response.json();
            setClientList(jsonResponse);
        }

    } catch(error){
        console.log(error);
    }
}
    


    useEffect(() => {
        getAllClients()
    },[clientList])

    return(
        <>
        <table className="table">
            <thead>
            <tr>
                <th>Código do Cliente</th>
                <th>Nome</th>
                <th>CPF / CNPJ</th>
                <th>Grupo</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
            </thead>
            <tbody>
            {clientList && clientList.map((client) => (
                <tr key={client.cod}>
                    <td>{client.cod}</td>
                    <td>{client.cliente}</td>
                    <td>{client.doc}</td>
                    <td>{client.grupo}</td>
                    <td> <img src="/images/edit.svg" value={client.cod}/></td>
                    <td> <img src="/images/trash-bin.svg" value={client.cod}/></td>
                
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )
}