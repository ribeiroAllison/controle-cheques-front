import ClientesHeader from "@/components/ClientesHeader"
import ClientesTable from "@/components/ClientesTable"
import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "../../utils/url"
import { useState, useEffect } from "react"

export default function Clientes() {

    const [formValues, setFormValues] = useState(
        {
            codigo: "",
            nome: "",
            doc:""
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch(`${baseURL}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                cod: formValues.codigo,
                nome:formValues.nome,
                doc: formValues.doc
            })
        })
        .then(response => response.json())
    }

    return(
        <>
            <Header />
            
            <h3 className={style.name}>Cadastro de Clientes</h3>
            <form className={style.formCtr}>
                
                <div className={style.inputCtr} id="codigo">
                    <h4>Código:</h4>
                    <input type="number" name="codigo" onChange={handleInputChange}/>
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} id="nome">
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange}/>
                </div>
                <div className={style.inputCtr} id="doc">
                    <h4>CPF/CNPJ:</h4>
                    <input type="number" name="doc" onChange={handleInputChange}/>
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} id="grupo">
                    <h4>Grupo:</h4>
                    <input type="text"/>
                </div>
                <button className={style.button} id="adionaCliente" onClick={handleSubmit}>Adicionar</button>

            </form>

            <ClientesHeader />
            <ClientesTable />

        </>
    )
}