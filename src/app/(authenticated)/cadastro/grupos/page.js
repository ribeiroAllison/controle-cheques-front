"use client";

import { useState, useEffect } from "react";
import HeaderLine from "@/components/HeaderLine";
import SearchFilter from "@/components/SearchFilter";
import clearInputs from "@/utils/clearInputs";
import { hideAddForm, showAddForm } from "@/utils/utils";
import { Grupo } from "@/apiServices/GrupoService";
import ModalName from "@/components/ModalName";
import styles from "@/styles/grupos.module.css";
import tableStyle from "@/styles/Table.module.css";
import { ToastContainer, toast } from "react-toastify";

import ButtonAlternative from "@/components/ButtonAlternative";

export default function Grupos() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  // STATES
  const [formValues, setFormValues] = useState({ nome: "" });
  const [editId, setEditId] = useState();
  const [grupos, setGrupos] = useState([]);
  const [filteredList, setFilteredList] = useState();

  // QUERIES ALL GROUPS
  async function getAllGrupos() {
    const { data } = await Grupo.getAllGrupos();
    if (data) {
      setGrupos(data);
      setFilteredList(data);
    }
  }

  // POSTS A NEW GROUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Grupo.createGroup(formValues);
    if (response && response.status === 201) {
      clearInputs("input");
      notifySuccess(response.data);
      getAllGrupos();
    } else {
      notifyFailure(response.data);
    }

    const addButton = document.getElementById("addButton");
    addButton.style.display = "block";

    const addForm = document.getElementById("addForm");
    addForm.style.display = "none";
  };

  // DELETE A GROUP
  const handleDelete = async (e) => {
    const confirmation = confirm("Você realmente deseja apagar esse grupo?");
    if (confirmation) {
      const id = e.target.closest("tr").getAttribute("data-cod");
      const response = await Grupo.deleteGroup(id);
      if (response && response.status === 201) {
        notifySuccess(response.data);
        getAllGrupos();
      } else {
        notifyFailure(response.data);
      }
    }
  };

  // FIELDS EDIT HANDLING
  const handleEdit = (e) => {
    const id = e.target.name;
    setEditId(id);
    const grupo = grupos.find((grupo) => grupo.id === Number(id));

    if (grupo) {
      const nome = grupo.nome;

      setFormValues({
        ...formValues,
        nome: nome,
      });

      const editWindow = document.getElementById("editWindowBackground");
      editWindow.style.display = "flex";
    }
  };

  // EDITS A GROUP IN DB
  async function submitEdit(e) {
    e.preventDefault();
    const nome = formValues.nome;
    const id = editId;
    const response = await Grupo.editGroup(id, nome);
    if (response && response.status === 200) {
      notifySuccess(response.data);
      getAllGrupos();
      clearInputs("input");
    } else {
      notifyFailure(response.data);
    }

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  }

  // -------------------------------- AUX FUNCTIONS -------------------------------

  const handleClear = (e) => {
    e.preventDefault();

    clearInputs("input");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    getAllGrupos();
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <section className={styles.menuContainer}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuHeader}>
            <h1>Cadastro de Grupos</h1>
            <ButtonAlternative id="addButton" onClick={showAddForm}>
              Novo Grupo
            </ButtonAlternative>
          </div>
        </div>

        <form className={styles.groupForm} id="addForm" onSubmit={handleSubmit}>
          <div className={styles.groupFormHeader}>
            <span>Dados do Grupo</span>
            <ButtonAlternative
              redButton={true}
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
              required
              placeholder="Nome de Grupos de Empresas"
              autoComplete="off"
              className="input"
            />
          </div>
          <div className={styles.btnContainer}>
            <ButtonAlternative id="adicionaCliente" type="submit">
              Adicionar
            </ButtonAlternative>
            <ButtonAlternative
              onClick={handleClear}
              id="limpar"
              orangeButton={true}
            >
              Limpar
            </ButtonAlternative>
          </div>
        </form>
        <SearchFilter
          name="Grupo"
          list={grupos}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
          param="nome"
          placeHolder="Procurar grupo"
        />
        <HeaderLine name="Grupos" />
        <div className={tableStyle.tableWrapper}>
          <table className={tableStyle.table} id={styles.smallTable}>
            <thead>
              <tr>
                <th>Grupo</th>
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
                filteredList?.map((destino) => (
                  <tr key={destino.nome} data-cod={destino.id}>
                    <td id={destino.id}>{destino.nome}</td>
                    <td>
                      <img
                        src="/images/edit.svg"
                        name={destino.id}
                        className={tableStyle.Icon}
                        onClick={handleEdit}
                      />
                    </td>
                    <td>
                      <img
                        name={destino.nome}
                        src="/images/trash-bin.svg"
                        className={tableStyle.Icon}
                        onClick={handleDelete}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <ModalName
        name="Grupos"
        submitEdit={submitEdit}
        handleInputChange={handleInputChange}
        formValues={formValues}
      />
    </>
  );
}
