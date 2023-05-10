export function getKeyByValue(object, value) {
    let correctObj;
    for(let obj of object){
    
        if(obj['nome'] === value){
            correctObj = obj;
        } 
        
    }
    const result = correctObj ? correctObj.id : null;
    return result;
    
    
    }