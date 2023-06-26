import Head from 'next/head'
import Header from '@/components/Header';
import ChequeControl from '@/components/ChequeControl';

export default function Home() {
  return (
    <>
      <HeaderLogin />
      <div className={styles.mainWrapper}>
        <h1 className={styles.mainTitle}>Seja bem-vindo!</h1>
        <h2 className={styles.mainSubTitle}>Caso já possua cadastro, clique no botão de Login.</h2>
        <div className={styles.btns}>
        <Link href="/home/login"><Button>Login</Button></Link>
        <Link href="/home/cadastro"><Button>Cadastre-se</Button></Link>
        </div>
      </div>
    </>
  )
}