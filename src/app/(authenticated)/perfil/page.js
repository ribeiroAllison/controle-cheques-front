"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import User from "@/apiServices/UserService";
import decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

import styles from "@/styles/perfil.module.css";

const Perfil = () => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [contraSenha, setContraSenha] = useState("");
  const [id, setId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== contraSenha) {
      alert("Senhas devem ser iguais!");
      return;
    }

    const user = {
      id: id,
      nome: nome,
      senha: senha,
    };

    const response = await User.editUser(user);
    if (response && response.status === 200) {
      notifySuccess(response.data);
      setNome("");
      setSenha("");
      setContraSenha("");
    } else {
      notifyFailure(response.data);
    }
  };

  useEffect(() => {
    const token = document.cookie;
    const { id } = decode(token);
    setId(id);
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Edite sua conta</h1>
          <form className={styles.editForm} onSubmit={handleSubmit}>
            <Input
              type="text"
              name="nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
            />
            <Input
              type="password"
              name="senha"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua nova senha"
              required
            />
            <Input
              type="password"
              name="contrasenha"
              id="contrasenha"
              value={contraSenha}
              onChange={(e) => setContraSenha(e.target.value)}
              placeholder="Repita a senha"
              required
            />
            <Button type="submit">Editar</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Perfil;
