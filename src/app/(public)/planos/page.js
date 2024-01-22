"use client"

import styles from "@/styles/Planos.module.css"
import Link from "next/link";

export default function Planos () {

    return (
      <main className={styles.main}>
        <div className={styles.cardCtn}>
          <h3>Mensal</h3>

          <div>
            <p>Uma cobrança por mês no valor equivalente a:</p>
            <div className={styles.priceUpperCtn}>
                <div className={styles.priceCtn}>
                    <h4>R$</h4>
                    <h2>79,90</h2>
                </div>
                <h5>/ mês</h5>
            </div>
            <h5>* Uma cobrança no valor de R$ 79,90 a cada 01 mês</h5>
          </div>

          <Link className={styles.testButton} href="/cadastrar">
            <p>Teste Grátis 31 dias</p>
          </Link>
        </div>

        <div className={styles.cardCtn} id={styles.popularCtr}>
          <div className={styles.popularHeader}>
            <h3>Trimestral</h3>
            <div className={styles.popularButton}>
              <p>Popular</p>
            </div>
          </div>
          <div>
            <p>Uma cobrança a cada 03 meses, o que equivale a</p>
            <div className={styles.priceUpperCtn}>
                <div className={styles.priceCtn}>
                    <h4>R$</h4>
                    <h2>69,90</h2>
                </div>
                <h5>/ mês</h5>
            </div>
            <h5>* Uma cobrança no valor de R$ 209,70 a cada 03 meses</h5>
          </div>

          <Link className={styles.testButton} href="/cadastrar">
            <p>Teste Grátis 31 dias</p>
          </Link>
        </div>

        <div className={styles.cardCtn}>
          <h3>Anual</h3>
          <div>
            <p>Uma cobrança a cada 12 meses, o que equivale a</p>
            <div className={styles.priceUpperCtn}>
                <div className={styles.priceCtn}>
                    <h4>R$</h4>
                    <h2>62,90</h2>
                </div>
                <h5>/ mês</h5>
            </div>
            <h5>* Uma cobrança no valor de R$ 754,80 a cada 12 meses</h5>
          </div>

          <Link className={styles.testButton} href="/cadastrar">
            <p>Teste Grátis 31 dias</p>
          </Link>
        </div>
      </main>
    );
}