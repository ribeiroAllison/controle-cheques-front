"use client";

import Header from "@/components/Header";
import styles from "./layout.module.css";
import { useState } from "react";
import HeaderUser from "@/components/HeaderUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function AuthenticatedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.pageWrapper}>
      <a
        className={styles.wpp_btn}
        href="https://wa.me/553530123787"
        target="_blank"
      >
        <FontAwesomeIcon beat icon={faWhatsapp} color="#FFF" size="3x" />
      </a>
      <div className={`${styles.contentBar} ${!isOpen ? '' : styles.contentBarClosed}`}>
        <Header isOpen={isOpen} handleSideBar={handleSideBar} />
      </div>
      <div className={styles.childrenWrapper}>
        <HeaderUser />
        {children}
      </div>
    </div>
  );
}
