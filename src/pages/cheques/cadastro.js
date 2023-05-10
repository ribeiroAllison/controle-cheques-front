import ChequesHeader from "@/components/ChequesHeader"
import Header from "@/components/Header"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"



export default function CadastroCheques() {

    const [formValues, setFormValues] = useState(
        {
            num: "",
            valor: "",
            data_rec:"",
            tipo: "",
            data_venc:"",
            cliente: "",
            cliente_cod:"",
            pedido:"",
            compensado:"",
            vencido:"",
            linha:"",
            destino_id:"",
            terceiro:"",
            obs:"",
            vendedor_id:""
        }

    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //SUBMIT FUNCTIONS

    const clearInputs = () =>{
        

        const codInput = document.getElementById('codigo');
        const nomeInput = document.getElementById('nome');
        const docInput = document.getElementById('doc');
        const grupoInput = document.getElementById('grupo');
        const statusInput = document.getElementById('status');

        codInput.value = "";
        nomeInput.value = "";
        docInput.value = "";
        grupoInput.value = "";
        statusInput.value = "";

        
    }

    const [clientList, setClientList] = useState();

    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes`);

            if(response.ok){
                let jsonResponse = await response.json();
                setClientList(jsonResponse);
            }

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        getAllClients();
        
    }, []);

    const findClient = (str) => {
        let foundArray = [];

        const foundNames = clientList.filter(client => client.name.toLowerCase().includes(str.toLowerCase()));

        return foundNames.map(client => client.nome);
    }

    

    return(
        <>
            <Header />
            
            <h3 className={style.name}>Dados do Cheque</h3>
            <form className={style.formCtr}>
                
                <div className={style.inputCtr} >
                    <h4>Número:</h4>
                    <input type="text" name="num" onChange={handleInputChange} id="num" required placeholder="Número do Cheque"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Valor:</h4>
                    <input type="number" name="valor" onChange={handleInputChange} id="valor" required placeholder="Valor do Cheque"/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Data de Recebimento:</h4>
                    <input type="date" name="data_rec" onChange={handleInputChange} id="data_rec" required/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Data de Vencimento:</h4>
                    <input type="date" name="data_venc" onChange={handleInputChange} id="data_rec" required/>
                </div>

                <div className={style.inputCtr} >
                    <h4>Tipo:</h4>
                    <input type="text" name="tipo" onChange={handleInputChange} defaultValue="Cheque"/>
                </div>

                <div className={`${style.inputCtr} ${style.nameCtr}`} >
                    <h4>Cliente:</h4>
                    <input type="text" name="tipo" onChange={handleInputChange} placeholder="Pesquise o Cliente"/>
                </div>

                


                

            </form>

        </>
    )

}