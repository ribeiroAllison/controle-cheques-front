import style from "@/styles/clientes.module.css"
import { useState, useEffect } from "react";


export default function ClientSearchBox(props) {
    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = () => {
        if (props.clientList) {
            const foundClientByName = props.clientList.filter(client =>
                client.cliente.toLowerCase()
                    .includes(props.formValues.cliente?.toLowerCase()));
            setSearchResult(foundClientByName);

            document.getElementById('searchBox').style.display = searchResult.length === 0 || !document.getElementById('cliente').value
                ? 'none'
                : 'block'
        }
    }

    useEffect(() => {
        findClient()
    }, [props.formValues.cliente])


    return (
        <>
            <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                <h4>Cliente:</h4>
                <input type="text"
                    name="cliente"
                    onChange={props.handleInputChange}
                    id="cliente"
                    placeholder="Pesquise o Cliente"
                    className="input"
                    required={props.required}
                />
                <div className={style.searchBox} id="searchBox">
                    <select
                        size={4}
                        id={`${style.clienteSelect} input`}
                        onChange={props.handleInputChange}
                    >
                        {
                            searchResult.map(client => <option
                                onClick={props.handleClick}
                                key={client.cod}
                                value={client.cod}>
                                {client.cliente}
                            </option>)
                        }
                    </select>
                </div>
            </div>
        </>
    )
}