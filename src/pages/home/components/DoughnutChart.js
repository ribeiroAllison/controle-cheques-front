import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Cheques } from '@/api/ChequeService';
import { convertToNumber } from '@/utils/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
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
    <>
      <Doughnut
        data={dataGraficoRosca}
        width={300}
        height={300}
        options={{ maintainAspectRatio: false }}
      />
    </>
  );
}
