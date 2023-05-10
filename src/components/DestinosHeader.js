import styles from "../styles/HeaderLine.module.css"


export default function ClientesHeader () {

    return(
        <>
            <header className={styles.header}>
                <h1>Destinos</h1>
                <img src="/images/header-line.svg"/>
            </header>
        </>
    )
}