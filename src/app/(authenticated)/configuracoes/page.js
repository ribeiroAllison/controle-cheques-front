"use client"

import styles from "@/styles/Config.module.css"
import HeaderLine from "@/components/HeaderLine";
import { Configuracao } from "@/apiServices/ConfigService";
import ButtonAlternative from "@/components/ButtonAlternative";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";


export default function Config(){

    //STATE DECLARATIONS----------------------------------------

    const [config, setConfig] = useState();

    //EFFECTS--------------------------------------------------------

    useEffect(() =>{
        getConfig();
    }, [])

    //API REQUESTS--------------------------------------------------

    const getConfig =  async () =>{
        const { data } = await Configuracao.getConfig();
        setConfig(data[0])
    }

    //EVENT HANDLERS-------------------------------------------------

    const handleInputChange = (e) =>{
        const { name, value } = e.target
        setConfig({...config, [name] : value})
    }

    const handleSaveClick = async (e) =>{
        e.preventDefault();

        if(config.ativo){
            const response = await Configuracao.updateConfig(config);
            if(response && response.status === 201){
                notifySuccess(response.data)
                await getConfig();
            } else{
                notifyFailure(response.data)
            }
        } else{
            const response = await Configuracao.createNewConfig(config);
            if(response && response.status === 200){
                notifySuccess(response.data)
                await getConfig()
            } else{
                notifyFailure(response.data)
            }
        }
    }

    //AUX FUNCTION----------------------------------------------------
    const notifySuccess = (msg) => toast.success(msg);
    const notifyFailure = (msg) => toast.error(msg);

    

    return(
        <>
            <ToastContainer autoClose={2000}/>
            <HeaderLine name="Configurações"/>
            
            <form className={styles.formCtr}>
                <div className={styles.inputCtr}>
                    <label for="venc_config">Tolerância para Vencimento¹:</label>
                    <input 
                        type="number" 
                        id="venc_config" 
                        value={config?.tolerancia_venc}
                        name="tolerancia_venc"
                        onChange={handleInputChange}
                    />
                    <p>dias</p>
                </div>

                <div className={styles.inputCtr}>
                    <label for="venc_config">Prazo para Compensação²:</label>
                    <input 
                        type="number" 
                        id="venc_config" 
                        value={config?.tolerancia_comp }
                        name="tolerancia_comp"
                        onChange={handleInputChange}
                    />
                    <p>dias</p>
                </div>

                <div className={styles.buttonCtr}>
                    <ButtonAlternative 
                        id="saveButton" 
                        style={{ backgroundColor: "var(--blueTd)" }}
                        onClick={handleSaveClick}
                    >
                        Salvar
                    </ButtonAlternative>
                    
                </div>

                <div className={styles.textCtr}>
                    <p>*¹ Tolerância em dias para que se considere um recebimento vencido, após sua data de vencimento.</p>
                    <p>*² Prazo em dias para que se considere um recebimento (que tenha destino definido) compensado, após sua data de vencimento .</p>
                </div>
                
                
            </form>
        </>
    )
}