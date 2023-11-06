"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "@/styles/cadastro.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Cadastro() {
  const router = useRouter();
  const {register} = useForm();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);
  const [formValues, setFormValues] = useState({

  })
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [billingInfo, setBillingInfo] = useState()
  const [contraSenha, setContraSenha] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [PagSeguro, setPagSeguro] = useState();

  const handleCreditCard = (data) => {
    
  }

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

  const handleBilling = (e) => {
    setBillingInfo({
      ...billingInfo,
      type: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexUpperCase = /[A-Z]/;
    const regexSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
    const isPasswordValid =
      senha.length >= 8 &&
      regexUpperCase.test(senha) &&
      regexSpecialCharacter.test(senha);

    if (!isPasswordValid) {
      notifyFailure("Senha deve ser mais complexa!");
      setSenha('');
      setContraSenha('');
      return;
    }

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

  //EFFECTS
  useEffect(() => {
    const pagseguro = window.PagSeguro;

    if(pagseguro){
      setPagSeguro(pagseguro)
    }
  }, [])

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
                id="tax_id"
                type="text"
                placeholder="CPF/CNPJ"
                required
                onChange={handleEmail}
                value={email}
              />
            </div>
            <div className="formField">
              <Input
                id="phones"
                type="text"
                placeholder="Telefone"
                required
                onChange={handleEmail}
                value={email}
              />
            </div>
            <div className="formField">
              <Input
                id="phones"
                type="date"
                placeholder="Data de Nascimento"
                required
                onChange={handleEmail}
                value={email}
              />
            </div>
            <div>
              <fieldset className={styles.paymentOptions}>
                <legend>
                  Selecione a forma de pagamento
                </legend>

                <input 
                  type="radio"
                  id="boleto"
                  name="paymentType"
                  value="BOLETO"
                  onChange={handleBilling}/>
                  <label for="boleto">Boleto</label>

                <input 
                  type="radio"
                  id="card"
                  name="paymentType"
                  value="CREDIT_CARD"
                  onChange={handleBilling}/>
                  <label for="card">Cartão de Crédito</label>
              </fieldset>
            </div>
            <div className={styles.passwordCtr}>
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
