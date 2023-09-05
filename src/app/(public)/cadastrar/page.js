"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "@/styles/cadastro.module.css";
import { ToastContainer, toast } from "react-toastify";



export default function Cadastro() {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [contraSenha, setContraSenha] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
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
      nome: nome,
      email: email,
      senha: senha,
    };

    const response = await User.registerUser(user);

    if (response && response.status === 200) {
      notifySuccess(response.data);

      setNome("");
      setEmail("");
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
      <ToastContainer autoClose={1500} />
      <div className={styles.cadastroWrapper}>
        <div className={styles.formContainer}>
          <h1>Crie sua conta</h1>
          <form
            className={styles.formCadastro}
            onSubmit={handleSubmit}
            id="form"
          >
            <div className="formField">
              <Input
                id="nome"
                type="text"
                placeholder="Nome"
                required
                onChange={handleNome}
                value={nome}
              />
            </div>
            <div className="formField">
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleEmail}
                value={email}
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
              />
            </div>
          </form>
          <Button type="submit" form="form">
            Criar Conta
          </Button>
          <Link href="/login">
            Já possui conta? <br />
            Clique aqui para fazer o login.
          </Link>
        </div>
      </div>
    </>
  );
}
