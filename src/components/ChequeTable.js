"use client";

import styles from "@/styles/Table.module.css";
import {
  convertToNumber,
  transformCurrency,
  transformDate,
} from "@/utils/utils";
import {
  ChatCircleDots,
  IdentificationCard,
  PencilLine,
  Trash,
} from "@phosphor-icons/react";
import ButtonAlternative from "./ButtonAlternative";

export default function ChequeTable(props) {
  const assignClassStyle = (cheque) => {
    if (
      cheque.vencido &&
      !cheque.compensado &&
      !cheque.linha &&
      !cheque.destino
    ) {
      return styles.vencTrue;
    } else if (cheque.compensado) {
      return styles.chequeOK;
    } else if (cheque.linha) {
      return styles.semFundo;
    } else if (!cheque.compensado && cheque.destino) {
      return styles.withDestino;
    }
  };

  const handleCheckboxChange = (event) => {
    const id = event.target.name;
    if (event.target.checked) {
      props.setSelected([...props.selected, id]);
    } else {
      const filtered = props.selected.filter((element) => element !== id);
      props.setSelected(filtered);
    }
  };

  return (
    <>
      {props.selectedSum > 0 && (
        <div className={styles.massEditCtr}>
          <ButtonAlternative onClick={props.openMassEdit}>
            Edição Em Massa
          </ButtonAlternative>
          <span>Valor Selecionado:</span>
          <span>
            {props.selectedSum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {!props.submitOnMount && <th></th>}
              <th>Cliente</th>
              <th>Grupo</th>
              <th>No.</th>
              <th>Pedido</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Destino</th>
              <th>Data Venc.</th>
              <th>Comp.</th>
              <th>Venc.</th>
              <th>Estornado</th>
              <th>Vendedor</th>
              <th>Obs</th>
              <th>Contato</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {props.list?.map(
              (cheque) =>
                cheque.cliente_id && (
                  <tr
                    key={cheque.id}
                    id={`row${cheque.id}`}
                    className="chequeRow"
                  >
                    {!props.submitOnMount && (
                      <td className={assignClassStyle(cheque)}>
                        <input
                          type="checkbox"
                          name={cheque.id}
                          className="checkbox"
                          onChange={handleCheckboxChange}
                        />
                      </td>
                    )}
                    <td
                      name={cheque.id}
                      id={`client${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.cliente}
                    </td>
                    <td
                      name={cheque.id}
                      id={`grupo${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.grupo}
                    </td>
                    <td
                      name={cheque.id}
                      id={`numCheque${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.número_cheque}
                    </td>
                    <td
                      name={cheque.id}
                      id={`pedido${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.pedido}
                    </td>
                    <td
                      name={cheque.id}
                      id={styles.noBreak}
                      className={assignClassStyle(cheque)}
                    >
                      {transformCurrency(cheque.valor)}
                    </td>
                    <td name={cheque.id} className={assignClassStyle(cheque)}>
                      {cheque.tipo}
                    </td>
                    <td
                      name={cheque.id}
                      id={`destino${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.destino}
                    </td>
                    <td
                      name={cheque.id}
                      id={styles.noBreakDate}
                      className={assignClassStyle(cheque)}
                    >
                      {transformDate(cheque.data_venc)}
                    </td>
                    <td
                      name={cheque.id}
                      id={`compensado${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.compensado ? "Sim" : "Não"}
                    </td>
                    <td
                      name={cheque.id}
                      id={`vencido${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.vencido ? "Sim" : "Não"}
                    </td>
                    <td
                      name={cheque.id}
                      id={`linha${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.linha ? "Sim" : "Não"}
                    </td>
                    <td
                      name={cheque.id}
                      id={`vendedor${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.vendedor}
                    </td>
                    <td
                      name={cheque.id}
                      id={`obs${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      {cheque.obs && (
                        <ChatCircleDots
                          className={styles.Icon}
                          size={32}
                          color="black"
                          onClick={() => props.handleOpenObs(cheque)}
                        />
                      )}
                    </td>
                    <td
                      name={cheque.id}
                      id={`contato${cheque.id}`}
                      className={assignClassStyle(cheque)}
                    >
                      <IdentificationCard
                        className={styles.Icon}
                        size={32}
                        color="black"
                        onClick={() => props.handleContactClick(cheque)}
                      />
                    </td>
                    <td name={cheque.id} className={assignClassStyle(cheque)}>
                      <PencilLine
                        className={styles.Icon}
                        size={32}
                        color="black"
                        onClick={() =>
                          props.handleEdit(cheque, "editWindowBackground")
                        }
                      />
                    </td>
                    <td name={cheque.id} className={assignClassStyle(cheque)}>
                      <Trash
                        className={styles.Icon}
                        size={32}
                        color="black"
                        onClick={() => props.handleDelete(cheque.id)}
                      />
                    </td>
                  </tr>
                )
            )}

            <tr className={styles.finalRow}>
              <td colSpan={3}>TOTAL RECEBÍVEIS</td>
              <td>
                {
                  props.list?.filter((cheque) => cheque.cliente_id !== null)
                    .length
                }
              </td>
              <td colSpan={3}>
                {props.list
                  ? props.list
                      ?.filter((cheque) => cheque.cliente_id !== null)
                      .reduce((acc, item) => {
                        acc += convertToNumber(item.valor);
                        return acc;
                      }, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                  : 0}
              </td>
              <td>-</td>
              <td colSpan={10}>RESUMO</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
