import Modal from "react-modal";
import styles from "@/styles/ModalTutorial.module.css"
import { useState } from "react";
import Image from "next/image";
import VideoLoader from "./VideoLoader";
import { Student } from "@phosphor-icons/react";
export default function ModalTutorial () {

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(!isOpen)
    }

    return(

            <Modal
            isOpen={isOpen}
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
                    <a href="/tutoriais" className={styles.linkButton}>
                        <Student size={40}/>
                        Veja todos os tutoriais aqui
                    </a>
                </main>

            </Modal>

    )
}