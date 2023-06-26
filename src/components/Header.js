import style from '../styles/Header.module.css'
import Link from 'next/link'
import { UserCircle } from '@phosphor-icons/react'

export default function Header() {

    return (
        <>
            <header className={style.header}>

                <div className={style.imgCtr}>
                    <Link href="/home/dashboard"><img className={style.img} src="/images/LISKO-TECH.png" /></Link>
                </div>

                <nav className={style.navBar}>
                    <div className={style.menuOptions}>
                        <div className={style.menuOption}>
                            <h2>Cadastro</h2>
                            <div className={style.option}>
                                <h3><Link href="/cadastro/clientes">Clientes</Link></h3>
                                <h3><Link href="/cadastro/destinos">Destinos</Link></h3>
                                <h3><Link href="/cadastro/grupos">Grupos</Link></h3>
                                <h3><Link href="/cadastro/vendedores">Vendedores</Link></h3>
                            </div>
                        </div>

                        <div className={style.menuOption}>
                            <h2>Cheques</h2>
                            <div className={style.option}>
                                <h3><Link href="/cheques/cadastro">Cadastrar</Link></h3>
                                <h3><Link href="/cheques/consultar-cheques">Consultar</Link></h3>
                            </div>
                        </div>

                        <div className={style.menuOption}>
                            <h2>Relatórios</h2>
                            <div className={style.option}>
                                <h3><Link href="">Cheques Vencidos</Link></h3>
                                <h3><Link href="">Recebíveis</Link></h3>
                            </div>
                        </div>
                    </div>
                    <div className={style.menuOption}>
                        <UserCircle
                            className={style.icon}
                            size={48}
                            color="#A8E4A0"
                            weight="regular"
                        />
                        <div className={style.option}>
                            <h3><Link href="">Minha Conta</Link></h3>
                            <h3><Link href="">Sair</Link></h3>
                        </div>
                    </div>

                </nav>
            </header>
        </>
    )
}