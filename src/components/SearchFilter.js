import { useState, useEffect } from "react";
import style from "@/styles/clientes.module.css"
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchFilter (props) {

    const [searchParams, setSearchParams] = useState();

    const handleChange = (e) =>{
        setSearchParams(e.target.value);
    }

    const filterList = () =>{
        if(!props.filteredList){
            props.setFilteredList(props.list)
        } else{
            const filtered = props?.list.filter(item => item[props.param].toLowerCase().includes(searchParams?.toLowerCase()));
            props.setFilteredList(filtered);
        }
    }

    useEffect(() =>{
        filterList()
    }, [searchParams])

    return(
        <div className={style.formCtr}>
            <input 
                type="text" 
                id="filter" 
                onChange={handleChange}
                placeholder={props.placeHolder}
            />
            <MagnifyingGlass size={32} weight="bold" className={style.Icon} />
        </div>
    )
}