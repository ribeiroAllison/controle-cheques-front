import style from '@/styles/clientes.module.css'
import { convertToNumber, transformCurrency, transformDate } from '@/utils/utils';

export default function ChequeTable(props) {
    const assignClassStyle = (cheque) => {
        if (cheque.vencido && !cheque.compensado && !cheque.linha && !cheque.destino) {
            return style.vencTrue;
        } else if (cheque.compensado) {
            return style.chequeOK;
        } else if (cheque.linha) {
            return style.semFundo;
        } else if (!cheque.compensado && cheque.destino) {
            return style.withDestino;
        }
    }

    return (
        <table className="table">
            <thead>
                <tr>
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
                    <th>Obs</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.list?.map((cheque) => (
                        <tr key={`cheque-${cheque.id}`} id={`row${cheque.id}`} className="chequeRow">
                            <td name={cheque.id} id={`codCli${cheque.id}`} className={assignClassStyle(cheque)} >{cheque.cod_cliente}</td>
                            <td name={cheque.id} id={`client${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cliente}</td>
                            <td name={cheque.id} id={`grupo${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.grupo}</td>
                            <td name={cheque.id} id={`numCheque${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.número_cheque}</td>
                            <td name={cheque.id} id={`pedido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.pedido}</td>
                            <td name={cheque.id} id={`valor${cheque.id}`} className={assignClassStyle(cheque)}>{transformCurrency(cheque.valor)}</td>
                            <td name={cheque.id} id={`destino${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.destino}</td>
                            <td name={cheque.id} id={`data_venc${cheque.id}`} className={assignClassStyle(cheque)}>{transformDate(cheque.data_venc)}</td>
                            <td name={cheque.id} id={`compensado${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.compensado ? "Sim" : 'Não'}</td>
                            <td name={cheque.id} id={`vencido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.vencido ? "Sim" : "Não"}</td>
                            <td name={cheque.id} id={`linha${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.linha}</td>
                            <td name={cheque.id} id={`obs${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.obs && <img src="/images/message.svg" onClick={() => props.handleOpenObs(cheque)} />}</td>
                            <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/edit.svg" onClick={() => props.handleEdit(cheque)} /></td>
                            <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/trash-bin.svg" onClick={() => props.handleDelete(cheque.id)} /></td>
                        </tr>
                    ))}

                <tr style={{ backgroundColor: 'lightgrey' }}>
                    <td colSpan={3} style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>TOTAL CHEQUES</td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.list?.length}</td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>-</td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        {props.list
                            ? props.list.reduce((acc, item) => {
                                acc += convertToNumber(item.valor);
                                return acc;
                            }, 0).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })
                            : 0}
                    </td>
                    <td colSpan={8} style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>RESUMO</td>
                </tr>
            </tbody>
        </table>
    )
}