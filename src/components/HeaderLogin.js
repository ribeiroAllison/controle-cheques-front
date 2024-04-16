import style from "../styles/HeaderLogin.module.css";
import Link from "next/link";

export default function HeaderLogin() {
  return (

    <header className={style.headerContainer}>
      <figure className={style.imgContainer}>
        <Link href="/">
          <img src="/images/cheques-logo.svg" />
        </Link>
      </figure>
      <nav className={style.navWrapper}>
        <ul>
          <li>
            <Link href="/fale-conosco">Fale Conosco</Link>
          </li>
        </ul>
      </nav>
    </header>

  );
}
