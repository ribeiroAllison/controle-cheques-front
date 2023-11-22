"use client";

import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import PaymentSection from "@/components/PaymentSection";
import styles from "@/styles/perfil.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

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

  //EVENT HANDLERS
  const onSubmit = async (data) => {
    const user = {
      id: id,
      nome: data.nome,
      email: data.email,
      birth_date: data.birth_date,
      phones: data.phones,
      pagseguro_id: pagseguroId,
    };
    const getResponse = async () => {
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

    await getResponse();
  };

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      const res = await User.getUserById(id);
      if (res) {
        setValue("nome", res.nome);
        setValue("email", res.email);
        const formattedDate = res.birth_date
          ? new Date(res.birth_date).toISOString().split("T")[0]
          : "";
        setValue("birth_date", formattedDate);
        setValue("phones", res.phones);
        setPagSeguroId(res.pagseguro_id);
      }
    } catch (error) {
      console.log(error);
    }
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
      <ToastContainer autoClose={2000} />
      <main className={styles.editWrapper}>
        {/* ACCOUNT SECTION */}
        <section className={styles.editContainer}>
          <h1 className={styles.editTitle}>Edite sua conta</h1>
          <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputCtr}>
                <label>Nome:</label>
                <input
                  {...register("nome", { required: "Campo Obrigatório" })}
                  type="text"
                />
                <p>{errors.nome?.message}</p>
              </div>
              <div className={styles.inputCtr}>
                <label>Email:</label>
                <input
                  {...register("email", { required: "Campo Obrigatório" })}
                  type="text"
                />
                <p>{errors.email?.message}</p>
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputCtr}>
                <label>Data de Nascimento:</label>
                <input
                  {...register("birth_date", { required: "Campo Obrigatório" })}
                  type="date"
                />
                <p>{errors.birth_date?.message}</p>
              </div>
              <div className={styles.inputCtr}>
                <label>Telefone:</label>
                <input
                  {...register("phones", { required: "Campo Obrigatório" })}
                  type="text"
                />
                <p>{errors.phones?.message}</p>
              </div>
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </section>
        <PaymentSection userId={pagseguroId} title={"Planos & Pagamento"} isEdit={true} />
      </main>
    </>
  );
};

export default Perfil;
