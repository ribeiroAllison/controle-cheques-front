import styles from '../styles/ButtonAlternative.module.css';

const ButtonAlternative = ({children, ...props}) => {
  return (
    <button className={`${styles.button} ${props.style}`} {...props}>{children}</button>
  )
}

export default ButtonAlternative;