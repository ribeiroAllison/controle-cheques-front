"use client";

import styles from "@/styles/funcionalidades.module.css";
import advantagesSection from "@/styles/landpage/Advantages.module.css"
import { Coin } from "@phosphor-icons/react";
import VideoLoader from "./VideoLoader";

export default function Funcionalidades() {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.headBanner}>
        <h1>
          Conheça as funções do recebi.app que vão facilitar seu controle de
          recebíveis!
        </h1>
        <img src="/images/funcionalidades.png" />
      </div>
      <div className={styles.container}>
        <div className={advantagesSection.titleWrapper}>
          <h1>
            Dashboard, a sua <strong>central de controle!</strong>
          </h1>
        </div>
        <section className={styles.funcionalidadesSection}>
          <div className={styles.funcionalidadesContent}>
            
            <p className={styles.funcionalidadesDescription}>
              Através da tela inicial, o Dashboard, você tem um panorama geral
              de seus recebíveis. Confira os detalhes no vídeo abaixo!
            </p>
            <ul>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lista de recebíveis estornados (inadimplentes).
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lista de recebíveis vencidos e sem destinação.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lista de recebíveis próximos do vencimento.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Seus dez maiores devedores.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Taxa de inadimplência dos últimos 30 dias.
                </p>
              </li>
            </ul>
          </div>
          <VideoLoader
            title="Funcionalidades do Dashboard"
            url="https://www.youtube.com/embed/1Az4N8wJqqc"
        />
        </section>

        
      </div>

      <div className={`${styles.container} ${styles.alternativeBackground}`}>
        <div className={advantagesSection.titleWrapper}>
            <h1>
              Cadastre dados relevantes para seus recebíveis de forma <strong>customizada e inteligente!</strong>
            </h1>
        </div>
        <section className={styles.funcionalidadesSection}>
          <div className={styles.funcionalidadesContent}>
            <p className={styles.funcionalidadesDescription}>
              Para cada recebível nosso sistema permite que você cadastre várias
              informações como:
            </p>
            <ul>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Destinação do recebível - Para quem foi repassado ou onde foi depositado.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Tipo de pagamento recebido como cheque, pix, depósito, boleto.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Vendedor associado à venda.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Cliente que realizou o pagamento.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Grupo financeiro a qual o cliente faz parte.
                </p>
              </li>
            </ul>
          </div>
          <VideoLoader
          title="Funcionalidades Cadastros"
          url="https://www.youtube.com/embed/Iuzut6XEbh0"
        />
        </section>
        
      </div>

      <div className={styles.container}>
        <div className={advantagesSection.titleWrapper}>
          <h1>
            Cadastre seus recebíveis de forma <strong>rápida e prática!</strong>
          </h1>
        </div>
        <section className={styles.funcionalidadesSection}>
          <div className={styles.funcionalidadesContent}>
            <p className={styles.funcionalidadesDescription}>
              É bem simples cadastrar seus recebíveis no recebi.app. Nosso
              sistema facilita esse processo com funções como:
            </p>
            <ul>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Cadastro de até 10 recebíveis de uma só vez.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Replique número do recebível ou seu valor ao toque de um
                  botão.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Dados do cliente são automaticamente preenchidos.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Sistema de busca para todas as variáveis de cadastro, impossibilitando 
                  erros por digitação.
                </p>
              </li>
            </ul>
          </div>
          <VideoLoader
          title="Funcionalidades Cadastro Recebíveis"
          url="https://www.youtube.com/embed/rYE_gXtDsS4"
        />
        </section>
        
      </div>

      <div className={`${styles.container} ${styles.alternativeBackground}`}>
        <div className={advantagesSection.titleWrapper}>
          <h1>
            Avançado <strong>sistema de filtros!</strong> encontre facilmente seus recebíveis,
            e faça relatórios customizados!
          </h1>
        </div>
        <section className={styles.funcionalidadesSection}>
          <div className={styles.funcionalidadesContent}>
            <p className={styles.funcionalidadesDescription}>
              Através de um avançado sistema de filtros você tem controle total
              sobre seus dados de recebimento.
            </p>
            <ul>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Filtre seus recebíveis por data, cliente, grupo, status de
                  pagamento, destino, número de pedido ou número de pagamento.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Misture os parâmetros de filtro e faça relatórios personalizados.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Repasse diversos recebíveis a um mesmo destino de forma massiva.
                </p>
              </li>
            </ul>
          </div>
          <VideoLoader
          title="Funcionalidades Cadastro Recebíveis"
          url="https://www.youtube.com/embed/pJVQMDch5H8"
        />
        </section>
        
      </div>

      <div className={styles.container}>
        <div className={advantagesSection.titleWrapper}>
          <h1>
            Personalize o sistema para atender às <strong>suas necessidades!</strong>
          </h1>
        </div>
        <section className={styles.funcionalidadesSection}>
          <div className={styles.funcionalidadesContent}>
            <p className={styles.funcionalidadesDescription}>
              Ajuste como e quando o sistema deve compensar ou tornar vencido um recebível.
            </p>
            <ul>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Configure o período de tolerância para tornar um título vencido.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={25} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Defina quando um recebível deve ser automaticamente compensado.
                </p>
              </li>
            </ul>
          </div>
          <VideoLoader
          title="Funcionalidades Cadastro Recebíveis"
          url="https://www.youtube.com/embed/gHzpoAG97nI"
        />
        </section>
        
      </div>
    </main>
  );
}
