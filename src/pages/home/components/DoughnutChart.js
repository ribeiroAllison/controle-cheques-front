import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Cheques } from '@/api/ChequeService';
import { convertToNumber } from '@/utils/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
  const [estornados, setEstornados] = useState([]);
  const [semDestino, setSemDestino] = useState([]);
  const [vencimentoProximo, setVencimentoProximo] = useState([]);

  const valorTotalEstornados = estornados?.reduce((acc, value) => {
    acc += convertToNumber(value.valor);
    return acc;
  }, 0);

  const valorTotalSemDestino = semDestino?.reduce((acc, value) => {
    acc += convertToNumber(value.valor);
    return acc;
  }, 0);

  const valorTotalVencimento = vencimentoProximo?.reduce((acc, value) => {
    acc += convertToNumber(value.valor);
    return acc;
  }, 0);

  const dataGraficoRosca = {
    labels: ['Estornados', 'Sem Destino', 'Vencimento Próximo'],
    datasets: [
      {
        label: 'Valor em BRL',
        data: [valorTotalEstornados, valorTotalSemDestino, valorTotalVencimento],
        backgroundColor: [
          '#A8E4A0',
          '#00a86b',
          '#02ce83',
        ],
        borderColor: ['#000'],
        borderWidth: 1,
      },
    ],
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estornados, semDestino, vencimentoProximo] = await Promise.all([
          Cheques.getEstornos(),
          Cheques.getSemDestino(),
          Cheques.getVencimentoProximo()
        ]);
        setEstornados(estornados.data);
        setSemDestino(semDestino.data);
        setVencimentoProximo(vencimentoProximo.data);

      } catch (error) {
        return error.response;
      }
    };
    fetchData();
  }, []);

  return (
      <Doughnut
        data={dataGraficoRosca}
        height={250}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
  );
}
