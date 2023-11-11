"use client";

import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import styles from "@/styles/teste-finalizado.module.css";
import decode from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Perfil = () => {
  //SET UPS
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  //STATE DECLARATIONS
  const [id, setId] = useState(null);
  const [pagseguroId, setPagSeguroId] = useState();

  //EVENT HANDLERS
  const onSubmit = async (data) => {
    const user = {
      id: id,
      nome: data.nome,
      email: data.email,
      birth_date: data.birth_date,
      phones: data.phones,
      pagseguro_id: pagseguroId,
    };

    const response = await User.editUser(user);
    if (response.status === 201) {
      notifySuccess(response.data);
    } else {
      notifyFailure(`Erro ao editar. Erro: ${response.response.data}`);
    }
  };

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      const res = await User.getUserById(id);
      if (res) {
        setValue("nome", res.nome);
        setValue("email", res.email);
        const formattedDate = res.birth_date
          ? new Date(res.birth_date).toISOString().split("T")[0]
          : "";
        setValue("birth_date", formattedDate);
        setValue("phones", res.phones);
        setPagSeguroId(res.pagseguro_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //EFFECTS

  useEffect(() => {
    const token = document.cookie;
    const { id } = decode(token);
    setId(id);
  }, []);

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Seu período de teste acabou :(</h1>
          <div className="inputField">
            <p className={styles.editExplain}>
              Caso queira continuar utilizando o <strong>Recebi.app</strong>,
              selecione a forma de pagamento abaixo!
            </p>
            <p className={styles.editExplain}>
              Você também pode aproveitar para{" "}
              <strong>editar seus dados</strong>, caso desejar.
            </p>
          </div>
          <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputCtr}>
              <label htmlFor="nome">Nome:</label>
              <input {...register("nome")} type="text" />
            </div>
            <div className={styles.inputCtr}>
              <label htmlFor="email">Email:</label>
              <input {...register("email")} type="text" />
            </div>
            <div className={styles.inputCtr}>
              <label htmlFor="birth_date">Data de Nascimento:</label>
              <input {...register("birth_date")} type="date" />
            </div>
            <div className={styles.inputCtr}>
              <label htmlFor="phones">Telefone:</label>
              <input {...register("phones")} type="text" />
            </div>
            <Button type="submit">Atualizar</Button>
            <p className={styles.editExplain}>
              Se precisar, nos chame via <strong>Whatsapp</strong> ou envie uma
              mensagem para o suporte{" "}
              <Link href="/suporte">
                <strong>aqui</strong>.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Perfil;
