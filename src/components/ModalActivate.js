import Assinatura from "@/apiServices/AssinaturaService";
import style from "@/styles/ModalObs.module.css";
import { notifyFailure, notifySuccess } from "@/utils/utils";
import ButtonAlternative from "./ButtonAlternative";

export const ModalActivate = ({ handleActivateModalClose, assinaturaId }) => {

  const handleActivateSubscription = async () => {
    if(assinaturaId) {
      const response = await Assinatura.ativarAssinatura(assinaturaId);
      if(response.status === 204) {
        notifySuccess("Assinatura ativada com sucesso!");
        handleActivateModalClose()
      } else {
        notifyFailure("Não foi possível ativada a assinatura!")
      }
    }
  };

  return (
    <div id={style.obsBackground} className="activateScreen">
      <div className={style.obsCtr}>
        <img
          src="/images/x-icon.svg"
          onClick={handleActivateModalClose}
          alt="Icone para fechar modal"
        />
        <div className={style.popupHeader}>
          <div className={style.popupHeaderTitle}>
            <span>Tem certeza que deseja ativar?</span>
          </div>
        </div>
        <div>
          {/*<p className={style.popupMessage}>
            Ao suspender a assinatura, você terá que reativa-la para voltar a utilizar o sistema.
  </p>*/}
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
