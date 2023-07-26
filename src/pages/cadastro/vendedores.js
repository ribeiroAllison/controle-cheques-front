import HeaderLine from "@/components/HeaderLine"
import Header from "@/components/Header"
import SearchFilter from "@/components/SearchFilter"
import style from "@/styles/clientes.module.css"
import { showAddForm } from "@/utils/utils"
import clearInputs from "@/utils/clearInputs"
import ModalName from "@/components/ModalName"
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
            clearInputs('input');
        } else {
            notifyFailure(response.data);
        }

        const addButton = document.getElementById('addButton')
        addButton.style.display = "block";

        const addForm = document.getElementById('addForm')
        addForm.style.display = "none";
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
        const id = e.target.name;
        setEditId(id);
        const vendedor = vendedores.find((vendedor) => vendedor.id === Number(id));

        if (vendedor) {
            const nome = vendedor.nome;

            setFormValues({
                ...formValues,
                nome: nome
            });

            const editWindow = document.getElementById('editWindowBackground');
            editWindow.style.display = "flex";

        }
    }
    

    // CLEAR INPUT FIELDS
    const handleClear = (e) => {
        e.preventDefault();

        clearInputs('input');
    }

    // EDIT SALESMEN IN DB
    async function submitEdit(e) {
        e.preventDefault();
        const nome = formValues.nome;
        const id = editId;

        const response = await Vendedor.editVendedor(id, nome);
        if (response && response.status === 200) {
            getAllVendedores();
            clearInputs('input');
            notifySuccess(response.data);

        } else {
            notifyFailure(response.data);
        }

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";
    }

    useEffect(() => {
        getAllVendedores()
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Vendedores</h3>

            <button className={`${style.button} addMarginLeft`} id="addButton" onClick={showAddForm}> Cadastrar Novo Vendedor</button>

            <form className={style.formCtr} id="addForm" onSubmit={handleSubmit}>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} id="nome" required placeholder="Nome do Vendedor" />
                </div>
                <button className={style.button} id="adicionaCliente">Adicionar</button>
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
                    {!filteredList ?  <tr><td colSpan={3} ><img id="loading"  src="/images/coins.svg"/></td></tr> :
                        filteredList?.map((vendedor) => (
                            <tr key={vendedor.nome} data-cod={vendedor.id}>
                                <td id={vendedor.id}>{vendedor.nome}</td>
                                <td onClick={handleEdit}><img src="/images/edit.svg" name={vendedor.id}/></td>
                                <td name={vendedor.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ModalName 
                name="Vendedores"
                submitEdit={submitEdit}
                handleInputChange={handleInputChange}
                formValues={formValues}
            />
        </>
    )
}