import styles from "../styles/ButtonAlternative.module.css";

const ButtonAlternative = ({ children, ...props }) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`${styles.button} ${props.style} ${props.redButton && styles.redButton} ${props.orangeButton && styles.orangeButton}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonAlternative;
