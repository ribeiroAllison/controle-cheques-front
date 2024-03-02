"use client";

import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import styles from "@/styles/cadastro.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function CadastroEmail() {
  //SETUP
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  //STATE DECLARATION
  const [isLoading, setIsLoading] = useState(false);

  //HANDLER FUNCTIONS
  const submit = async (data) => {
    setIsLoading(true);

    const response = await User.registerEmail(data.email);

    if (response.status === 200) {
      notifySuccess(response.data);
      reset();
      setIsLoading(false);
      setTimeout(() => {
        router.push("/verifique-seu-email");
      }, 2200);
    } else {
      notifyFailure(response.response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen loading={isLoading} />
      <div className={styles.cadastroWrapper}>
        <div className={styles.formContainer}>
          <h1>Cadastro</h1>
          <p>
            Vamos primeiro verificar o seu e-mail!<br />
            Coloque seu melhor e-mail no campo abaixo.
          </p>
          <form
            className={styles.formCadastro}
            onSubmit={handleSubmit(submit)}
            id="form"
          >
            <div className={styles.fieldsWrapper}>
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
            </div>
          </form>
          <Button type="submit" form="form">
            Enviar
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/login">
              Já possui conta? <br />
              Clique aqui para fazer o login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
