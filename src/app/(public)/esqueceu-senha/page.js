"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "@/styles/esqueceuSenha.module.css";
import Link from "next/link";
import User from "@/apiServices/UserService";

export default function ForgotPwd() {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
    };

    const response = await User.generateToken(user);
    console.log(response);
    if (response && response.status === 200) {
      notifySuccess(response.data);
      setEmail("");
      setTimeout(() => {
        router.push("/recuperar-senha");
      }, 2200);
    } else {
      notifyFailure(response.data);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      <div className={styles.esqueceuSenhaWrapper}>
        <div className={styles.formContainer}>
          <h1>Recupere sua senha</h1>
          <form
            className={styles.formEsqueceuSenha}
            onSubmit={handleSubmit}
            id="form"
          >
            <div className={styles.formField}>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleEmail}
                value={email}
              />
            </div>
          </form>
          <Button type="submit" form="form">
            Enviar
          </Button>
          <Link href="/login">
            <Button
              style={{ backgroundColor: "white", color: "var(--green-300)" }}
              type="submit"
              form="form"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
