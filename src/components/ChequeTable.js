import style from "@/styles/clientes.module.css";
import {
  convertToNumber,
  transformCurrency,
  transformDate,
} from "@/utils/utils";
import styles from "@/styles/Table.module.css";
import { ChatCircleDots, IdentificationCard, PencilLine, Trash } from "@phosphor-icons/react";
import {useState, useEffect} from "react";

export default function ChequeTable(props) {
  const [selectedSum, setSelectedSum] = useState(0);

  const assignClassStyle = (cheque) => {
    if (
      cheque.vencido &&
      !cheque.compensado &&
      !cheque.linha &&
      !cheque.destino
    ) {
      return style.vencTrue;
    } else if (cheque.compensado) {
      return style.chequeOK;
    } else if (cheque.linha) {
      return style.semFundo;
    } else if (!cheque.compensado && cheque.destino) {
      return style.withDestino;
    }
  };

  const handleCheckboxChange = (event) =>{
    const id = event.target.name
    if(event.target.checked){
        props.setSelected([...props.selected, id])
    } else{
        const filtered = props.selected.filter(element => element !== id)
        props.setSelected(filtered)
    }
}

return (
  <div className={styles.tableWrapper}>
    {
      props.selected?.length > 0 && 
      <div className={style.massEditCtr}>
          <button className={`${style.button}`} onClick={props.openMassEdit}>Edição Em Massa</button>
          <h4>Valor Selecionado:</h4>
          <h4>{selectedSum.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}</h4>
      </div>
                
      }
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>Cod. Cliente</th>
          <th>Cliente</th>
          <th>Grupo</th>
          <th>No. Cheque</th>
          <th>Pedido</th>
          <th>Valor</th>
          <th>Destino</th>
          <th>Data Venc.</th>
          <th>Comp.</th>
          <th>Venc.</th>
          <th>Linha</th>
          <th>Vendedor</th>
          <th>Obs</th>
          <th>Contato</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {props.list?.map((cheque) => (
          <tr
            key={`cheque-${cheque.id}`}
            id={`row${cheque.id}`}
            className="chequeRow"
          >
            <td  
              className={assignClassStyle(cheque)} 
              onChange={handleCheckboxChange}
            >
              <input type="checkbox" name={cheque.id} className="checkbox"/>
            </td>
            <td
              name={cheque.id}
              id={`codCli${cheque.id}`}
              className={assignClassStyle(cheque)}
            >
              {cheque.cod_cliente}
            </td>
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
              id={`valor${cheque.id}`}
              className={assignClassStyle(cheque)}
            >
              {transformCurrency(cheque.valor)}
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
              id={`data_venc${cheque.id}`}
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
              {cheque.linha}
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
                  color="white"
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
                color="white"
                onClick={() => props.handleContactClick(cheque)}
              />
            </td>
            <td name={cheque.id} className={assignClassStyle(cheque)}>
              <PencilLine
                className={styles.Icon}
                size={32}
                color="white"
                onClick={() => props.handleEdit(cheque)}
              />
            </td>
            <td name={cheque.id} className={assignClassStyle(cheque)}>
              <Trash
                className={styles.Icon}
                size={32}
                color="white"
                onClick={() => props.handleDelete(cheque.id)}
              />
            </td>
          </tr>
        ))}

        <tr className={styles.finalRow}>
          <td colSpan={4}>TOTAL CHEQUES</td>
          <td>{props.list?.length}</td>
          <td>
            {props.list
              ? props.list
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
          <td colSpan={9}>RESUMO</td>
        </tr>
      </tbody>
    </table>
  </div>
);
}