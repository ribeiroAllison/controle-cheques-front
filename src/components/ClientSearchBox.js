import style from "@/styles/clientes.module.css"
import { useState, useEffect } from "react";


export default function ClientSearchBox (props) {
    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = () => {


        if(props.clientList){
            const foundClientByName = props.clientList.filter(client => client.cliente.toLowerCase().includes(props.formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || !document.getElementById('cliente').value ? document.getElementById('searchBox').style.display = 'none' : document.getElementById('searchBox').style.display = 'block'
            
        }

    }

    useEffect(() => {
        findClient()
    },[props.formValues.cliente])

    const handleClick = (e) =>{
        const clientCode = document.getElementById('cliente_cod')
        clientCode.value = e.target.value;
        props.setFormValues({...props.formValues, cliente_cod: clientCode.value})
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;

    }

    return(
        <>
            <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                <h4>Cliente:</h4>
                <input type="text" name="cliente" onChange={props.handleInputChange} id="cliente" placeholder="Pesquise o Cliente" className="input"/>
                <div className={style.searchBox} id="searchBox">
                    <select size={4} id={`${style.clienteSelect} input`} onChange={props.handleInputChange}>
                        {
                            searchResult.map(client => <option onClick={handleClick} key={client.cod} value={client.cod}>{client.cliente}</option>)
                        }
                    </select>
                </div>
            </div>
        </>
    )
}