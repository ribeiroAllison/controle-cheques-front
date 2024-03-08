import styles from "@/styles/verifique-seu-email.module.css";
import Link from "next/link";

export default function VerifiqueSeuEmail() {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <h1>Verifique seu e-mail!</h1>
          <p>Nós enviamos um link para seu e-mail.<br/>
            Siga as instruções enviadas para finalizar seu cadastro!
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/login">
              Já possui conta? <br />
              Clique aqui para fazer o login.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
