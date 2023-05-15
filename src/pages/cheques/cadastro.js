import ChequesHeader from "@/components/ChequesHeader"
import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"



export default function CadastroCheques() {

    const [formValues, setFormValues] = useState(
        {
            num: "",
            valor: "",
            data_rec:"",
            tipo: "cheque",
            data_venc:"",
            cliente: "",
            cliente_cod:"",
            pedido:"",
            compensado:false,
            vencido:false,
            linha:"",
            destino_id:"",
            terceiro:false,
            obs:"",
            vendedor_id:""
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //SUBMIT FUNCTIONS

    const clearInputs = (e) =>{
        
        e && e.preventDefault();
        
        const inputs = document.getElementsByClassName('input');
        for(let input of inputs){
            input.value = ""
        }

    

        
        
    }

    const [clientList, setClientList] = useState();

    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes`);

            if(response.ok){
                let jsonResponse = await response.json();
                setClientList(jsonResponse);
            }

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        getAllClients();
        
    }, []);


    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = () => {


        if(clientList){
            const foundClientByName = clientList.filter(client => client.cliente.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || !document.getElementById('cliente').value ? document.getElementById('searchBox').style.display = 'none' : document.getElementById('searchBox').style.display = 'block'
            
        }

    }

    const handleClick = (e) =>{
        const clientCode = document.getElementById('cliente_cod')
        clientCode.value = e.target.value;
        setFormValues({...formValues, cliente_cod: clientCode.value})
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;

    }

    useEffect(() => {
        findClient()
    },[formValues.cliente])

    // const [clearClient, setClearClient] = useState(false)

    // useEffect(() =>{

    //     formValues.cliente ? setClearClient(false) : setClearClient(true)
    //     if(clearClient){
            
    //     }
        
        
    // },[formValues.cliente])

    const linhas =[11, 12, 13, 14, 20, 28, 30, 31, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 48, 49, 59, 60, 61, 64]


    const [vendedorList, setVendedorList] = useState()
    
    async function getAllVendedores() {
        try{
            const response = await fetch(`${baseURL}/vendedores`)

            if(response.ok){
                let jsonResponse = await response.json();
                setVendedorList(jsonResponse);
                console.log(jsonResponse)
            }

        }catch(error){
            console.log(error);

        }
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


    useEffect(() => {
        getAllVendedores()
        getAllDestinos()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        formValues.num && fetch(`${baseURL}/cheques`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                num: formValues.num,
                valor:formValues.valor,
                data_rec: formValues.data_rec,
                tipo: formValues.tipo,
                data_venc: formValues.data_venc,
                cliente_cod: formValues.cliente_cod,
                pedido: formValues.pedido ?  formValues.pedido : null,
                compensado: formValues.compensado ?  formValues.compensado : null,
                vencido: formValues.vencido ? formValues.vencido : null,
                linha: formValues.linha ? formValues.linha : null,
                destino_id: formValues.destino_id ? formValues.destino_id : null,
                terceiro: formValues.terceiro ? formValues.terceiro : null,
                obs: formValues.obs ? formValues.obs : null,
                vendedor_id: formValues.vendedor_id ? formValues.vendedor_id : null
            
            })
        })
        .then(response => {
            if(response.ok){
                alert(`Cheque ${formValues.num} cadastrado com sucesso!`)
                
            }
        }

        )
        .then(clearInputs())
    }


    return(
        <>
            <Header />
            
            <h3 className={style.name}>Dados do Cheque</h3>
            <form className={style.formCtrCenter}>
                
                <div className={style.inputCtr} >
                    <h4>Número:</h4>
                    <input type="text" name="num" onChange={handleInputChange} id="num" required placeholder="Número do Cheque" className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Valor:</h4>
                    <input type="number" name="valor" onChange={handleInputChange} id="valor" required placeholder="Valor do Cheque" className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Data de Recebimento:</h4>
                    <input type="date" name="data_rec" onChange={handleInputChange} id="data_rec" required className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Data de Vencimento:</h4>
                    <input type="date" name="data_venc" onChange={handleInputChange} id="data_rec" required className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Tipo:</h4>
                    <input type="text" name="tipo" onChange={handleInputChange} defaultValue="Cheque" className="input"/>
                </div>

                <fieldset className={style.formCtr}>
                    <legend>Status</legend>
                    <div className={style.inputCtr} >
                        <h4>Compensado:</h4>
                        <select className={`${style.select} input`} name="compensado" id="compensado" onChange={handleInputChange} >
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                            
                        </select>
                    </div>

                    <div className={style.inputCtr} >
                        <h4>Vencido:</h4>
                        <select className={`${style.select} input`} name="vencido" id="vencido" onChange={handleInputChange}>
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                            
                        </select>
                    </div>

                    <div className={style.inputCtr} >
                        <h4>Linha:</h4>
                        <select className={`${style.select} input`} name="linha" id="linha" onChange={handleInputChange}>
                            <option></option>
                            {
                                linhas.map(linha => <option value={linha} key={linha}>{linha}</option>)
                            }
                        </select>
                    </div>
                    </fieldset>

                </form>

            <h3 className={style.name}>Dados da Venda</h3>
            <form className={style.formCtr} id={style.clienteForm}>
                
                <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                    <h4>Cliente:</h4>
                    <input type="text" name="cliente" onChange={handleInputChange} id="cliente" placeholder="Pesquise o Cliente" className="input"/>
                    <div className={style.searchBox} id="searchBox">
                        <select size={4} id={`${style.clienteSelect} input`} onChange={handleInputChange}>
                            {
                                searchResult.map(client => <option onClick={handleClick} key={client.cod} value={client.cod}>{client.cliente}</option>)
                            }
                        </select>
                    </div>
                </div>
                
                <div className={style.inputCtr} >
                    <h4>Código do Cliente:</h4>
                    <input type="text" name="cliente_cod" id="cliente_cod" onChange={handleInputChange} disabled className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Número do Pedido:</h4>
                    <input type="number" name="pedido" id="pedido" onChange={handleInputChange} placeholder="Número do Pedido" className="input"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Vendedor</h4>
                    <select name="vendedor_id" onChange={handleInputChange} placeholder="Selecione Vendedor" className={`${style.select} input`}>
                        <option key="0"></option>
                        {
                            vendedorList && vendedorList.map(seller => <option key={seller.id} value={seller.id}>{seller.nome}</option>)
                        }
                    </select>
                </div>
                
            </form>

            <h3 className={style.name}>Informações Adicionais</h3>
            <form className={style.formCtr}>
            <div className={style.inputCtr} >
                <h4>Destino</h4>
                <select name="destino_id" onChange={handleInputChange} placeholder="Selecione Vendedor" className={`${style.select} input`}>
                    <option key="0"></option>
                    {
                        destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                    }
                </select>
            </div>

            <div className={style.inputCtr} >
                <h4>Terceiro:</h4>
                <select className={`${style.select} input`} name="terceiro" id="terceiro" onChange={handleInputChange}>
                    <option value={false}>Não</option>
                    <option value={true}>Sim</option>
                    
                </select>
            </div>

            <div className={`${style.inputCtr} ${style.obs}`} >
                <h4>Observação:</h4>
                <textarea name="obs" onChange={handleInputChange} className="input"/>
            </div>
            
            
            </form>
            
            <form className={style.formCtr}>
                <button type="submit" className={style.button} id="adicionaCliente" onClick={handleSubmit}>Salvar</button>
                <button className={style.button} onClick={clearInputs}>Limpar</button>
            </form>

            

        </>
    )

}