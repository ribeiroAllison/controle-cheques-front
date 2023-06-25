import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { clearInputs, linhas, isVencido, isCompensado } from "@/utils/utils"
import HeaderLine from "@/components/HeaderLine"


export default function ChequeControlEstornados(props) {


    //Edit row Inputs
    const [editFormEstorno, setEditFormEstorno] = useState(
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
            data_destino: null
        }
    );

    const handleEstornoEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormEstorno({ ...editFormEstorno, [name]: value });
    };
    

    //Get name and id of all clients in db, so it can be searched by typing the a name
    const [estornoClientList, setEstornClienteList] = useState('');

    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes/nomecod`);

            if(response.ok){
                let jsonResponse = await response.json();
                setEstornClienteList(jsonResponse);
            }

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClients()
        getAllDestinos()
        getGrupos()
    },[])

    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = (formValues, id, targetField) => {
        if(estornoClientList){
            const foundClientByName = estornoClientList.filter(client => client.nome.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || document.getElementById(targetField) && !document.getElementById(targetField).value ? 
            document.getElementById(id).style.display = 'none' 
            : document.getElementById(id).style.display = 'block'
            
        }

    }

    //Effects to change the options as user types client name on search or edit box


    useEffect(() => {
        findClient(editFormEstorno, "searchBoxEdit", 'clienteEdit')
    },[editFormEstorno.cliente])

    const handleEstornoEditEstornoClick = (e) =>{
        setEditFormEstorno({...editFormEstorno, id: e.target.value})
        document.getElementById('searchBoxEdit').style.display = 'none';
        document.getElementById('editCliente').value = e.target.innerHTML;

 
    }

    //Get all destinos and their IDs so destino options of select input can be populated
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

    // Get all grupos and their IDs so grupos options of select input can be populated
    const [grupos, setGrupos] = useState();

    async function getGrupos(){
        try{
            const response = await fetch(`${baseURL}/grupo`);
    
            if(response.ok){
                let jsonResponse = await response.json();
                setGrupos(jsonResponse);
            }
    
        } catch(error){
            console.log(error);
        }
    }



    //State to search checks by filter
    const [estornoList, setEstornoList] = useState();



    //Submit check search and get results from db
    const handleSubmit = async (e) => {
        e && e.preventDefault();

        
        const response = await fetch(`${baseURL}/${props.endPoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        if(response.ok){
            let jsonResponse = await response.json();
            setEstornoList(jsonResponse);
            clearInputs('input');
                
        }  else {
            console.error('Erro ao obter os cheques da API.');
        }

     
    }

    useEffect(() => {
        if(props.submitOnMount){
            handleSubmit();
        }
    }, []);



    const handleCloseEdit = (e) => {
        e.preventDefault();
        clearInputs('editInput');

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        deleteEditClass();
        
        
    }

    const transformDate = (data) =>{
        const date = new Date(data);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }

    const transformCurrency = (value) => {
        return value?.replace("$", "R$").replace(",", "x").replace(".", ",").replace("x", ".");
    }

    

    const handleDelete = async (id) =>{
        const confirmation = confirm('Você realmente deseja apagar esse cheque?')

        if(confirmation){
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

        }
        
    }


    const rearrangeDate = (date) => {
        const parts = date.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }

    const [estornoId, setEstornoId] = useState(); 

    const deleteEditClass = () => {
        const allTds = document.querySelectorAll('td, img');
        for(let td of allTds) {
            td.classList.remove(`${style.editTrue}`);
        }
    }

    const handleEstornoEdit = (e) => {
        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "flex";

        const id = e.target.name;
        setEstornoId(id);

        deleteEditClass();

        const selectRow = document.getElementsByName(e.target.name);
        for(let cell of selectRow) {
            cell.classList.add(`${style.editTrue}`);
        }

        const codCli = document.getElementById(`codCli${id}`).innerHTML;
    
        const cliente = document.getElementById(`client${id}`).innerHTML;
        const numCheque = document.getElementById(`numCheque${id}`).innerHTML;

        const valorString = document.getElementById(`valor${id}`).innerHTML;
        const valor = Number(valorString.replace('R$', '').replace('.', '').replace(',', '.'))

        const dataVencString = document.getElementById(`data_venc${id}`).innerHTML;
        const data_venc = rearrangeDate(dataVencString);

        const linha = document.getElementById(`linha${id}`).innerHTML;

        const clienteInput = document.getElementById('editCliente');
        const numChequeInput = document.getElementById('editNumCheque');
        const valorInput = document.getElementById('editValor');
        const data_vencInput = document.getElementById('editDataVenc');
        const linhaInput = document.getElementById('editLinha');
        const dataCompInput = document.getElementById('data_compen')
        
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
        linhaInput.value = linha;
        
        const dataCompDate = estornoList.find(cheque => cheque.id === Number(id)).data_compen;
        const dataCompString = dataCompDate && transformDate(dataCompDate);
        const dataComp = dataCompString ? rearrangeDate(dataCompString): null;
        dataCompInput.value = dataComp;

        setEditFormEstorno({
            ...editFormEstorno, 
            id:id,
            cliente_cod: codCli,
            número_cheque: numCheque,
            valor: valor,
            data_venc: data_venc,
            linha: linha,
            data_compen: dataComp,
            destino_id: destinoInput.value,
            
        })
    }

    const [selectedObs, setSelectedObs] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
    if (estornoId !== undefined) {
        setSelectedObs(
        estornoList && estornoList.find(cheque => cheque.id === Number(estornoId))?.obs || ""
        );
    }
    }, [estornoId, estornoList]);

    useEffect(() => {
        setTextareaValue(selectedObs);
    }, [selectedObs]);

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
};


    const handleEstornoEditSubmit = async (e) => {
        e.preventDefault();
        const obs = document.getElementById('editObsTextarea').value;

        estornoId && fetch(`${baseURL}/cheques`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: estornoId,
                cliente: editFormEstorno.cliente_cod,
                numCheque: editFormEstorno.número_cheque,
                valor: editFormEstorno.valor,
                data_venc: editFormEstorno.data_venc,
                compensado: isCompensado(editFormEstorno, 15),
                vencido: isVencido(editFormEstorno, 4),
                linha: editFormEstorno.linha,
                destino: editFormEstorno.destino_id,
                obs : obs,
                data_compen : editFormEstorno.data_compen
            })
        })
        .then(response => {
            if(response.ok){
                alert(`Cheque ${editFormEstorno.número_cheque} editado com sucesso!`)
                if(props.endPoint === 'cheques'){
                    refreshSearch();
                } else{
                    handleSubmit();
                }
                
                
            } else{
                alert(`Erro ao editar, tente novamente`)
            }
        })
        .then(clearInputs('editInput'))
        .then(deleteEditClass())



        
        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        const editRow = document.getElementById(`row${estornoId}`);
        if(editRow){
            editRow.style.backgroundColor = "white"
        }
        
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

    const handleEstornoEditObs = async (e) =>{
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

            }
        } catch(error) {
            alert('Erro' + error.message);
        }
    }
    
    const assignClassStyle = (cheque) =>{
    
        if (cheque.vencido && !cheque.compensado && !cheque.linha && !cheque.destino) {
            return style.vencTrue;
        } else if (cheque.compensado) {
            return style.chequeOK;
        } else if (cheque.linha) {
            return style.semFundo;
        } else if(!cheque.compensado && cheque.destino){
            return style.withDestino;
        }
            
    }

    

    return(
        <>


            

            {/* EDIT SCREEN */}
            <HeaderLine name={props.headerLine} />
            <div id="editWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="editWindow">
                    <div className={style.popupHeader}>
                        <h2>Edição de Cheque</h2>
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit}/>
                    </div>
                    
                    <form className={style.formCtr} id={style.editForm}>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >

                            <h4>No. Cheque</h4>
                            <input type="text" onChange={handleEstornoEditInputChange} name="número_cheque" className="editInput" id="editNumCheque"/>

                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleEstornoEditInputChange} id="editCliente" placeholder="Pesquise o Cliente" className="editInput"/>
                            <div className={style.searchBox} id="searchBoxEdit">
                                <select size={4} id={`${style.clienteSelect} editInput`} onChange={handleEstornoEditInputChange}>
                                    {
                                    searchResult.map(client => <option onClick={handleEstornoEditEstornoClick} key={client.cod} value={client.cod} codCli={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>

                            <h4>Valor</h4>
                            <input type="number" onChange={handleEstornoEditInputChange} name="valor" className="editInput" id="editValor"/>

                        </div>
                        
                        <div className={style.inputCtr}>
                            

                            <h4>Vencimento</h4>
                            <input type="date" onChange={handleEstornoEditInputChange} name="data_venc" className="editInput" id="editDataVenc"/>

                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleEstornoEditInputChange} placeholder="Selecione Vendedor" className={`${style.select} editInput`} id="editDestino">
                                <option key="0"></option>
                                {
                                    destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>

                            <h4>Data Entrega:</h4>
                            <input type="date" name="data_destino" onChange={handleEstornoEditInputChange} className="input"/>
                            

                        </div>
                        
                            <div className={style.statusCtr}>
                                <fieldset className={style.formCtr}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensação:</h4>
                                    <input type="date" name="data_compen" onChange={handleEstornoEditInputChange} id="data_compen" className="input"/>
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Linha:</h4>
                                    <select className={`${style.select} input`} name="linha" id="editLinha" onChange={handleEstornoEditInputChange}>
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
                                <button type="submit" className={style.button} id="editaCheque" onClick={handleEstornoEditSubmit}>Salvar</button>
                        </div>
                        
                    </form>
                </section>
            </div>
            



            
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod. Cliente</th>
                        <th>Cliente</th>
                        <th>Grupo</th>
                        <th>No. Cheque</th>
                        <th>Pedido</th>
                        <th>Valor</th>
                        <th>Destino</th>
                        <th>Data Venc.</th>
                        <th>Comp.</th>
                        <th>Venc.</th>
                        <th>Linha</th>
                        <th>Obs</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                {estornoList && estornoList.map((cheque) => (
                    <tr key={cheque.id} id={`row${cheque.id}`} className="chequeRow">
                        <td name={cheque.id} id={`codCli${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cod_cliente}</td>
                        <td name={cheque.id} id={`client${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cliente}</td>
                        <td name={cheque.id} id={`grupo${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.grupo}</td>
                        <td name={cheque.id} id={`numCheque${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.número_cheque}</td>
                        <td name={cheque.id} id={`pedido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.pedido}</td>
                        <td name={cheque.id} id={`valor${cheque.id}`} className={assignClassStyle(cheque)}>{transformCurrency(cheque.valor)}</td>
                        <td name={cheque.id} id={`destino${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.destino}</td>
                        <td name={cheque.id} id={`data_venc${cheque.id}`} className={assignClassStyle(cheque)}>{transformDate(cheque.data_venc)}</td>
                        <td name={cheque.id} id={`compensado${cheque.id}` } className={assignClassStyle(cheque)}>{cheque.compensado ? "Sim" : 'Não'}</td>
                        <td name={cheque.id} id={`vencido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.vencido ? "Sim" : "Não"}</td>
                        <td name={cheque.id} id={`linha${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.linha}</td>
                        <td name={cheque.id} id={`obs${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.obs && <img src="/images/message.svg" onClick={() => handleOpenObs(cheque)}/>}</td>
                        <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/edit.svg" name={cheque.id} value={cheque.id} onClick={handleEstornoEdit}/></td>
                        <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/trash-bin.svg" onClick={() => handleDelete(cheque.id)}/></td>
                    
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
                        <button type="submit" className={style.button} id="editObs" onClick={handleEstornoEditObs}>Salvar</button>
                        <button type="submit" className={style.button} id="deleteObs" onClick={handleClearObs}>Deletar</button>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}