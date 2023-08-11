import style from "../styles/HeaderLogin.module.css";
import Link from "next/link";

export default function HeaderLogin() {
  return (
    <>
      <header className={style.headerContainer}>
        <div className={style.imgContainer}>
          <Link href="/">
            <img src="/images/cheques-logo.svg" />
          </Link>
        </div>
        <nav className={style.navWrapper}>
          <ul>
            <li>
              <Link href="/">Fale Conosco</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
