"use client";

import Header from "@/components/Header";
import styles from "./layout.module.css";
import { useState } from "react";
import HeaderUser from "@/components/HeaderUser";


export default function AuthenticatedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.pageWrapper}>
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
