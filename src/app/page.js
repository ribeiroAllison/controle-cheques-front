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
              <span>Ganhe tempo e eficiência</span> ,{" "}
              <em>tenha controle total sobre</em> seus recebíveis.
            </h1>
            <h2>Sistema online de gestão de recebíveis</h2>
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
              <img src="/images/card-imgs/automat.svg" alt="" />
              <h2>Controle</h2>
              <p>
                Tenha controle sobre seus recebíveis!
                O recebi.app te alerta sobre recebimentos  
                vencidos, com vencimentos próximos, 
                estornados e muitos mais.

              </p>
            </div>
            
            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/traceable.svg" alt="" />
              <h2>Automatização</h2>
              <p>
                Todos seus recebimentos são atualizados de forma automática diariamente,
                de acordo com critérios de compensação e vencimento definidos por você!
              </p>
            </div>
            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/safety.svg" alt="" />
              <h2>Segurança</h2>
              <p>
                Software criptografado, com servidores nos Estados Unidos. 
                Nenhum dado fica registrado no computador de acesso,
                seus recebíveis estão sempre em segurança nos nossos servidores
                americanos.
              </p>
            </div>

            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/server.svg" alt="" />
              <h2>Liberdade</h2>
              <p>
                Controle seus recebíveis de qualquer lugar! 
                Faça seu login e tenha seu controle pronto a qualquer hora e lugar!

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
              <h1>Não se perca nos recebimentos</h1>
              <p>
                O recebi.app é uma sistema online que facilita a administração e
                gerenciamento de recebíveis de forma simples e automatizada.
                Tenha total controle sobre seus recebimentos a prazo via cheque, PIX, vale, 
                e muito mais. Nunca mais deixe um recebimento vencer na sua mão ou se esqueça de 
                fazer uma cobrança!

              </p>
            </div>
            <div className={secondarySection.cardContainer}>
              <img src="/images/secondary-cards/card2.svg" alt="" />
              <h1>Praticidade e automação</h1>
              <p>
                O recebi.app te alerta diariamente sobre pagamentos vencidos, sem destinação,
                próximos de vencer e estornados. Além disso você pode estipular limite de crédito
                a seus clientes e filtrar seus recebíveis por cliente, pedido, vencimento, grupo 
                , status de pagamento e outras formas!
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
