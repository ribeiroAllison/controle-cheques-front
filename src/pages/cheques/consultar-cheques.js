import Header from "@/components/Header"
import ChequeControl from "@/components/ChequeControl"


export default function ConsultarCheques() {


    return(
        <>
            <Header />

            <ChequeControl 
                headerLine="Cheques"
                display="block"
                endPoint="cheques"
            />

        </>
    )
}