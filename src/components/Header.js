import style from '../styles/Header.module.css'
import Link from 'next/link'

export default function Header (){

    return(
        <>
            <header className={style.header}> 

                <div className={style.imgCtr}>
                    <Link href="/"><img className={style.img}  src="https://multitoc.com.br/wp-content/uploads/2021/08/LOGO-MULTITOC-GRANDE-PRETA-1024x266.png" /></Link>
                </div>
                
                
                <nav className={style.navBar}>
                    
                    <div className={style.menu}>
                        
                        <h2>Cadastro</h2>
                                                
                        <div className={style.option}>
                            <h3><Link href="/clientes">Clientes</Link></h3>
                            <h3><Link href="/destinos">Destinos</Link></h3>
                            <h3><Link href="/grupos">Grupos</Link></h3>
                        </div>
                    </div>

                    <div className={style.menu}>
                        <h2>Cheques</h2>
                                                
                        <div className={style.option}>
                            <h3><Link href="">Cadastro</Link></h3>
                        </div>
                    </div>

                    <div className={style.menu}>
                        <h2>Relatórios</h2>
                                                
                        <div className={style.option}>
                            <h3><Link href="">Cheques Vencidos</Link></h3>
                            <h3><Link href="">Recebíveis</Link></h3>
                        </div>
                    </div>
                    
                </nav>
            </header>
        </>
    )
}