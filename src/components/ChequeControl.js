import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { clearInputs, linhas, transformDate, rearrangeDate } from "@/utils/utils"
import HeaderLine from "@/components/HeaderLine"
import ChequeTable from "./ChequeTable"
import ModalContact from "./ModalContact"
import ClientSearch from "./ClientSearch"
import { getCookie } from "@/utils/cookie"
import { Cheques } from "@/apiServices/ChequeService"
import { Cliente } from "@/apiServices/ClienteService"
import { Destino } from "@/apiServices/DestinoService"
import { Grupo } from "@/apiServices/GrupoService"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Vendedor } from "@/apiServices/VendedorService"


export default function ChequeControl(props) {
    const token = getCookie('token');

    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);


    // STATES DEFINITION
    const [formValues, setFormValues] = useState(
        {
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado: null,
            destino_id: props.destino || null,
            vencido: props.vencido || null,
            data_compen: null,
            pedido: null,
            grupo: null
        });
    const [editFormValues, setEditFormValues] = useState(
        {
            id: null,
            cliente: "",
            cliente_cod: null,
            número_cheque: null,
            valor: null,
            data_venc: null,
            compensado: null,
            vencido: null,
            destino_id: null,
            data_compen: null,
            data_destino: null,
            pedido: null
        });
    const [clientList, setClientList] = useState(null);
    const [allCheques, setAllCheques] = useState(null);
    const [searchResult, setSearchResult] = useState([{}]);
    const [destinoList, setDestinoList] = useState();
    const [chequesList, setChequeslist] = useState();
    const [frozenParams, setFrozenParams] = useState();
    const [grupos, setGrupos] = useState();
    const [estornos, setEstornos] = useState();
    const [semDestino, setSemDestino] = useState();
    const [aVencer, setAVencer] = useState();
    const [chequeId, setChequeId] = useState();
    const [obsDetails, setObsDetails] = useState({
        cliente: "",
        obs: "",
        num: ""
    });
    const [vendedorList, setVendedorList] = useState();
    const [contact, setContact] = useState();
    const [selected, setSelected] = useState([]);


    //------------------------------ HANDLING INPUTS -----------------------------------------------------------


    // HANDLE INPUTS FOR NEW CHECKS
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // HANDLE INPUTS FOR EDITING EXISTING CHECKS
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormValues({ ...editFormValues, [name]: value });
    };


    //------------------------------ CHEQUES FUNCTIONS -----------------------------------------------------------


    // RETRIEVE ALL CHECKS
    async function getAllCheques() {
        const { data } = await Cheques.getAllCheques();
        setAllCheques(data);
    }

    // CHECK DELETE HANDLING
    const handleDelete = async (id) => {
        const confirmation = confirm('Você realmente deseja apagar esse cheque?')
        if (confirmation) {
            const response = await Cheques.deleteCheck(id);
            if (response && response.status === 201) {
                notifySuccess(response.data);
                props.submitOnMount ? refreshTables() : refreshSearch();
            } else {
                notifyFailure(response.data);
            }
        }
    }

    // CHECK EDIT HANDLING

    const openMassEdit = () =>{
        const editWindow = document.getElementById('MassWindowBackground');
        editWindow.style.display = "flex";
    }

    const closeMassEdit = () =>{
        const editWindow = document.getElementById('MassWindowBackground');
        editWindow.style.display = "none";
    }


    const handleEdit = (cheque, param) => {
        const editWindow = document.getElementById(param);
        editWindow.style.display = "flex";

        const id = cheque.id;
        setChequeId(id);

        deleteEditClass();

        const selectRow = document.getElementsByName(id);
        for (let cell of selectRow) {
            cell.classList.add(`${style.editTrue}`);
        }

        const codCli = cheque.cod_cliente;
        const cliente = cheque.cliente;
        const numCheque = cheque.número_cheque;
        const pedido = cheque.pedido;
        const valor = cheque.valor.replace('$', 'R$').replace(',', 'x').replace('.', ',').replace('x', '.')
        const obs = cheque.obs;
        const data_vencDate = cheque.data_venc
        const data_vencString = data_vencDate && transformDate(data_vencDate);
        const data_venc = data_vencString ? rearrangeDate(data_vencString) : null;
        const linha = cheque.linha;
        const vendedor = cheque.vendedor;
        const destino = cheque.destino;
        const cliente_id = cheque.cliente_id

        const clienteInput = document.getElementById('editCliente');
        const numChequeInput = document.getElementById('editNumCheque');
        const valorInput = document.getElementById('editValor');
        const data_vencInput = document.getElementById('editDataVenc');
        const linhaInput = document.getElementById('editLinha');
        const dataCompInput = document.getElementById('data_compen')
        const pedidoInput = document.getElementById('editPedido')
        const obsInput = document.getElementById('editObsTextarea');

        const destinoInput = document.getElementById('editDestino');
        const options = destinoInput.options;
        for (let option of options) {
            if (option.innerHTML === destino) {
                option.selected = true;
                break;
            }
        }

        const vendedorInput = document.getElementById('editVendedor');
        const vendedorOptions = vendedorInput.options;
        for (let option of vendedorOptions) {
            if (option.innerHTML === vendedor) {
                option.selected = true;
                break;
            }
        }

        clienteInput.value = cliente;
        clienteInput.setAttribute('codCli', codCli);
        numChequeInput.value = numCheque;
        valorInput.value = valor;
        data_vencInput.value = data_venc;
        linhaInput.value = linha;
        pedidoInput.value = pedido;
        obsInput.value = obs;


        const dataCompDate = allCheques.find(cheque => cheque.id === Number(id))?.data_compen;
        const dataCompString = dataCompDate && transformDate(dataCompDate);
        const dataComp = dataCompString ? rearrangeDate(dataCompString) : null;
        dataCompInput.value = dataComp;

        setEditFormValues({
            ...editFormValues,
            cliente_cod: codCli,
            número_cheque: numCheque,
            valor: valor,
            data_venc: data_venc,
            linha: linha,
            data_compen: dataComp,
            destino_id: destinoInput.value,
            pedido: pedido,
            obs: obs,
            vendedor_id: vendedorInput.value,
            cliente_id: cliente_id
        })
    }

    // CHECK EDIT SUBMIT HANDLING
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const response = await Cheques.editCheck(editFormValues, chequeId)
        if (response && response.status === 200) {
            props.submitOnMount ? refreshTables() : refreshSearch();
            clearInputs('editInput');

            const editWindow = document.getElementById('editWindowBackground');
            editWindow.style.display = "none";
            const editRow = document.getElementById(`row${chequeId}`);
            if (editRow) {
                editRow.style.backgroundColor = "white";
            }
            deleteEditClass();
            notifySuccess(response.data);
        } else {
            notifyFailure(response.data);
        }
    }

    // SUBMIT MULTIPLE EDITS
    const hadleEditMassive = async (e) => {
        e.preventDefault();

        const form ={}
        const makeForm =() =>{
            if(editFormValues.destino_id){
                form.destino_id = editFormValues.destino_id
            };

            if(editFormValues.data_destino){
                form.data_destino = editFormValues.data_destino;
            };

            if(editFormValues.obs){
                form.obs = editFormValues.obs
            }
        }
    
        makeForm();

        for(let id of selected){
            const response = await Cheques.editMassCheck(form, id)
            if (response && response.status === 200) {
                props.submitOnMount ? refreshTables() : refreshSearch();
                clearInputs('editInput');
                document.getElementById('massEditObs').value = "";
                notifySuccess(response.data);
            } else {
                notifyFailure(response.data);
            }
        }

        const editWindow = document.getElementById('MassWindowBackground');
        editWindow.style.display = "none";
    }

    // CHECK SEARCH SUBMIT HANDLE
    const handleSearchSubmit = async (e) => {
        e?.preventDefault();
        const { data } = await Cheques.getSearchedCheques(formValues);
        if (data) {
            setChequeslist(data);
            clearInputs('input');
        }

        setFrozenParams({
            cliente: "",
            cliente_cod: formValues.cliente_cod,
            data_init: formValues.data_init,
            data_fim: formValues.data_fim,
            compensado: formValues.compensado,
            destino_id: formValues.destino_id,
            vencido: formValues.vencido,
            pedido: formValues.pedido,
            número_cheque: formValues.número_cheque,
            grupo: formValues.grupo
        })

        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado: null,
            destino_id: null,
            vencido: null,
            pedido: null,
            número_cheque: null,
            grupo: null
        })
    }

    // GET CHECKS ESTORNADOS
    const getEstornos = async () => {
        const { data } = await Cheques.getEstornos();
        setEstornos(data);
    }

    // GET CHECKS SEM DESTINO
    const getSemDestino = async () => {
        const { data } = await Cheques.getSemDestino();
        setSemDestino(data);
    }

    // GET CHECKS A VENCER
    const getAVencer = async () => {
        const { data } = await Cheques.getVencimentoProximo();
        setAVencer(data);
    }


    //------------------------------ CLIENTS FUNCTIONS -----------------------------------------------------------

    // CLIENT FUNCTIONS
    async function getAllClients() {
        const { data } = await Cliente.getAllClients();
        if (data) {
            setClientList(data);
        }
    }

    // SEARCH CLIENTS IN DB AS THE DATA IS TYPED IN THE FIELD
    const findClient = (formValues, id, targetField) => {
        if (clientList) {
            const foundClientByName = clientList.filter(client => client.cliente.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            document.getElementById(id).style.display = searchResult.length === 0 || document.getElementById(targetField) && !document.getElementById(targetField).value
                ? 'none'
                : 'block'
        }
    }

    // HANDLE CLICK ON CLIENTS SEARCH FIELD
    const handleClick = (e) => {
        setFormValues({ ...formValues, cliente_id: e.target.value })
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;
    }

    // HANDLE CLICK ON CLIENTS
    const handleEditClick = (e) => {
        setEditFormValues({ ...editFormValues, cliente_id: e.target.value })
        document.getElementById('searchBoxEdit').style.display = 'none';
        document.getElementById('editCliente').value = e.target.innerHTML;
    }

    //HANDLE CLICK ON CLIENT CONTACT
    const handleContactClick = (cheque) =>{

        const client = clientList.find(client => client.cod === cheque.cod_cliente)

        setContact({
            nome: client.cliente,
            contato: client.contato || "",
            telefone: client.telefone || "",
            email: client.email || ""
        })

        console.log(client)

        const editWindow = document.getElementById('contactWindowBackground');
        editWindow.style.display = "flex";
    }


    //------------------------------ USE EFFECTS  ----------------------------------------------------------------

    // INITIAL RENDER AND MOUNT
    useEffect(() => {
        getAllClients();
        getAllDestinos();
        getAllGrupos();
        getAllCheques();
        getAllVendedores();
        refreshTables();
    }, [])

    // RE-RENDER BASED ON CLIENT FIELD CHANGE
    useEffect(() => {
        findClient(formValues, "searchBox", 'cliente')
    }, [formValues.cliente])

    useEffect(() => {
        findClient(editFormValues, "searchBoxEdit", 'clienteEdit')
    }, [editFormValues.cliente])

    //------------------------------ OTHER TABLES FUNCTIONS  ----------------------------------------------------------------

    // DESTINO FUNCTIONS
    async function getAllDestinos() {
        const { data } = await Destino.getAllDestinos();
        if (data) {
            setDestinoList(data);
        }
    }

    // GROUP FUNCTIONS
    async function getAllGrupos() {
        const { data } = await Grupo.getAllGrupos();
        if (data) {
            setGrupos(data);
        }
    }

    // VENDEDOR FUNCTIONS
    async function getAllVendedores() {
        const { data } = await Vendedor.getAllVendedores();
        if (data) {
            setVendedorList(data);
        }
    }

    // EDIT SCREEN CLEAR HANDLE
    const handleClear = (e) => {
        e.preventDefault();
        clearInputs('input');
        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado: null,
            destino_id: null,
            vencido: null
        })
    }

    // EDIT SCREEN CLOSING HANDLE
    const handleCloseEdit = (e) => {
        e.preventDefault();
        clearInputs('editInput');

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        deleteEditClass();
    }


    //------------------------------ AUXILIARY FUNCTIONS -----------------------------------------------------------


    // ALTERS STYLE FROM ROW ELEMENTS
    const deleteEditClass = () => {
        const allTds = document.querySelectorAll('td, img');
        for (let td of allTds) {
            td.classList.remove(`${style.editTrue}`);
        }
    }

    // SEARCH REFRESHING HANDLE
    const refreshSearch = async () => {
        const searchParams = new URLSearchParams({
            cliente_cod: frozenParams.cliente_cod ? frozenParams.cliente_cod : '',
            data_init: frozenParams.data_init ? frozenParams.data_init : '',
            data_fim: frozenParams.data_fim ? frozenParams.data_fim : '',
            compensado: frozenParams.compensado ? frozenParams.compensado : '',
            destino_id: frozenParams.destino_id ? frozenParams.destino_id : '',
            vencido: frozenParams.vencido ? frozenParams.vencido : ''
        })

        const response = await fetch(`${baseURL}/cheques?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (response.ok) {
            let jsonResponse = await response.json();
            setChequeslist(jsonResponse);
        } else {
            console.error('Erro ao obter os cheques da API.');
        }
    }

    // AUX OVERFLOW FUNCTION
    const toggleOverflow = () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    };

    // GROUP FUNCTION GATHER DATA TO REFRESH TABLE FOR DASHBOARD
    const refreshTables = () => {
        getEstornos();
        getSemDestino();
        getAVencer();
    }


    //------------------------------ OBSERVATION FIELD FUNCTIONS ----------------------------------------------------

    // OBSERVATION SCREEN CLOSING
    const closeObs = () => {
        const module = document.getElementsByClassName('obsScreen')[0];
        toggleOverflow();
        module.style.display = "none";
    }

    // OBSERVATION SHOWING SCREEN HANDLING
    const handleOpenObs = (cheque) => {
        cheque &&
            setObsDetails({
                id: cheque.id,
                cliente: cheque.cliente,
                obs: cheque.obs,
                num: cheque.número_cheque
            })
        toggleOverflow();
        const module = document.getElementsByClassName('obsScreen')[0];
        module.style.display = "flex";
    }

    // OBSERVATION EDIT FIELD HANDLING
    const handleEditObs = async (e) => {
        e.preventDefault();
        const response = await Cheques.editObs(obsDetails.id, obsDetails.obs);
        if(response && response.status === 200){
            closeObs();
            props.submitOnMount ? refreshTables() : refreshSearch();
            notifySuccess(response.data);
        } else {
            notifyFailure(response.data);
        }
    }

    // OBSERVATION DELETE FIELD HANDLING
    const handleClearObs = async (e) => {
        e.preventDefault();
        const response = await Cheques.clearObs(obsDetails.id);
        if (response && response.status === 200) {
            closeObs();
            props.submitOnMount ? refreshTables() : refreshSearch();
            notifySuccess(response.data)
        } else {
            notifyFailure(response.data)
        }
    }

    //------------------------------ PAGE RENDERING ------------------------------------------------------------------
    return (
        <>
            <ToastContainer autoClose={2000} />
            {/* FILTER SCREEN */}
            <fieldset className={style.filterField} style={{ display: `${props.display}` }}>
                <legend id={style.mainLegend}>Opções de Filtros</legend>
                <form className={style.formCtr} id={style.clienteForm}>
                    <div className={style.filterCtr}>

                        <div className={style.inputCtrBox}>
                            <div className={style.inputCtr} >
                                <h4>Destino</h4>
                                <select name="destino_id" onChange={handleInputChange} placeholder="Selecione Vendedor" className={`${style.select} input`}>
                                    <option key="0"></option>
                                    {
                                        destinoList?.map(destino => <option key={`destino-${destino.id}`} value={destino.id}>{destino.nome}</option>)
                                    }
                                </select>
                            </div>

                            <div className={style.inputCtr} >
                                <h4>Grupo</h4>
                                <select name="grupo" onChange={handleInputChange} className={`${style.select} input`}>
                                    <option key="0"></option>
                                    {
                                        grupos?.map(grupo => <option key={`grupo-${grupo.id}`} value={grupo.nome}>{grupo.nome}</option>)
                                    }
                                </select>
                            </div>
                        </div>


                        <ClientSearch 
                            handleInputChange={handleInputChange}
                            searchResult={searchResult}
                            handleClick={handleClick}
                            id="cliente"
                            divId="searchBox"
                            
                        />
                    </div>

                    <div className={style.inputCtr}>
                        <div className={style.inputCtrBox}>
                            <div className={style.inputCtr}>
                                <h4>No. Pedido</h4>
                                <input type="text" name="pedido" onChange={handleInputChange} id="pedido" className="input" />
                            </div>

                            <div className={style.inputCtr}>
                                <h4>No. Cheque</h4>
                                <input type="text" name="número_cheque" onChange={handleInputChange} id="num" className="input" />
                            </div>
                        </div>

                        <div className={style.inputCtrBox}>
                            <fieldset className={`${style.formCtr} ${style.fieldset}`}>
                                <legend>Vencimento</legend>
                                <div className={style.inputCtr} >
                                    <h4>Data Inicial:</h4>
                                    <input type="date" name="data_init" onChange={handleInputChange} id="data_init" className="input" />
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Data Fim:</h4>
                                    <input type="date" name="data_fim" onChange={handleInputChange} id="data_fim" className="input" />
                                </div>
                            </fieldset>

                            <fieldset className={`${style.formCtr} ${style.fieldset}`}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensado:</h4>
                                    <select className={`${style.select} input`} name="compensado" id="compensado" onChange={handleInputChange} >
                                        <option value={null}></option>
                                        <option value={false}>Não</option>
                                        <option value={true}>Sim</option>
                                    </select>
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Vencido:</h4>
                                    <select className={`${style.select} input`} name="vencido" id="vencido" onChange={handleInputChange}>
                                        <option value={null}></option>
                                        <option value={false}>Não</option>
                                        <option value={true}>Sim</option>

                                    </select>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className={style.buttonCtr}>
                        <button type="submit" className={style.button} id="buscaCheque" onClick={handleSearchSubmit}>Buscar</button>
                        <button className={style.button} onClick={handleClear}>Limpar</button>
                    </div>
                </form>
            </fieldset>

            {/* EDIT SCREEN MODAL*/}

            <div id="editWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="editWindow">
                    <div className={style.popupHeader}>
                        <h2>Edição de Cheque</h2>
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
                    </div>

                    <form className={style.formCtr} id={style.editForm}>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >

                            <h4>No. Cheque</h4>
                            <input type="text" onChange={handleEditInputChange} name="número_cheque" className="editInput" id="editNumCheque" autoComplete="off" />

                            <ClientSearch 
                            handleInputChange={handleEditInputChange}
                            searchResult={searchResult}
                            handleClick={handleEditClick}
                            id="editCliente"
                            divId="searchBoxEdit"
                            
                        />
                            <h4>Valor</h4>
                            <input type="text" onChange={handleEditInputChange} name="valor" className="editInput" id="editValor"  autoComplete="off"/>

                            <h4>Pedido</h4>
                            <input type="number" onChange={handleEditInputChange} name="pedido" className="editInput" id="editPedido" autoComplete="off"/>
                        </div>

                        <div className={style.inputCtr}>
                            <h4>Vencimento</h4>
                            <input type="date" onChange={handleEditInputChange} name="data_venc" className="editInput" id="editDataVenc" />

                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleEditInputChange}  className={`${style.select} editInput`} id="editDestino">
                                <option key="0"></option>
                                {
                                    destinoList?.map(destino => <option key={`destinoList-${destino.id}`} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>

                            <h4>Vendedor</h4>
                            <select name="vendedor_id" onChange={handleEditInputChange} className={`${style.select} editInput`} id="editVendedor">
                                <option key="0"></option>
                                {
                                    vendedorList?.map(seller => <option key={`vendedorList-${seller.id}`} value={seller.id}>{seller.nome}</option>)
                                }
                            </select>

                            <h4>Data Entrega:</h4>
                            <input type="date" name="data_destino" onChange={handleEditInputChange} className="input" />
                        </div>

                        <div className={style.statusCtr}>
                            <fieldset className={style.formCtr}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensação:</h4>
                                    <input type="date" name="data_compen" onChange={handleEditInputChange} id="data_compen" className="input" />
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Linha:</h4>
                                    <select className={`${style.select} input`} name="linha" id="editLinha" onChange={handleEditInputChange}>
                                        <option></option>
                                        {
                                            linhas.map(linha => <option value={linha} key={linha}>{linha}</option>)
                                        }
                                    </select>
                                </div>
                            </fieldset>

                            <div className={style.inputCtr} id={style.editObs}>
                                <h4>Observação:</h4>
                                <textarea id="editObsTextarea" onChange={handleEditInputChange} name="obs"></textarea>
                            </div>
                        </div>

                        <div className={style.buttonCtr}>
                            <button type="submit" className={style.button} id="editaCheque" onClick={handleEditSubmit}>Salvar</button>
                        </div>
                    </form>
                </section>
            </div>

            
            {/* MASSIVE EDIT MODAL*/}

            <div id="MassWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="editWindow">
                    <div className={style.popupHeader}>
                        <h2>Edição MASSIVA</h2>
                        <img src="/images/x-icon.svg" onClick={closeMassEdit} />
                    </div>

                    <form className={style.formCtr} id={style.editForm}>

                        

                        <div className={style.inputCtr}>
                            
                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleEditInputChange}  className={`${style.select} editInput`} id="massDestino">
                                <option key="0"></option>
                                {
                                    destinoList?.map(destino => <option key={`destinoList-${destino.id}`} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>

                            <h4>Data Entrega:</h4>
                            <input type="date" name="data_destino" onChange={handleEditInputChange} className="editInput" id="massDelivery"/>
                        </div>

                        <div className={style.statusCtr}>
                            <div className={style.inputCtr} id={style.editObs}>
                                <h4>Observação:</h4>
                                <textarea id="massEditObs" onChange={handleEditInputChange} name="obs" className="ediInput"></textarea>
                            </div>
                        </div>

                        <div className={style.buttonCtr}>
                            <button  className={style.button} onClick={hadleEditMassive}>Salvar</button>
                        </div>
                    </form>
                </section>
            </div>

            {
                !props.submitOnMount &&
                <ChequeTable
                    list={chequesList}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleOpenObs={handleOpenObs}
                    handleContactClick={handleContactClick}
                    clientList={clientList}
                    selected={selected}
                    setSelected={setSelected}
                    openMassEdit={openMassEdit}
                />
            }

            {
                props.submitOnMount &&
                <>
                    <HeaderLine name="Estornos" />
                    <ChequeTable
                        list={estornos}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleOpenObs={handleOpenObs}
                        handleContactClick={handleContactClick}
                        clientList={clientList}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <HeaderLine name="Sem Destino" />
                    <ChequeTable
                        list={semDestino}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleOpenObs={handleOpenObs}
                        handleContactClick={handleContactClick}
                        clientList={clientList}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <HeaderLine name="A Vencer" />
                    <ChequeTable
                        list={aVencer}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleOpenObs={handleOpenObs}
                        handleContactClick={handleContactClick}
                        clientList={clientList}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </>
            }

            {/* OBS SCREEN MODAL */}
            <div id={style.obsBackground} className="obsScreen">
                <div id={style.obsCtr}>
                    <div className={style.popupHeader}>
                        <h4>{`Observação do Cheque ${obsDetails.num} do cliente ${obsDetails.cliente}`}</h4>
                        <img src="/images/x-icon.svg" onClick={closeObs} />
                    </div>
                    <div className={style.obsContent}>
                        <textarea value={obsDetails.obs} onChange={(e) => setObsDetails({ ...obsDetails, obs: e.target.value })}></textarea>
                    </div>

                    <div className={style.obsButtonCtr}>
                        <button type="submit" className={style.button} id="editObs" onClick={handleEditObs}>Salvar</button>
                        <button type="submit" className={style.button} id="deleteObs" onClick={handleClearObs}>Deletar</button>
                    </div>
                </div>
            </div>

            <ModalContact 
                contact={contact}
            />
        </>
    )
}