"use client";

import { useState, useEffect } from "react";
import ClientSearchBox from "@/components/ClientSearchBox";
import ButtonAlternative from "@/components/ButtonAlternative";
import { InputForms } from "@/components/InputForms";
import { Cheques } from "@/apiServices/ChequeService";
import { Cliente } from "@/apiServices/ClienteService";
import { Vendedor } from "@/apiServices/VendedorService";
import { Tipo } from "@/apiServices/TipoService";
import {
  clearInputs,
  convertToNumber,
  getKeyByValue,
} from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import styles from "@/styles/chequeCadastro.module.css";

export default function CadastroCheques() {
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
  const [qtdCheques, setQtdCheques] = useState(1);
  const [tipos, setTipos] = useState();
  const [selectedClient, setSelectedClient] = useState();
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
        <InputForms
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

    const { totalValueClient, credito } = await getValueByClient();
    let total = 0;

    for(let i = 0; i < qtdCheques; i++) {
      let fieldName = `valor${i}`;
      let fieldValue = formValues[fieldName];

      if(!isNaN(parseFloat(fieldValue))){
        total += parseFloat(fieldValue);
      }
    }

    console.log(total);

    if (credito && (totalValueClient + total) > credito) {
      notifyFailure(
        `Limite de crédito de ${credito} foi ultrapassado!`
      );
    }
    const response = await Cheques.addNewCheck(formValues, qtdCheques);
    response.forEach((res) => {
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
    try {
      const { data } = await Cliente.getAllClients();
      if (data) {
        setClientList(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // QUERY ALL SALESMEN
  async function getAllVendedores() {
    try {
      const { data } = await Vendedor.getAllVendedores();
      if (data) {
        setVendedorList(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // QUERY ALL PAYMENT TYPES
  async function getAllTipos() {
    try {
      const { data } = await Tipo.getAllTipos();
      if (data) {
        setTipos(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ---------------------------------- AUX FUNCTIONS ------------------------------------------------

  // AUX HANDLE CLICK FUNCTION TO FIND REGISTERED CLIENTS
  const handleClick = (e) => {
    const clientId = Number(e.target.value);

    setSelectedClient(clientId);
    const client = clientList.find((client) => client.id === clientId);
    const clientCode = document.getElementById("cliente_cod");
    clientCode.value = client.cod;
    const vendedorName = document.getElementById("vendedor_name");

    if (client.vendedor) {
      vendedorName.value = client.vendedor;
      const vendedorId = getKeyByValue(vendedorList, client.vendedor);
      setSelectedSeller(vendedorId);
      setFormValues({
        ...formValues,
        cliente_cod: clientCode.value,
        vendedor_id: vendedorId,
        client_id: clientId,
      });
    } else {
      setSelectedSeller("");
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
        <InputForms
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
        <InputForms
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

  // GET TOTAL VALUE PER CLIENT
  const getValueByClient = async () => {
    const cliente = clientList.filter((item) => item.id === selectedClient);

    const { data } = await Cheques.getSearchedCheques({
      cliente_id: cliente[0].id,
    });
    const credito = cliente[0].credito;
    const totalValueClient = data.reduce((acc, item) => {
      acc += convertToNumber(item.valor);
      return acc;
    }, 0);

    const resultObj = {
      credito,
      totalValueClient
    }

    return resultObj;
  };

  // EFFECTS
  useEffect(() => {
    getAllClients();
    getAllVendedores();
    getAllTipos();
  }, []);

  // ---------------------------------- RENDER ELEMENTS --------------------------------------------
  return (
    <>
      <h1 className={styles.title}>Dados do Cheque</h1>
      <section>
        <ToastContainer autoClose={2000} />
        <form onSubmit={handleSubmit} className={styles.checkForm}>
          <div className={styles.formInputsWrapper}>
            <div className={styles.formLine}>
              <div className={styles.formField}>
                <label htmlFor="checkQty">Quantidade de Cheques</label>
                <select
                  name="checkQty"
                  onChange={changeCheckQuantity}
                  className={`${styles.select} input`}
                >
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
              </div>
              <div className={styles.formField}>
                <label htmlFor="data_rec">Data de Recebimento:</label>
                <InputForms
                  type="date"
                  name="data_rec"
                  onChange={handleInputChange}
                  id="data_rec"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="tipo_id">Tipo</label>
                <select
                  name="tipo_id"
                  onChange={handleInputChange}
                  placeholder="Selecione Tipo"
                  className={`${styles.select} input`}
                >
                  <option key="0"></option>
                  {tipos?.map((tipo) => (
                    <option key={tipo.nome} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <section className={styles.checkMultiplerWrapper}>
              <div className={styles.inputCtrMultiple}>
                <h4>Número:</h4>
                {defineQtdCheques(qtdCheques)}
                <ButtonAlternative onClick={replicateNumCheque}>
                  Replicar Número
                </ButtonAlternative>
              </div>

              <div className={styles.inputCtrMultiple}>
                <h4>Valor:</h4>
                {defineQtdValores(qtdCheques)}
                <ButtonAlternative onClick={replicateValor}>
                  Replicar Valor
                </ButtonAlternative>
              </div>

              <div className={`${styles.inputCtrMultiple}`}>
                <h4>Data de Vencimento:</h4>
                {defineQtdVencimentos(qtdCheques)}
              </div>
            </section>
          </div>

          <section className={styles.salesDataContainer} id="clienteForm">
            <h3 className={styles.salesTitle}>Dados da Venda</h3>
            <div className={styles.inputFieldsLine}>
              <div className={styles.inputField}>
                <div className={styles.searchContainer}>
                  <ClientSearchBox
                    clientList={clientList}
                    formValues={formValues}
                    handleInputChange={handleInputChange}
                    handleClick={handleClick}
                    required={true}
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="cliente_cod">Código do Cliente:</label>
                <InputForms
                  type="text"
                  name="cliente_cod"
                  id="cliente_cod"
                  onChange={handleInputChange}
                  disabled
                  className="input"
                />
              </div>
            </div>

            <div className={styles.inputFieldsLine}>
              <div className={styles.formField}>
                <label htmlFor="pedido">Número do Pedido:</label>
                <InputForms
                  type="number"
                  name="pedido"
                  id="pedido"
                  onChange={handleInputChange}
                  placeholder="Número do Pedido"
                  autoComplete="off"
                  className="input"
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="vendedor_id">Vendedor:</label>
                <select
                  id="vendedor"
                  name="vendedor_id"
                  onChange={handleInputChange}
                  placeholder="Selecione Vendedor"
                  className={`${styles.select} input`}
                >
                  <option key="0" id="vendedor_name"></option>
                  {vendedorList?.map((seller) => (
                    <option
                      key={seller.nome}
                      value={seller.id}
                      selected={seller.id === selectedSeller}
                    >
                      {seller.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.textAreaContainer}>
              <div className={`${styles.textAreaWrapper}`}>
                <label htmlFor="obs">Observação:</label>
                <textarea
                  name="obs"
                  onChange={handleInputChange}
                  className="input"
                  autoComplete="off"
                />
              </div>
            </div>

            <section className={styles.btnContainer}>
              <ButtonAlternative type="submit" id="adicionaCliente">
                Salvar
              </ButtonAlternative>
              <ButtonAlternative
                style={{ backgroundColor: "var(--orangeTd)" }}
                onClick={handleClear}
              >
                Limpar
              </ButtonAlternative>
            </section>
          </section>
        </form>
      </section>
    </>
  );
}
