import style from "@/styles/clientes.module.css"

export default function ModalCadastro (props){

    // EDIT SCREEN CLOSING HANDLE
    const handleCloseEdit = (e) => {
        e.preventDefault();
        

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

    }

    return(
        <>
            <div id="editWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="editWindow">
                    <div className={style.popupHeader}>
                        <h2>Edição de {props.name}</h2>
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
                    </div>

                    <form className={style.formCtr} id={style.editForm} onSubmit={props.submitEdit}>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >


                            <h4>Nome:</h4>
                            <input type="text" name="nome" onChange={props.handleInputChange} id="editCliente" placeholder="Pesquise o Cliente" className="editInput" value={props.formValues.nome}/>
                            
                            <h4>Documento</h4>
                            <input type="text" onChange={props.handleInputChange} name="doc" className="editInput" id="editDoc" value={props.formValues.doc}/>

                            <h4>Status:</h4>
                            <select className={style.select} id="status" name="status"  onChange={props.handleInputChange} value={props.formValues.status}>
                                <option></option>
                                <option>Bom</option>
                                <option>Médio</option>
                                <option>Ruim</option>
                            </select>

                            <h4>Grupo:</h4>
                            <select id="grupo" name="grupo" className={style.select}  onChange={props.handleInputChange} value={props.formValues.grupo}>
                                <option></option>
                                {props.grupo?.map((emp) => {
                                    return (
                                        <option key={emp.id} value={emp.nome} selected={emp.nome === props.formValues.grupo}>
                                            {emp.nome}
                                        </option>
                                    );
                                })}
                            </select>

                            <button className={`${style.button} ${style.editButton}`} id="editButton" type="submit">Editar</button>
                        </div>

                        
                        <div className={style.buttonCtr}>
                            <button type="submit" className={style.button} id="editaCheque">Editar</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}