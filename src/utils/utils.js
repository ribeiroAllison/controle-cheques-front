export const clearInputs = (inputId) =>{
        
    const inputs = document.getElementsByClassName(inputId);
    for(let input of inputs){
        input.value = ""
    }
    
}

export const linhas =[11, 12, 13, 14, 20, 28, 30, 31, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 48, 49, 59, 60, 61, 64]

