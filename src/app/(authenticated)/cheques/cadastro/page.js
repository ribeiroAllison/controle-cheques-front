'use client'

import Header from "@/components/Header";
import style from "@/styles/clientes.module.css";
import ClientSearchBox from "@/components/ClientSearchBox";
import { baseURL } from "@/utils/url";
import { useState, useEffect } from "react";
import { linhas, clearInputs, getKeyByValue } from "@/utils/utils";
import { getCookie } from "@/utils/cookie";
import { Cheques } from "@/apiServices/ChequeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cliente } from "@/apiServices/ClienteService";
import { Destino } from "@/apiServices/DestinoService";
export default function CadastroCheques() {
  const token = getCookie("token");

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [formValues, setFormValues] = useState({
    num: "",
    valor: "",
    data_rec: new Date(),
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
    data_destino: "",
  });
  const [clientList, setClientList] = useState();
  const [vendedorList, setVendedorList] = useState();
  const [destinoList, setDestinoList] = useState();
  const [qtdCheques, setQtdCheques] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState();

  // ---------------------------------- CHECKS FUNCTIONS ------------------------------------------------

  // INPUT HANDLING FOR NEW CHECKS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // HANDLES CHECK QTY STATE
  const changeCheckQuantity = (e) => {
    setQtdCheques(e.target.value);
  };

  // HANDLE CHECK INPUTS FIELD ADDITION
  const defineQtdCheques = (qtd) => {
    const inputs = [];
    for (let i = 0; i < qtd; i++) {
      inputs.push(
        <input
          type="text"
          name={`num${i}`}
          onChange={handleInputChange}
          id={`num${i}`}
          required
          placeholder={`Número do cheque ${i + 1}`}
          className="input numCheque"
          autoComplete="off"
        />
      );
    }
    return inputs;
  };

  // HANDLES CHECK(S) SUBMISSION - POST TO DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Cheques.addNewCheck(formValues, qtdCheques);
    response.map((res) => {
      if (res.status === 201) {
        notifySuccess(res.data);
      } else {
        notifyFailure(res.data);
      }
    });
    clearInputs("input");
  };

  // ---------------------------------- OTHER TABLES FUNCTIONS ------------------------------------------------

  // QUERY ALL CLIENTS
  async function getAllClients() {
    const { data } = await Cliente.getAllClients();
    if (data) {
      setClientList(data);
    }
  }

  // QUERY ALL SALESMEN
  async function getAllVendedores() {
    try {
      const response = await fetch(`${baseURL}/vendedores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        setVendedorList(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // QUERY ALL DESTINATIONS
  async function getAllDestinos() {
    const { data } = await Destino.getAllDestinos();
    if (data) {
      setDestinoList(data);
    }
  }

  // RETRIEVES INFORMATION AT FIRST
  useEffect(() => {
    getAllClients();
    getAllVendedores();
    getAllDestinos();
  }, []);

  // ---------------------------------- AUX FUNCTIONS ------------------------------------------------

  // AUX HANDLE CLICK FUNCTION TO FIND REGISTERED CLIENTS
  const handleClick = (e) => {
    const clientId = Number(e.target.value);

    const client = clientList.find((client) => client.id === clientId);

    const clientCode = document.getElementById("cliente_cod");
    clientCode.value = client.cod;

    if (client.vendedor) {
      const vendedorId = getKeyByValue(vendedorList, client.vendedor);
      setSelectedSeller(vendedorId);
      setFormValues({
        ...formValues,
        cliente_cod: clientCode.value,
        vendedor_id: vendedorId,
        client_id: clientId,
      });
    } else {
      setFormValues({
        ...formValues,
        cliente_cod: clientCode.value,
        client_id: clientId,
      });
    }

    document.getElementById("searchBox").style.display = "none";
    document.getElementById("cliente").value = e.target.innerHTML;
  };

  // AUX FUNCTION TO CLEAR INPUTS
  const handleClear = (e) => {
    e?.preventDefault();
    clearInputs("input");
  };

  // AUX
  const replicateData = async (className, increment, name) => {
    const dataList = document.getElementsByClassName(className);
    const valueToReply = dataList[0].value;
    const updatedFormValues = { ...formValues }; // Create a new object to store the updated form values

    for (let i = 1; i < dataList.length; i++) {
      dataList[i].value =
        Number(valueToReply) + (increment ? i : 0) || valueToReply;
      updatedFormValues[name + i] = dataList[i].value; // Update the new object instead of spreading the existing formValues
    }

    setFormValues(updatedFormValues); // Update the formValues with the new object containing all the values
  };

  // AUX REPLICATE CHECK NUMBERS FOR INPUT
  const replicateNumCheque = (e) => {
    e.preventDefault();
    replicateData("numCheque", true, "num");
  };

  // AUX DEFINTION OF CHECK VALUES ACCORDING TO QTY
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
          autoComplete="off"
        />
      );
    }
    return inputs;
  };

  // AUX VALUES REPLICATE
  const replicateValor = (e) => {
    e.preventDefault();
    replicateData("valorCheque", false, "valor");
  };

  // AUX
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
          autoComplete="off"
        />
      );
    }
    return inputs;
  };

  // AUX
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
  };

  // AUX
  const defineQtdLinha = (qtd) => {
    const inputs = [];
    for (let i = 0; i < qtd; i++) {
      inputs.push(
        <select
          className={`${style.select} input`}
          name={`linha${i}`}
          id={`linha${i}`}
          onChange={handleInputChange}
        >
          <option></option>
          {linhas.map((linha) => (
            <option value={linha} key={linha}>
              {linha}
            </option>
          ))}
        </select>
      );
    }
    return inputs;
  };

  // ---------------------------------- RENDER ELEMENTS --------------------------------------------
  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={handleSubmit}>
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
            autoComplete="off"
          />
        </div>

        <section className={`${style.formCtrCenter} ${style.formVarQtd}`}>
          <div className={style.inputCtrMultiple}>
            <h4>Número:</h4>
            {defineQtdCheques(qtdCheques)}
            <button
              className={`${style.button} ${style.smallerButton}`}
              onClick={replicateNumCheque}
            >
              Replicar Número
            </button>
          </div>

          <div className={style.inputCtrMultiple}>
            <h4>Valor:</h4>
            {defineQtdValores(qtdCheques)}
            <button
              className={`${style.button} ${style.smallerButton}`}
              onClick={replicateValor}
            >
              Replicar Valor
            </button>
          </div>

          <div
            className={`${style.inputCtrMultiple} ${style.date} ${style.vencimento}`}
          >
            <h4>Data de Vencimento:</h4>
            {defineQtdVencimentos(qtdCheques)}
          </div>

          <fieldset className={`${style.formCtr} ${style.paymentStatus}`}>
            <legend>Status de Pagamento</legend>
            <div className={`${style.inputCtrMultiple} ${style.date}`}>
              <h4>Compensação:</h4>
              {defineQtdComp(qtdCheques)}
            </div>

            <div className={`${style.inputCtrMultiple} ${style.linha}`}>
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

          <div className={style.inputCtr}>
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

          <div className={style.inputCtr}>
            <h4>Número do Pedido:</h4>
            <input
              type="number"
              name="pedido"
              id="pedido"
              onChange={handleInputChange}
              placeholder="Número do Pedido"
              className="input"
              autoComplete="off"
            />
          </div>

          <div className={style.inputCtr}>
            <h4>Vendedor</h4>
            <select
              name="vendedor_id"
              onChange={handleInputChange}
              placeholder="Selecione Vendedor"
              className={`${style.select} input`}
            >
              <option key="0"></option>
              {vendedorList?.map((seller) => (
                <option
                  key={seller.id}
                  value={seller.id}
                  selected={seller.id === selectedSeller}
                >
                  {seller.nome}
                </option>
              ))}
            </select>
          </div>
        </section>

        <h3 className={style.name}>Informações Adicionais</h3>
        <section className={style.formCtr}>
          <div className={style.inputCtr}>
            <h4>Destino</h4>
            <select
              name="destino_id"
              onChange={handleInputChange}
              placeholder="Selecione Vendedor"
              className={`${style.select} input`}
            >
              <option key="0"></option>
              {destinoList?.map((destino) => (
                <option key={destino.id} value={destino.id}>
                  {destino.nome}
                </option>
              ))}
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

          <div className={style.inputCtr}>
            <h4>Terceiro:</h4>
            <select
              className={`${style.select} input`}
              name="terceiro"
              id="terceiro"
              onChange={handleInputChange}
            >
              <option value={false}>Não</option>
              <option value={true}>Sim</option>
            </select>
          </div>

          <div className={`${style.inputCtr} ${style.obs}`}>
            <h4>Observação:</h4>
            <textarea
              name="obs"
              onChange={handleInputChange}
              className="input"
              autoComplete="off"
            />
          </div>
        </section>

        <section className={style.formCtr}>
          <button type="submit" className={style.button} id="adicionaCliente">
            Salvar
          </button>
          <button className={style.button} onClick={handleClear}>
            Limpar
          </button>
        </section>
      </form>
    </>
  );
}
