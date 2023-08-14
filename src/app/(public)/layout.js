import HeaderLogin from "@/components/HeaderLogin";
import styles from "./layout.module.css";

export default function PublicLayout({ children }) {
  return (
    <div className={styles.pageWrapper}>
      <HeaderLogin />
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
}
