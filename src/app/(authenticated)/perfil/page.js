"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import User from "@/apiServices/UserService";
import decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styles from "@/styles/perfil.module.css";

const Perfil = () => {

  //SET UPS
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
    setValue
  } = useForm()


  //STATE DECLARATIONS
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState();


  //EVENT HANDLERS
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      id: id,
    };

    const response = await User.editUser(user);
    if (response && response.status === 200) {
      notifySuccess(response.data);
    } else {
      notifyFailure(response.data);
    }
  };

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      const res = await User.getUserById(id);
      if(res){
        setValue('nome', res.nome)
        setValue('email', res.email)
        const formattedDate = res.birth_date ? new Date(res.birth_date).toISOString().split('T')[0] : '';
        setValue('birth_date', formattedDate)
        setValue('phones', res.phones)
        
      }
    } catch(error){
      console.log(error)
    }
  }


  //EFFECTS

  useEffect(() => {
    const token = document.cookie;
    const { id } = decode(token);
    setId(id);
  }, []);

  useEffect(() => {
    if(id){
      getUser(id)
    }
  },[id])

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Edite sua conta</h1>
          <form className={styles.editForm} onSubmit={handleSubmit}>
            <div className={styles.inputCtr}>
              <label>Nome:</label>
              <input
                {...register("nome")}
                type="text"
              />
            </div>
            <div className={styles.inputCtr}>
              <label>Email:</label>
              <input
              {...register("email")}
              type="text"
            />
            </div>
            <div className={styles.inputCtr}>
              <label>Data de Nascimento:</label>
              <input
              {...register("birth_date")}
              type="date"
            />
            </div>
            <div className={styles.inputCtr}>
              <label>Telefone:</label>
              <input
              {...register("phones")}
              type="text"
            />
            </div>
            
            
            
            
            
            <Button type="submit">Editar</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Perfil;
