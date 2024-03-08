"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { connection } from "@/utils/connection";
import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import { formatPhoneNumber, notifyFailure, notifySuccess } from "@/utils/utils";
import validarCNPJ from "@/utils/validarCNPJ";
import validarCPF from "@/utils/validarCPF";
import styles from "@/styles/cadastro.module.css";

export default function Cadastro() {
  //SETUP
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
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

  //STATE DECLARATION
  const [validDoc, setValidDoc] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //HANDLER FUNCTIONS
  const submit = async (data) => {
    const regexUpperCase = /[A-Z]/;
    const regexSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
    const isPasswordValid =
      data.senha1.length >= 8 &&
      regexUpperCase.test(data.senha1) &&
      regexSpecialCharacter.test(data.senha1);
    setIsLoading(true);

    if (!isPasswordValid) {
      notifyFailure("Senha fora do padrão!");
      setIsLoading(false);
      return;
    }

    if (data.senha1 !== data.senha2) {
      notifyFailure("Senhas devem ser iguais!");
      setIsLoading(false);
      return;
    }

    data.phones = data.phones.replace(/\D/g, "");
    data.tax_id = data.tax_id.replace(/\D/g, "");

    const user = {
      nome: data.nome,
      email: data.email,
      senha: data.senha1,
      tax_id: data.tax_id,
      birth_date: data.birth_date,
      phones: data.phones,
    };

    const response = await User.registerUser(user);

    if (response.status === 201) {
      notifySuccess(response.data);
      reset();
      setIsLoading(false);

      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } else {
      notifyFailure(response.response.data);
      setIsLoading(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneNumber(formattedValue);
  };

  //AUX FUNCTION
  const docData = watch("tax_id");

  useEffect(() => {
    if (validarCNPJ(docData) || validarCPF(docData)) {
      setValidDoc(true);
    } else {
      setValidDoc(false);
    }
  }, [docData]);

  return (
    <>
      <LoadingScreen loading={isLoading} />
      <div className={styles.cadastroWrapper}>
        <div className={styles.formContainer}>
          <h1>Crie sua conta</h1>
          <p>
            Sua senha deve ter no mínimo 08 caracteres, uma letra maíuscula e um
            caracter especial.
          </p>
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
                {docData && !validDoc && <p>Documento Inválido</p>}
              </div>
            </div>
            <div className={styles.fieldsWrapper}>
              <div className="formField">
                <label htmlFor="phones">Celular \ Telefone:</label>
                <input
                  {...register("phones", { required: "Campo Obrigatório" })}
                  id="phones"
                  type="text"
                  placeholder="(11) 9995-7758"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <p>{errors.phones?.message}</p>
              </div>

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
