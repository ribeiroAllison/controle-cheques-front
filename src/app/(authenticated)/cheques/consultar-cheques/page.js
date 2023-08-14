"use client";

import Header from "@/components/Header";
import ChequeControl from "@/components/ChequeControl";

export default function ConsultarCheques() {
  return (
    <>
      <ChequeControl 
        headerLine="Cheques" 
        display="block" 
        endPoint="cheques" 
      />
    </>
  );
}
