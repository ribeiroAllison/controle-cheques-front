"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import styles from "@/styles/cadastro.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Cadastro() {
  const router = useRouter();
  const {
    register, 
    formState: {errors},
    handleSubmit
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      tax_id: "",
      phones: "",
      birth_date: "",
      senha1: "",
      senha2: ""
    }
  });

  console.log(errors)

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);


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
            onSubmit={handleSubmit( async (data) => {
              console.log(data)
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
                phones: data.phones
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
            })}
            id="form"
          >
            <div className="formField">
              <input
                {...register("nome", {required: 'Campo Obrigatório'})}
                id="nome"
                type="text"
                placeholder="Nome"
              />
              <p>{errors.nome?.message}</p>
            </div>
            <div className="formField">
              <input
              {...register("email", {required:  'Campo Obrigatório'})}
                id="email"
                type="email"
                placeholder="E-mail"

              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="formField">
              <input
                {...register("tax_id", {required:  'Campo Obrigatório'})}
                id="tax_id"
                type="text"
                placeholder="CPF/CNPJ"
              />
              <p>{errors.tax_id?.message}</p>
            </div>
            <div className="formField">
              <input
                {...register("phones", {required:  'Campo Obrigatório'})}
                id="phones"
                type="text"
                placeholder="Telefone"

              />
              <p>{errors.phones?.message}</p>
            </div>
            
            <div className="formField">
              <input
                {...register("birth_date", {required:  'Campo Obrigatório'})}
                id="birth"
                type="date"
                placeholder="Data de Nascimento"

              />
              <p>{errors.birth_date?.message}</p>
            </div>
            
            <div className={styles.passwordCtr}>
              <div className="formField">
                <input
                  {...register("senha1", {required:  'Campo Obrigatório',
                                          minLength: 8,
                                          message: 'Mínimo de oito caracteres.'})}
                  id="senha1"
                  type="password"
                  placeholder="Senha"

                />
                <p>{errors.senha1?.message}</p>
              </div>
              
              <div className="formField">
                <input
                  {...register("senha2", {required:  'Campo Obrigatório',
                                          minLength: 8,
                                          message: 'Mínimo de oito caracteres.'})}
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
