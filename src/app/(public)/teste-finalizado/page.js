"use client";
import decode from 'jwt-decode'
import User from "@/apiServices/UserService";
import PaymentSection from "@/components/PaymentSection";
import LoadingScreen from '@/components/LoadingScreen';
import { useState , useEffect} from 'react';
import styles from '@/styles/teste-finalizado.module.css'

const TesteFinalizado = () => {

  //STATE DECLARATIONS

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();

  //AUX FUNCTIONS

  const getUser = async (id) => {
    try{
      setLoading(true);
      const response = await User.getUserById(id);
      if(response){
        setUser(response);
      }
    } catch(error){
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
  return(
    <div className={styles.editWrapper}>
      <LoadingScreen loading={loading}/>
      <PaymentSection 
        userId={user && user.id}
        title={"Planos & Pagamento"}
        text={"Infelizmente seu período de testes acabou :( , por favor preencha os dados de pagamento para continuar usando o sistema!"}
        user={user}
      />
    </div>
  )



};

export default TesteFinalizado;
