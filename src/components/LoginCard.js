import styles from '../styles/LoginCard.module.css';

const LoginCard = ({title, children}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {children}
    </div>
  )
}

export default LoginCard