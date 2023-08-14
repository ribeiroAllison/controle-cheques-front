import style from "@/styles/clientes.module.css";

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
    });

    const editWindow = document.getElementById("editWindowBackground");
    editWindow.style.display = "none";
  };

  return (
    <>
      <div id="editWindowBackground" className={style.editBackground}>
        <section className={style.editFieldset} id="editWindow">
          <div className={style.popupHeader}>
            <h2>Edição de {props.name}</h2>
            <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
          </div>

          <form
            className={style.formCtr}
            id={style.editForm}
            onSubmit={props.submitEdit}
          >
            <div
              className={`${style.inputCtr} ${style.nameCtr}`}
              id="clienteBox"
            >
              <h4>Nome:</h4>
              <input
                type="text"
                name="nome"
                onChange={props.handleInputChange}
                id="editCliente"
                placeholder="Pesquise o Cliente"
                className="editInput"
                value={props.formValues.nome}
              />

              <h4>Documento</h4>
              <input
                type="text"
                onChange={props.handleInputChange}
                name="doc"
                className="editInput"
                id="editDoc"
                value={props.formValues.doc}
              />

              <h4>Código</h4>
              <input
                type="text"
                onChange={props.handleInputChange}
                name="codigo"
                className="editInput"
                value={props.formValues.codigo}
              />

              <h4>Grupo:</h4>
              <select
                id="grupo"
                name="grupo"
                className={style.select}
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

              <h4>Vendedor:</h4>
              <select
                id="vendedor"
                name="vendedor_id"
                className={style.select}
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
            <div className={`${style.inputCtr} ${style.nameCtr}`}>
              <h4>Nome do Contato</h4>
              <input
                type="text"
                onChange={props.handleInputChange}
                name="contato"
                className="editInput"
                id="editContato"
                value={props.formValues.contato}
              />

              <h4>Telefone do Contato</h4>
              <input
                type="text"
                onChange={props.handleInputChange}
                name="telefone"
                className="editInput"
                id="editTelefone"
                value={props.formValues.telefone}
              />

              <h4>Email do Contato</h4>
              <input
                type="email"
                onChange={props.handleInputChange}
                name="email"
                className="editInput"
                id="editEmail"
                value={props.formValues.email}
              />

              <h4>Status:</h4>
              <select
                className={style.select}
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

            <div className={style.buttonCtr}>
              <button type="submit" className={style.button} id="editaCheque">
                Editar
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
