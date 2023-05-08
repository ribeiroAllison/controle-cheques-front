import ClientesHeader from "@/components/ClientesHeader"
import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"

export default function Clientes() {

    return(
        <>
            <Header />
            <ClientesHeader />
            <form style={style.formCtr}>
                <h3>Cadastro de Clientes</h3>
                <div className={style.inputCtr}>
                    <h4>Código:</h4>
                    <input type="number"/>
                </div>
                <div className={style.inputCtr}>
                    <h4>Nome:</h4>
                    <input type="text"/>
                </div>
                <div className={style.inputCtr}>
                    <h4>CPF/CNPJ:</h4>
                    <input type="number"/>
                </div>
                <div className={style.inputCtr}>
                    <h4>Grupo:</h4>
                    <input type="text"/>
                </div>

            </form>
        </>
    )
}