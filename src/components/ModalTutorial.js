import Modal from "react-modal";
import styles from "@/styles/ModalTutorial.module.css"
import Image from "next/image";
import VideoLoader from "./VideoLoader";
import { Student } from "@phosphor-icons/react";
import { getCookie, setCookie } from "@/utils/cookie";
import { useState } from "react";


export default function ModalTutorial () {

    const [ isOpen, setIsOpen ] = useState(getCookie('openTutorialModal'));

    const handleClose = () => {
        setIsOpen(false);
        setCookie( 'openTutorialModal', false);
    }

    return(

            <Modal
            isOpen={isOpen === "true"}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "680px",
                height: "650px",
                margin: "auto",
                border: "none",
                borderRadius: "15px",
                paddingLeft: "40px",
                paddingRight: "40px",
              },
            }}
            >
                <div className={styles.close}>
                    <Image
                        src="/images/x-icon.svg"
                        alt=""
                        onClick={handleClose}
                        width={25}
                        height={25}
                    />
                </div>

                <header className={styles.header}>
                    <h2>É novo por aqui?</h2>
                    <h2>Conheça nossa página de Tutoriais!</h2>
                </header>
                <main  className={styles.main}>
                    <VideoLoader
                        title="Funcionalidades do Dashboard"
                        url="https://www.youtube.com/embed/W81HNofSAco"
                    />
                    <a href="/tutoriais" className={styles.linkButton} onClick={handleClose}>
                        <Student size={40}/>
                        Veja todos os tutoriais aqui
                    </a>
                </main>

            </Modal>

    )
}