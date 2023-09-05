import styles from "@/styles/ModalNome.module.css";
import ButtonAlternative from "./ButtonAlternative";
import { InputForms } from "./InputForms";

export default function ModalName(props) {
  // EDIT SCREEN CLOSING HANDLE
  const handleCloseEdit = (e) => {
    e.preventDefault();
    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  return (
    <div id="editWindowBackground" className={`${styles.editBackground} `}>
      <section className={`${styles.editFieldset}`} id="editWindow">
        <div className={styles.popupHeader}>
          <h1>Edição de {props.name}</h1>
          <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
        </div>

        <form
          className={styles.modalNameForm}
          id={styles.editForm}
          onSubmit={props.submitEdit}
        >
          <div className="formField">
            <label htmlFor="nome">Nome:</label>
            <InputForms
              type="text"
              name="nome"
              onChange={props.handleInputChange}
              id="editTarget"
              className="editInput"
              value={props.formValues.nome}
              autoComplete="off"
            />
          </div>

          <ButtonAlternative type="submit" id="editaCheque">
            Editar
          </ButtonAlternative>
        </form>
      </section>
    </div>
  );
}
