import style from "@/styles/clientes.module.css"

export default function ModalName (props){

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
                            <input type="text" name="nome" onChange={props.handleInputChange} id="editCliente" className="editInput" value={props.formValues.nome}/>                       
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