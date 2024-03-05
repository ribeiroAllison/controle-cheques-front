"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeaderUser from "@/components/HeaderUser";
import styles from "./layout.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



export default function AuthenticatedLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.pageWrapper}>
      <ToastContainer autoClose={2200} pauseOnFocusLoss={false} pauseOnHover={false}/>
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
