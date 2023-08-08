import Button from "@/components/Button";
import Link from "next/link";
import header from "../styles/landpage/Header.module.css";
import mainSection from "../styles/landpage/MainSection.module.css";
import advantagesSection from "../styles/landpage/Advantages.module.css";
import secondarySection from "../styles/landpage/Secondary.module.css";
import contactSection from "../styles/landpage/Contact.module.css";
import footerSection from "../styles/landpage/Footer.module.css";

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
          <Link href="/home/login"><Button>Login</Button></Link>
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

      {/* SECONDARY SECTION */}
      <section className={secondarySection.container}>
        <div className={secondarySection.btnContainer}>
          <Button>Clique aqui e teste grátis</Button>
        </div>
        <div className={secondarySection.cardsWrapper}>
          <div className={secondarySection.cardContainer}>
            <img src="/images/secondary-cards/card1.svg" alt="" />
            <h1>Não se perca nos cheques</h1>
            <p>
              O Cheques.App é uma sistema online que facilita a administração e
              gerenciamento de cheques recebidos e emitidos, além de realizar
              automações para que o gestor não perca prazos e informações. É o
              sistema ideal para empresas que trabalham com os cheques como
              forma de pagamentos e recebimentos.
            </p>
          </div>
          <div className={secondarySection.cardContainer}>
            <img src="/images/secondary-cards/card2.svg" alt="" />
            <h1>Não pare no tempo</h1>
            <p>
              Sabemos que o seu tempo é precioso, por isso o Cheques.App é ajuda
              o gestor no gerenciamento e facilitação de tarefas de
              recebimentos, pagamentos e compensações de cheques através de
              automação. Menos tempo com burocracias e mais tempo para focar no
              que interessa para sua empresa.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={contactSection.container}>
        <div className={contactSection.contactWrapper}>
          <h1>Entre em contato e conheça o sistema.</h1>
          <Button>
            Nos chame no Whatsapp! <img src="/images/whats-icon.svg" />
          </Button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className={footerSection.container}>
        <div className={footerSection.footerWrapper}>
          <div className={footerSection.imgContainer}>
            <img src="/images/cheques-logo.svg" alt="" />
          </div>
          <p>2023. Todos direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
