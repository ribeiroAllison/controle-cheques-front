"use client";

import HeaderLine from "@/components/HeaderLine";
import SearchFilter from "@/components/SearchFilter";
import { useState, useEffect } from "react";
import { getKeyByValue, showAddForm } from "@/utils/utils";
import { Cliente } from "@/apiServices/ClienteService";
import ModalCadastro from "@/components/ModalCadastro";
import clearInputs from "@/utils/clearInputs";
import style from "@/styles/clientes.module.css";
import styles from "@/styles/Table.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grupo } from "@/apiServices/GrupoService";
import { Vendedor } from "@/apiServices/VendedorService";
import Button from "@/components/Button";

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
      setClientList(data);
      setFilteredList(data);
    }
  };

  // ADDS A NEW CLIENT
  const createNewClient = async (e) => {
    e.preventDefault();
    const treatDoc = (client) => {
      return client.replace(/[^\d]+/g, "");
    };

    for (let client of clientList) {
      if (treatDoc(client.doc) === treatDoc(formValues.doc)) {
        alert(
          `Cliente com esse CPF/CNPJ já cadastrado com nome de ${client.cliente}`
        );
        clearInputs();
        return;
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

  // QUERY FROM DB TO RETRIEVE CLIENTS SERIAL_ID
  const getAllSerialId = async () => {
    const { data } = await Cliente.getAllSerialId();
    if (data) {
      setClientSerialId(data);
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
        await Promise.all([
          getAllClients(),
          getAllSerialId(),
          getGrupos(),
          getVendedores(),
        ]);
      } catch (error) {
        return error.response;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <section>
        <div className={style.menuWrapper}>
          <div className={style.menuHeader}>
            <h3 className={style.name}>Cadastro de Clientes</h3>
            <Button id="addButton" onClick={showAddForm}>
              Novo Cliente
            </Button>
          </div>
          <SearchFilter
            name="Cliente"
            list={clientList}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            param="cliente"
          />
        </div>
        <form className={style.formCtr} onSubmit={createNewClient} id="addForm">
          <div className={style.inputCtr}>
            <h4>Código:</h4>
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
          <div className={`${style.nameCtr} ${style.inputCtr}`}>
            <h4>Nome:</h4>
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
            <h4>CPF/CNPJ:</h4>
            <input
              type="text"
              name="doc"
              className="input"
              onChange={handleInputChange}
              id="doc"
              required
              placeholder="Digite CPF ou CNPJ"
              autoComplete="off"
            />
          </div>
          <div className={`${style.nameCtr} ${style.inputCtr}`}>
            <h4>Grupo:</h4>
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
          <div className={`${style.nameCtr} ${style.inputCtr}`}>
            <h4>Vendedor:</h4>
            <select
              id="vendedor"
              name="vendedor"
              className={`${style.select} input`}
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
            <h4>Status:</h4>
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

          <div className={style.butonCtr}>
            <fieldset>
              <legend>Dados de Contato</legend>
              <div className={`${style.nameCtr} ${style.inputCtr}`}>
                <h4>Nome do Contato:</h4>
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
              <div className={`${style.inputCtr}`}>
                <h4>Telefone:</h4>
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
              <div className={`${style.inputCtr}`}>
                <h4>E-mail:</h4>
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
            </fieldset>
            <button className={style.button} id="adicionaCliente" type="submit">
              Adicionar
            </button>
            <button className={style.button} id="limpar" onClick={handleClear}>
              Limpar
            </button>
          </div>
        </form>
      </section>
      <HeaderLine name="Clientes" />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código do Cliente</th>
              <th>Nome</th>
              <th>CPF / CNPJ</th>
              <th>Grupo</th>
              <th>Vendedor</th>
              <th>Status</th>
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
                <tr key={client.cod} data-cod={client.id}>
                  <td>{client.cod}</td>
                  <td id={`client${client.cod}`}>{client.cliente}</td>
                  <td id={`doc${client.cod}`}>{client.doc}</td>
                  <td id={`grupo${client.cod}`}>{client.grupo}</td>
                  <td id={`vendedor${client.cod}`}>{client.vendedor}</td>
                  <td id={`status${client.cod}`} className={client.status}>
                    {client.status}
                  </td>
                  <td>
                    {" "}
                    <img
                      src="/images/edit.svg"
                      onClick={handleEdit}
                      name={client.id}
                    />
                  </td>
                  <td>
                    {" "}
                    <img src="/images/trash-bin.svg" onClick={handleDelete} />
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
