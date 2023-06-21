import Button from '@/components/Button';
import Input from '@/components/Input';
import LoginCard from '@/components/LoginCard';
import styles from '../../styles/login.module.css';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Login() {
  return (
    <>
      <Header />
      <LoginCard title="Entre em sua conta">
        <form className={styles.formLogin}>
          <div className={styles.formField}>
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="email" placeholder="Digite seu e-mail" required />
          </div>
          <div className={styles.formField}>
            <label htmlFor="senha1">Digite sua senha</label>
            <Input id="senha1" type="password" placeholder="********" required />
          </div>
          <Button type="submit">Entrar</Button>
          <Link href="/home/cadastro">Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </>
  )
}
