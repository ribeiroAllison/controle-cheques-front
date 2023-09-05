import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import header from "@/styles/landpage/Header.module.css";
import mainSection from "@/styles/landpage/MainSection.module.css";
import advantagesSection from "@/styles/landpage/Advantages.module.css";
import secondarySection from "@/styles/landpage/Secondary.module.css";
import contactSection from "@/styles/landpage/Contact.module.css";
import footerSection from "@/styles/landpage/Footer.module.css";

export default function Page() {
  return (
    <>
      <header className={header.headerWrapper}>
        <figure className={header.imgContainer}>
          <img src="/images/cheques-logo.svg" alt="" />
        </figure>
        <nav>
          <ul className={header.menuWrapper}>
            <Link href="/">
              <li>Funcionalidades</li>
            </Link>
            <Link href="/">
              <li>Planos</li>
            </Link>
            <Link href="/fale-conosco">
              <li>Fale conosco</li>
            </Link>
          </ul>
        </nav>
        <div className={header.btnContainer}>
          <Link href="/cadastrar">
            <Button>Teste grátis</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className={mainSection.container}>
          <div className={mainSection.textContainer}>
            <h1>
              <span>Esqueça a burocracia</span> e{" "}
              <em>foque nos novos horizontes</em> para o seu negócio.
            </h1>
            <h2>Sistema online de gestão de pagamentos</h2>
            <Link href="/cadastro">
              <Button style={{ backgroundColor: "var(--green-300)" }}>
                Teste grátis
              </Button>
            </Link>
          </div>
        </section>

        <section className={advantagesSection.container}>
          <div className={advantagesSection.titleWrapper}>
            <h1>
              Conheça tudo o que o <strong>recebi.app </strong>
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
                Pagamentos rastreados diariamente, facilitando o gerenciamento
                de múltiplas entradas e saídas.
              </p>
            </div>
            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/automat.svg" alt="" />
              <h2>Automatização</h2>
              <p>
                Operação 100% automatizada. Menos tempo com burocracia
                financeira e mais tempo para uma gestão mais eficiente.
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

        <section className={secondarySection.container}>
          <div className={secondarySection.btnContainer}>
            <Link href="/cadastro">
              <Button style={{ height: "60px" }}>
                Clique aqui e teste grátis
              </Button>
            </Link>
          </div>
          <section className={secondarySection.cardsWrapper}>
            <div className={secondarySection.cardContainer}>
              <img src="/images/secondary-cards/card1.svg" alt="" />
              <h1>Não se perca nos cheques</h1>
              <p>
                O recebi.app é uma sistema online que facilita a administração e
                gerenciamento de pagamentos recebidos e emitidos, além de
                realizar automações para que o gestor não perca prazos e
                informações. É o sistema ideal para empresas que trabalham com
                os cheques como forma de pagamentos e recebimentos.
              </p>
            </div>
            <div className={secondarySection.cardContainer}>
              <img src="/images/secondary-cards/card2.svg" alt="" />
              <h1>Não pare no tempo</h1>
              <p>
                Sabemos que o seu tempo é precioso, por isso o recebi.app é
                ajuda o gestor no gerenciamento e facilitação de tarefas de
                recebimentos, pagamentos e compensações de pagamentos através de
                automação. Menos tempo com burocracias e mais tempo para focar
                no que interessa para sua empresa.
              </p>
            </div>
          </section>
        </section>

        <section className={contactSection.container}>
          <div className={contactSection.contactWrapper}>
            <h1>Entre em contato e conheça o sistema.</h1>
            <Button style={{ backgroundColor: "var(--green-300)" }}>
              Nos chame no Whatsapp! <img src="/images/whats-icon.svg" />
            </Button>
          </div>
        </section>
      </main>

      <footer className={footerSection.container}>
        <section className={footerSection.footerWrapper}>
          <figure className={footerSection.imgContainer}>
            <img src="/images/cheques-logo.svg" alt="" />
          </figure>
          <p>2023. Todos direitos reservados.</p>
        </section>
      </footer>
    </>
  );
}
