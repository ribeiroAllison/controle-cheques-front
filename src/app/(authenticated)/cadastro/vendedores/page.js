"use client";

import { Vendedor } from "@/apiServices/VendedorService";
import ButtonAlternative from "@/components/ButtonAlternative";
import HeaderLine from "@/components/HeaderLine";
import ModalName from "@/components/ModalName";
import SearchFilter from "@/components/SearchFilter";
import tableStyle from "@/styles/Table.module.css";
import styles from "@/styles/vendedores.module.css";
import clearInputs from "@/utils/clearInputs";
import { hideAddForm, showAddForm } from "@/utils/utils";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Vendedores() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  // STATE
  const [formValues, setFormValues] = useState({ nome: "" });
  const [vendedores, setVendedores] = useState();
  const [filteredList, setFilteredList] = useState();
  const [editId, setEditId] = useState();

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //QUERIES ALL SALESMEN IN DB
  async function getAllVendedores() {
    const { data } = await Vendedor.getAllVendedores();
    if (data) {
      setVendedores(data);
      setFilteredList(data);
    }
  }

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Vendedor.createVendedor(formValues);
    if (response && response.status === 200) {
      notifySuccess(response.data);
      getAllVendedores();
      clearInputs("input");
    } else {
      notifyFailure(response.data);
    }

    const addButton = document.getElementById("addButton");
    addButton.style.display = "block";

    const addForm = document.getElementById("addForm");
    addForm.style.display = "none";
  };

  // DELETE
  const handleDelete = async (e) => {
    const confirmation = confirm("Você realmente quer apagar este vendedor?");
    if (confirmation) {
      const id = e.target.closest("tr").getAttribute("data-cod");
      const response = await Vendedor.deleteVendedor(id);
      if (response && response.status === 201) {
        getAllVendedores();
        notifySuccess(response.data);
      } else {
        notifyFailure(response.data);
      }
    }
  };

  // UPDATE
  const handleEdit = (e) => {
    const id = e.target.name;
    setEditId(id);
    const vendedor = vendedores.find((vendedor) => vendedor.id === Number(id));

    if (vendedor) {
      const nome = vendedor.nome;

      setFormValues({
        ...formValues,
        nome: nome,
      });

      const editWindow = document.getElementById("editWindowBackground");
      editWindow.style.display = "flex";
    }
  };

  // CLEAR INPUT FIELDS
  const handleClear = (e) => {
    e.preventDefault();
    clearInputs("input");
  };

  // EDIT SALESMEN IN DB
  async function submitEdit(e) {
    e.preventDefault();
    const nome = formValues.nome;
    const id = editId;

    const response = await Vendedor.editVendedor(id, nome);
    if (response && response.status === 200) {
      getAllVendedores();
      clearInputs("input");
      notifySuccess(response.data);
    } else {
      notifyFailure(response.data);
    }

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  }

  useEffect(() => {
    getAllVendedores();
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <section className={styles.menuContainer}>
        <div className={styles.menuWrapper}>
          <div className={styles.menuHeader}>
            <h1>Cadastro de Vendedores</h1>
            <ButtonAlternative id="addButton" onClick={showAddForm}>
              Novo Vendedor
            </ButtonAlternative>
          </div>
        </div>

        <form className={styles.salesForm} id="addForm" onSubmit={handleSubmit}>
          <div className={styles.salesFormHeader}>
            <span>Dados do Vendedor</span>
            <ButtonAlternative
              redButton={true}
              onClick={hideAddForm}
            >
              Voltar
            </ButtonAlternative>
          </div>
          <div className={`${styles.inputCtr}`}>
            <h4>Nome:</h4>
            <input
              type="text"
              name="nome"
              onChange={handleInputChange}
              id="nome"
              required
              placeholder="Nome do Vendedor"
              autoComplete="off"
              className="input"
            />
          </div>
          <div className={styles.btnContainer}>
            <ButtonAlternative id="adicionaVendedor" onClick={handleSubmit}>
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
          name="Vendedor"
          list={vendedores}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
          param="nome"
          placeHolder="Procurar vendedor"
        />
        <HeaderLine name="Vendedores" />
        <div className={tableStyle.tableWrapper}>
          <table className={tableStyle.table} id={styles.smallTable}>
            <thead>
              <tr>
                <th>Vendedor</th>
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
                filteredList?.map((vendedor) => (
                  <tr key={vendedor.id} data-cod={vendedor.id}>
                    <td id={vendedor.id}>{vendedor.nome}</td>
                    <td>
                      <img
                        src="/images/edit.svg"
                        name={vendedor.id}
                        className={tableStyle.Icon}
                        onClick={handleEdit}
                      />
                    </td>
                    <td>
                      <img
                        src="/images/trash-bin.svg"
                        name={vendedor.nome}
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
      </section>
      <ModalName
        name="Vendedores"
        submitEdit={submitEdit}
        handleInputChange={handleInputChange}
        formValues={formValues}
      />
    </>
  );
}
