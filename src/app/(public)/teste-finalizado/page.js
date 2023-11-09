"use client";

import Button from "@/components/Button";
import styles from "@/styles/teste-finalizado.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function TesteFinalizado() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      tax_id: "",
      phones: "",
      birth_date: "",
      senha1: "",
      senha2: "",
    },
  });

  const submit = async (data) => {}


  return (
    <div className={styles.cadastroWrapper}>
      <div className={styles.formContainer}>
        <h1>Seu período de teste acabou! :(</h1>
        <form
          className={styles.formCadastro}
          onSubmit={handleSubmit(submit)}
          id="form"
        >
          <div className={styles.fieldsWrapper}>
            <div className="formField">
              <label htmlFor="nome">Nome:</label>
              <input
                {...register("nome", { required: "Campo Obrigatório" })}
                id="nome"
                type="text"
                placeholder="Nome"
              />
              <p>{errors.nome?.message}</p>
            </div>
            <div className="formField">
              <label htmlFor="email">Email:</label>
              <input
                {...register("email", { required: "Campo Obrigatório" })}
                id="email"
                type="email"
                placeholder="E-mail"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="formField">
              <label htmlFor="tax_id">CPF \ CNPJ:</label>
              <input
                {...register("tax_id", { required: "Campo Obrigatório" })}
                id="tax_id"
                type="text"
                placeholder="CPF/CNPJ"
              />
              <p>{errors.tax_id?.message}</p>
            </div>
          </div>
          <div className={styles.fieldsWrapper}>

            <div className="formField">
              <label htmlFor="birth_date">Data de Nascimento:</label>
              <input
                {...register("birth_date", { required: "Campo Obrigatório" })}
                id="birth"
                type="date"
                placeholder="Data de Nascimento"
              />
              <p>{errors.birth_date?.message}</p>
            </div>
          </div>

          <div className={styles.passwordCtr}>
            <div className="formField">
              <label htmlFor="senha1">Senha:</label>
              <input
                {...register("senha1", {
                  required: "Campo Obrigatório",
                  minLength: 8,
                  message: "Mínimo de oito caracteres.",
                })}
                id="senha1"
                type="password"
                placeholder="Senha"
              />
              <p>{errors.senha1?.message}</p>
            </div>

            <div className="formField">
              <label htmlFor="senha2">Repita sua Senha:</label>
              <input
                {...register("senha2", {
                  required: "Campo Obrigatório",
                  minLength: 8,
                  message: "Mínimo de oito caracteres.",
                })}
                id="senha2"
                type="password"
                placeholder="Confirme sua senha"
              />
              <p>{errors.senha2?.message}</p>
            </div>
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
  );
}
