import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { clearInputs, linhas } from "@/utils/utils"
import ChequesHeader from "@/components/ChequesHeader"



export default function ConsultarCheques() {

    const [formValues, setFormValues] = useState(
        {
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado:null,
            destino_id:null,
            vencido:null
            
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

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
            destino_id: null

            
        }
    );

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormValues({ ...editFormValues, [name]: value });
    };
    

    const [clientList, setClientList] = useState('');

    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes/nomecod`);

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
        getAllDestinos()
    },[])

    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = (formValues, id, targetField) => {

        
        if(clientList){
            const foundClientByName = clientList.filter(client => client.nome.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || document.getElementById(targetField) && !document.getElementById(targetField).value ? document.getElementById(id).style.display = 'none' : document.getElementById(id).style.display = 'block'
            
        }

    }

    useEffect(() => {
        findClient(formValues, "searchBox", 'cliente')
    },[formValues.cliente])

    useEffect(() => {
        findClient(editFormValues, "searchBoxEdit", 'clienteEdit')
    },[editFormValues.cliente])


    const handleClick = (e) =>{
        setFormValues({...formValues, cliente_cod: e.target.value})
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;


    }

    const handleEditClick = (e) =>{
        setEditFormValues({...editFormValues, cliente_cod: e.target.value})
        document.getElementById('searchBoxEdit').style.display = 'none';
        document.getElementById('editCliente').value = e.target.innerHTML;

 
    }

    const [destinoList, setDestinoList] = useState();

    async function getAllDestinos(){
        try{
            const response = await fetch(`${baseURL}/destinos`)

            if(response.ok){
                let jsonResponse = await response.json();
                setDestinoList(jsonResponse);
            }

        }catch(error){
            console.log(error);

        }
    }   

    const [chequesList, setChequeslist] = useState();
    const [frozenParams, setFrozenParams] = useState(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchParams = new URLSearchParams({
                cliente_cod: formValues.cliente_cod ? formValues.cliente_cod : '',
                data_init: formValues.data_init ? formValues.data_init : '',
                data_fim: formValues.data_fim ? formValues.data_fim : '',
                compensado: formValues.compensado ? formValues.compensado : '',
                destino_id: formValues.destino_id ? formValues.destino_id : '',
                vencido: formValues.vencido ? formValues.vencido : ''
        })

        const response = await fetch(`${baseURL}/cheques?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        if(response.ok){
            let jsonResponse = await response.json();
            setChequeslist(jsonResponse);
            clearInputs('input');
                
        }  else {
            console.error('Erro ao obter os cheques da API.');
        }

        setFrozenParams({
            cliente: "",
            cliente_cod: formValues.cliente_cod,
            data_init: formValues.data_init,
            data_fim: formValues.data_fim,
            compensado: formValues.compensado,
            destino_id: formValues.destino_id,
            vencido: formValues.vencido
        }
            
        )

        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado:null,
            destino_id:null,
            vencido:null
        })
    }

    const handleClear = (e) => {
        e.preventDefault();
        clearInputs('input');
        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
            compensado:null,
            destino_id:null,
            vencido:null
        })
    }

    const handleCloseEdit = (e) => {

        e.preventDefault();
        clearInputs('editInput');

        const editWindow = document.getElementById('editWindow');
        editWindow.style.display = "none";

        const editRow = document.getElementById(`row${chequeId}`);
        editRow.style.backgroundColor = "white"
        
    }

    const transformDate = (data) =>{
        const date = new Date(data);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }

    const refreshSearch = async () =>{
    
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
                    'Content-Type': 'application/json'
                },
            })
            
            if(response.ok){
                let jsonResponse = await response.json();
                setChequeslist(jsonResponse);
                    
            }  else {
                console.error('Erro ao obter os cheques da API.');
            }
    
    }

    const handleDelete = async (id) =>{
        
        try{
            const response = await fetch(`${baseURL}/cheques`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }
            );

            if(response.ok){
                alert('Cheque removido com sucesso!')
            }
        } catch(error){
            alert('Erro:' + error.message)
        }

        refreshSearch()
    }

    const setBackgroundWhite = () => {
        const rows = document.getElementsByClassName('chequeRow');
        for(let row of rows){
            row.style.backgroundColor = "white";
        }
    }

    const [chequeId, setChequeId] = useState(); 

    const handleEdit = (e) => {
        
        const editWindow = document.getElementById('editWindow');
        editWindow.style.display = "block";

        const id = e.target.name;
        setChequeId(id);

        setBackgroundWhite();

        const editRow = document.getElementById(`row${id}`);
        editRow.style.backgroundColor = "#77DD77"

        const codCli = document.getElementById(`codCli${id}`).innerHTML;
        setEditFormValues({...editFormValues, cliente_cod: codCli})

        const cliente = document.getElementById(`client${id}`).innerHTML;
        const numCheque = document.getElementById(`numCheque${id}`).innerHTML;

        const valorString = document.getElementById(`valor${id}`).innerHTML;
        const valor = parseFloat(valorString.replace("R$ ", "").replace(".", "").replace(",","."));

        const dataVencString = document.getElementById(`data_venc${id}`).innerHTML;
        const parts = dataVencString.split('/');
        const data_venc = `${parts[2]}-${parts[1]}-${parts[0]}`

        const compensado = document.getElementById(`compensado${id}`).innerHTML;

        const linha = document.getElementById(`linha${id}`).innerHTML;

        const clienteInput = document.getElementById('editCliente');
        const numChequeInput = document.getElementById('editNumCheque');
        const valorInput = document.getElementById('editValor');
        const data_vencInput = document.getElementById('editDataVenc');
        const compensadoInput = document.getElementById('editCompensado');
        const vencidoInput = document.getElementById('editVencido');
        const linhaInput = document.getElementById('editLinha');
        

        const destinoInput = document.getElementById('editDestino');
        const destinoName = document.getElementById(`destino${id}`).innerHTML;
        const options = destinoInput.options;
        for (let option of options) {
            if (option.innerHTML === destinoName) {
                option.selected = true;
                break;
            }
        }

        clienteInput.value = cliente;
        clienteInput.setAttribute('codCli', codCli);
        numChequeInput.value = numCheque;
        valorInput.value = valor;
        data_vencInput.value = data_venc;
        compensadoInput.value = compensado === "Não" ? false : true;
        vencidoInput.value = vencido === "Não" ? false : true;
        linhaInput.value = linha;
        

    }

    const [selectedObs, setSelectedObs] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
    if (chequeId !== undefined) {
        setSelectedObs(
        chequesList && chequesList.find(cheque => cheque.id === Number(chequeId)).obs || ""
        );
    }
    }, [chequeId, chequesList]);

    useEffect(() => {
        setTextareaValue(selectedObs);
    }, [selectedObs]);

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
};


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const numCheque = document.getElementById('editNumCheque').value;
        const valor = document.getElementById('editValor').value;
        const data_venc = document.getElementById('editDataVenc').value;
        const compensado = document.getElementById('editCompensado').value;
        const vencido = document.getElementById('editVencido').value;
        const linha = document.getElementById('editLinha').value;
        const destino = document.getElementById('editDestino').value;
        const obs = document.getElementById('editObsTextarea').value;
        

        chequeId && fetch(`${baseURL}/cheques`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: chequeId,
                cliente: editFormValues.cliente_cod,
                numCheque: numCheque,
                valor: valor,
                data_venc: data_venc,
                compensado: compensado,
                vencido: vencido,
                linha: linha,
                destino: destino,
                obs : obs
            })
        })
        .then(response => {
            if(response.ok){
                alert(`Cheque ${numCheque} editado com sucesso!`)
                refreshSearch();
            } else{
                alert(`Erro ao editar, tente novamente`)
            }
        })
        .then(clearInputs('editInput'))


        
        const editWindow = document.getElementById('editWindow');
        editWindow.style.display = "none";

        const editRow = document.getElementById(`row${chequeId}`);
        editRow.style.backgroundColor = "white"
    }

    const toggleOverflow = () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    };

    const closeObs = () =>{
        const module = document.getElementsByClassName('obsScreen')[0];

        toggleOverflow();

        module.style.display = "none";

        
    }

    const [obsDetails, setObsDetails] = useState({
        cliente: "",
        obs: "",
        num: ""
    });


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

    const handleEditObs = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: obsDetails.id,
                    obs: obsDetails.obs
                })
            })

            if(response.ok){
                alert('Observação atualizada com sucesso!')
                closeObs();
                refreshSearch();
                
            }

        }catch(error){
            alert('Erro' + error.message);
        }
    }

    const handleClearObs = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    id: obsDetails.id,
                    obs: null
                })
            })

            if(response.ok){
                alert('Observação deletada com sucesso!');
                closeObs();
                refreshSearch();
            }
        } catch(error) {
            alert('Erro' + error.message);
        }
    }

    return(
        <>
            <Header />

            {/* FILTER SCREEN */}
            <fieldset className={style.filterField}>
                <legend id={style.mainLegend}>Opções de Filtros</legend>
                <form className={style.formCtr} id={style.clienteForm}>
                    <div className={style.filterCtr}>
                        
                        <div className={style.inputCtr} >
                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleInputChange} placeholder="Selecione Vendedor" className={`${style.select} input`}>
                                <option key="0"></option>
                                {
                                    destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>
                        </div>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleInputChange} id="cliente" placeholder="Pesquise o Cliente" className="input"/>
                            <div className={style.searchBox} id="searchBox">
                                <select size={4} id={`${style.clienteSelect} input`} onChange={handleInputChange}>
                                    {
                                        searchResult.map(client => <option onClick={handleClick} key={client.cod} value={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>
                            
                        </div>

                    </div>
                    
                    <fieldset className={style.formCtr}>
                        <legend>Vencimento</legend>
                        <div className={style.inputCtr} >
                            <h4>Data Inicial:</h4>
                            <input type="date" name="data_init" onChange={handleInputChange} id="data_init" className="input"/>
                        </div>

                        <div className={style.inputCtr} >
                            <h4>Data Fim:</h4>
                            <input type="date" name="data_fim" onChange={handleInputChange} id="data_fim" className="input"/>
                        </div>
                    </fieldset>

                    <fieldset className={style.formCtr}>
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
                    <div className={style.buttonCtr}>
                        <button type="submit" className={style.button} id="buscaCheque" onClick={handleSubmit}>Buscar</button>
                        <button className={style.button} onClick={handleClear}>Limpar</button>
                    </div>
                    
                </form>
            </fieldset>

            {/* EDIT SCREEN */}
            <ChequesHeader />
            <fieldset className={style.editFieldset} id="editWindow">
                <legend>Edição de Cheque</legend>
                <form className={style.formCtr} id={style.editForm}>

                    <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >

                        <h4>No. Cheque</h4>
                        <input type="text" onChange={handleEditInputChange} name="número_cheque" className="editInput" id="editNumCheque"/>

                        <h4>Cliente:</h4>
                        <input type="text" name="cliente" onChange={handleEditInputChange} id="editCliente" placeholder="Pesquise o Cliente" className="editInput"/>
                        <div className={style.searchBox} id="searchBoxEdit">
                            <select size={4} id={`${style.clienteSelect} editInput`} onChange={handleEditInputChange}>
                                {
                                searchResult.map(client => <option onClick={handleEditClick} key={client.cod} value={client.cod} codCli={client.cod}>{client.nome}</option>)
                                }
                            </select>
                        </div>

                    </div>
                    
                    <div className={style.inputCtr}>
                        <h4>Valor</h4>
                        <input type="number" onChange={handleEditInputChange} name="valor" className="editInput" id="editValor"/>

                        <h4>Vencimento</h4>
                        <input type="date" onChange={handleEditInputChange} name="data_venc" className="editInput" id="editDataVenc"/>

                        <h4>Destino</h4>
                        <select name="destino_id" onChange={handleEditInputChange} placeholder="Selecione Vendedor" className={`${style.select} editInput`} id="editDestino">
                            <option key="0"></option>
                            {
                                destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                            }
                        </select>
                        

                    </div>
                    
                        <div className={style.statusCtr}>
                            <fieldset className={style.formCtr}>
                            <legend>Status</legend>
                            <div className={style.inputCtr} >
                                <h4>Compensado:</h4>
                                <select className={`${style.select} editInput`} name="compensado" id="editCompensado" onChange={handleEditInputChange} >
                                    <option value={null}></option>
                                    <option value={false}>Não</option>
                                    <option value={true}>Sim</option>
                                    
                                </select>
                            </div>

                            <div className={style.inputCtr} >
                                <h4>Vencido:</h4>
                                <select className={`${style.select} editInput`} name="vencido" id="editVencido" onChange={handleEditInputChange}>
                                    <option value={null}></option>
                                    <option value={false}>Não</option>
                                    <option value={true}>Sim</option>
                                    
                                </select>
                            </div>

                            <div className={style.inputCtr} >
                                <h4>Linha:</h4>
                                <select className={`${style.select} input`} name="linha" id="editLinha" onChange={handleInputChange}>
                                    <option></option>
                                    {
                                        linhas.map(linha => <option value={linha} key={linha}>{linha}</option>)
                                    }
                                </select>
                            </div>

                    </fieldset>

                        <div className={style.inputCtr} id={style.editObs}>
                            <h4>Observação:</h4>
                            <textarea id="editObsTextarea" value={textareaValue} onChange={handleTextareaChange}></textarea>
                        </div>
                    </div>
                        


                    <div className={style.buttonCtr}>
                            <button type="submit" className={style.button} id="editaCheque" onClick={handleEditSubmit}>Editar</button>
                            <button type="submit" className={style.button} id="fechar" onClick={handleCloseEdit}>Fechar</button>
                    </div>
                    
                </form>
            </fieldset>



            
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod. Cliente</th>
                        <th>Cliente</th>
                        <th>Grupo</th>
                        <th>No. Cheque</th>
                        <th>Valor</th>
                        <th>Data Venc.</th>
                        <th>Comp.</th>
                        <th>Venc.</th>
                        <th>Linha</th>
                        <th>Destino</th>
                        <th>Obs</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                {chequesList && chequesList.map((cheque) => (
                    <tr key={cheque.id} id={`row${cheque.id}`} className="chequeRow">
                        <td id={`codCli${cheque.id}`}>{cheque.cod_cliente}</td>
                        <td id={`client${cheque.id}`}>{cheque.cliente}</td>
                        <td id={`grupo${cheque.id}`}>{cheque.grupo}</td>
                        <td id={`numCheque${cheque.id}`} >{cheque.número_cheque}</td>
                        <td id={`valor${cheque.id}`} >{cheque.valor}</td>
                        <td id={`data_venc${cheque.id}`} >{transformDate(cheque.data_venc)}</td>
                        <td id={`compensado${cheque.id}`} >{cheque.compensado ? "Sim" : 'Não'}</td>
                        <td id={`vencido${cheque.id}`} >{cheque.vencido ? "Sim" : "Não"}</td>
                        <td id={`linha${cheque.id}`} >{cheque.linha}</td>
                        <td id={`destino${cheque.id}`} >{cheque.destino}</td>
                        <td id={`obs${cheque.id}`}>{cheque.obs && <img src="/images/message.svg" onClick={() => handleOpenObs(cheque)}/>}</td>
                        <td> <img src="/images/edit.svg" name={cheque.id} value={cheque.id} onClick={handleEdit}/></td>
                        <td> <img src="/images/trash-bin.svg" onClick={() => handleDelete(cheque.id)}/></td>
                    
                    </tr>
                    
                ))}
                </tbody>
            </table>
            <div id={style.obsBackground} className="obsScreen">
                <div id={style.obsCtr}>
                    <div className={style.popupHeader}>
                        <h4>{`Observação do Cheque ${obsDetails.num} do cliente ${obsDetails.cliente}`}</h4>
                        <img src="/images/x-icon.svg" onClick={closeObs}/>
                    </div>
                    <div className={style.obsContent}>
                        <textarea value={obsDetails.obs} onChange={(e) => setObsDetails({...obsDetails, obs: e.target.value})}></textarea>
                    </div>

                    <div className={style.obsButtonCtr}>
                        <button type="submit" className={style.button} id="editObs" onClick={handleEditObs}>Salvar</button>
                        <button type="submit" className={style.button} id="deleteObs" onClick={handleClearObs}>Deletar</button>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}