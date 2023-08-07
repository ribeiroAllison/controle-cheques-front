import Button from "@/components/Button";
import Link from "next/link";
import header from "../styles/landpage/Header.module.css";
import mainSection from "../styles/landpage/MainSection.module.css";
import advantagesSection from "../styles/landpage/Advantages.module.css";

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
            <Link href="/">
              <li>Funcionalidades</li>
            </Link>
            <Link href="/">
              <li>Planos</li>
            </Link>
            <Link href="/">
              <li>Fale conosco</li>
            </Link>
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
      <section className={advantagesSection.container}>
        <div className={advantagesSection.titleWrapper}>
          <h1>
            Conheça tudo o que o <strong>cheques.app </strong>
            pode fazer pelo seu negócio
          </h1>
        </div>
        <div className={advantagesSection.cardWrapper}>
          <div className={advantagesSection.cardContainer}>
            <img src="/images/card-imgs/safety.svg" alt="" />
            <h2>Segurança</h2>
            <p>
              Software criptografado de ponta a ponta, mais segurança para as
              informações financeiras da sua empresa.
            </p>
          </div>
          <div className={advantagesSection.cardContainer}>
            <img src="/images/card-imgs/traceable.svg" alt="" />
            <h2>Rastreabilidade</h2>
            <p>
              Cheques rastreados diariamente, facilitando o gerenciamento de
              múltiplas entradas e saídas.
            </p>
          </div>
          <div className={advantagesSection.cardContainer}>
            <img src="/images/card-imgs/automat.svg" alt="" />
            <h2>Automatização</h2>
            <p>
              Operação 100% automatizada. Menos tempo com burocracia financeira
              e mais tempo para uma gestão mais eficiente.
            </p>
          </div>
          <div className={advantagesSection.cardContainer}>
            <img src="/images/card-imgs/server.svg" alt="" />
            <h2>Servidor nos EUA</h2>
            <p>
              Mais velocidade nas operações e tarefas e mais segurança da
              informação.
            </p>
          </div>
        </div>
      </section>
      {/* CARDS SECTION */}
      {/* FORM SECTION */}
      {/* FOOTER SECTION */}
    </>
  );
}
