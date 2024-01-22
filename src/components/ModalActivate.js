import Image from "next/image";
import ButtonAlternative from "./ButtonAlternative";
import style from "@/styles/ModalObs.module.css";

export const ModalActivate = ({ handleOpenEditPayment, handleActivateModalClose, assinaturaId }) => {
  const handleActivateSubscription = async () => {
    if (assinaturaId) {
      handleOpenModalEditPayment()
    }
  };

  const handleOpenModalEditPayment = () => {
    handleOpenEditPayment()
  }

  return (
    <div id={style.obsBackground} className="activateScreen">
      <div className={style.obsCtr}>
        <Image
          src="/images/x-icon.svg"
          onClick={handleActivateModalClose}
          alt="Icone para fechar modal"
          width={22}
          height={22}
        />
        <div className={style.popupHeader}>
          <div className={style.popupHeaderTitle}>
            <span>Tem certeza que deseja ativar?</span>
          </div>
        </div>
        <div>
        </div>
        <div className={style.btnContainer}>
          <ButtonAlternative
            type="submit"
            id="editObs"
            onClick={handleActivateSubscription}
          >
            Sim
          </ButtonAlternative>
          <ButtonAlternative
            type="submit"
            id="deleteObs"
            onClick={handleActivateModalClose}
            style={{ backgroundColor: "var(--redTd)" }}
          >
            Não
          </ButtonAlternative>
        </div>
      </div>
    </div>
  );
};
