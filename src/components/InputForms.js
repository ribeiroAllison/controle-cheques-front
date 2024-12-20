import styles from "@/styles/InputForm.module.css"

export const InputForms = (props) => {
  const { className: propClassName, ...otherProps } = props;
  const combinedClassName = `${styles.formInput} ${propClassName || ''}`;

  return ( 
  <input 
    type={props.type} 
    placeholder={props.placeholder}
    id={props.id}
    onChange={props.onChange}
    className={combinedClassName}
    autoComplete={props.autoComplete}
    name={props.name}
    required={props.required}
    disabled={props.disabled}
    value={props.value}
    defaultValue={props.defaultValue}
    {...otherProps}
  />
  )
}