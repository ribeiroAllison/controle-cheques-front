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

  const router = useRouter();

  const handleLogout = async () => {
    const confirmation = confirm("Você realmente deseja sair?");
    if (confirmation) {
      removeCookie('token');
      removeCookie('user');
      removeCookie('userAllowed');
      removeCookie('trialDays');
      setTimeout(() => {
        router.push("/login");
      }, 1100);
    } else {
      return;
    }
  };

  useEffect(() => {
    setName(getCookie("user"));
    setTrialDays(getCookie("trialDays"));
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
