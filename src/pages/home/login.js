import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LoginCard from '@/components/LoginCard';
import styles from '../../styles/login.module.css';
import Link from 'next/link';
import HeaderLogin from '@/components/HeaderLogin';
import User from '@/services/user';


export default function Login() {
  const router = useRouter();
  const notify = () => toast.success("Usuário logado com sucesso!");


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSenha = (e) => {
    setSenha(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      senha: senha
    }

    User.loginUser(user).then((data) => {
      localStorage.setItem('token', data?.response.token);
    })

    notify();
    setEmail('');
    setSenha('');
    
    setTimeout(() => { router.push('/home/dashboard') }, 1100);
  }

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <HeaderLogin />
      <LoginCard title="Entre em sua conta">
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="email" placeholder="Digite seu e-mail" required onChange={handleEmail} value={email} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="senha">Digite sua senha</label>
            <Input id="senha" type="password" placeholder="********" required onChange={handleSenha} value={senha} />
          </div>
          <Button type="submit">Entrar</Button>
          <Link href="/home/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </>
  )
}
