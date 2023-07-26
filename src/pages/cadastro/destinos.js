import HeaderLine from "@/components/HeaderLine";
import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import style from "@/styles/clientes.module.css";
import { useState, useEffect } from "react"
import { Destino } from "@/api/DestinoService";
import { ToastContainer, toast } from "react-toastify";
import { showAddForm } from "@/utils/utils";
import clearInputs from "@/utils/clearInputs";
import 'react-toastify/dist/ReactToastify.css';
import ModalName from "@/components/ModalName";

export default function Destinos() {

    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);

    //STATES
    const [formValues, setFormValues] = useState({ nome: "" });
    const [destinos, setDestinos] = useState([]);
    const [filteredList, setFilteredList] = useState();
    const [editId, setEditId] = useState();


    // ----------------------------------- DESTINATION FUNCTIONS---------------------------------------

    // QUERY ALL DESTINATIONS IN DB
    async function getAllDestinos() {
        const { data } = await Destino.getAllDestinos();
        if (data) {
            setDestinos(data)
            setFilteredList(data)
        }
    }

    // CREATE A NEW DESTINATION
    const createDestination = async (e) => {
        e.preventDefault();
        const response = await Destino.createNewDestino(formValues);
        if (response && response.status === 201) {
            getAllDestinos();
            notifySuccess(response.data);
        } else {
            notifyFailure(response.data);
        }

        const addButton = document.getElementById('addButton')
        addButton.style.display = "block";

        const addForm = document.getElementById('addForm')
        addForm.style.display = "none";
    }

    // DELETE A DESTINATION 
    const handleDelete = async (e) => {
        const confirmation = confirm('Você realmente deseja apagar esse destino?')
        const id = e.target.closest('tr').getAttribute('data-cod');

        if (confirmation) {
            const response = await Destino.deleteDestino(id);
            if (response && response.status === 201) {
                getAllDestinos();
                notifySuccess(response.data);
            } else {
                notifyFailure(response.data);
            }
        }
    }

    // HANDLE INPUT EDIT DESTINATION
    const handleEdit = (e) => {
        const id = e.target.name;
        setEditId(id)
        const destino = destinos.find((destino) => destino.id === Number(id));

        if (destino) {
            const nome = destino.nome;

            setFormValues({
                ...formValues,
                nome: nome
            });

            const editWindow = document.getElementById('editWindowBackground');
            editWindow.style.display = "flex";

        }
    }

    // SUBMIT DESTINATIONS EDIT TO DB
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const nome = formValues.nome;
        const id = editId;
        
        const response = await Destino.editDestino(id, nome);
        if (response && response.status === 200) {
            getAllDestinos();
            clearInputs('input');
            notifySuccess(response.data);
        } else {
            notifyFailure(response.data);
        }

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        
    }


    // ----------------------------------- AUXILIARY FUNCTIONS ---------------------------------------

    // CLEAR INPUTS HANDLING
    const handleClear = (e) => {
        e.preventDefault();
        clearInputs('input');
    }

    // INPUT HANDLING
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    

 

    useEffect(() => {
        getAllDestinos();
    }, []);

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Header />
            <h3 className={style.name}>Cadastro de Destinos</h3>

            <button className={`${style.button} addMarginLeft`} id="addButton" onClick={showAddForm}> Cadastrar Novo Destino</button>

            <form className={style.formCtr} id="addForm" onSubmit={createDestination}>
                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input
                        type="text"
                        name="nome"
                        onChange={handleInputChange}
                        id="nome"
                        required
                        placeholder="Nome de Destinos de Cheques"
                    />
                </div>
                
                <button className={style.button} id="adicionaCliente" type="submit">Adicionar</button>
                <button className={style.button} onClick={handleClear} id="limpar">Limpar</button>
            </form>

            <HeaderLine name="Destinos" />
            <SearchFilter
                name="Destino"
                list={destinos}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                param="nome"
            />
            <table className="table" id={style.smallTable}>
                <thead>
                    <tr>
                        <th>Destino</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    { !filteredList ?  <tr><td colSpan={3} ><img id="loading"  src="/images/coins.svg"/></td></tr> :
                    
                        filteredList.map((destino) => (
                        <tr key={destino.nome} data-cod={destino.id}>
                            <td id={destino.id}>{destino.nome}</td>
                            <td  onClick={handleEdit}><img name={destino.id} src="/images/edit.svg" /></td>
                            <td name={destino.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalName 
                name="Destinos"
                submitEdit={handleSubmitEdit}
                handleInputChange={handleInputChange}
                formValues={formValues}
            />
        </>
    )
}