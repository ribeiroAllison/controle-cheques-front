export const clearInputs = (inputId) =>{
        
    const inputs = document.getElementsByClassName(inputId);
    for(let input of inputs){
        input.value = ""
    }
    
}

export const linhas =[11, 12, 13, 14, 20, 28, 30, 31, 33, 
    34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 48, 49, 59, 
    60, 61, 64];

export const isVencido = (formValues, excessDays) => {

    const hoje = new Date();
    const compDate = formValues.data_compen ? new Date(formValues.data_compen) : ''; 
    const vencDate = new Date(formValues.data_venc);
    vencDate.setDate(vencDate.getDate() + excessDays);

    let result;

    if(vencDate < hoje && !compDate){
        result = true;
    } else if (compDate > vencDate ){
        result = true;
    } else {
        result = false;
    }

    return result;

    
}

export const isVencidoVar = (formValues, excessDays, i) => {

    const hoje = new Date();
    const compDate = formValues[`data_compen${i}`] ? new Date(formValues[`data_compen${i}`]) : ''; 
    const vencDate = new Date(formValues[`data_venc${i}`]);
    vencDate.setDate(vencDate.getDate() + excessDays);

    let result;

    if(vencDate < hoje && !compDate){
        result = true;
    } else if (compDate > vencDate ){
        result = true;
    } else {
        result = false;
    }

    return result;

    
}

export const isCompensado = (formValues, excessDays) => {

    const hoje = new Date();
    const compDate = formValues.data_compen && new Date(formValues.data_compen); 
    const destino = formValues.destino_id;
    const data_venc = formValues.data_venc && new Date(formValues.data_venc);
    const dataAutoCompensaçao = destino && data_venc.setDate(data_venc.getDate() + excessDays);
    const linha = formValues.linha;

    let result;

    if(!compDate && !destino){
        result = false;
    }else if(hoje > dataAutoCompensaçao && !linha){
        result = true;
    } else if(compDate){
        result = true;
    } else{
        result = false;
    }

    console.log(destino)

    return result;


} 

export const isCompensadoVar = (formValues, excessDays, i) => {

    const hoje = new Date();
    const compDate = formValues[`data_compen${i}`] && new Date(formValues[`data_compen${i}`]); 
    const destino = formValues.destino_id;
    const data_venc = formValues[`data_venc${i}`] && new Date(formValues[`data_venc${i}`]);
    const dataAutoCompensaçao = destino && data_venc.setDate(data_venc.getDate() + excessDays);
    const linha = formValues[`linha${i}`];

    let result;

    if(!compDate && !destino){
        result = false;
    }else if(hoje > dataAutoCompensaçao && !linha){
        result = true;
    } else if(compDate){
        result = true;
    } else{
        result = false;
    }

    console.log(destino)

    return result;


} 

