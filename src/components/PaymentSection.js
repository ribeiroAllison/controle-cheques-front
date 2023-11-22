"use client";
import Assinatura from "@/apiServices/AssinaturaService";
import styles from "@/styles/PaymentSection.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import LoadingScreen from "./LoadingScreen";

export default function PaymentSection({ isEdit, title, userId }) {
  //SETUPS
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm();

  const router = useRouter();

  //STATES
  const [clickedCard, setClickedCard] = useState({});
  const [boletoUrl, setBoletoUrl] = useState();
  const [loading, setLoading] = useState(false);

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

  const onAddressSubmit = async (data) => {
    const address = {
      street: data.street,
      number: data.number,
      locality: data.locality,
      city: data.city,
      complement: '',
      region_code: data.region_code,
      postal_code: data.postal_code,
      country: 'BRA',
    }

    const response = await Assinatura.editarEnderecoAssinante(userId, address);
    console.log(response);
  }

  const onPlanSubmit = async (data) => {
    setLoading(true);
    const response = await Assinatura.criarAssinaturaBoleto(userId, data.plano);
    const responseAddress = await onAddressSubmit();
    console.log(responseAddress)
    if(response.status === 200) {
      setBoletoUrl(response[0].href);
      notifySuccess('Boleto gerado com sucesso!')
      setTimeout(() => {
        setLoading(false);
        router.push(response[0].href);
      }, 1000)
    } else {
      setLoading(false)
      notifyFailure('Falha ao gerar boleto! Tente mais tarde.')
    }
  };

  return (
    <section className={styles.editContainer}>
      <LoadingScreen loading={loading} />
      <h1 className={styles.editTitle}>{title}</h1>
      <form
        className={styles.paymentForm}
        onSubmit={handleSubmit(onPlanSubmit)}
      >
        <div className={styles.cardWrapper}>
          {renderController(
            "plano",
            "PLAN_8E129C7C-BB73-48F2-B265-DDDFDBAECF19",
            "Mensal",
            "R$ 79,90/mês"
          )}

          {renderController(
            "plano",
            "PLAN_E4CE4617-A23C-4A30-AD90-B5C4D6D09BD7",
            "Trimestral",
            "R$ 69,90/mês",
            " * Um pagamento de R$ 209,70 a cada 03 meses"
          )}

          {renderController(
            "plano",
            "PLAN_530536A7-941B-45D0-A350-9E5D219A42C0",
            "Anual",
            "R$ 62,90/mês",
            " * Um pagamento de R$ 754,80 a cada 12 meses"
          )}
        </div>
        <div className={styles.paymentWrapper}>
          <input
            type="radio"
            value="CREDIT_CARD"
            name="payment_type"
            {...register("payment_type")}
          />
          <label htmlFor="payment_type" className={styles.labelRadio}>
            Cartão de Crédito
          </label>

          <input
            type="radio"
            value="BOLETO"
            name="payment_type"
            {...register("payment_type")}
          />
          <label htmlFor="payment_type" className={styles.labelRadio}>
            Boleto
          </label>
        </div>

        {paymentType === "BOLETO" && (
          <div className={styles.addressWrapper}>
            <h3 className={styles.addressSectionTitle}>Endereço de Cobrança</h3>
            <div className={styles.addressSection}>
              <div className={styles.inputWrapper}>
              <div className={styles.inputCtr}>
                <label>CEP:</label>
                <div className={styles.cepSearch}>
                  <input
                    placeholder="XX.XXX-XXX"
                    type="text" 
                    inputMode="numeric"
                    style={{ width: "180px" }}
                    {...register("postal_code")}
                  />
                  <MagnifyingGlass
                    width={36}
                    height={36}
                    color="#0CD494"
                    weight="fill"
                    className={styles.icon}
                    alt="Clique para buscar!"
                  />
                </div>
              </div>
                <div className={styles.inputCtr}>
                  <label>Endereço:</label>
                  <input
                    placeholder="Avenida dos Estados"
                    type="text"
                    {...register("street")}
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Número:</label>
                  <input
                    placeholder="1508"
                    type="text" 
                    inputMode="numeric"
                    style={{ width: "100px" }}
                    {...register("number")}
                  />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.inputCtr}>
                  <label>Bairro:</label>
                  <input
                    placeholder="Centro"
                    type="text"
                    style={{ width: "200px" }}
                    {...register("locality")}
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Cidade:</label>
                  <input
                    placeholder="São Paulo"
                    type="text"
                    style={{ width: "250px" }}
                    {...register("city")}
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Estado:</label>
                  <input
                    placeholder="SP"
                    type="text"
                    style={{ width: "60px" }}
                    {...register("region_code")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {boletoUrl && (
          <a href={boletoUrl} className={styles.boletoLink}>
            {" "}
            Baixe o Boleto Aqui!{" "}
          </a>
        )}

        {paymentType === "CREDIT_CARD" && (
          <div className={styles.creditCard}>
            <div className={styles.cardInfo}>
              <div className={styles.inputCtr}>
                <label>Número do Cartão:</label>
                <input
                  {...register("card_number", {
                    required: "Campo Obrigatório",
                  })}
                  type="text" 
                  inputMode="numeric"
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
                  type="text" 
                  inputMode="numeric"
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
