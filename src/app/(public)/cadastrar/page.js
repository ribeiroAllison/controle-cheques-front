"use client";

import Button from "@/components/Button";
import styles from "@/styles/cadastro.module.css";
import validarCNPJ from "@/utils/validarCNPJ";
import validarCPF from "@/utils/validarCPF";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function Cadastro() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validDoc, setValidDoc] = useState(false);
  const [doc, setDoc] = useState();

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneNumber(formattedValue);
  };

  const router = useRouter();

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

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  // Função para formatar o telefone
  function formatPhoneNumber(input) {
    const phoneNumber = input.replace(/\D/g, "");
    if (phoneNumber.length <= 2) {
      return `${phoneNumber}`;
    } else if (phoneNumber.length <= 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        7
      )}-${phoneNumber.slice(7)}`;
    }
  }

  //HANDLER FUNCTIONS
  const submit = async (data) => {
    const regexUpperCase = /[A-Z]/;
    const regexSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
    const isPasswordValid =
      data.senha1.length >= 8 &&
      regexUpperCase.test(data.senha1) &&
      regexSpecialCharacter.test(data.senha1);

    if (!isPasswordValid) {
      notifyFailure("Senha deve ser mais complexa!");
      return;
    }

    if (data.senha1 !== data.senha2) {
      notifyFailure("Senhas devem ser iguais!");
      return;
    }

    const user = {
      nome: data.nome,
      email: data.email,
      senha: data.senha1,
      tax_id: data.tax_id,
      birth_date: data.birth_date,
      phones: data.phones,
    };

    const response = await User.registerUser(user);

    if (response && response.status === 200) {
      notifySuccess(response.data);

      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } else {
      notifyFailure(response.data);
    }
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
      <ToastContainer autoClose={1500} />
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
                <label htmlFor="tax_id">CPF ou CNPJ:</label>
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
                <label htmlFor="phones">Telefone\Celular:</label>
                <input
                  {...register("phones", {
                    required: "Campo Obrigatório",
                    pattern: /^\(\d{2}\) \d{5}-\d{4}$/,
                  })}
                  id="phones"
                  type="text"
                  placeholder="(11) 9950-7789"
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
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
                <label htmlFor="senha2">Confirme a Senha:</label>
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
    </>
  );
}
