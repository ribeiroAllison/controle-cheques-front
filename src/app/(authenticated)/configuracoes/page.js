"use client"

import styles from "@/styles/Config.module.css"
import HeaderLine from "@/components/HeaderLine";
import { Configuracao } from "@/apiServices/ConfigService";

import { useEffect, useState } from "react";

export default function Config(){

    const [config, setConfig] = useState();

    const getConfig =  async () =>{
        const { data } = await Configuracao.getConfig();
        setConfig(data[0])
    }

    useState(() =>{
        getConfig();
    }, [])

    const handleInputChange = (e) =>{
        const { name, value } = e.target
        setConfig({...config, [name] : value})
    }

    return(
        <>
            <HeaderLine name="Configurações"/>
            
            <form >
                <div className={styles.formCtr}>
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

                <div className={styles.formCtr}>
                    <label for="venc_config">Tolerância para Compensação²:</label>
                    <input 
                        type="number" 
                        id="venc_config" 
                        value={config?.tolerancia_comp }
                        name="tolerancia_comp"
                        onChange={handleInputChange}
                    />
                    <p>dias</p>
                </div>
                
            </form>
        </>
    )
}