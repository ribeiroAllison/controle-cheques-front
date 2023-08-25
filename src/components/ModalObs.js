import style from "@/styles/ModalObs.module.css";
import ButtonAlternative from "./ButtonAlternative";

export const ModalObs = ({
  obsDetails,
  handleEditObs,
  handleClearObs,
  handleCloseObs,
  setObsDetails,
}) => {
  return (
    <div id={style.obsBackground} className="obsScreen">
      <div className={style.obsCtr}>
        <div className={style.popupHeader}>
          <h1>{`Cheque ${obsDetails.num} do cliente ${obsDetails.cliente}`}</h1>
          <img src="/images/x-icon.svg" onClick={handleCloseObs} />
        </div>
        <div className={style.obsContent}>
          <label>Observação:</label>
          <textarea
            value={obsDetails.obs}
            onChange={(e) =>
              setObsDetails({ ...obsDetails, obs: e.target.value })
            }
          ></textarea>
        </div>

        <div className={style.btnContainer}>
          <ButtonAlternative 
            type="submit" 
            id="editObs" 
            onClick={handleEditObs}>
            Salvar
          </ButtonAlternative>
          <ButtonAlternative
            type="submit"
            id="deleteObs"
            onClick={handleClearObs}
            style={{ backgroundColor: "var(--redTd)"}}
          >
            Deletar
          </ButtonAlternative>
        </div>
      </div>
    </div>
  );
};
