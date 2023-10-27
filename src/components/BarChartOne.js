import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Cliente } from '@/apiServices/ClienteService';
import { convertToNumber } from '@/utils/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function BarChartOne() {
  const [cheques, setCheques] = useState([]);

  const fetchTopTen = async () => {
    const response = await Cliente.getTopTen();
    setCheques(response.data);
  }

  const dataValues = cheques.map((item) => { return convertToNumber(item.valor) });
  const labels = cheques.map((item) => { return item.cliente})

  const data = {
    labels,
    datasets: [
      {
        label: 'Valor em R$',
        data: dataValues,
        backgroundColor: ['#384B41'],
        borderColor: ['#000'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    fetchTopTen();
  }, [])

  return (
<Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            ticks: {
              font: {
                size: 12,
              }
            },
            beforeUpdate(axis) {
              const labels = axis.chart.data.labels;
              for (let i=0; i<labels.length; i++) {
                const lbl = labels[i];
                if (typeof lbl === 'string' && lbl.length > 10) {
                  labels[i] = lbl.substring(0, 10); // cutting
                }
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
      }}
    />
  );
}
