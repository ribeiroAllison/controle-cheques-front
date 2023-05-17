export const clearInputs = (e, inputId) =>{
        
    e && e.preventDefault();
    
    const inputs = document.getElementsByClassName(inputId);
    for(let input of inputs){
        input.value = ""
    }
    
}
