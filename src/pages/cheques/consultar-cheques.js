import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"

export default function ConsultarCheques() {

    const [formValues, setFormValues] = useState(
        {
            data_init: "",
            data_fim: "",
            vencido:"",
            compensado:"",
            cliente:"",
            grupo:""
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const [checkList, setCheckList] = useState('');

    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes`);

            if(response.ok){
                let jsonResponse = await response.json();
                setClientList(jsonResponse);
            }

        } catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <Header />
        </>
    )
}