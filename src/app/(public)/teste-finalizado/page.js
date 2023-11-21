"use client";

import User from "@/apiServices/UserService";
import Button from "@/components/Button";
import styles from "@/styles/teste-finalizado.module.css";
import decode from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Perfil = () => {
  //SET UPS
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm();

  //STATE DECLARATIONS
  const [id, setId] = useState(null);
  const [pagseguroId, setPagSeguroId] = useState();
  const [clickedCard, setClickedCard] = useState({});

  const paymentType = watch("payment_type");

  const handleDivClick = (fieldName, value) => {
    setValue(fieldName, value);
    setClickedCard(value);
  };

  //AUX FUNCTIONS
  const getUser = async (id) => {
    try {
      const res = await User.getUserById(id);
      if (res) {
        setPagSeguroId(res.pagseguro_id);
      }
    } catch (error) {
      console.log(error);
    }
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

  const onPlanSubmit = async (data) => {
    const info = {
      plano: data.plano,
      pagseguro_id: pagseguroId
    };

    console.log(info);
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
      <ToastContainer autoClose={2000} />
      <div className={styles.editWrapper}>
        <div className={styles.editContainer}>
          <h1 className={styles.editTitle}>Seu período de teste acabou :(</h1>
          <div className="inputField">
            <p className={styles.editExplain}>
              Caso queira continuar utilizando o <strong>Recebi.app</strong>,
              selecione a forma de pagamento abaixo!
            </p>
            <p className={styles.editExplain}>
              Se precisar, nos chame via <strong>Whatsapp</strong> ou envie uma
              mensagem para o suporte {" "}
              <Link href="/suporte">
                <strong>aqui</strong>.
              </Link>
            </p>
          </div>
          {/* PAYMENT SECTION */}
          <section>
            <h1 className={styles.editTitle}>Escolha seu Plano</h1>
            <form
              className={styles.paymentForm}
              onSubmit={handleSubmit(onPlanSubmit)}
            >
              <div className={styles.cardWrapper}>
                {renderController(
                  "plano", 
                  "PLAN_3F974C03-3D01-466B-B2D8-080DA0800E53", 
                  "Mensal", 
                  "R$ 79,90/mês"
                )}

                {renderController(
                  "plano",
                  "PLAN_5C176F39-9BCA-4CFF-86C8-13AEC18B88C4",
                  "Trimestral",
                  "R$ 69,90/mês",
                  " * Um pagamento de R$ 209,70 a cada 03 meses"
                )}

                {renderController(
                  "plano",
                  "PLAN_10583870-020D-4644-B176-7247E2024DFC",
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
                        {...register("holder", {
                          required: "Campo Obrigatório",
                        })}
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
        </div>
      </div>
    </>
  );
};

export default Perfil;
