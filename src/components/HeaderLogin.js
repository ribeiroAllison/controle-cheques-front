import { UserCircle } from '@phosphor-icons/react'
import style from '../styles/Header.module.css'
import Link from 'next/link'

export default function HeaderLogin() {

    return (
        <>
            <header className={style.header}>
                <div className={style.imgCtr}>
                    <Link href="/"><img className={style.img} src="/images/LISKO-TECH.png" /></Link>
                </div>
                <nav className={style.navBar}>
                    <div className={style.menuOptions}>
                        <div className={style.menuOption}>
                            <h2>Menu</h2>
                            <div className={style.option}>
                                <h3><Link href="/home/cadastro">Cadastro</Link></h3>
                                <h3><Link href="/home/login">Login</Link></h3>
                            </div>
                        </div>
                        <div className={style.menuOption}>
                            <h2>Fale Conosco</h2>
                            <div className={style.option}>
                                <h3><Link href="">Contato</Link></h3>
                                <h3><Link href="">Sobre</Link></h3>
                            </div>
                        </div>
                    </div>
                    <div className={style.menuOption}>
                        <div className={style.menuOption}>
                            <UserCircle
                                size={48}
                                color="#A8E4A0"
                                weight="regular"
                            />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}