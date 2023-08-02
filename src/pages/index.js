import Button from "@/components/Button";
import Link from "next/link";
import header from "../styles/landpage/Header.module.css";
import mainSection from "../styles/landpage/MainSection.module.css";

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className={header.headerWrapper}>
        <div className={header.imgContainer}>
          <img src="/images/cheques-logo.svg" alt="" />
        </div>
        <nav>
          <ul className={header.menuWrapper}>
            <li>Funcionalidades</li>
            <li>Planos</li>
            <li>Fale conosco</li>
          </ul>
        </nav>
        <div className={header.btnContainer}>
          <Button>Teste grátis</Button>
          <Button>Login</Button>
        </div>
      </header>

      {/* MAIN BANNER SECTION */}
      <main className={mainSection.container}>
        <div className={mainSection.textContainer}>
          <h1>
            Esqueça a burocracia e <strong>foque nos novos horizontes</strong>{" "}
            para o seu negócio.
          </h1>
          <h2>Sistema online de gestão de cheques</h2>
          <Button>Teste grátis</Button>
        </div>
      </main>

      {/* ADVANTAGES SECTION */}
      <section>
        <h1>Teste grátis</h1>
      </section>
      {/* CARDS SECTION */}
      {/* FORM SECTION */}
      {/* FOOTER SECTION */}
    </>
  );
}
