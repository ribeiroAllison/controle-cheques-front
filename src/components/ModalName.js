import styles from "@/styles/ModalNome.module.css";
import ButtonAlternative from "./ButtonAlternative";

export default function ModalName(props) {
  // EDIT SCREEN CLOSING HANDLE
  const handleCloseEdit = (e) => {
    e.preventDefault();
    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  return (
    <>
      <div id="editWindowBackground" className={`${styles.editBackground} `}>
        <section className={`${styles.editFieldset}`} id="editWindow">
          <div className={styles.popupHeader}>
            <h2>Edição de {props.name}</h2>
            <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
          </div>

          <form
            className={styles.modalNameForm}
            id={styles.editForm}
            onSubmit={props.submitEdit}
          >
            <div className={`${styles.inputCtr}`} id="clienteBox">
              <div className={styles.formField}>
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  onChange={props.handleInputChange}
                  id="editTarget"
                  className="editInput"
                  value={props.formValues.nome}
                  autoComplete="off"
                />
              </div>
            </div>

            <ButtonAlternative type="submit" id="editaCheque">
              Editar
            </ButtonAlternative>
          </form>
        </section>
      </div>
    </>
  );
}
