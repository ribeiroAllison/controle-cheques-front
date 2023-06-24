import HeaderLogin from '@/components/HeaderLogin';
import styles from '../../styles/IndexLayout.module.css';


const HomePage = () => {
    return (
        <>
            <HeaderLogin />
            <div className={styles.mainWrapper}>
                <h1 className={styles.mainTitle}>Seja bem-vindo, Usuário :)</h1>
            </div>
        </>
    )
}

export default HomePage