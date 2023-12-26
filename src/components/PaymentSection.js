"use client";
import Assinatura from "@/apiServices/AssinaturaService";
import styles from "@/styles/PaymentSection.module.css";
import { fetchCEP } from "@/utils/cep";
import {
  handleActivateModalClose,
  handleActivateModalOpen,
  handleCancelModalClose,
  handleCancelModalOpen,
  handleOpenEditPayment,
} from "@/utils/modal-functions";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import EditPaymentModal from "./EditPaymentModal";
import LoadingScreen from "./LoadingScreen";
import { ModalActivate } from "./ModalActivate";
import { ModalCancel } from "./ModalCancel";
import { planoAnual, planoMensal, planoTrimestral } from "@/utils/url";

export default function PaymentSection({ title, userId, user, text }) {
  //SETUPS
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    getValues,
  } = useForm();

  const publicKey = process.env.NEXT_PUBLIC_CARD_ENCRYPT_KEY;

  //STATES
  const [clickedCard, setClickedCard] = useState({});
  const [boletoUrl, setBoletoUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [PagSeguro, setPagSeguro] = useState();
  const [lastBoleto, setLastBoleto] = useState(null);

  // console.log(user);

  const handleDivClick = (fieldName, value) => {
    setValue(fieldName, value);
    setClickedCard(value);
  };

  const paymentType = watch("payment_type");

  //SETUPS
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

  const makeBoletoSub = async (data) => {
    if (user?.status === "PENDING") {
      notifyFailure(
        "Assinatura consta como pendente! Favor aguardar aprovação."
      );
    } else {
      setLoading(true);
      const address = {
        street: data.street,
        number: data.number,
        locality: data.locality,
        city: data.city,
        complement: data.complement || "n/a",
        region_code: data.region_code,
        postal_code: data.postal_code,
        country: "BRA",
      };

      if (!user?.assinatura_id) {
        const response = await Assinatura.criarAssinaturaBoleto(
          userId,
          data.plano,
          address
        );

        if (response.status === 200) {
          setBoletoUrl(response.data[0].href);
          notifySuccess("Boleto gerado com sucesso!");
          setLoading(false);
        } else {
          notifyFailure("Erro ao gerar boleto! Tente novamente.");
        }
      } else {
        setLoading(false);
      }
    }
  };

  const makeCardSub = async (data) => {
    if (user.status === "PENDING") {
      notifyFailure(
        "Assinatura consta como pendente! Favor aguardar aprovação."
      );
      return;
    }

    if (!user?.assinatura_id) {
      const card = {
        publicKey,
        holder: data.holder,
        number: data.card_number,
        expMonth: data.exp_month,
        expYear: data.exp_year,
        securityCode: data.security_code,
      };

      const encrypted = PagSeguro.encryptCard(card);
      const jsonEnc = JSON.stringify(encrypted);
      console.log(`encrypted: ${jsonEnc}`)

      const cardData = {
        encrypted: encrypted.encryptedCard,
        security_code: data.security_code,
        holder: { name: data.holder },
        store: true,
      };

      const cartDataJson = JSON.stringify(cardData);

      console.log(`carData: ${cartDataJson}`);

      setLoading(true);
      const response = await Assinatura.criarAssinaturaCartao(
        userId,
        data.plano,
        cardData
      );
      setLoading(false);
      console.log(response);
      if (response.status === 200) {
        notifySuccess(
          "Pagamento processado com sucesso! Bem vindo ao recebi.app!"
        );
        resetCardFormValues();
        location.reload();
      } else {
        notifyFailure(
          `Falha ao processar pagamento: ${response.data.error_messages[0].error}`
        );
      }
    } else {
      setLoading(false);
      }
  };

  // reset card fields
  const resetCardFormValues = () => {
    const fields = [
      "card_number",
      "security_code",
      "exp_month",
      "exp_year",
      "holder",
    ];
    fields.forEach((field) => setValue(field, ""));
  };

  const onPlanSubmit = async (data) => {
    if (paymentType === "BOLETO") {
      await makeBoletoSub(data);
    } else if (paymentType === "CREDIT_CARD") {
      await makeCardSub(data);
    }
  };

  // cep search
  const searchAddress = async () => {
    const cep = getValues("postal_code");
    try {
      const response = await fetchCEP(cep);

      setValue("street", response.logradouro);
      setValue("city", response.localidade);
      setValue("locality", response.bairro);
      setValue("region_code", response.uf);
    } catch (error) {
      notifyFailure("Erro ao buscar CEP!");
    }
  };

  const getLastBoleto = async () => {
    const response = await Assinatura.buscarUltimoBoleto(user?.id);
    if (response) {
      setLastBoleto(response.data);
    }
  };

  useEffect(() => {
    const pagLib = window.PagSeguro;
    if (pagLib) {
      setPagSeguro(pagLib);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      getLastBoleto();
    }
  }, [user]);

  return (
    <section className={styles.editContainer}>
      <LoadingScreen loading={loading} />
      {text && <h2 className={styles.editText}>{text}</h2>}
      {!text && <h1 className={styles.editTitle}>{title}</h1>}
      <form
        className={styles.paymentForm}
        onSubmit={handleSubmit(onPlanSubmit)}
      >
        {user?.status && user?.status !== "SUSPENDED" ? (
          <div className={styles.actualPlanSection}>
            <p className={styles.actualPlanText}>
              Plano Atual: <strong>{user?.plan.name}</strong>
            </p>
            <p className={styles.actualPlanText}>
              Vigência: <strong>{user?.next_invoice_at ?? "N/A"}</strong>
            </p>
            {user?.payment_method[0].type === "BOLETO" && lastBoleto && (
              <a
                href={lastBoleto}
                target="_blank"
                className={styles.boletoLink}
              >
                {" "}
                Baixe seu último boleto aqui!{" "}
              </a>
            )}

            {user?.status === "PENDING" && (
              <p className={styles.actualPlanText}>
                Situação: <strong>Pendente</strong>
              </p>
            )}
            {user?.status === "OVERDUE" && (
              <p className={styles.actualPlanText}>
                Situação: <strong>Fatura atrasada.</strong>
              </p>
            )}
          </div>
        ) : (
          <div className={styles.cardWrapper}>
            {renderController(
              "plano",
              planoMensal,
              "Mensal",
              "R$ 79,90/mês"
            )}

            {renderController(
              "plano",
              planoTrimestral,
              "Trimestral",
              "R$ 69,90/mês",
              " * Um pagamento de R$ 209,70 a cada 03 meses"
            )}

            {renderController(
              "plano",
              planoAnual,
              "Anual",
              "R$ 62,90/mês",
              " * Um pagamento de R$ 754,80 a cada 12 meses"
            )}
          </div>
        )}
        {user?.status === "ACTIVE" || user?.status === "PENDING" ? null : (
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
        )}

        {paymentType === "BOLETO" && !user?.status && (
          <div className={styles.addressWrapper}>
            <h3 className={styles.addressSectionTitle}>Endereço de Cobrança</h3>
            <div className={styles.addressSection}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputCtr}>
                  <label htmlFor="postal_code">CEP:</label>
                  <div className={styles.cepSearch}>
                    <input
                      placeholder="XX.XXX-XXX"
                      type="text"
                      inputMode="numeric"
                      style={{ width: "180px" }}
                      onBlur={searchAddress}
                      {...register("postal_code")}
                    />
                    <MagnifyingGlass
                      width={36}
                      height={36}
                      color="#0CD494"
                      weight="fill"
                      className={styles.icon}
                      alt="Clique para buscar!"
                      onClick={searchAddress}
                    />
                  </div>
                </div>
                <div className={styles.inputCtr}>
                  <label htmlFor="street">Endereço:</label>
                  <input
                    placeholder="Avenida dos Estados"
                    type="text"
                    {...register("street")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label htmlFor="number">Número:</label>
                  <input
                    placeholder="1508"
                    type="text"
                    style={{ width: "100px" }}
                    {...register("number")}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.inputCtr}>
                  <label htmlFor="locality">Bairro:</label>
                  <input
                    placeholder="Centro"
                    type="text"
                    style={{ width: "200px" }}
                    {...register("locality")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label htmlFor="complement">Complemento:</label>
                  <input
                    placeholder="Apto 01"
                    type="text"
                    style={{ width: "150px" }}
                    {...register("complement")}
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label htmlFor="city">Cidade:</label>
                  <input
                    placeholder="São Paulo"
                    type="text"
                    style={{ width: "250px" }}
                    {...register("city")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label htmlFor="region_code">Estado:</label>
                  <input
                    placeholder="SP"
                    type="text"
                    style={{ width: "70px" }}
                    {...register("region_code")}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {boletoUrl && (
          <a href={boletoUrl} target="_blank" className={styles.boletoLink}>
            {" "}
            Baixe o Boleto Aqui!{" "}
          </a>
        )}

        {paymentType === "CREDIT_CARD" && !user?.status && (
          <div className={styles.creditCard}>
            <div className={styles.cardInfo}>
              <div className={styles.inputCtr}>
                <label htmlFor="card_number">Número do Cartão:</label>
                <input
                  {...register("card_number", {
                    required: "Campo Obrigatório",
                  })}
                  type="number"
                  inputMode="numeric"
                  style={{ width: "500px" }}
                />
                <p>{errors.card_number?.message}</p>
              </div>

              <div className={styles.inputCtr}>
                <label htmlFor="security_code">CV:</label>
                <input
                  {...register("security_code", {
                    required: "Campo Obrigatório",
                    maxLength: 3,
                  })}
                  type="number"
                  inputMode="numeric"
                  style={{ width: "90px" }}
                />
                <p>{errors.security_code?.message}</p>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.expDate}>
                <div className={styles.inputCtr}>
                  <label htmlFor="exp_month">Mês:</label>
                  <input
                    {...register("exp_month", {
                      required: "Campo Obrigatório",
                    })}
                    type="number"
                    style={{ width: "80px" }}
                  />
                  <p>{errors.exp_month?.message}</p>
                </div>{" "}
                <div className={styles.inputCtr}>
                  <label htmlFor="exp_year">Ano:</label>
                  <input
                    {...register("exp_year", {
                      required: "Campo Obrigatório",
                    })}
                    type="number"
                    maxLength={2}
                    style={{ width: "90px" }}
                  />
                  <p>{errors.exp_date?.message}</p>
                </div>
              </div>

              <div className={styles.inputCtr}>
                <label htmlFor="holder">Nome do Titular:</label>
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

        {user?.status ? (
          <div className={styles.bottomSection}>
            <div onClick={handleOpenEditPayment} className={styles.editBtn}>
              Editar
            </div>
            {user?.status && user?.status !== "SUSPENDED" ? (
              <span
                onClick={handleCancelModalOpen}
                className={styles.cancelBtn}
              >
                Desejo suspender minha assinatura.
              </span>
            ) : null}
          </div>
        ) : (
          <div className={styles.bottomSection}>
            <Button type="submit">Salvar</Button>
            {user?.status === "SUSPENDED" ? (
              <span
                onClick={handleActivateModalOpen}
                className={styles.cancelBtn}
              >
                Desejo ativar minha assinatura.
              </span>
            ) : null}
          </div>
        )}
      </form>
      <ModalCancel
        handleCancelModalClose={handleCancelModalClose}
        assinaturaId={user?.assinatura_id}
      />
      <ModalActivate
        handleActivateModalClose={handleActivateModalClose}
        assinaturaId={user?.assinatura_id}
      />
      <EditPaymentModal title="Edite Seu Plano" user={user} />
    </section>
  );
}
