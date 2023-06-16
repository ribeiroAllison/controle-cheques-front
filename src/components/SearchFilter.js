import { useState, useEffect } from "react";
import style from "@/styles/clientes.module.css"

export default function SearchFilter (props) {

    const [searchParams, setSearchParams] = useState();

    const handleChange = (e) =>{
        setSearchParams(e.target.value);
    }

    const filterList = () =>{
        if(!props.filteredList){
            props.setFilteredList(props.list)
        } else{
            const filtered = props.list &&  props.list.filter(item => item[props.param].toLowerCase().includes(searchParams?.toLowerCase()));
            props.setFilteredList(filtered);
        }
        
    }

    useEffect(() =>{
        filterList()
    }, [searchParams])

    return(
        <div className={style.formCtr}>
            <h4>{`Pesquisa ${props.name}:`}</h4>
            <input type="text" id="filter" onChange={handleChange}/>
        </div>
    )
}