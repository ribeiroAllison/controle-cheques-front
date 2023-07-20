import HeaderLine from "@/components/HeaderLine"
import Header from "@/components/Header"
import SearchFilter from "@/components/SearchFilter"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { Vendedor } from "@/api/VendedorService"
import { ToastContainer, toast } from "react-toastify";;
import 'react-toastify/dist/ReactToastify.css';


export default function Vendedores() {
    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);

    // STATE
    const [formValues, setFormValues] = useState({ nome: "" });
    const [vendedores, setVendedores] = useState();
    const [filteredList, setFilteredList] = useState();
    const [editId, setEditId] = useState();

    // HANDLE INPUT CHANGE
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // AUX CLEAR INPUT FUNCTION
    const clearInputs = () => {
        const nomeInput = document.getElementById('nome');
        nomeInput.value = "";
    }

    //QUERIES ALL SALESMEN IN DB
    async function getAllVendedores() {
        const { data } = await Vendedor.getAllVendedores();
        if (data) {
            setVendedores(data);
            setFilteredList(data);
        }
    }

    // POST
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await Vendedor.createVendedor(formValues);
        if (response && response.status === 200) {
            notifySuccess(response.data);
            getAllVendedores();
            clearInputs();
        } else {
            notifyFailure(response.data);
        }
    }

    // DELETE 
    const handleDelete = async (e) => {
        const confirmation = confirm('Você realmente quer apagar este vendedor?');
        if (confirmation) {
            const id = e.target.closest('tr').getAttribute('data-cod');
            const response = await Vendedor.deleteVendedor(id);
            if (response && response.status === 201) {
                getAllVendedores();
                notifySuccess(response.data);
            } else {
                notifyFailure(response.data)
            }
        }
    }

    // UPDATE SALESMEN IN DB
    const handleEdit = (e) => {
        const id = e.target.closest('tr').getAttribute('data-cod');
        setEditId(id);
        const nome = document.getElementById(id).innerHTML;

        const nomeInput = document.getElementById('nome');
        nomeInput.value = nome;
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'none';
        const editButton = document.getElementById('editButton');
        editButton.style.display = "block";
    }

    // CLEAR INPUT FIELDS
    const handleClear = (e) => {
        e.preventDefault();

        clearInputs();
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";
    }

    // EDIT SALESMEN IN DB
    async function submitEdit(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const id = editId;

        const response = await Vendedor.editVendedor(id, nome);
        console.log(response);
        if (response && response.status === 200) {
            getAllVendedores();
            clearInputs();
            notifySuccess(response.data);
            const addButton = document.getElementById('adicionaCliente');
            addButton.style.display = 'block';

            const editButton = document.getElementById('editButton');
            editButton.style.display = "none";
        } else {
            notifyFailure(response.data);
        }
    }

    useEffect(() => {
        getAllVendedores()
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Vendedores</h3>
            <form className={style.formCtr}>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} id="nome" required placeholder="Nome do Vendedor" />
                </div>
                <button className={`${style.button} ${style.editButton}`} id="editButton" onClick={submitEdit} >Editar</button>
                <button className={style.button} id="adicionaCliente" onClick={handleSubmit}>Adicionar</button>
                <button className={style.button} onClick={handleClear} id="limpar">Limpar</button>
            </form>

            <HeaderLine name="Vendedores" />
            <SearchFilter
                name="Vendedor"
                list={vendedores}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                param="nome"
            />

            <table className="table" id={style.smallTable}>
                <thead>
                    <tr>
                        <th>Vendedor</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList?.map((destino) => (
                            <tr key={destino.nome} data-cod={destino.id}>
                                <td id={destino.id}>{destino.nome}</td>
                                <td name={destino.id} onClick={handleEdit}><img src="/images/edit.svg" /></td>
                                <td name={destino.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}