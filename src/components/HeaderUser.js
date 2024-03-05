"use client";

import styles from "@/styles/HeaderUser.module.css";
import { getCookie, removeCookie } from "@/utils/cookie";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WarningOctagon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function HeaderUser() {
  const [name, setName] = useState("");
  const [trialDays, setTrialDays] = useState(0);
  const [paid, setPaid] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [nextInvoice, setNextInvoice] = useState();

  const router = useRouter();

  const handleLogout = async () => {
    const confirmation = confirm("Você realmente deseja sair?");
    if (confirmation) {
      removeCookie('token');
      removeCookie('user');
      removeCookie('isUserAllowed');
      removeCookie('trialDays');
      removeCookie('paid');
      removeCookie('paymentMethod');
      removeCookie('nextInvoice');
      removeCookie('signatureDaysLeft');
      removeCookie("openTutorialModal");
      setTimeout(() => {
        router.push("/login");
      }, 1100);
    } else {
      return;
    }
  };

  const getDaysDifference = date => {
    // Parse the input date
    const inputDate = new Date(date);
    
    // Get today's date
    const today = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = today.getTime() - inputDate.getTime();
  
    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    return daysDifference;
  }

  useEffect(() => {
    setName(getCookie("user"));
    setTrialDays(Number(getCookie("trialDays")));
    const paymentStatus = getCookie("paid");
    setPaid(paymentStatus !== "false");
    setPaymentMethod(getCookie("paymentMethod"));
    setNextInvoice(getCookie("nextInvoice"));
  }, []);

  return (
    <div>
      <div className={styles.headerUserContainer}>
        <div className={styles.headerUserWrapper}>
          <div className={styles.headerUserLeft}>
            <p>Olá, {name}!</p>
            <Link href="/perfil">
              <Button style={{ height: "40px", width: "130px" }}>Editar</Button>
            </Link>
          </div>
        </div>
        {trialDays > 0 && !paid && (
          <div className={styles.warning}>
            <WarningOctagon size={30} weight="fill" />
            <div className={styles.warningText}>
              <p>{`${trialDays > 1 ? "Restam" : "Resta"} ${trialDays} ${
                trialDays > 1 ? "dias" : "dia"
              } de teste grátis`}</p>
              <Link href="/perfil" className={styles.subscribeButton}>
                Ative sua conta agora
              </Link>
            </div>
          </div>
        )}

        {(paymentMethod === "BOLETO" && getDaysDifference(nextInvoice) >= -7 && getDaysDifference(nextInvoice) <=0) && 
          <div className={styles.warning}>
            <WarningOctagon size={30} weight="fill" />
            <div className={styles.warningText}>
              <p>{`Seu próximo boleto vence em ${Math.abs(getDaysDifference(nextInvoice))} dias`}</p>
              <Link href="/perfil" className={styles.subscribeButton}>
                Faça o download!
              </Link>
            </div>
          </div>
        }

        <div className={styles.btnContainer}>
          <a
            className={styles.wpp_btn}
            href="https://wa.me/553530123787"
            target="_blank"
          >
            <FontAwesomeIcon beat icon={faWhatsapp} color="#FFF" size="3x" />
          </a>
          <Link href="/suporte">
            <Button orangeButton={true} style={{ width: "130px" }}>
              Suporte
            </Button>
          </Link>
          <Link href="/">
            <Button onClick={handleLogout} style={{ width: "130px" }}>
              Sair
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
