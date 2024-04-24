"use client";

import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import header from "@/styles/landpage/Header.module.css";
import mainSection from "@/styles/landpage/MainSection.module.css";
import advantagesSection from "@/styles/landpage/Advantages.module.css";
import secondarySection from "@/styles/landpage/Secondary.module.css";
import contactSection from "@/styles/landpage/Contact.module.css";
import footerSection from "@/styles/landpage/Footer.module.css";
import fearSection from "@/styles/landpage/Fear.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Planos from "@/components/Planos";
import TestimonialsCarousel from "@/components/Carrosel";
import guy1 from "../../public/images/faces/guy1.png";
import guy2 from "../../public/images/faces/guy2.png";
import guy3 from "../../public/images/faces/guy3.png";
import guy4 from "../../public/images/faces/guy4.png";
import takadapng from "../../public/images/faces/takadapng.png"

export default function Page() {

  const testimonialsData = [
    {text:"O Recebi.app é uma ferramenta essencial para quem precisa controlar seus recebimentos. Agora consigo acompanhar todos os pagamentos de forma organizada e eficiente!", user: "Leandro Machado Chevalier", image: guy1},
    {text: "Com o Recebi.app, nunca mais perco de vista os cheques e boletos pendentes. É uma solução prática e confiável para gerenciar minhas finanças.", user: "Robson Álvares Ribeiro", image: guy2},
    {text: "Estou impressionada com a facilidade de uso do Recebi.app. Ele me ajuda a manter tudo em ordem e a evitar atrasos nos pagamentos.", user: "Janaína Takada", image: takadapng},
    {text: "O aplicativo é intuitivo e me permite registrar todos os recebimentos de forma rápida. Recomendo a todos os empreendedores e autônomos!", user: "Jackson Monteiro", image: guy3},
    {text: "Finalmente encontrei uma solução eficaz para controlar meus recebimentos. O Recebi.app é uma mão na roda!", user: "Rodrigo Oliveira Mendes", image: guy4}
  ];

  return (
    <>
      <a className="wpp-btn" href="https://wa.me/553530123787" target="_blank">
        <FontAwesomeIcon icon={faWhatsapp} beat color="#FFF" size="3x" />
      </a>
      <header className={header.headerWrapper}>
        <figure className={header.imgContainer}>
          <img src="/images/cheques-logo.svg" alt="" />
        </figure>
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
              <span>Você não terá mais dor de cabeça </span> na hora de{" "}
              <em>receber cheques, pix ou boletos</em>
            </h1>
            <h2>
              Com o recebi.app, a gestão dos seus recebíveis é feita na palma da
              mão.
            </h2>
            <Link href="/cadastrar">
              <Button style={{ backgroundColor: "var(--green-300)" }}>
                Teste grátis
              </Button>
            </Link>
          </div>
        </section>

        <section className={fearSection.container}>
          <div className={advantagesSection.titleWrapper}>
            <h1>
              Você tem realmente{" "}
              <strong style={{color: "var(--green-100)"}}>controle sobre seus recebimentos? </strong>
            </h1>
          </div>
          <div className={fearSection.contentCtr}>
            <figure className={fearSection.imageContainer}>
              <img src="/images/redGraph.jpeg" alt="grafico negativos" />
            </figure>
            <div className={fearSection.info}>
              <p>
                Fazer o controle de recebíveis como cheques, boletos e pix a
                cobrar, são exemplos de desafios que muitas empresas sofrem no
                momento de <strong>fazer a cobrança dos seus clientes.</strong> <br /> <br />
                A dor de cabeça, <strong> a falta de controle e a complexidade </strong> de realizar essa tarefa é
                algo penoso e que nos faz perder muito tempo e energia. <br /> <br/>Sem
                falar na chatice que é ficar o tempo todo, <strong> conferindo linha por
                linha de excel ou anotação em caderno</strong>, para depois ter que cobrar cliente por cliente.
              </p>
            </div>
          </div>
        </section>

        <section className={advantagesSection.container}>
          <div className={advantagesSection.titleWrapper}>
            <h1>
              Pensando nisso criamos o <strong>recebi.app </strong>
              um sistema online capaz de proporcionar:
            </h1>
          </div>
          <div className={advantagesSection.cardWrapper}>
            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/automat.svg" alt="" />
              <h2>Controle</h2>
              <p>
                Tenha controle sobre seus recebíveis! O recebi.app te alerta
                sobre recebimentos vencidos, com vencimentos próximos,
                estornados e muitos mais.
              </p>
            </div>

            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/traceable.svg" alt="" />
              <h2>Automatização</h2>
              <p>
                Todos seus recebimentos são atualizados de forma automática
                diariamente, de acordo com critérios de compensação e vencimento
                definidos por você!
              </p>
            </div>
            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/safety.svg" alt="" />
              <h2>Segurança</h2>
              <p>
                Software criptografado, com servidores nos Estados Unidos.
                Nenhum dado fica registrado no computador de acesso, seus
                recebíveis estão sempre em segurança nos nossos servidores
                americanos.
              </p>
            </div>

            <div className={advantagesSection.cardContainer}>
              <img src="/images/card-imgs/server.svg" alt="" />
              <h2>Liberdade</h2>
              <p>
                Controle seus recebíveis de qualquer lugar! Faça seu login e
                tenha seu controle pronto a qualquer hora e lugar!
              </p>
            </div>
          </div>
        </section>

        <section className={secondarySection.container}>
          <div className={secondarySection.btnContainer}>
            <Link href="/cadastrar">
              <Button style={{ height: "60px" }}>
                Clique aqui e teste grátis
              </Button>
            </Link>
          </div>
          <section
            className={secondarySection.cardsWrapper}
            style={{ paddingBottom: "50px" }}
          >
            <div className={advantagesSection.titleWrapper}>
              <h1>Veja o app funcionando!</h1>
            </div>
            <iframe
              width={650}
              height={400}
              src="https://www.youtube.com/embed/RifTZ3UY-cQ"
              title="Vídeo institucional recebi.app"
              frameBorder="0"
              allowFullScreen
            />
          </section>
          <div
            className={secondarySection.btnContainer}
            id={secondarySection.funcButton}
          >
            <Link href="/funcionalidades">
              <Button style={{ height: "80px" }} >
                Conheça todas as funcionalidades!
              </Button>
            </Link>
          </div>
          <section
            className={secondarySection.cardsWrapper}
            style={{
              backgroundColor: "white",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div
              className={advantagesSection.titleWrapper}
              id={advantagesSection.securityTitle}
            >
              <h1>Quem usa aprova!</h1>
            </div>
            <TestimonialsCarousel testimonials={testimonialsData} />
          </section>

          <section
            className={secondarySection.cardsWrapper}
            style={{ paddingBottom: "20px" }}
          >
            <div
              className={advantagesSection.titleWrapper}
              id={advantagesSection.securityTitle}
            >
              <h1>Conheça nossos planos!</h1>
            </div>
            <Planos />
          </section>
        </section>

        <section className={contactSection.container}>
          <div className={contactSection.contactWrapper}>
            <h1>Entre em contato e conheça o sistema.</h1>
            <a href="https://wa.me/553530123787" target="_blank">
              <Button style={{ backgroundColor: "var(--green-300)" }}>
                Nos chame no Whatsapp! <img src="/images/whats-icon.svg" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <footer className={footerSection.container}>
        <section className={footerSection.footerWrapper}>
          <figure className={footerSection.imgContainer}>
            <img src="/images/cheques-logo.svg" alt="" />
          </figure>
          <div className={footerSection.footerBox}>
            <p>2023. Todos direitos reservados.</p>
            <p style={{ fontSize: "13px" }}>
              Antares Soluções em Software - Grupo Lisko
            </p>
          </div>

          <a
            href="https://www.instagram.com/recebi.app/"
            target="_blank"
            className={footerSection.footerBox}
          >
            <FontAwesomeIcon icon={faInstagram} color="#FFF" size="3x" />
            <p>@recebi.app</p>
          </a>
        </section>
      </footer>
    </>
  );
}
