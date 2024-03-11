'use client'

import { useState } from "react";
import { connection } from "@/utils/connection";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/verifique-seu-email.module.css";

export default function VerifiqueSeuEmail() {
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const params = useParams()
  const { email, token } = params
  const router = useRouter();

  const decodedEmail = decodeURIComponent(email);

  const handleTokenVerify = async () => {
    try {
      await connection.post(`/usuarios/verify-email/${token}`, {
        email: decodedEmail
      })
      setIsEmailVerified(true)
      setTimeout(() => {
        router.push("/login")
      }, 2200)
    } catch (error) {
      notifyFailure('Token inválido.')
      setTimeout(() => {
        router.push("/cadastrar")
      }, 2200)
    }
  }

  handleTokenVerify()

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        {
          isEmailVerified
            ? <div className={styles.contentContainer}>
              <h1>Verificando...</h1>
              <p>Estamos verificando seu e-mail!</p>
            </div>
            : <div className={styles.contentContainer}>
              <h1>E-mail verificado</h1>
              <p>Pronto! Agora é só fazer o Login e começar a usar o Recebi.app!</p>
            </div>}
      </div>
    </section>
  );
}
