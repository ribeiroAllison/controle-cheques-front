import Head from 'next/head'
import Header from '@/components/Header';
import ChequeControl from '@/components/ChequeControl';



export default function Home() {
  
  
  
  return (
    <>
      <Head>
        <title>LISKO TECH - Cheques</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <ChequeControl 
        headerLine="Estornados"
        display="none"
        submitOnMount={true}
      />

    </>
  )
}