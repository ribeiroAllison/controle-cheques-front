"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import ModalCadastro from "@/components/ModalCadastro";
import { Grupo } from "@/apiServices/GrupoService";
import { Vendedor } from "@/apiServices/VendedorService";
import { Cliente } from "@/apiServices/ClienteService";
import clearInputs from "@/utils/clearInputs";
import {
  getKeyByValue,
  convertToNumber,
} from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import tableStyle from "@/styles/Table.module.css";
import { Cheques } from "@/apiServices/ChequeService";
import { CaretUpDown } from "@phosphor-icons/react";

export default function ClientTable() {
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
  const [sortOrder, setSortOrder] = useState({
    column: null,
    direction: 'asc'
  })

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
          saldo: totalValueClient,
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

  //SORT ROWS BY NAME OR VALUE
  const handleSort = (column) => {
    const isAscending = sortOrder.column === column && sortOrder.direction === 'asc';
  
    // Sort the data based on the selected column
    const sortedData = [...filteredList].sort((a, b) => {
      if (column === 'credito' || column == 'saldo') {
        // Sort by numeric columns in descending order
        return isAscending ? a[column] - b[column] : b[column] - a[column];
      } else if (column === 'cliente' || column === 'cod') {
        // Sort by string columns in ascending order
        return isAscending ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
      }
      // Add similar cases for other columns if needed
    });
  
    // Update the state with the new sorting order and data
    setSortOrder({
      column,
      direction: isAscending ? 'desc' : 'asc',
    });
    setFilteredList(sortedData);
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


  //------------------------------------ RENDER --------------------------------------------
  return (
    <>
      

      {/* TABLE SECTION */}

      <HeaderLine name="Clientes com limite ultrapassado" />
      <div className={tableStyle.tableWrapper}>
        <table className={tableStyle.table}>
          <thead>
            <tr>
              <th>
                Código do Cliente 
                <CaretUpDown 
                  size={15} 
                  color='white' 
                  onClick={() => handleSort('cod')}
                  className={tableStyle.thIcon}
                />
              </th>
              <th>
                Nome 
                <CaretUpDown 
                  size={15} 
                  color='white' 
                  onClick={() => handleSort('cliente')}
                  className={tableStyle.thIcon}
                />
              </th>
              <th>CPF / CNPJ</th>
              <th>Grupo </th>
              <th> Vendedor </th>
              <th>Limite 
                <CaretUpDown 
                size={15} 
                color='white' 
                onClick={() => handleSort('credito')}
                className={tableStyle.thIcon}
                />
                
              </th>
              <th>
                Saldo Aberto 
                <CaretUpDown 
                  size={15} 
                  color='white' 
                  onClick={() => handleSort('saldo')}
                  className={tableStyle.thIcon}
                />
              </th>
              <th>Editar </th>
              <th>Excluir </th>
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
                client.credito < client.saldo &&
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
                  <td 
                    id={`saldo${client.cod}`} 
                    className={`
                      ${client.saldo} 
                      ${client.saldo > client.credito && tableStyle.negativo}`
                    }
                  >
                  {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(client.saldo)}
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
