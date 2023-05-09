import ClientesHeader from "@/components/ClientesHeader"
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

    //SUBMIT FUNCTIONS

    const clearInputs = () =>{

        const codInput = document.getElementById('codigo');
        const nomeInput = document.getElementById('nome');
        const docInput = document.getElementById('doc');
        const grupoInput = document.getElementById('grupo');

        codInput.value = "";
        nomeInput.value = "";
        docInput.value = "";
        grupoInput.value = "";
}

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
        .then(response => {
            if(response.ok){
                getAllClients();
            }
        }

        )
        .then(clearInputs())
        
    
        
    }

    //EDIT FUNCTIONS
    

    const handleEdit = (e) => {
        const cod = e.target.name;
        const nome = document.getElementById(`client${cod}`).innerHTML;
        const doc = document.getElementById(`doc${cod}`).innerHTML;
        const grup = document.getElementById(`grupo${cod}`).innerHTML;

        const codInput = document.getElementById('codigo');
        const nomeInput = document.getElementById('nome');
        const docInput = document.getElementById('doc');
        const grupoInput = document.getElementById('grupo');

        codInput.value = cod;
        nomeInput.value = nome;
        docInput.value = doc;
        grupoInput.value = grup;

        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'none';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "block";

        codInput.setAttribute('disabled', "disabled")


    }

    const handleClear = (e) =>{
        e.preventDefault();

        clearInputs();
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";
    }

    function getKeyByValue(object, value) {
        let correctObj;
        for(let obj of object){

            if(obj['nome'] === value){
                correctObj = obj;
            } 
            
        }
        const result = correctObj ? correctObj.id : null;
        return result;

        
    }

    async function submitEdit (e) {
        e.preventDefault();
        const grupoName = document.getElementById('grupo').value;

        const grupoId = getKeyByValue(grupo, grupoName);
        const cod = document.getElementById('codigo').value;
        const doc = document.getElementById('doc').value;
        const nome = document.getElementById('nome').value;


        fetch(`${baseURL}/clientes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                cod: cod,
                nome: nome,
                doc: doc,
                grupo_id: grupoId
            })
        })
        .then(response => {
            if(response.ok){
                getAllClients();
            }
        }

        )
        .then(clearInputs())
        .then(() =>{
            const addButton = document.getElementById('adicionaCliente');
            addButton.style.display = 'block';

            const editButton = document.getElementById('editButton');
            editButton.style.display = "none";

            const codInput = document.getElementById('codigo');
            codInput.removeAttribute('disabled');
        })
    }

    //TABLE FUNCTIONS

    const [clientList, setClientList] = useState('');

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

    useEffect(() => {
        getAllClients()
    },[])

    const handleDelete = (e) => {

        const cod = e.target.closest('tr').getAttribute('data-cod');
        

        fetch(`${baseURL}/clientes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cod: cod})
        })
        .then(response => {
            if(response.ok){
                getAllClients();
            }
        })
    
    }

    // GET FUNCTION

    const [grupo, setGrupo] = useState();

    async function getGrupos(){
        try{
            const response = await fetch(`${baseURL}/grupo`);
    
            if(response.ok){
                let jsonResponse = await response.json();
                setGrupo(jsonResponse);
            }
    
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getGrupos()
    }, []);

    return(
        <>
            <Header />
            
            <h3 className={style.name}>Cadastro de Clientes</h3>
            <form className={style.formCtr}>
                
                <div className={style.inputCtr} >
                    <h4>Código:</h4>
                    <input type="number" name="codigo" onChange={handleInputChange} id="codigo" required/>
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} id="nome" required/>
                </div>
                <div className={style.inputCtr} >
                    <h4>CPF/CNPJ:</h4>
                    <input type="text" name="doc" onChange={handleInputChange} id="doc" required/>
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Grupo:</h4>
                    
                    <select id="grupo">
                        <option></option>
                        {
                            grupo && grupo.map((emp) => {
                                return <option key={emp.id} data={emp.id}>{emp.nome}</option>
                            })
                        }
                    </select>
                </div>
                <button className={`${style.button} ${style.editButton}`} id="editButton" onClick={submitEdit}>Editar</button>
                <button className={style.button} id="adicionaCliente" onClick={handleSubmit}>Adicionar</button>
                <button className={style.button} id="limpar" onClick={handleClear}>Limpar</button>

            </form>

            <ClientesHeader />
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
                <tr key={client.cod} data-cod={client.cod}>
                    <td >{client.cod}</td>
                    <td id={`client${client.cod}`}>{client.cliente}</td>
                    <td id={`doc${client.cod}`}>{client.doc}</td>
                    <td id={`grupo${client.cod}`}>{client.grupo}</td>
                    <td> <img src="/images/edit.svg" onClick={handleEdit} name={client.cod}/></td>
                    <td> <img src="/images/trash-bin.svg" onClick={handleDelete}/></td>
                
                </tr>
            ))}
            </tbody>
        </table>

        </>
    )
}