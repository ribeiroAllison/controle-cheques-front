import style from "@/styles/clientes.module.css"

export default function ModalContact (props){

    // EDIT SCREEN CLOSING HANDLE
    const handleCloseEdit = (e) => {
        e.preventDefault();
        

        const editWindow = document.getElementById('contactWindowBackground');
        editWindow.style.display = "none";

    }

    return(
        <>
            <div id="contactWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="contactWindow">
                    <div className={style.popupHeader}>
                        <h2>{`Contato de ${props.contact?.nome}`} </h2>
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
                    </div>

                    <form className={style.formCtr} id={style.editForm}>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                            <h4>Nome do Contato:</h4>
                            <input type="text"  disabled value={props.contact?.contato}/>
                            
                            <h4>Email:</h4>
                            <input type="text"  disabled value={props.contact?.email}/>

                            <h4>Telefone:</h4>
                            <input type="text" disabled  value={props.contact?.telefone}/>

                            

                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}