import HeaderLine from "@/components/HeaderLine";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import style from "@/styles/clientes.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";;
import 'react-toastify/dist/ReactToastify.css';
import { Grupo } from "@/api/GrupoService";

export default function Grupos() {
    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);
    
    // STATES
    const [formValues, setFormValues] = useState({ nome: "" });
    const [editId, setEditId] = useState();
    const [grupos, setGrupos] = useState([]);
    const [filteredList, setFilteredList] = useState();

    // QUERIES ALL GROUPS
    async function getAllGrupos() {
        const { data } = await Grupo.getAllGrupos();
        if (data) {
            setGrupos(data);
            setFilteredList(data);
        }
    }

    // POSTS A NEW GROUP
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await Grupo.createGroup(formValues);
        if (response && response.status === 201) {
            clearInputs();
            notifySuccess(response.data);
            getAllGrupos();
        } else {
            notifyFailure(response.data);
        }
    }

    // DELETE A GROUP
    const handleDelete = async (e) => {
        const confirmation = confirm('Você realmente deseja apagar esse grupo?');
        if (confirmation) {
            const id = e.target.closest('tr').getAttribute('data-cod');
            const response = await Grupo.deleteGroup(id);
            if (response && response.status === 201) {
                notifySuccess(response.data);
                getAllGrupos();
            } else {
                notifyFailure(response.data)
            }
        }
    }

    // FIELDS EDIT HANDLING
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

    // EDITS A GROUP IN DB
    async function submitEdit(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const id = editId;
        const response = await Grupo.editGroup(id, nome);
        if (response && response.status === 200) {
            notifySuccess(response.data);
            getAllGrupos();
            clearInputs();
        } else {
            notifyFailure(response.data);
        }
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';
        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";
    }

    // -------------------------------- AUX FUNCTIONS -------------------------------

    const handleClear = (e) => {
        e.preventDefault();

        clearInputs();
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const clearInputs = () => {
        const nomeInput = document.getElementById('nome');
        nomeInput.value = "";
    }

    useEffect(() => {
        getAllGrupos()
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Grupos</h3>
            <form className={style.formCtr}>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} id="nome" required placeholder="Nome de Grupos de Empresas" />
                </div>
                <button className={`${style.button} ${style.editButton}`} id="editButton" onClick={submitEdit} >Editar</button>
                <button className={style.button} id="adicionaCliente" onClick={handleSubmit}>Adicionar</button>
                <button className={style.button} onClick={handleClear} id="limpar">Limpar</button>
            </form>

            <HeaderLine name="Grupos" />
            <SearchFilter
                name="Grupo"
                list={grupos}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                param="nome"
            />
            <table className="table" id={style.smallTable}>
                <thead>
                    <tr>
                        <th>Grupo</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList?.map((destino) => (
                        <tr key={destino.nome} data-cod={destino.id}>
                            <td id={destino.id}>{destino.nome}</td>
                            <td name={destino.id} onClick={handleEdit}><img src="/images/edit.svg" /></td>
                            <td name={destino.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}