"use client";

import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import styles from "@/styles/perfil.module.css";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Perfil = () => {
  //SET UPS
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm();

  //STATE DECLARATIONS
  const [id, setId] = useState(null);
  const [pagseguroId, setPagSeguroId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [clickedCard, setClickedCard] = useState({});

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

  const onPlanSubmit = async (data) => {
    const info = {
      plano: data.plano,
    };

    console.log(info);
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

  const handleDivClick = (fieldName, value) => {
    setValue(fieldName, value);
    setClickedCard(value);
  };

  const renderController = (fieldName, defaultValue, text1, text2, text3) => (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={defaultValue}
      render={() => (
        <div
          onClick={() => handleDivClick(fieldName, defaultValue)}
          className={styles.cardCtr}
          id={clickedCard === defaultValue && styles.clicked}
        >
          <h2>{text1}</h2>
          <p>{text2}</p>
          {text3 && <p className={styles.cardFooter}>{text3}</p>}
        </div>
      )}
    />
  );

  const paymentType = watch("payment_type");

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

            <Button type="submit">Salvar</Button>
          </form>
        </section>

        {/* PAYMENT SECTION */}
        <section className={styles.editContainer}>
          <h1 className={styles.editTitle}>Escolha seu Plano</h1>
          <form
            className={styles.paymentForm}
            onSubmit={handleSubmit(onPlanSubmit)}
          >
            <div className={styles.cardWrapper}>
              {renderController("plano", "mensal", "Mensal", "R$ 79,90/mês")}

              {renderController(
                "plano",
                "trimestral",
                "Trimestral",
                "R$ 69,90/mês",
                " * Um pagamento de R$ 209,70 a cada 03 meses"
              )}

              {renderController(
                "plano",
                "anual",
                "Anual",
                "R$ 62,90/mês",
                " * Um pagamento de R$ 754,80 a cada 12 meses"
              )}
            </div>
            <div className={styles.paymentWrapper}>
              <input
                type="radio"
                value="credit_card"
                name="payment_type"
                {...register("payment_type")}
              />
              <label htmlFor="payment_type" className={styles.labelRadio}>
                Cartão de Crédito
              </label>

              <input
                type="radio"
                value="boleto"
                name="payment_type"
                {...register("payment_type")}
              />
              <label htmlFor="payment_type" className={styles.labelRadio}>
                Boleto
              </label>
            </div>

            {paymentType === "credit_card" && (
              <div className={styles.creditCard}>
                <div className={styles.cardInfo}>
                  <div className={styles.inputCtr}>
                    <label>Número do Cartão:</label>
                    <input
                      {...register("card_number", {
                        required: "Campo Obrigatório",
                      })}
                      type="number"
                      style={{ width: "500px" }}
                    />
                    <p>{errors.card_number?.message}</p>
                  </div>

                  <div className={styles.inputCtr}>
                    <label>CV:</label>
                    <input
                      {...register("security_code", {
                        required: "Campo Obrigatório",
                        maxLength: 3,
                      })}
                      type="number"
                      style={{ width: "90px" }}
                    />
                    <p>{errors.security_code?.message}</p>
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.inputCtr}>
                    <label>Data de Vencimento:</label>
                    <input
                      {...register("exp_date", {
                        required: "Campo Obrigatório",
                      })}
                      type="date"
                      style={{ width: "200px" }}
                    />
                    <p>{errors.exp_date?.message}</p>
                  </div>

                  <div className={styles.inputCtr}>
                    <label>Nome do Titular:</label>
                    <input
                      {...register("holder", { required: "Campo Obrigatório" })}
                      type="text"
                      style={{ width: "390px" }}
                    />
                    <p>{errors.holder?.message}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Perfil;
