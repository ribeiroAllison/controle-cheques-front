"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import { Grupo } from "@/apiServices/GrupoService";
import { Vendedor } from "@/apiServices/VendedorService";
import { Cliente } from "@/apiServices/ClienteService";
import {
  convertToNumber,
} from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import tableStyle from "@/styles/Table.module.css";
import { Cheques } from "@/apiServices/ChequeService";
import { CaretUpDown, IdentificationCard } from "@phosphor-icons/react";
import ModalContact from "./ModalContact";
import uuid from "react-uuid";

export default function ClientTable() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  // STATES
  const [contact, setContact] = useState();
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

    //HANDLE CLICK ON CLIENT CONTACT
    const handleContactClick = (client) => {
      setContact({
        nome: client.cliente,
        contato: client.contato || "",
        telefone: client.telefone || "",
        email: client.email || "",
      });
      const editWindow = document.getElementById("contactWindowBackground");
      editWindow.style.display = "flex";
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
              <th>Grupo </th>
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
              <th>Valor Excedido</th>
              <th>Contato</th>
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
                <tr key={uuid()} data-cod={client.id}>
                  <td>{client.cod}</td>
                  <td id={`client${client.cod}`}>{client.cliente}</td>
                  <td id={`grupo${client.cod}`}>{client.grupo}</td>
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
                  <td 
                    id={`delta${client.cod}`} 
                    className={`
                      ${client.saldo} 
                      ${client.saldo > client.credito && tableStyle.delta}`
                    }
                  >
                  {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(client.saldo - client.credito)}
                  </td>
                  <td>
                  <IdentificationCard
                    className={tableStyle.Icon}
                    size={32}
                    color="black"
                    onClick={() => handleContactClick(client)}
                  />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ModalContact contact={contact} />
    </>
  );
}
