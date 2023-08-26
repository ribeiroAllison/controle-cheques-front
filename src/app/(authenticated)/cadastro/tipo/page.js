"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import SearchFilter from "@/components/SearchFilter";
import ButtonAlternative from "@/components/ButtonAlternative";
import { Tipo } from "@/apiServices/TipoService";
import { hideAddForm, showAddForm } from "@/utils/utils";
import clearInputs from "@/utils/clearInputs";
import ModalName from "@/components/ModalName";
import styles from "@/styles/tipo.module.css";
import tableStyle from "@/styles/Table.module.css";
import { ToastContainer, toast } from "react-toastify";



export default function Tipos() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  //STATES
  const [formValues, setFormValues] = useState({ nome: "" });
  const [tipos, setTipos] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [editId, setEditId] = useState();

  // ----------------------------------- DESTINATION FUNCTIONS---------------------------------------

  // QUERY ALL DESTINATIONS IN DB
  async function getAllTipos() {
    try{
        const { data } = await Tipo.getAllTipos();
        if (data) {
            setTipos(data);
            setFilteredList(data);
        }
    } catch(error){
        console.log(error);
        notifyFailure('Falha ao buscar tipos cadastrados')
    }
   
  }

  // CREATE A NEW DESTINATION
  const createDestination = async (e) => {
    e.preventDefault();
    const response = await Tipo.createNewTipo(formValues);
    if (response && response.status === 201) {
      getAllTipos();
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
    const confirmation = confirm("Você realmente deseja apagar esse tipo?");
    const id = e.target.closest("tr").getAttribute("data-cod");

    if (confirmation) {
      const response = await Tipo.deleteTipo(id);
      if (response && response.status === 201) {
        getAllTipos();
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
    const tipo = tipos.find((tipo) => tipo.id === Number(id));

    if (tipo) {
      const nome = tipo.nome;

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

    const response = await Tipo.editTipo(id, nome);
    if (response && response.status === 200) {
      getAllTipos();
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
    getAllTipos();
  }, []);

  return (
    <>
      <section className={styles.menuContainer}>
        <ToastContainer autoClose={2000} />
        <div className={styles.menuWrapper}>
          <div className={styles.menuHeader}>
            <h2 className={styles.name}>Cadastro de tipos</h2>
            <ButtonAlternative id="addButton" onClick={showAddForm}>
              Novo tipo
            </ButtonAlternative>
          </div>
          <SearchFilter
            name="tipo"
            list={tipos}
            filteredList={filteredList}
            setFilteredList={setFilteredList}
            param="nome"
            placeHolder="Procurar tipo"
          />
        </div>

        <form
          className={styles.destinationForm}
          id="addForm"
          onSubmit={createDestination}
        >
          <div className={styles.destinationFormHeader}>
            <span>Dados do tipo</span>
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
              placeholder="Nome de tipos de Cheques"
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

        <HeaderLine name="tipos" />
        <div className={tableStyle.tableWrapper}>
          <table className={tableStyle.table} id={styles.smallTable}>
            <thead>
              <tr>
                <th>tipo</th>
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
                filteredList?.map((tipo) => (
                  <tr key={tipo.nome} data-cod={tipo.id}>
                    <td id={tipo.id}>{tipo.nome}</td>
                    <td onClick={handleEdit}>
                      <img name={tipo.id} src="/images/edit.svg" />
                    </td>
                    <td name={tipo.nome} onClick={handleDelete}>
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
        name="tipos"
        submitEdit={handleSubmitEdit}
        handleInputChange={handleInputChange}
        formValues={formValues}
      />
    </>
  );
}
