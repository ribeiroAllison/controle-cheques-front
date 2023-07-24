import HeaderLine from "@/components/HeaderLine";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import style from "@/styles/clientes.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";;
import clearInputs from "@/utils/clearInputs";
import { showAddForm } from "@/utils/utils";
import 'react-toastify/dist/ReactToastify.css';
import { Grupo } from "@/api/GrupoService";
import ModalName from "@/components/ModalName";

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
            clearInputs('input');
            notifySuccess(response.data);
            getAllGrupos();
        } else {
            notifyFailure(response.data);
        }

        const addButton = document.getElementById('addButton')
        addButton.style.display = "block";

        const addForm = document.getElementById('addForm')
        addForm.style.display = "none";
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
        const id = e.target.name;
        setEditId(id)
        const grupo = grupos.find((grupo) => grupo.id === Number(id));

        if (grupo) {
            const nome = grupo.nome;

            setFormValues({
                ...formValues,
                nome: nome
            });

            const editWindow = document.getElementById('editWindowBackground');
            editWindow.style.display = "flex";

        }
    }

    // EDITS A GROUP IN DB
    async function submitEdit(e) {
        e.preventDefault();
        const nome = formValues.nome;
        const id = editId;
        const response = await Grupo.editGroup(id, nome);
        if (response && response.status === 200) {
            notifySuccess(response.data);
            getAllGrupos();
            clearInputs('input');
        } else {
            notifyFailure(response.data);
        }

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";
    }

    // -------------------------------- AUX FUNCTIONS -------------------------------

    const handleClear = (e) => {
        e.preventDefault();

        clearInputs('input');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    useEffect(() => {
        getAllGrupos()
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Grupos</h3>

            <button className={`${style.button} addMarginLeft`} id="addButton" onClick={showAddForm}> Cadastrar Novo Grupo</button>

            <form className={style.formCtr} id="addForm">
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
                            <td  onClick={handleEdit}><img src="/images/edit.svg" name={destino.id} /></td>
                            <td name={destino.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalName 
                name="Grupos"
                submitEdit={submitEdit}
                handleInputChange={handleInputChange}
                formValues={formValues}
            />
        </>
    )
}