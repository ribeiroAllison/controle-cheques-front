import HeaderLine from "@/components/HeaderLine";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import style from "@/styles/clientes.module.css";
import { baseURL } from "@/utils/url";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import { getKeyByValue } from "@/utils/utils";
import { Cliente } from "@/api/ClienteService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Clientes() {

    const token = getCookie('token');

    const notifySuccess = () => toast.success("Cliente deletado com sucesso!");
    const notifyFailure = () => toast.error("Cliente tem cheques pendentes, e não pode ser deletado!");

    // STATES
    const [formValues, setFormValues] = useState(
        {
            codigo: "",
            nome: "",
            doc: "",
            status: "",
            grupo: ""
        }
    );
    const [clientSerialId, setClientSerialId] = useState();
    const [lastClientId, setLastClientId] = useState();
    const [clientList, setClientList] = useState([]);
    const [filteredList, setFilteredList] = useState();
    const [grupo, setGrupo] = useState();


    // --------------------------------- CLIENTS FUNCTIONS ------------------------------------

    //GET ALL CLIENTS FROM DB
    async function getAllClients() {
        const { data } = await Cliente.getAllClients();
        if (data) {
            setClientList(data);
            setFilteredList(data);
        }
    }

    // ADDS A NEW CLIENT
    const handleSubmit = async (e) => {
        e.preventDefault();
        const grupoName = document.getElementById('grupo').value;
        const grupoId = getKeyByValue(grupo, grupoName);
        const treatDoc = (client) => {
            return client.replace(/[^\d]+/g, '');
        }

        for (let client of clientList) {
            if (treatDoc(client.doc) === treatDoc(formValues.doc)) {
                alert(`Cliente com esse CPF/CNPJ já cadastrado com nome de ${client.cliente}`)
                clearInputs();
                return;
            }
        }

        await Cliente.createClient(formValues, lastClientId, grupoId).then(() => {
            clearInputs();
            getAllClients();
            findLastId();
            getAllSerialId();
        }).catch((error) => {
            console.log(error)
        })
    }

    // EDITS CLIENT IN DB
    async function submitEdit(e) {
        e.preventDefault();
        const grupoName = document.getElementById('grupo').value;

        const user = {
            grupoId: getKeyByValue(grupo, grupoName),
            cod: document.getElementById('codigo').value,
            doc: document.getElementById('doc').value,
            nome: document.getElementById('nome').value,
            status: document.getElementById('status').value,
        }

        await Cliente.editClient(user).then(() => {
            getAllClients();
            clearInputs()
            const addButton = document.getElementById('adicionaCliente');
            addButton.style.display = 'block';

            const editButton = document.getElementById('editButton');
            editButton.style.display = "none";

            const codInput = document.getElementById('codigo');
            codInput.removeAttribute('disabled');
        })
    }

    //DELETE CLIENT FUNCTION
    const handleDelete = async (e) => {
        const cod = e.target.closest('tr').getAttribute('data-cod');
        try {
            const confirmation = confirm('Você realmente quer apagar este cliente?');
            if (confirmation) {
                await Cliente.deleteClient(cod).then(() => {
                    notifySuccess();
                    getAllClients();
                }).catch(() => {
                    notifyFailure()
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // QUERY FROM DB TO RETRIEVE CLIENTS SERIAL_ID
    const getAllSerialId = async () => {
        const { data } = await Cliente.getAllSerialId();
        if (data) {
            setClientSerialId(data);
        }
    }

    // FIND LAST ID FROM CLIENT TABLE DB
    let serialList = [];

    const findLastId = () => {
        if (clientSerialId && Array.isArray(clientSerialId) && clientSerialId.length > 0) {
            for (let obj of clientSerialId) {
                if (obj.id && !isNaN(Number(obj.id))) {
                    serialList.push(Number(obj.id));
                }
            }
            if (serialList.length > 0) {
                setLastClientId(Math.max(...serialList));
            }
        }
    };


    // --------------------------------- AUXILIARY FUNCTIONS ------------------------------------

    // HANDLE INPUT CHANGE IN CLIENT FORM
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log('Novo item => ', formValues)
    };

    // GET GROUPS FUNCTION
    async function getGrupos() {
        try {
            const response = await fetch(`${baseURL}/grupo`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                let jsonResponse = await response.json();
                setGrupo(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // HANDLING EDITING FIELDS
    const handleEdit = (e) => {
        const cod = e.target.name;
        const client = clientList.find((client) => client.cod === cod);

        if (client) {
            const { cliente, doc, status, grupo } = client;

            setFormValues({
                ...formValues,
                codigo: cod,
                nome: cliente,
                doc: doc,
                status: status,
                grupo: grupo
            });

            const addButton = document.getElementById('adicionaCliente');
            addButton.style.display = 'none';

            const editButton = document.getElementById('editButton');
            editButton.style.display = "block";

            const codInput = document.getElementById('codigo');
            codInput.setAttribute('disabled', 'disabled');
        }
    }

    // CHANGES INPUT SECTION TO EDIT SECTION
    const handleClear = (e) => {
        e.preventDefault();
        clearInputs();
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";

        const codInput = document.getElementById('codigo');
        codInput.removeAttribute('disabled');

        setFormValues({
            codigo: "",
            nome: "",
            doc: "",
            status: "",
            grupo: "",
        })
    }

    // CLEAR CLIENTS FORM INPUTS
    const clearInputs = () => {
        const grupoInput = document.getElementById('grupo');
        grupoInput.value = "";

        setFormValues({
            codigo: "",
            nome: "",
            doc: "",
            status: "",
            grupo: ""
        });
    }


    // --------------------------------- USE EFFECTS ------------------------------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    getAllClients(),
                    getAllSerialId(),
                    getGrupos()
                ]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        findLastId();
    }, [clientSerialId])

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Clientes</h3>
            <form className={style.formCtr} onSubmit={handleSubmit}>
                <div className={style.inputCtr} >
                    <h4>Código:</h4>
                    <input type="text" name="codigo" onChange={handleInputChange} value={formValues.codigo} id="codigo" placeholder="Código do Cliente" />
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} value={formValues.nome} id="nome" required placeholder="Nome do Cliente" />
                </div>
                <div className={style.inputCtr} >
                    <h4>CPF/CNPJ:</h4>
                    <input type="text" name="doc" onChange={handleInputChange} value={formValues.doc} id="doc" required placeholder="Digite CPF ou CNPJ" />
                </div>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Grupo:</h4>
                    <select id="grupo" name="grupo" className={style.select} value={formValues.grupo} onChange={handleInputChange}>
                        <option></option>
                        {grupo?.map((emp) => {
                            return (
                                <option key={emp.id} value={emp.nome} selected={emp.nome === formValues.grupo}>
                                    {emp.nome}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={style.inputCtr} >
                    <h4>Status:</h4>
                    <select className={style.select} id="status" name="status" value={formValues.status} onChange={handleInputChange}>
                        <option></option>
                        <option>Bom</option>
                        <option>Médio</option>
                        <option>Ruim</option>
                    </select>
                </div>
                <button className={`${style.button} ${style.editButton}`} id="editButton" onClick={submitEdit}>Editar</button>
                <button className={style.button} id="adicionaCliente" type="submit">Adicionar</button>
                <button className={style.button} id="limpar" onClick={handleClear}>Limpar</button>
            </form>
            <HeaderLine name="Clientes" />
            <SearchFilter
                name="Cliente"
                list={clientList}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                param="cliente"
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>Código do Cliente</th>
                        <th>Nome</th>
                        <th>CPF / CNPJ</th>
                        <th>Grupo</th>
                        <th>Status</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList?.map((client) => (
                            <tr key={client.cod} data-cod={client.cod}>
                                <td >{client.cod}</td>
                                <td id={`client${client.cod}`}>{client.cliente}</td>
                                <td id={`doc${client.cod}`}>{client.doc}</td>
                                <td id={`grupo${client.cod}`}>{client.grupo}</td>
                                <td id={`status${client.cod}`} className={client.status}>{client.status}</td>
                                <td> <img src="/images/edit.svg" onClick={handleEdit} name={client.cod} /></td>
                                <td> <img src="/images/trash-bin.svg" onClick={handleDelete} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}