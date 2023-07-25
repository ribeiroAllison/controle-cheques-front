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
import User from '@/api/UserService';



export default function Login() {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSenha = (e) => {
    setSenha(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      senha: senha
    }

    const response = await User.loginUser(user);
      if (response && response.status === 200) {
        notifySuccess(response.data.statusMessage);

        setEmail('');
        setSenha('');

        setTimeout(() => { router.push('/home/dashboard') }, 1100);
      } else {
        notifyFailure(response.data);
        setSenha('');
      }
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
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
