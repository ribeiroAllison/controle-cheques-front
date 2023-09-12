"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import SearchFilter from "@/components/SearchFilter";
import ModalCadastro from "@/components/ModalCadastro";
import ButtonAlternative from "@/components/ButtonAlternative";
import { Grupo } from "@/apiServices/GrupoService";
import { Vendedor } from "@/apiServices/VendedorService";
import { Cliente } from "@/apiServices/ClienteService";
import clearInputs from "@/utils/clearInputs";
import {
  getKeyByValue,
  showAddForm,
  hideAddForm,
  convertToNumber,
} from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import tableStyle from "@/styles/Table.module.css";
import style from "@/styles/clientes.module.css";
import { Cheques } from "@/apiServices/ChequeService";

export default function Clientes() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  // STATES
  const [formValues, setFormValues] = useState({
    codigo: "",
    nome: "",
    doc: "",
    status: "",
    grupo: "",
    vendedor_id: "",
    contato: "",
    telefone: "",
    email: "",
    credito: "",
  });

  const [clientList, setClientList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [grupoList, setGrupoList] = useState([]);
  const [vendedorList, setVendedorList] = useState([]);

  // --------------------------------- CLIENTS FUNCTIONS ------------------------------------

  //GET ALL CLIENTS FROM DB
  const getAllClients = async () => {
    const { data } = await Cliente.getAllClients();
    if (data) {
      calculateChequeValues(data)
        .then((updatedClientList) => {
          setClientList(updatedClientList);
          setFilteredList(updatedClientList);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // ADDS A NEW CLIENT
  const createNewClient = async (e) => {
    e.preventDefault();
    const treatDoc = (client) => {
      return client.replace(/[^\d]+/g, "");
    };

    for (let client of clientList) {
      if (client.doc) {
        if (treatDoc(client.doc) === treatDoc(formValues.doc)) {
          alert(
            `Cliente com esse CPF/CNPJ já cadastrado com nome de ${client.cliente}`
          );
          clearInputs();
          return;
        }
      }
    }

    const response = await Cliente.createClient(formValues);
    if (response && response.status === 201) {
      clearInputs("input");
      getAllClients();
      notifySuccess(response.data);
    } else {
      notifyFailure(response.data);
    }

    const addForm = document.getElementById("addForm");
    addForm.style.display = "none";

    const addButton = document.getElementById("addButton");
    addButton.style.display = "block";
  };

  // EDITS CLIENT IN DB
  const submitEdit = async (e) => {
    e.preventDefault();

    const {
      codigo,
      doc,
      nome,
      status,
      grupo,
      contato,
      telefone,
      email,
      vendedor_id,
      credito,
      id,
    } = formValues;

    const user = {
      grupoId: grupo,
      cod: codigo,
      doc: doc,
      nome: nome,
      status: status,
      contato: contato,
      telefone: telefone,
      email: email,
      vendedor_id: vendedor_id,
      credito: credito,
      id: id,
    };

    const response = await Cliente.editClient(user);
    if (response && response.status === 200) {
      getAllClients();
      notifySuccess(response.data);

      setFormValues({
        codigo: "",
        nome: "",
        doc: "",
        status: "",
        grupo: "",
        vendedor_id: "",
        contato: "",
        telefone: "",
        email: "",
        id: "",
        credito: "",
      });
    } else {
      notifyFailure(response.data);
    }

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  // DELETE CLIENT FUNCTION
  const handleDelete = async (e) => {
    const cod = e.target.closest("tr").getAttribute("data-cod");
    const confirmation = confirm("Você realmente quer apagar este cliente?");
    if (confirmation) {
      const response = await Cliente.deleteClient(cod);
      if (response && response.status === 201) {
        getAllClients();
        notifySuccess(response.data);
      } else {
        notifyFailure(response.data);
      }
    }
  };

  // GET TOTAL VALUE PER CLIENT
  const calculateChequeValues = async (clientList) => {
    try {
      const { data } = await Cheques.getAllCheques();

      const updatedClientList = clientList.map((item) => {
        const totalValueClient = data
          .filter((cheque) => cheque.cliente_id === item.id)
          .reduce((acc, cheque) => {
            acc += convertToNumber(cheque.valor);
            return acc;
          }, 0);
        const newItem = {
          ...item,
          saldo: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalValueClient),
        };
        return newItem;
      });
      return updatedClientList;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // --------------------------------- AUXILIARY FUNCTIONS ------------------------------------

  // HANDLE INPUT CHANGE IN CLIENT FORM
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // GET GROUPS FUNCTION
  async function getGrupos() {
    try {
      const response = await Grupo.getAllGrupos();
      if (response) {
        setGrupoList(response.data);
      }
    } catch (error) {
      notifyFailure(response.data);
    }
  }

  // GET VENDEDORES FUNCTION
  async function getVendedores() {
    try {
      const response = await Vendedor.getAllVendedores();
      if (response) {
        setVendedorList(response.data);
      }
    } catch (error) {
      notifyFailure(error.message);
    }
  }

  // HANDLING EDITING FIELDS
  const handleEdit = (e) => {
    const id = Number(e.target.name);
    const client = clientList.find((client) => client.id === id);

    if (client) {
      const {
        cliente,
        doc,
        status,
        grupo,
        vendedor,
        contato,
        email,
        telefone,
        id,
        credito,
        cod,
      } = client;
      const grupo_id = getKeyByValue(grupoList, grupo);
      const vendedor_id = getKeyByValue(vendedorList, vendedor);

      setFormValues({
        ...formValues,
        codigo: cod,
        nome: cliente,
        doc: doc,
        status: status,
        grupo: grupo_id,
        vendedor_id: vendedor_id,
        contato: contato,
        email: email,
        telefone: telefone,
        credito: credito,
        id: id,
      });
      const editWindow = document.getElementById("editWindowBackground");
      editWindow.style.display = "flex";
    }
  };

  // CHANGES INPUT SECTION TO EDIT SECTION
  const handleClear = (e) => {
    e.preventDefault();
    clearInputs("input");

    setFormValues({
      codigo: "",
      nome: "",
      doc: "",
      status: "",
      grupo: "",
      vendedor_id: "",
      contato: "",
      email: "",
      telefone: "",
    });
  };

  // --------------------------------- USE EFFECTS ------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAllClients(), getGrupos(), getVendedores()]);
      } catch (error) {
        return error.response;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <section className={style.menuContainer}>
        <div className={style.menuWrapper}>
          <div className={style.menuHeader}>
            <h1>Cadastro de Clientes</h1>
            <ButtonAlternative id="addButton" onClick={showAddForm}>
              Novo Cliente
            </ButtonAlternative>
          </div>
        </div>
        <form
          className={style.clientForm}
          onSubmit={createNewClient}
          id="addForm"
        >
          <div className={style.clientFormHeader}>
            <h2>Dados do Cliente</h2>
            <ButtonAlternative
              style={{ backgroundColor: "var(--redTd)" }}
              onClick={hideAddForm}
            >
              Voltar
            </ButtonAlternative>
          </div>
          <div className={style.formLine}>
            <div className={style.inputCtr}>
              <label htmlFor="codigo">Código:</label>
              <input
                type="text"
                name="codigo"
                className="input"
                onChange={handleInputChange}
                id="codigo"
                placeholder="Código do Cliente"
                autoComplete="off"
              />
            </div>
            <div className={`${style.inputCtr}`}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                className="input"
                onChange={handleInputChange}
                id="nome"
                required
                placeholder="Nome do Cliente"
                autoComplete="off"
              />
            </div>
            <div className={style.inputCtr}>
              <label htmlFor="doc">CPF/CNPJ:</label>
              <input
                type="text"
                name="doc"
                className="input"
                onChange={handleInputChange}
                id="doc"
                placeholder="Digite CPF ou CNPJ"
                autoComplete="off"
              />
            </div>
            <div className={style.inputCtr}>
              <label htmlFor="credito">Limite de Crédito:</label>
              <input
                type="number"
                name="credito"
                className="input"
                onChange={handleInputChange}
                id="credito"
                placeholder="Limite em R$"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={style.formLine}>
            <div className={`${style.inputCtr}`}>
              <label htmlFor="grupo">Grupo:</label>
              <select
                id="grupo"
                name="grupo"
                className={`${style.select} input`}
                onChange={handleInputChange}
              >
                <option></option>
                {grupoList.length > 0
                  ? grupoList.map((emp) => {
                      return (
                        <option key={emp.id} value={emp.id}>
                          {emp.nome}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className={style.inputCtr}>
              <label htmlFor="vendedor">Vendedor:</label>
              <select
                id="vendedor"
                name="vendedor"
                className={style.select}
                onChange={handleInputChange}
              >
                <option></option>
                {vendedorList.length > 0
                  ? vendedorList?.map((vend) => {
                      return (
                        <option key={vend.id} value={vend.id}>
                          {vend.nome}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className={style.inputCtr}>
              <label htmlFor="status">Status:</label>
              <select
                className={`${style.select} input`}
                id="status"
                name="status"
                value={formValues.status}
                onChange={handleInputChange}
              >
                <option></option>
                <option>Bom</option>
                <option>Médio</option>
                <option>Ruim</option>
              </select>
            </div>
          </div>
          <div className={style.contactArea}>
            <fieldset className={style.fieldset}>
              <p>Dados de Contato:</p>
              <div className={style.fieldsWrapper}>
                <div className={style.inputCtr}>
                  <label htmlFor="contato">Nome do Contato:</label>
                  <input
                    type="text"
                    name="contato"
                    className="input"
                    onChange={handleInputChange}
                    id="contato"
                    placeholder="Digite o Nome"
                    autoComplete="off"
                  />
                </div>
                <div className={style.inputCtr}>
                  <label htmlFor="telefone">Telefone:</label>
                  <input
                    type="text"
                    name="telefone"
                    className="input"
                    onChange={handleInputChange}
                    id="telefone"
                    placeholder="Telefone do Cliente"
                    autoComplete="off"
                  />
                </div>
                <div className={style.inputCtr}>
                  <label htmlFor="email">E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    onChange={handleInputChange}
                    id="email"
                    placeholder="Email do Cliente"
                    autoComplete="off"
                  />
                </div>
              </div>
            </fieldset>
            <div className={style.btnContainer}>
              <ButtonAlternative id="adicionaCliente" type="submit">
                Adicionar
              </ButtonAlternative>
              <ButtonAlternative
                id="limpar"
                onClick={handleClear}
                style={{ backgroundColor: "var(--orangeTd" }}
              >
                Limpar
              </ButtonAlternative>
            </div>
          </div>
        </form>
        <SearchFilter
          name="Cliente"
          list={clientList}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
          param="cliente"
          param2="cod"
          placeHolder="Procurar cliente"
        />
      </section>
      <HeaderLine name="Clientes" />
      <div className={tableStyle.tableWrapper}>
        <table className={tableStyle.table}>
          <thead>
            <tr>
              <th>Código do Cliente</th>
              <th>Nome</th>
              <th>CPF / CNPJ</th>
              <th>Grupo</th>
              <th>Vendedor</th>
              <th>Limite</th>
              <th>Saldo Aberto</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {!filteredList ? (
              <tr>
                <td colSpan={8}>
                  <img id="loading" src="/images/loading.gif" />
                </td>
              </tr>
            ) : (
              filteredList?.map((client) => (
                <tr key={client.id} data-cod={client.id}>
                  <td>{client.cod}</td>
                  <td id={`client${client.cod}`}>{client.cliente}</td>
                  <td id={`doc${client.cod}`}>{client.doc}</td>
                  <td id={`grupo${client.cod}`}>{client.grupo}</td>
                  <td id={`vendedor${client.cod}`}>{client.vendedor}</td>
                  <td id={`credito${client.cod}`} className={client.credito}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(client.credito)}
                  </td>
                  <td id={`saldo${client.cod}`} className={client.saldo}>
                    {client.saldo}
                  </td>
                  <td>
                    <img
                      src="/images/edit.svg"
                      onClick={handleEdit}
                      name={client.id}
                      className={tableStyle.Icon}
                    />
                  </td>
                  <td>
                    <img
                      src="/images/trash-bin.svg"
                      onClick={handleDelete}
                      className={tableStyle.Icon}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ModalCadastro
        name="Clientes"
        submitEdit={submitEdit}
        handleInputChange={handleInputChange}
        formValues={formValues}
        grupo={grupoList}
        vendedores={vendedorList}
        clearInputs={clearInputs}
        setFormValues={setFormValues}
      />
    </>
  );
}
