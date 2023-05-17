import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { clearInputs } from "@/utils/utils"
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

    const findClient = () => {

        if(clientList){
            const foundClientByName = clientList.filter(client => client.nome.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || !document.getElementById('cliente').value ? document.getElementById('searchBox').style.display = 'none' : document.getElementById('searchBox').style.display = 'block'
            
        }

    }

    useEffect(() => {
        findClient()
    },[formValues.cliente])


    const handleClick = (e) =>{
        setFormValues({...formValues, cliente_cod: e.target.value})
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;

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
            clearInputs();
                
        }  else {
            console.error('Erro ao obter os cheques da API.');
        }

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
        clearInputs();
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

    const transformDate = (data) =>{
        const date = new Date(data);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }

    return(
        <>
            <Header />

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

            <ChequesHeader />
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Grupo</th>
                        <th>No. Cheque</th>
                        <th>Valor</th>
                        <th>Data Venc.</th>
                        <th>Comp.</th>
                        <th>Venc.</th>
                        <th>Linha</th>
                        <th>Destino</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                {chequesList && chequesList.map((cheque) => (
                    <tr key={cheque.id}>
                        <td id={`codCli${cheque.id}`}>{cheque.cod_cliente}</td>
                        <td id={`client${cheque.id}`}>{cheque.cliente}</td>
                        <td id={`grupo${cheque.id}`}>{cheque.grupo}</td>
                        <td id={`numCheque${cheque.id}`} >{cheque.número_cheque}</td>
                        <td id={`valor${cheque.id}`} >{cheque.valor}</td>
                        <td id={`data_venc${cheque.id}`} >{transformDate(cheque.data_venc)}</td>
                        <td id={`compensado${cheque.id}`} >{cheque.compensado ? "SIM" : 'NÃO'}</td>
                        <td id={`vencido${cheque.id}`} >{cheque.vencido ? "SIM" : "NÃO"}</td>
                        <td id={`linha${cheque.id}`} >{cheque.linha}</td>
                        <td id={`destino${cheque.id}`} >{cheque.destino}</td>
                        <td> <img src="/images/edit.svg" name={cheque.id}/></td>
                        <td> <img src="/images/trash-bin.svg" /></td>
                    
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}