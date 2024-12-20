
import HeaderLogin from "@/components/HeaderLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./layout.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export default function PublicLayout({ children }) {
  return (
    <div className={styles.pageWrapper}>
      <ToastContainer autoClose={2200} pauseOnFocusLoss={false} pauseOnHover={false} />
      <a
        className="wpp-btn"
        href="https://wa.me/553530123787"
        target="_blank"
      >
        <FontAwesomeIcon beat icon={faWhatsapp} color="#FFF" size="3x" />
      </a>
      <HeaderLogin />
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
}
