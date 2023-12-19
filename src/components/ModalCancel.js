import Assinatura from "@/apiServices/AssinaturaService";
import style from "@/styles/ModalObs.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import ButtonAlternative from "./ButtonAlternative";

export const ModalCancel = ({ handleCancelModalClose, assinaturaId }) => {

  const handleCancelSubscription = async () => {
    if(assinaturaId) {
      const response = await Assinatura.suspenderAssinatura(assinaturaId);
      if(response.status === 204) {
        notifySuccess("Assinatura suspensa com sucesso!");
        handleCancelModalClose()
      } else {
        notifyFailure("Não foi possível suspender a assinatura!")
      }
    }
  };

  return (
    <div id={style.obsBackground} className="obsScreen">
      <div className={style.obsCtr}>
        <img
          src="/images/x-icon.svg"
          onClick={handleCancelModalClose}
          alt="Icone para fechar modal"
        />
        <div className={style.popupHeader}>
          <div className={style.popupHeaderTitle}>
            <span>Tem certeza que deseja suspender?</span>
          </div>
        </div>
        <div>
          <p className={style.popupMessage}>
            Ao suspender a assinatura, você terá que reativa-la para voltar a utilizar o sistema.
          </p>
        </div>
        <div className={style.btnContainer}>
          <ButtonAlternative
            type="submit"
            id="editObs"
            onClick={handleCancelSubscription}
          >
            Sim
          </ButtonAlternative>
          <ButtonAlternative
            type="submit"
            id="deleteObs"
            onClick={handleCancelModalClose}
            style={{ backgroundColor: "var(--redTd)" }}
          >
            Não
          </ButtonAlternative>
        </div>
      </div>
    </div>
  );
};
