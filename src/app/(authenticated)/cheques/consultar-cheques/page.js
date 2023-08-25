"use client";

import ChequeControl from "@/components/ChequeControl";

export default function ConsultarCheques() {
  return (
    <ChequeControl 
      headerLine="Cheques" 
      display="inline-flex" 
      endPoint="cheques" 
    />
  );
}
