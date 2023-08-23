"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import SearchFilter from "@/components/SearchFilter";
import ButtonAlternative from "@/components/ButtonAlternative";
import { Destino } from "@/apiServices/DestinoService";
import { hideAddForm, showAddForm } from "@/utils/utils";
import clearInputs from "@/utils/clearInputs";
import ModalName from "@/components/ModalName";
import styles from "@/styles/destino.module.css";
import tableStyle from "@/styles/Table.module.css";
import { ToastContainer, toast } from "react-toastify";


export default function Destinos() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  //STATES
  const [formValues, setFormValues] = useState({ nome: "" });
  const [destinos, setDestinos] = useState([]);
  const [filteredList, setFilteredList] = useState();
  const [editId, setEditId] = useState();

  // ----------------------------------- DESTINATION FUNCTIONS---------------------------------------

  // QUERY ALL DESTINATIONS IN DB
  async function getAllDestinos() {
    const { data } = await Destino.getAllDestinos();
    if (data) {
      setDestinos(data);
      setFilteredList(data);
    }
  }

  // CREATE A NEW DESTINATION
  const createDestination = async (e) => {
    e.preventDefault();
    const response = await Destino.createNewDestino(formValues);
    if (response && response.status === 201) {
      getAllDestinos();
      notifySuccess(response.data);
    } else {
      notifyFailure(response.data);
    }

    const addButton = document.getElementById("addButton");
    addButton.style.display = "block";

    const addForm = document.getElementById("addForm");
    addForm.style.display = "none";
  };

  // DELETE A DESTINATION
  const handleDelete = async (e) => {
    const confirmation = confirm("Você realmente deseja apagar esse destino?");
    const id = e.target.closest("tr").getAttribute("data-cod");

    if (confirmation) {
      const response = await Destino.deleteDestino(id);
      if (response && response.status === 201) {
        getAllDestinos();
        notifySuccess(response.data);
      } else {
        notifyFailure(response.data);
      }
    }
  };

  // HANDLE INPUT EDIT DESTINATION
  const handleEdit = (e) => {
    const id = e.target.name;
    setEditId(id);
    const destino = destinos.find((destino) => destino.id === Number(id));

    if (destino) {
      const nome = destino.nome;

      setFormValues({
        ...formValues,
        nome: nome,
      });

      const editWindow = document.getElementById("editWindowBackground");
      editWindow.style.display = "flex";
    }
  };

  // SUBMIT DESTINATIONS EDIT TO DB
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const nome = formValues.nome;
    const id = editId;

    const response = await Destino.editDestino(id, nome);
    if (response && response.status === 200) {
      getAllDestinos();
      clearInputs("input");
      notifySuccess(response.data);
    } else {
      notifyFailure(response.data);
    }

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  // ----------------------------------- AUXILIARY FUNCTIONS ---------------------------------------

  // CLEAR INPUTS HANDLING
  const handleClear = (e) => {
    e.preventDefault();
    clearInputs("input");
  };

  // INPUT HANDLING
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    getAllDestinos();
  }, []);

  return (
    <>
      <section className={styles.menuContainer}>
        <ToastContainer autoClose={2000} />
        <div className={styles.menuWrapper}>
          <div className={styles.menuHeader}>
            <h2 className={styles.name}>Cadastro de Destinos</h2>
            <ButtonAlternative id="addButton" onClick={showAddForm}>
              Novo Destino
            </ButtonAlternative>
          </div>
          <SearchFilter
            name="Destino"
            list={destinos}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            param="nome"
            placeHolder="Procurar destino"
          />
        </div>

        <form
          className={styles.destinationForm}
          id="addForm"
          onSubmit={createDestination}
        >
          <div className={styles.destinationFormHeader}>
            <span>Dados do Destino</span>
            <ButtonAlternative
              style={{ backgroundColor: "var(--redTd)" }}
              onClick={hideAddForm}
            >
              Voltar
            </ButtonAlternative>
          </div>

          <div className={`${styles.inputCtr}`}>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              onChange={handleInputChange}
              id="nome"
              className="input"
              required
              placeholder="Nome de Destinos de Cheques"
              autoComplete="off"
            />
          </div>

          <div className={styles.btnContainer}>
            <ButtonAlternative
              id="adicionaCliente"
              type="submit"
            >
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
        </form>

        <HeaderLine name="Destinos" />
        <div className={tableStyle.tableWrapper}>
          <table className={tableStyle.table} id={styles.smallTable}>
            <thead>
              <tr>
                <th>Destino</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {!filteredList ? (
                <tr>
                  <td colSpan={3}>
                    <img id="loading" src="/images/loading.gif" />
                  </td>
                </tr>
              ) : (
                filteredList.map((destino) => (
                  <tr key={destino.nome} data-cod={destino.id}>
                    <td id={destino.id}>{destino.nome}</td>
                    <td onClick={handleEdit}>
                      <img name={destino.id} src="/images/edit.svg" />
                    </td>
                    <td name={destino.nome} onClick={handleDelete}>
                      <img src="/images/trash-bin.svg" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <ModalName
        name="Destinos"
        submitEdit={handleSubmitEdit}
        handleInputChange={handleInputChange}
        formValues={formValues}
      />
    </>
  );
}
