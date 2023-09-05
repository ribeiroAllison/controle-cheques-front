import styles from "@/styles/ModalCliente.module.css";
import ButtonAlternative from "./ButtonAlternative";
import { InputForms } from "./InputForms";

export default function ModalCadastro(props) {
  // EDIT SCREEN CLOSING HANDLE
  const handleCloseEdit = (e) => {
    e.preventDefault();

    props.setFormValues({
      codigo: "",
      nome: "",
      doc: "",
      status: "",
      grupo: "",
      vendedor_id: "",
      contato: "",
      email: "",
      telefone: "",
      credito: "",
    });

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  return (
    <div id="editWindowBackground" className={styles.editBackground}>
      <section className={styles.editFieldset} id="editWindow">
        <div className={styles.popupHeader}>
          <h1>Edição de {props.name}</h1>
          <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
        </div>

        <form
          id="clientEditForm"
          className={styles.editFormCtr}
          onSubmit={props.submitEdit}
        >
          <div className={styles.formLine}>
            <div className="formField">
              <label htmlFor="nome">Nome:</label>
              <InputForms
                type="text"
                name="nome"
                onChange={props.handleInputChange}
                id="editCliente"
                placeholder="Pesquise o Cliente"
                className={`${styles.inputField} ${styles.nameField}`}
                value={props.formValues.nome}
              />
            </div>

            <div className="formField">
              <label htmlFor="doc">Documento:</label>
              <InputForms
                type="text"
                onChange={props.handleInputChange}
                name="doc"
                className={`${styles.inputField} ${styles.docField}`}
                id="editDoc"
                value={props.formValues.doc}
              />
            </div>

            <div className="formField">
              <label htmlFor="codigo">Código:</label>
              <InputForms
                type="text"
                onChange={props.handleInputChange}
                name="codigo"
                className={`${styles.inputField} ${styles.codeField}`}
                value={props.formValues.codigo}
              />
            </div>
            <div className="formField">
              <label htmlFor="">Limite de Crédito:</label>
              <InputForms
                type="number"
                onChange={props.handleInputChange}
                name="credito"
                className={`${styles.inputField} ${styles.emailField}`}
                id="editCredit"
                value={props.formValues.credito}
                placeHolder="R$ 1.000.000,00"
              />
            </div>
          </div>

          <div className={styles.formLine}>
            <div className="formField">
              <label htmlFor="grupo">Grupo:</label>
              <select
                id="grupo"
                name="grupo"
                className={styles.select}
                onChange={props.handleInputChange}
                value={props.formValues.grupo}
              >
                <option></option>
                {props.grupo.length > 0
                  ? props.grupo.map((emp) => {
                      return (
                        <option
                          key={emp.id}
                          value={emp.id}
                          selected={emp.id === props.formValues.grupo}
                        >
                          {emp.nome}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div className="formField">
              <label htmlFor="vendedor_id">Vendedor:</label>
              <select
                id="vendedor"
                name="vendedor_id"
                className={styles.select}
                onChange={props.handleInputChange}
                value={props.formValues.vendedor_id}
              >
                <option></option>
                {props.vendedores.length > 0
                  ? props.vendedores?.map((emp) => {
                      return (
                        <option
                          key={emp.id}
                          value={emp.id}
                          selected={emp.id === props.formValues.vendedor_id}
                        >
                          {emp.nome}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="status">Status:</label>
              <select
                className={styles.select}
                id="status"
                name="status"
                onChange={props.handleInputChange}
                value={props.formValues.status}
              >
                <option></option>
                <option>Bom</option>
                <option>Médio</option>
                <option>Ruim</option>
              </select>
            </div>
          </div>

          <div className={styles.formContactColumn}>
            <h2>Dados de Contato</h2>
            <div className="formField">
              <label htmlFor="">Nome do Contato:</label>
              <InputForms
                type="text"
                onChange={props.handleInputChange}
                name="contato"
                className={`${styles.inputField} ${styles.contactField}`}
                id="editContato"
                value={props.formValues.contato}
              />
            </div>

            <div className="formField">
              <label htmlFor="">Telefone do Contato:</label>
              <InputForms
                type="text"
                onChange={props.handleInputChange}
                name="telefone"
                className={`${styles.inputField} ${styles.phoneField}`}
                id="editTelefone"
                value={props.formValues.telefone}
              />
            </div>

            <div className="formField">
              <label htmlFor="">Email do Contato:</label>
              <InputForms
                type="email"
                onChange={props.handleInputChange}
                name="email"
                className={`${styles.inputField} ${styles.emailField}`}
                id="editEmail"
                value={props.formValues.email}
              />
            </div>
          </div>
        </form>
        <ButtonAlternative 
          form="clientEditForm" 
          type="submit" 
          id="editaCheque"
        >Editar
        </ButtonAlternative>
      </section>
    </div>
  );
}
