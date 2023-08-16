import { UserFocus } from "@phosphor-icons/react";
import Button from "./Button";
import Link from "next/link";
import styles from "@/styles/headerUser.module.css";
import { getCookie } from "@/utils/cookie";

export default function HeaderUser() {
  const name = getCookie('user');
  return (
    <div>
      <div className={styles.headerUserContainer}>
        <div className={styles.headerUserWrapper}>
          <UserFocus size={90} weight="fill" color="#44A815" />
          <div className={styles.headerUserLeft}>
            <p>Olá, {name}!</p>
            <Link href="/perfil">
              <Button style={{ height: "40px", width: "150px" }}>Editar</Button>
            </Link>
          </div>
        </div>
        <div>
          <Link href="/">
            <Button>Sair</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
