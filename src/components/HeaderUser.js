"use client";

import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/HeaderUser.module.css";
import { getCookie, removeCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WarningOctagon } from "@phosphor-icons/react";

export default function HeaderUser() {
  const [name, setName] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    const confirmation = confirm("Você realmente deseja sair?");
    if (confirmation) {
      removeCookie("token");
      setTimeout(() => {
        router.push("/login");
      }, 1100);
    } else {
      return;
    }
  };

  useEffect(() => {
    setName(getCookie("user"));
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
          <WarningOctagon size={30} weight="fill"/>
          <div className={styles.warningText}>
            <p>{`Restam 20 dias de teste grátis`}</p>
            <Link href={""} className={styles.subscribeButton}>Ative sua conta agora</Link>
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
            <Button orangeButton={true} style={{width: "130px"}}>Suporte</Button>
          </Link>
          <Link href="/">
            <Button onClick={handleLogout} style={{width: "130px"}}>Sair</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
