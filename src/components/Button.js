import styles from '../styles/Button.module.css';

const Button = ({children, ...props}) => {
  return (
    <button className={`${styles.button} ${props.style} 
                        ${props.orangeButton && styles.orangeButton}`} 
                        {...props}>
                          {children}
    </button>
  )
}

export default Button