"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import decode from 'jwt-decode'
import { ToastContainer } from 'react-toastify';


import User from "@/apiServices/UserService";
import PaymentSection from "@/components/PaymentSection";
import LoadingScreen from '@/components/LoadingScreen';
import Button from '@/components/Button';

import styles from '@/styles/teste-finalizado.module.css'

const TesteFinalizado = () => {

  //STATE DECLARATIONS
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await User.getUserById(id);
      console.log(response);
      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  //STATES
  useEffect(() => {
    const token = document.cookie;
    const { id } = decode(token);
    setId(id);
  }, []);

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  //RENDERING
  return (
    <div className={styles.editWrapper}>
      <LoadingScreen loading={loading} />
      <ToastContainer autoClose={2000} />
      {(!user?.assinatura_id || user.status !== 'ACTIVE') && <PaymentSection
        userId={user && user.id}
        title={"Planos & Pagamento"}
        text={"Não identificados nenhum pagamento em sua conta, por favor preencha os dados de pagamento para continuar usando o sistema!"}
        user={user}
      />}
      {user?.status === 'ACTIVE' && <div className={styles.trialOverDiv}>
        <h1>Pagamento Identificado</h1>
        <div className={styles.trialOverText}>
          <p>Já identificamos seu pagamento.</p>
          <p>Por gentileza realize o login novamente.</p>
        </div>
        <Link href="/login">
          <Button>Ir Para Login!</Button>
        </Link>
      </div>}
      
    </div>
  )
};

export default TesteFinalizado;
