import styles from '../styles/Input.module.css';

const Input = (props) => {
  return (
    <input className={`${styles.input} inputId`} {...props} />
  )
}

export default Input