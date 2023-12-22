"use client";

import styles from "@/styles/funcionalidades.module.css";
import { Coin } from "@phosphor-icons/react";

export default function Funcionalidades() {
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <section className={styles.funcionalidadesSection}>
          <h1 className={styles.funcionalidadesTitle}>Funcionalidades</h1>
          <div className={styles.funcionalidadesContent}>
            <ul>
              <li>
                <span>
                  <Coin size={32} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={32} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </li>
              <li>
                <span>
                  <Coin size={32} color={"var(--green-100)"} />
                </span>
                <p className={styles.funcionalidadesParagraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.funcionalidadesSection}>
          <h1 className={styles.funcionalidadesTitle}>Vídeo Tutorial</h1>
          <div className={styles.funcionalidadesVideo}>
            <div>VIDEO AQUI</div>
          </div>
        </section>
      </div>
    </main>
  );
}
