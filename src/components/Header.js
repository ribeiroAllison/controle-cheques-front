"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookie";
import {
  ArrowsLeftRight,
  Briefcase,
  ClockCounterClockwise,
  Coins,
  List,
  MagnifyingGlass,
  NotePencil,
  PresentationChart,
  UserCircle,
  UserGear,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import styles from "@/styles/Header.module.css";
import Image from 'next/image'

export default function Header({ isOpen, handleSideBar }) {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmation = confirm("Você realmente deseja sair?");
    if (confirmation) {
      removeCookie("token");
      setTimeout(() => {
        router.push("/login");
      }, 1100);
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className={`${styles.sidebar} ${!isOpen ? "" : styles.closedSideBar}`}
        id="sidebar"
      >
        <header className={styles.header}>
          <Image 
            src="/images/cheques-icon.svg"
            alt="logo"
            width={70}
            height={70}
          />
          {isOpen ? (
            <List
              size={32}
              weight="fill"
              className={styles.icon}
              onClick={handleSideBar}
            />
          ) : (
            <X
              size={25}
              weight="fill"
              className={styles.icon}
              onClick={handleSideBar}
            />
          )}
        </header>

        <div className={styles.menuSection}>
          <p>Home</p>
          <ul className={styles.menuOptions}>
            <li>
              <Link href="/dashboard">
                <UserCircle size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/perfil">
                <PresentationChart
                  size={`${isOpen ? "42" : "28"}`}
                  color="white"
                />
                <span>Perfil</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.menuSection}>
          <p>Cadastro</p>
          <ul className={styles.menuOptions}>
            <li>
              <Link href="/cadastro/clientes">
                <UserGear size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link href="/cadastro/destinos">
                <ArrowsLeftRight
                  size={`${isOpen ? "42" : "28"}`}
                  color="white"
                />
                <span>Destino</span>
              </Link>
            </li>
            <li>
              <Link href="/cadastro/grupos">
                <UsersThree size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Grupo</span>
              </Link>
            </li>
            <li>
              <Link href="/cadastro/vendedores">
                <Briefcase size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Vendedores</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.menuSection}>
          <p>Cheques</p>
          <ul className={styles.menuOptions}>
            <li>
              <Link href="/cheques/cadastro">
                <NotePencil size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Cadastrar</span>
              </Link>
            </li>
            <li>
              <Link href="/cheques/consultar-cheques">
                <MagnifyingGlass
                  size={`${isOpen ? "42" : "28"}`}
                  color="white"
                />
                <span>Consultar</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.menuSection}>
          <p>Relatórios</p>
          <ul className={styles.menuOptions}>
            <li>
              <Link href="#">
                <ClockCounterClockwise
                  size={`${isOpen ? "42" : "28"}`}
                  color="white"
                />
                <span>Vencidos</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Coins size={`${isOpen ? "42" : "28"}`} color="white" />
                <span>Recebíveis</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
