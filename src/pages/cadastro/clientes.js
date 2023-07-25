import HeaderLine from "@/components/HeaderLine";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import style from "@/styles/clientes.module.css";
import { baseURL } from "@/utils/url";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import { getKeyByValue, showAddForm } from "@/utils/utils";
import { Cliente } from "@/api/ClienteService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalCadastro from "@/components/ModalCadastro";
import clearInputs from "@/utils/clearInputs";


export default function Clientes() {

    const token = getCookie('token');

    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);

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

    const [clientList, setClientList] = useState([]);
    const [filteredList, setFilteredList] = useState();
    const [grupo, setGrupo] = useState();


    // --------------------------------- CLIENTS FUNCTIONS ------------------------------------

    //GET ALL CLIENTS FROM DB
    const getAllClients = async () => {
        const { data } = await Cliente.getAllClients();
        if (data) {
            setClientList(data);
            setFilteredList(data);
        }
    }

    // ADDS A NEW CLIENT
    const createNewClient = async (e) => {
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

        const response = await Cliente.createClient(formValues, grupoId);
        if (response && response.status === 201) {
            clearInputs('input');
            getAllClients();
            notifySuccess(response.data);
        } else {
            notifyFailure(response.data)
        }

        const addForm = document.getElementById('addForm')
        addForm.style.display = "none"

        const addButton = document.getElementById('addButton')
        addButton.style.display = "block"
    }

    // EDITS CLIENT IN DB
    const submitEdit = async (e) => {
        e.preventDefault();

        const { codigo, doc, nome, status } = formValues
        const grupoName = formValues.grupo;

        const user = {
            grupoId: getKeyByValue(grupo, grupoName),
            cod: codigo,
            doc: doc,
            nome: nome,
            status: status,
        }

        const response = await Cliente.editClient(user);
        if (response && response.status === 200) {
            getAllClients();
            // clearInputs('input');
            notifySuccess(response.data);

            const addButton = document.getElementById('adicionaCliente');
            addButton.style.display = 'block';

            const editButton = document.getElementById('editButton');
            editButton.style.display = "none";

            const codInput = document.getElementById('codigo');
            codInput.removeAttribute('disabled');
        } else {
            notifyFailure(response.data);
        }

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

    }

    // DELETE CLIENT FUNCTION
    const handleDelete = async (e) => {
        const cod = e.target.closest('tr').getAttribute('data-cod');
        const confirmation = confirm('Você realmente quer apagar este cliente?');
        if (confirmation) {
            const response = await Cliente.deleteClient(cod);
            if (response && response.status === 201) {
                getAllClients();
                notifySuccess(response.data);
            } else {
                notifyFailure(response.data);
            }
        }
    };


    // QUERY FROM DB TO RETRIEVE CLIENTS SERIAL_ID
    const getAllSerialId = async () => {
        const { data } = await Cliente.getAllSerialId();
        if (data) {
            setClientSerialId(data);
        }
    }

    // --------------------------------- AUXILIARY FUNCTIONS ------------------------------------

    // HANDLE INPUT CHANGE IN CLIENT FORM
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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
            const editWindow = document.getElementById('editWindowBackground');
            editWindow.style.display = "flex";
        }
    }

    // CHANGES INPUT SECTION TO EDIT SECTION
    const handleClear = (e) => {
        e.preventDefault();
        clearInputs('input');

        setFormValues({
            codigo: "",
            nome: "",
            doc: "",
            status: "",
            grupo: "",
        })
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
                return error.response;
            }
        };
        fetchData();
    }, []);



    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <section>
                <h3 className={style.name}>Cadastro de Clientes</h3>

                <button className={`${style.button} addMarginLeft`} id="addButton" onClick={showAddForm}> Cadastrar Novo Cliente</button>

                <form className={style.formCtr} onSubmit={createNewClient} id="addForm">
                    <div className={style.inputCtr} >
                        <h4>Código:</h4>
                        <input type="text" name="codigo" className="input" onChange={handleInputChange} id="codigo" placeholder="Código do Cliente" />
                    </div>
                    <div className={`${style.nameCtr} ${style.inputCtr}`} >
                        <h4>Nome:</h4>
                        <input type="text" name="nome" className="input" onChange={handleInputChange} id="nome" required placeholder="Nome do Cliente" />
                    </div>
                    <div className={style.inputCtr} >
                        <h4>CPF/CNPJ:</h4>
                        <input type="text" name="doc" className="input" onChange={handleInputChange} id="doc" required placeholder="Digite CPF ou CNPJ" />
                    </div>
                    <div className={`${style.nameCtr} ${style.inputCtr}`} >
                        <h4>Grupo:</h4>
                        <select id="grupo" name="grupo" className={`${style.select} input`} onChange={handleInputChange}>
                            <option></option>
                            {grupo?.map((emp) => {
                                return (
                                    <option key={emp.id} value={emp.nome}>
                                        {emp.nome}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={style.inputCtr} >
                        <h4>Status:</h4>
                        <select className={`${style.select} input`} id="status" name="status" value={formValues.status} onChange={handleInputChange}>
                            <option></option>
                            <option>Bom</option>
                            <option>Médio</option>
                            <option>Ruim</option>
                        </select>
                    </div>
                    <button className={style.button} id="adicionaCliente" type="submit">Adicionar</button>
                    <button className={style.button} id="limpar" onClick={handleClear}>Limpar</button>
                </form>
            </section>
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

            <ModalCadastro
                name="Clientes"
                submitEdit={submitEdit}
                handleInputChange={handleInputChange}
                formValues={formValues}
                grupo={grupo}
                clearInputs={clearInputs}
            />
        </>
    )
}