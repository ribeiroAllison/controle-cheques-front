"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import decode from "jwt-decode";

import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import PaymentSection from "@/components/PaymentSection";

import User from "@/apiServices/UserService";
import { formatPhoneNumber, notifyFailure, notifySuccess } from "@/utils/utils";

import styles from "@/styles/perfil.module.css";

const Perfil = () => {
  //SET UPS
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //STATE DECLARATIONS
  const [id, setId] = useState(null);
  const [pagseguroId, setPagSeguroId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [user, setUser] = useState();

  //EVENT HANDLERS
  const onSubmit = async (data) => {
    data.phones = data.phones.replace(/\D/g, "");

    const user = {
      id: id,
      nome: data.nome,
      email: data.email,
      birth_date: data.birth_date,
      phones: data.phones,
      pagseguro_id: pagseguroId,
    };
    await getResponse(user);
  };

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      setIsLoading(true);
      const user = await User.getUserById(id);
      if (user) {
        setUser(user);
        setValue("nome", user.name);
        setValue("email", user.email);
        const formattedDate = user.birth_date
          ? new Date(user.birth_date).toISOString().split("T")[0]
          : "";
        setValue("birth_date", formattedDate);
        setValue(
          "phones",
          formatPhoneNumber(user.phones[0].area.concat(user.phones[0].number))
        );
        setPagSeguroId(user.id);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getResponse = async (user) => { 
    setIsLoading(true);
    const response = await User.editUser(user);

    if (response.status === 201) {
      setIsLoading(false);
      notifySuccess("Usuário atualizado com sucesso");
    } else {
      setIsLoading(false);
      notifyFailure(`Erro ao editar. Erro: ${response.response.data}`);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneNumber(formattedValue);
  };

  //EFFECTS
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

  return (
    <>
      <LoadingScreen loading={isLoading} />
      
      <main className={styles.editWrapper}>
        {/* ACCOUNT SECTION */}
        <section className={styles.editContainer}>
          <h1 className={styles.editTitle}>Edite sua conta</h1>
          <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputCtr}>
                <label htmlFor="nome">Nome:</label>
                <input
                  {...register("nome", { required: "Campo Obrigatório" })}
                  type="text"
                />
                <p>{errors.nome?.message}</p>
              </div>
              <div className={styles.inputCtr}>
                <label htmlFor="email">Email:</label>
                <input
                  {...register("email", { required: "Campo Obrigatório" })}
                  type="text"
                />
                <p>{errors.email?.message}</p>
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputCtr}>
                <label htmlFor="birth_date">Data de Nascimento:</label>
                <input
                  {...register("birth_date", { required: "Campo Obrigatório" })}
                  type="date"
                />
                <p>{errors.birth_date?.message}</p>
              </div>
              <div className={styles.inputCtr}>
                <label htmlFor="phones">Telefone:</label>
                <input
                  {...register("phones", { required: "Campo Obrigatório" })}
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <p>{errors.phones?.message}</p>
              </div>
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </section>
        <PaymentSection
          userId={pagseguroId}
          title={"Planos & Pagamento"}
          user={user}
        />
      </main>
    </>
  );
};

export default Perfil;
