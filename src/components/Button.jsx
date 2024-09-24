import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    <botton onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </botton>
  );
}

export default Button;
