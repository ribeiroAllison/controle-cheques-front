import styles from "@/styles/ModalContactClient.module.css";
import { InputForms } from "./InputForms";

export default function ModalContact(props) {
  // EDIT SCREEN CLOSING HANDLE
  const handleCloseEdit = (e) => {
    e.preventDefault();
    const editWindow = document.getElementById("contactWindowBackground");
    editWindow.style.display = "none";
  };

  return (
    <div id="contactWindowBackground" className={styles.editBackground}>
      <section className={styles.contactFieldset} id="contactWindow">
        <div className={styles.popupHeader}>
          <h1>{`Contato de ${props.contact?.nome}`} </h1>
          <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
        </div>
        <form className={styles.contactFormCtr}>
          <div className="formField" id="clienteBox">
            <label htmlFor="name">Nome do Contato:</label>
            <InputForms
              name="name"
              type="text"
              disabled
              value={props.contact?.contato}
            />
          </div>
          <div className="formField">
            <label htmlFor="email">Email:</label>
            <InputForms
              name="email"
              type="text"
              disabled
              value={props.contact?.email}
            />
          </div>
          <div className="formField">
            <label htmlFor="phone">Telefone:</label>
            <InputForms
              name="phone"
              type="text"
              disabled
              value={props.contact?.telefone}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
