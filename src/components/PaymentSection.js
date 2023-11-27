"use client";
import Assinatura from "@/apiServices/AssinaturaService";
import styles from "@/styles/PaymentSection.module.css";
import { fetchCEP } from "@/utils/cep";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./Button";
import LoadingScreen from "./LoadingScreen";

export default function PaymentSection({ isEdit, title, userId, billingInfo }) {
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

  const router = useRouter();

  const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB"

  //STATES
  const [clickedCard, setClickedCard] = useState({});
  const [boletoUrl, setBoletoUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [PagSeguro, setPagSeguro] = useState();


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
    setLoading(true);
    const address = {
      street: data.street,
      number: data.number,
      locality: data.locality,
      city: data.city,
      complement: "n/a",
      region_code: data.region_code,
      postal_code: data.postal_code,
      country: "BRA",
    };

    const response = await Assinatura.criarAssinaturaBoleto(
      userId,
      data.plano,
      address
    );
    console.log(response);
    if (response.status === 200) {
      setBoletoUrl(response.data[0].href);
      notifySuccess("Boleto gerado com sucesso!");
      setTimeout(() => {
        setLoading(false);
        router.push(response.data[0].href);
      }, 1000);
    } else {
      notifyFailure("Erro ao gerar boleto! Tente novamente.");
    }
  };

  const makeCardSub = async (data) => {
    const card = {
      publicKey: publicKey,
      holder: data.holder,
      number: data.card_number,
      expMonth: data.exp_month,
      expYear: data.exp_year,
      securityCode: data.security_code,
    };

    const encrypted = PagSeguro.encryptCard(card);

    const cardData = {
      encrypted: encrypted.encryptedCard,
      security_code: data.security_code,
      holder: {
        name: data.holder,
      },
      store: true
    };

    setLoading(true);
    const response = await Assinatura.criarAssinaturaCartao(
      userId,
      data.plano,
      cardData
    );
    setLoading(false);
    console.log(response);
    if (response) {
      notifySuccess("Pagamento processado com sucesso! Bem vindo ao recebi.app!");
      setValue("card_number", "");
      setValue("security_code", "");
      setValue("exp_month", "");
      setValue("exp_year", "")
      setValue("holder", "")
    } else {
      notifyFailure(
        `Falha ao processar pagarmento: ${response.error_messages[0].description}`
      );
    }
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

    const response = await fetchCEP(cep);
    if (response) {
      setValue("street", response.logradouro);
      setValue("city", response.localidade);
      setValue("locality", response.bairro);
      setValue("region_code", response.uf);
    } else {
      notifyFailure("Erro ao buscar CEP!");
    }
  };

  useEffect(() => {
    const pagLib = window.PagSeguro;
    if (pagLib) {
      setPagSeguro(pagLib);
    }
  });

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
                      onClick={searchAddress}
                    />
                  </div>
                </div>
                <div className={styles.inputCtr}>
                  <label>Endereço:</label>
                  <input
                    placeholder="Avenida dos Estados"
                    type="text"
                    {...register("street")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Número:</label>
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
                  <label>Bairro:</label>
                  <input
                    placeholder="Centro"
                    type="text"
                    style={{ width: "200px" }}
                    {...register("locality")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Cidade:</label>
                  <input
                    placeholder="São Paulo"
                    type="text"
                    style={{ width: "250px" }}
                    {...register("city")}
                    required
                  />
                </div>
                <div className={styles.inputCtr}>
                  <label>Estado:</label>
                  <input
                    placeholder="SP"
                    type="text"
                    style={{ width: "60px" }}
                    {...register("region_code")}
                    required
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
              <div className={styles.expDate}>
                <div className={styles.inputCtr}>
                  <label>Mês</label>
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
                  <label>Ano</label>
                  <input
                    {...register("exp_year", {
                      required: "Campo Obrigatório",
                    })}
                    type="number"
                    style={{ width: "80px" }}
                  />
                  <p>{errors.exp_date?.message}</p>
                </div>
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
