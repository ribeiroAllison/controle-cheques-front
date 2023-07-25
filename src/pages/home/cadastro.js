import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/Button'
import Input from '@/components/Input'
import LoginCard from '@/components/LoginCard'
import styles from '../../styles/cadastro.module.css';
import Link from 'next/link';
import User from '@/api/UserService';
import HeaderLogin from '@/components/HeaderLogin';


export default function Cadastro() {
  const router = useRouter();

  const notifySuccess = () => toast.success("Cadastrado com sucesso!");
  const notifyFailure = () => toast.error("Erro ao cadastrar usuário!");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkCadastro = false;

    if (senha !== contraSenha) {
      alert('Senhas devem ser iguais!');
      return;
    }

    const user = {
      nome: nome,
      email: email,
      senha: senha
    };

    try {
      let data = await User.registerUser(user);
      if (data) {
        checkCadastro = true;
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }

    if (checkCadastro) {
      notifySuccess();
      setNome('');
      setEmail('');
      setSenha('');
      setContraSenha('');

      setTimeout(() => { router.push('/home/login') }, 2200);
    } else {
      notifyFailure();
    }
  };


  return (
    <>
      <ToastContainer autoClose={2000} />
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
