"use client";

import { UserFocus } from "@phosphor-icons/react";
import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/HeaderUser.module.css";
import { getCookie, removeCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
          <UserFocus size={90} weight="fill" color="#384b41" />
          <div className={styles.headerUserLeft}>
            <p>Olá, {name}!</p>
            <Link href="/perfil">
              <Button style={{ height: "40px", width: "150px" }}>Editar</Button>
            </Link>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Link href="/suporte">
            <Button style={{ backgroundColor: "var(--orangeTd" }}>Suporte</Button>
          </Link>
          <Link href="/">
            <Button onClick={handleLogout}>Sair</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
