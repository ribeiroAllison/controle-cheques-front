import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import LoginCard from "@/components/LoginCard";
import HeaderLogin from "@/components/HeaderLogin";
import User from "@/api/UserService";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      senha: senha,
    };

    const response = await User.loginUser(user);
    if (response && response.status === 200) {
      notifySuccess(response.data.statusMessage);

      setEmail("");
      setSenha("");

      setTimeout(() => {
        router.push("/home/dashboard");
      }, 1100);
    } else {
      notifyFailure(response.data);
      setSenha("");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ToastContainer autoClose={2000} />
      <HeaderLogin />
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          <div className={styles.imgWrapper}>
            <img src="/images/login-img.svg" alt="" />
            <h1>Seja bem-vindo!</h1>
            <p>
              Acesse sua conta e organize suas entradas e saídas de cheques.
            </p>
          </div>
          <LoginCard title="Faça login para continuar">
            <form
              className={styles.formLogin}
              id="form"
              onSubmit={handleSubmit}
            >
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={handleEmail}
                value={email}
              />
              <Input
                id="senha"
                type="password"
                placeholder="Senha"
                required
                onChange={handleSenha}
                value={senha}
              />
              <Link href="/">Esqueceu a senha? Clique aqui.</Link>
            </form>
            <div className={styles.btnContainer}>
              <Button type="submit" form="form">
                Login
              </Button>
              <Link href="/home/cadastro">Ainda não possui conta?</Link>
            </div>
          </LoginCard>
        </div>
      </div>
    </div>
  );
}
