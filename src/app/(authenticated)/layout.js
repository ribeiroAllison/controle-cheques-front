"use client";

import Header from "@/components/Header";
import styles from "./layout.module.css";

export default function AuthenticatedLayout({ children }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentBar}>
        <Header />
      </div>
      <div className={styles.childrenWrapper}>
        {children}
      </div>
    </div>
  );
}
