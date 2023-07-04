import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import ClientSearchBox from "@/components/ClientSearchBox"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { linhas, clearInputs, isVencidoVar, isCompensadoVar } from "@/utils/utils"

export default function CadastroCheques() {

    const token = typeof localStorage !== "undefined" ? localStorage.getItem('token') : "";

    const [formValues, setFormValues] = useState(
        {
            num: "",
            valor: "",
            data_rec: "",
            tipo: "cheque",
            data_venc: "",
            cliente: "",
            cliente_cod: "",
            pedido: "",
            compensado: false,
            vencido: false,
            linha: "",
            destino_id: "",
            terceiro: false,
            obs: "",
            vendedor_id: "",
            data_compen: "",
            data_destino: ""
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //SUBMIT FUNCTIONS

    const handleClear = (e) => {
        e?.preventDefault();

        clearInputs('input')

    };

    const [clientList, setClientList] = useState();

    async function getAllClients() {
        try {
            const response = await fetch(`${baseURL}/clientes`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                let jsonResponse = await response.json();
                setClientList(jsonResponse);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClients();

    }, []);

    const handleClick = (e) => {
        const clientCode = document.getElementById('cliente_cod')
        clientCode.value = e.target.value;
        setFormValues({ ...formValues, cliente_cod: clientCode.value })
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;
    }


    const [vendedorList, setVendedorList] = useState()

    async function getAllVendedores() {
        try {
            const response = await fetch(`${baseURL}/vendedores`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                let jsonResponse = await response.json();
                setVendedorList(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const [destinoList, setDestinoList] = useState();

    async function getAllDestinos() {
        try {
            const response = await fetch(`${baseURL}/destinos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                let jsonResponse = await response.json();
                setDestinoList(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllVendedores()
        getAllDestinos()
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        let checksList = [];

        for (let i = 0; i < qtdCheques; i++) {
            fetch(`${baseURL}/cheques`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    num: formValues[`num${i}`],
                    valor: formValues[`valor${i}`].replace(',', '.'),
                    data_rec: formValues.data_rec,
                    tipo: formValues.tipo,
                    cliente_cod: formValues.cliente_cod,
                    pedido: formValues.pedido ? formValues.pedido : null,
                    linha: formValues[`linha${i}`] ? formValues[`linha${i}`] : null,
                    destino_id: formValues.destino_id ? formValues.destino_id : null,
                    terceiro: formValues.terceiro,
                    obs: formValues.obs ? formValues.obs : null,
                    vendedor_id: formValues.vendedor_id ? formValues.vendedor_id : null,
                    compensado: isCompensadoVar(formValues, 15, i),
                    vencido: isVencidoVar(formValues, 4, i),
                    data_venc: formValues[`data_venc${i}`] ? formValues[`data_venc${i}`] : null,
                    data_compen: formValues[`data_compen${i}`] ? formValues[`data_compen${i}`] : null,
                    data_destino: formValues.data_destino ? formValues.data_destino : null

                })
            })

            checksList.push(formValues[`num${i}`]);
        }

        alert(`Cheque ${checksList.map((num) => num)} cadastrado(s) com sucesso!`)

        clearInputs('input');
    }

    const [qtdCheques, setQtdCheques] = useState(1);

    const changeCheckQuantity = (e) => {
        setQtdCheques(e.target.value);
    }

    const defineQtdCheques = (qtd) => {
        const inputs = [];
        for (let i = 0; i < qtd; i++) {
            inputs.push(
                <input
                    type="number"
                    name={`num${i}`}
                    onChange={handleInputChange}
                    id={`num${i}`}
                    required
                    placeholder={`Número do cheque ${i + 1}`}
                    className="input numCheque"
                />
            );
        }
        return inputs;
    };

    const replicateData = async (className, increment, name) => {
        const dataList = document.getElementsByClassName(className);
        const valueToReply = dataList[0].value;
        const updatedFormValues = {...formValues}; // Create a new object to store the updated form values
      
        for (let i = 1; i < dataList.length; i++) {
          dataList[i].value = Number(valueToReply) + (increment ? i : 0) || valueToReply;
          updatedFormValues[name + i] = dataList[i].value; // Update the new object instead of spreading the existing formValues
        }
      
        setFormValues(updatedFormValues); // Update the formValues with the new object containing all the values
      };
      

    const replicateNumCheque = (e) =>{
        e.preventDefault()
        replicateData('numCheque', true,'num');
    }


    const defineQtdValores = (qtd) => {
        const inputs = [];
        for (let i = 0; i < qtd; i++) {
            inputs.push(
                <input
                    type="text"
                    name={`valor${i}`}
                    onChange={handleInputChange}
                    id={`valor${i}`}
                    required
                    placeholder={`Valor ${i + 1}`}
                    className="input valorCheque"
                />
            );
        }
        return inputs;
    }

    const replicateValor = (e) =>{
        e.preventDefault()
        replicateData('valorCheque', false, 'valor');
    }

    const defineQtdVencimentos = (qtd) => {
        const inputs = [];
        for (let i = 0; i < qtd; i++) {
            inputs.push(
                <input
                    type="date"
                    name={`data_venc${i}`}
                    onChange={handleInputChange}
                    id={`data_venc${i}`}
                    required
                    className="input"
                />
            );
        }
        return inputs;
    }

    const defineQtdComp = (qtd) => {
        const inputs = [];
        for (let i = 0; i < qtd; i++) {
            inputs.push(
                <input
                    type="date"
                    name={`data_compen${i}`}
                    onChange={handleInputChange}
                    id={`data_compen${i}`}
                    className="input"
                />
            );
        }
        return inputs;
    }

    const defineQtdLinha = (qtd) => {
        const inputs = [];
        for (let i = 0; i < qtd; i++) {
            inputs.push(
                <select className={`${style.select} input`}
                    name={`linha${i}`}
                    id={`linha${i}`}
                    onChange={handleInputChange}>
                    <option></option>
                    {
                        linhas.map(linha => 
                            <option
                                value={linha}
                                key={linha}>
                                {linha}
                            </option>)
                    }
                </select>
            );
        }
        return inputs;
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <Header />

                <h3 className={style.name}>Dados do Cheque</h3>
                <div className={style.formCtr}>
                    <h4>Quantidade de Cheques</h4>
                    <select onChange={changeCheckQuantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                    </select>
                    <h4>Data de Recebimento:</h4>
                        <input
                            type="date"
                            name="data_rec"
                            onChange={handleInputChange}
                            id="data_rec"
                            required
                            className="input"
                            defaultValue={new Date().toISOString().split("T")[0]}
                        />

                        <h4>Tipo:</h4>
                        <input
                            type="text"
                            name="tipo"
                            onChange={handleInputChange}
                            defaultValue="Cheque"
                            
                        />
                    
                </div>

                

                <section className={`${style.formCtrCenter} ${style.formVarQtd}`}>

                    <div className={style.inputCtrMultiple} >
                        <h4>Número:</h4>
                        {defineQtdCheques(qtdCheques)}
                        <button className={`${style.button} ${style.smallerButton}`} onClick={replicateNumCheque}>Replicar Número</button>
                        
                    </div>

                    <div className={style.inputCtrMultiple} >
                        <h4>Valor:</h4>
                        {defineQtdValores(qtdCheques)}
                        <button className={`${style.button} ${style.smallerButton}`} onClick={replicateValor}>Replicar Valor</button>
                    </div>

                    <div className={`${style.inputCtrMultiple} ${style.date} ${style.vencimento}`} >
                        <h4>Data de Vencimento:</h4>
                        {defineQtdVencimentos(qtdCheques)}
                    </div>

                    <fieldset className={`${style.formCtr} ${style.paymentStatus}`}>
                        <legend>Status de Pagamento</legend>
                        <div className={`${style.inputCtrMultiple} ${style.date}`} >
                            <h4>Compensação:</h4>
                            {defineQtdComp(qtdCheques)}
                        </div>

                        <div className={`${style.inputCtrMultiple} ${style.linha}`} >
                            <h4>Linha:</h4>
                            {defineQtdLinha(qtdCheques)}
                        </div>
                    </fieldset>

                    
                    



                </section>

                <h3 className={style.name}>Dados da Venda</h3>
                <section className={style.formCtr} id={style.clienteForm}>

                    <ClientSearchBox
                        clientList={clientList}
                        formValues={formValues}
                        handleInputChange={handleInputChange}
                        handleClick={handleClick}
                        required={true}
                    />


                    <div className={style.inputCtr} >
                        <h4>Código do Cliente:</h4>
                        <input
                            type="text"
                            name="cliente_cod"
                            id="cliente_cod"
                            onChange={handleInputChange}
                            disabled
                            className="input"
                        />
                    </div>

                    <div className={style.inputCtr} >
                        <h4>Número do Pedido:</h4>
                        <input
                            type="number"
                            name="pedido"
                            id="pedido"
                            onChange={handleInputChange}
                            placeholder="Número do Pedido"
                            className="input"
                        />
                    </div>

                    <div className={style.inputCtr} >
                        <h4>Vendedor</h4>
                        <select
                            name="vendedor_id"
                            onChange={handleInputChange}
                            placeholder="Selecione Vendedor"
                            className={`${style.select} input`}
                        >
                            <option key="0"></option>
                            {
                                vendedorList?.map(seller => <option key={seller.id} value={seller.id}>{seller.nome}</option>)
                            }
                        </select>
                    </div>
                </section>

                <h3 className={style.name}>Informações Adicionais</h3>
                <section className={style.formCtr}>
                    <div className={style.inputCtr} >
                        <h4>Destino</h4>
                        <select
                            name="destino_id"
                            onChange={handleInputChange}
                            placeholder="Selecione Vendedor"
                            className={`${style.select} input`}
                        >
                            <option key="0"></option>
                            {
                                destinoList?.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                            }
                        </select>
                    </div>

                    <div className={style.inputCtr}>
                        <h4>Data Entrega:</h4>
                        <input
                            name="data_destino"
                            onChange={handleInputChange}
                            type="date"
                        />
                    </div>

                    <div className={style.inputCtr} >
                        <h4>Terceiro:</h4>
                        <select
                            className={`${style.select} input`}
                            name="terceiro" id="terceiro"
                            onChange={handleInputChange}
                        >
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                        </select>
                    </div>

                    <div className={`${style.inputCtr} ${style.obs}`} >
                        <h4>Observação:</h4>
                        <textarea
                            name="obs"
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>


                </section>
                <section className={style.formCtr}>
                    <button
                        type="submit"
                        className={style.button}
                        id="adicionaCliente"
                    >Salvar
                    </button>
                    <button
                        className={style.button}
                        onClick={handleClear}
                    >Limpar
                    </button>
                </section>

            </form>
        </>
    )

}