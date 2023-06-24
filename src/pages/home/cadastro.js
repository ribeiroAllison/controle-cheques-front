import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/Button'
import Input from '@/components/Input'
import LoginCard from '@/components/LoginCard'
import styles from '../../styles/cadastro.module.css';
import Link from 'next/link';
import User from '@/services/user';
import HeaderLogin from '@/components/HeaderLogin';


export default function Cadastro() {
  const router = useRouter();

  const notify = () => toast.success("Cadastrado com sucesso!");

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [contraSenha, setContraSenha] = useState('');

  const handleNome = (e) => {
    setNome(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSenha = (e) => {
    setSenha(e.target.value);
  }

  const handleContraSenha = (e) => {
    setContraSenha(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (senha === contraSenha) {
      const user = {
        nome: nome,
        email: email,
        senha: senha
      }
      User.registerUser(user);
      notify();

      setNome('');
      setEmail('');
      setSenha('');
      setContraSenha('');
      
      setTimeout(() => { router.push('/home/login') }, 4200);

    } else {
      alert('Senhas devem ser iguais!');
      throw new Error('Falha ao cadastrar usuário.')
    }
  }


  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={4000}
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
      <LoginCard title="Crie sua conta">
        <form className={styles.formCadastro} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="nome">Nome</label>
            <Input id="nome" type="text" placeholder="Seu nome completo" required onChange={handleNome} value={nome} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="email" placeholder="Seu e-mail" required onChange={handleEmail} value={email} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="senha1">Digite sua senha</label>
            <Input id="senha1" type="password" placeholder="******" required onChange={handleSenha} value={senha} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="senha2">Digite sua senha novamente</label>
            <Input id="senha2" type="password" placeholder="******" required onChange={handleContraSenha} value={contraSenha} />
          </div>
          <Button type="submit">Criar Conta</Button>
          <Link href="/home/login">Já possui conta?</Link>
        </form>
      </LoginCard>
    </>

  )
}
