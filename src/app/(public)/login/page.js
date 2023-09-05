"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LoginCard from "@/components/LoginCard";
import User from "@/apiServices/UserService";
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { ToastContainer, toast } from "react-toastify";


export default function Login() {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      senha: senha,
    };

    const response = await User.loginUser(user);
    if (response && response.status === 200) {
      notifySuccess(response.data.statusMessage);

      setEmail("");
      setSenha("");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1100);
    } else {
      notifyFailure(response.data);
      setSenha("");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} />
      <section className={styles.loginWrapper}>
        <figure className={styles.imgWrapper}>
          <img src="/images/login-img.svg" alt="" />
          <h1>Seja bem-vindo!</h1>
          <p>Acesse sua conta e organize suas entradas e saídas de cheques.</p>
        </figure>
        <div className={styles.formWrapper}>
          <LoginCard title="Faça login para continuar">
            <form
              className={styles.formLogin}
              id="form"
              onSubmit={handleSubmit}
            >
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleEmail}
                value={email}
                autocomplete="off"
              />
              <Input
                id="senha"
                type="password"
                placeholder="Senha"
                required
                onChange={handleSenha}
                value={senha}
                autocomplete="off"
              />
              <div className={styles.linkWrapper}>
                <Link href="/esqueceu-senha">
                  Esqueceu a senha? Clique aqui.
                </Link>
                <Link href="/recuperar-senha">
                  Já tem o token? Troque a senha.
                </Link>
              </div>
            </form>
            <div className={styles.btnContainer}>
              <Button type="submit" form="form">
                Login
              </Button>
              <Link href="/cadastrar">Ainda não possui conta?</Link>
            </div>
          </LoginCard>
        </div>
      </section>
    </>
  );
}
