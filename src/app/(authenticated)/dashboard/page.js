"use client";

import React, { useEffect, useState } from "react";
import ChequeControl from "@/components/ChequeControl";
import { Cheques } from "@/apiServices/ChequeService";
import DoughnutChart from "@/components/DoughnutChart";
import BarChartOne from "@/components/BarChartOne";
import HeaderLine from "@/components/HeaderLine";
import styles from "@/styles/dashboardPage.module.css";

export default function Page() {
  const [cheques, setCheques] = useState([]);
  const [estornados, setEstornados] = useState([]);
  const [inadimplenciaRatio, setInadimplenciaRatio] = useState();

  const transformAndSumValues = (array) => {
    const sumArray = [];
    let arrayFilled = false;

    for (let item of array) {
      const changedToNumber = Number(
        item.valor.replace("$", "").replace(",", "")
      );
      sumArray.push(changedToNumber);
      arrayFilled = true;
    }

    const sum = arrayFilled && sumArray.reduce((acc, current) => acc + current);
    return sum;
  };

  const ratioInadimplencia = () => {
    const totalCompensados = transformAndSumValues(cheques);
    const totalEstornados = transformAndSumValues(estornados);

    if (totalCompensados === 0) {
      return "0%";
    }

    const inadimplencia =
      (totalEstornados / (totalCompensados + totalEstornados)) * 100;
    if (inadimplencia) {
      return `${inadimplencia.toFixed(2)}%`;
    } else {
      return "0%";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        const aMonthAgo = new Date(
          new Date().setDate(new Date().getDate() - 30)
        );

        const [chequesData, estornadosData] = await Promise.all([
          Cheques.getAllCheques(),
          Cheques.getEstornos(),
        ]);

        const chequesArray = Array.isArray(chequesData.data)
          ? chequesData.data
          : [];
        const estornadosArray = Array.isArray(estornadosData.data)
          ? estornadosData.data
          : [];

        const estornados30Days = estornadosArray.filter((cheque) => {
          const vencDate = new Date(cheque.data_venc);
          return vencDate > aMonthAgo && vencDate <= today;
        });

        if (chequesArray) {
          const filteredCheques = chequesArray.filter((cheque) => {
            const vencDate = new Date(cheque.data_venc);
            return (
              vencDate > aMonthAgo &&
              vencDate <= today &&
              cheque.compensado === true
            );
          });

          setCheques(filteredCheques);
          setEstornados(estornados30Days);
        }
      } catch (error) {
        console.log(error);
        return error.response;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <HeaderLine name="Dashboards" />
      <div className={`${styles.dashboardsWrapper} addMarginLeft`}>
        <div className={styles.graphs}>
          <BarChartOne />
        </div>
        <div className={styles.graphs}>
          <DoughnutChart />
        </div>
        <div className={styles.graphs}>
          <h2 className={styles.graphsTitle}>Inadimplência 30 dias</h2>
          <h3>{ratioInadimplencia()}</h3>
        </div>
      </div>

      <ChequeControl
        headerLine="Estornados"
        display="none"
        submitOnMount={true}
      />
    </>
  );
}