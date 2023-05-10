import styles from "../styles/HeaderLine.module.css"


export default function GruposHeader () {

    return(
        <>
            <header className={styles.header}>
                <h1>Cadastro de Grupos</h1>
                <img src="/images/header-line.svg"/>
            </header>
        </>
    )
}