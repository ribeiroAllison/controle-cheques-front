"use client";

import { useState, useEffect } from "react";
import ClientSearchBox from "@/components/ClientSearchBox";
import ButtonAlternative from "@/components/ButtonAlternative";
import { Cheques } from "@/apiServices/ChequeService";
import { Cliente } from "@/apiServices/ClienteService";
import { baseURL } from "@/utils/url";
import { clearInputs, getKeyByValue } from "@/utils/utils";
import { getCookie } from "@/utils/cookie";
import style from "@/styles/clientes.module.css";
import styles from "@/styles/chequeCadastro.module.css";
import { ToastContainer, toast } from "react-toastify";

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

  // RETRIEVES INFORMATION AT FIRST
  useEffect(() => {
    getAllClients();
    getAllVendedores();
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

  // ---------------------------------- RENDER ELEMENTS --------------------------------------------
  return (
    <>
      <ToastContainer autoClose={2000} />
      <section className={styles.cadastroWrapper}>
        <h1 className={styles.title}>Dados do Cheque</h1>
        <form onSubmit={handleSubmit} className={styles.checkForm}>
          <div>
            <div className={styles.formLine}>
              <div className={styles.formField}>
                <label htmlFor="checkQty">Quantidade de Cheques</label>
                <select
                  name="checkQty"
                  onChange={changeCheckQuantity}
                  className={styles.select}
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
                <input
                  type="date"
                  name="data_rec"
                  onChange={handleInputChange}
                  id="data_rec"
                  required
                  className="input"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="tipo">Tipo de Pagamento:</label>
                <input
                  type="text"
                  name="tipo"
                  onChange={handleInputChange}
                  defaultValue="Cheque"
                  autoComplete="off"
                />
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

          <section className={styles.salesDataWrapper} id="clienteForm">
            <h3 className={styles.salesTitle}>Dados da Venda</h3>
            <div className={styles.formSection}>
              <div className={styles.formInputFields}>
                <div className={styles.formLine}>
                  <ClientSearchBox
                    clientList={clientList}
                    formValues={formValues}
                    handleInputChange={handleInputChange}
                    handleClick={handleClick}
                    required={true}
                  />

                  <div className={styles.inputCtr}>
                    <label htmlFor="cliente_cod">Código do Cliente:</label>
                    <input
                      type="text"
                      name="cliente_cod"
                      id="cliente_cod"
                      onChange={handleInputChange}
                      disabled
                      className="input"
                    />
                  </div>
                </div>

                <div className={styles.formLine}>
                  <div className={styles.inputCtr}>
                    <label htmlFor="pedido">Número do Pedido:</label>
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

                  <div className={styles.inputCtr}>
                    <label htmlFor="vendedor_id">Vendedor</label>
                    <select
                      name="vendedor_id"
                      onChange={handleInputChange}
                      placeholder="Selecione Vendedor"
                      className={`${styles.select} input`}
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
                </div>
              </div>
              <div className={styles.formLine}>
                <div className={`${styles.inputCtr}`}>
                  <label htmlFor="obs">Observação:</label>
                  <textarea
                    name="obs"
                    onChange={handleInputChange}
                    className="input"
                    autoComplete="off"
                  />
                </div>
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
