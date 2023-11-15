import styles from "@/styles/PaymentSection.module.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";

export default function PaymentSection({ isEdit, title }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm();

  const [clickedCard, setClickedCard] = useState({});

  const handleDivClick = (fieldName, value) => {
    setValue(fieldName, value);
    setClickedCard(value);
  };

  const paymentType = watch("payment_type");

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
    };

    console.log(info)
  };

  return (
    <section className={styles.editContainer}>
      <h1 className={styles.editTitle}>{title}</h1>
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
  );
}
