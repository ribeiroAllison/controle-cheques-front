import styles from "../styles/HeaderLine.module.css"


export default function ChequesHeader () {

    return(
        <>
            <header className={styles.header}>
                <h1>Cheques</h1>
                <img src="/images/header-line.svg"/>
            </header>
        </>
    )
}