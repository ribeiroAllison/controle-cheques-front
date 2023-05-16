export const clearInputs = (e) =>{
        
    e && e.preventDefault();
    
    const inputs = document.getElementsByClassName('input');
    for(let input of inputs){
        input.value = ""
    }
    
}
