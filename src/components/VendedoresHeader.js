import styles from "../styles/HeaderLine.module.css"


export default function VendedoresHeader () {

    return(
        <>
            <header className={styles.header}>
                <h1>Vendedores</h1>
                <img src="/images/header-line.svg"/>
            </header>
        </>
    )
}

