import styles from "../styles/HeaderLine.module.css";

export default function HeaderLine(props) {
  return (
    <>
      <header className={styles.header}>
        <h1>{props.name}</h1>
        <img src="/images/header-line.svg" />
      </header>
    </>
  );
}
