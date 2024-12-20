"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import Input from "@/components/Input";


import styles from "@/styles/recuperarSenha.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";

export default function RecuperarSenha() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [contraSenha, setContraSenha] = useState("");

  const handleToken = (e) => {
    setToken(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleContraSenha = (e) => {
    setContraSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== contraSenha) {
      notifyFailure("Senhas devem ser iguais!");
      return;
    }

    const user = {
      token: token,
      email: email,
      senha: senha,
    };

    const response = await User.resetPassword(user);
    if (response && response.status === 200) {
      notifySuccess(response.data);

      setEmail("");
      setToken("");
      setSenha("");
      setContraSenha("");

      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } else {
      notifyFailure(response.data);
    }
  };

  return (
    <>
      
      <section className={styles.recoverPwdWrapper}>
        <div className={styles.formContainer}>
          <h1>Redefina sua senha</h1>
          <form
            className={styles.formRecoverPwd}
            onSubmit={handleSubmit}
            id="form"
          >
            <div className="formField">
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleEmail}
                value={email}
                autocomplete="off"
              />
            </div>
            <div className="formField">
              <Input
                id="token"
                type="text"
                placeholder="Token"
                required
                onChange={handleToken}
                value={token}
                autocomplete="off"
              />
            </div>
            <div className="formField">
              <Input
                id="senha1"
                type="password"
                placeholder="Senha"
                required
                onChange={handleSenha}
                value={senha}
                autocomplete="off"
              />
            </div>
            <div className="formField">
              <Input
                id="senha2"
                type="password"
                placeholder="Confirme sua senha"
                required
                onChange={handleContraSenha}
                value={contraSenha}
                autocomplete="off"
              />
            </div>
          </form>
          <Button type="submit" form="form">
            Alterar Senha
          </Button>
          <Link href="/login">
            <Button
              style={{ backgroundColor: "white", color: "var(--green-200)" }}
              type="submit"
              form="form"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
