import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"
import { clearInputs, linhas, isVencido, isCompensado } from "@/utils/utils"
import HeaderLine from "@/components/HeaderLine"


export default function ChequeControl(props) {
<<<<<<< HEAD
=======
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : ""
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e

    //Search by filter inputs
    const [formValues, setFormValues] = useState(
        {
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
<<<<<<< HEAD
            compensado:null,
            destino_id: props.destino || null,
            vencido:props.vencido || null,
            data_compen: null,
            pedido: null,
            grupo: null
            
        }

=======
            compensado: null,
            destino_id: props.destino || null,
            vencido: props.vencido || null,
            data_compen: null,
            pedido: null,
            grupo: null
        }
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //Edit row Inputs
    const [editFormValues, setEditFormValues] = useState(
        {
            id: null,
            cliente: "",
            cliente_cod: null,
            número_cheque: null,
            valor: null,
            data_venc: null,
            compensado: null,
            vencido: null,
            destino_id: null,
            data_compen: null,
            data_destino: null
        }
    );

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormValues({ ...editFormValues, [name]: value });
    };
<<<<<<< HEAD
    
=======

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e

    //Get name and id of all clients in db, so it can be searched by typing the a name
    const [clientList, setClientList] = useState('');

<<<<<<< HEAD
    async function getAllClients(){
        try{
            const response = await fetch(`${baseURL}/clientes/nomecod`);

            if(response.ok){
=======
    async function getAllClients() {
        try {
            const response = await fetch(`${baseURL}/clientes/nomecod`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                let jsonResponse = await response.json();
                setClientList(jsonResponse);
            }

<<<<<<< HEAD
        } catch(error){
=======
        } catch (error) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClients()
        getAllDestinos()
        getGrupos()
<<<<<<< HEAD
    },[])
=======
    }, [])
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e

    const [searchResult, setSearchResult] = useState([{}]);

    const findClient = (formValues, id, targetField) => {
<<<<<<< HEAD
        if(clientList){
            const foundClientByName = clientList.filter(client => client.nome.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || document.getElementById(targetField) && !document.getElementById(targetField).value ? 
            document.getElementById(id).style.display = 'none' 
            : document.getElementById(id).style.display = 'block'
            
        }

=======
        if (clientList) {
            const foundClientByName = clientList.filter(client => client.nome.toLowerCase().includes(formValues.cliente.toLowerCase()));
            setSearchResult(foundClientByName);
            searchResult.length === 0 || document.getElementById(targetField) && !document.getElementById(targetField).value ?
                document.getElementById(id).style.display = 'none'
                : document.getElementById(id).style.display = 'block'
        }
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }

    //Effects to change the options as user types client name on search or edit box
    useEffect(() => {
        findClient(formValues, "searchBox", 'cliente')
<<<<<<< HEAD
    },[formValues.cliente])

    useEffect(() => {
        findClient(editFormValues, "searchBoxEdit", 'clienteEdit')
    },[editFormValues.cliente])


    const handleClick = (e) =>{
        setFormValues({...formValues, cliente_cod: e.target.value})
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;


    }

    const handleEditClick = (e) =>{
        setEditFormValues({...editFormValues, cliente_cod: e.target.value})
        document.getElementById('searchBoxEdit').style.display = 'none';
        document.getElementById('editCliente').value = e.target.innerHTML;

 
=======
    }, [formValues.cliente])

    useEffect(() => {
        findClient(editFormValues, "searchBoxEdit", 'clienteEdit')
    }, [editFormValues.cliente])


    const handleClick = (e) => {
        setFormValues({ ...formValues, cliente_cod: e.target.value })
        document.getElementById('searchBox').style.display = 'none';
        document.getElementById('cliente').value = e.target.innerHTML;
    }

    const handleEditClick = (e) => {
        setEditFormValues({ ...editFormValues, cliente_cod: e.target.value })
        document.getElementById('searchBoxEdit').style.display = 'none';
        document.getElementById('editCliente').value = e.target.innerHTML;
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }

    //Get all destinos and their IDs so destino options of select input can be populated
    const [destinoList, setDestinoList] = useState();

<<<<<<< HEAD
    async function getAllDestinos(){
        try{
            const response = await fetch(`${baseURL}/destinos`)

            if(response.ok){
=======
    async function getAllDestinos() {
        try {
            const response = await fetch(`${baseURL}/destinos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                let jsonResponse = await response.json();
                setDestinoList(jsonResponse);
            }

<<<<<<< HEAD
        }catch(error){
=======
        } catch (error) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            console.log(error);

        }
    }

    // Get all grupos and their IDs so grupos options of select input can be populated
    const [grupos, setGrupos] = useState();

<<<<<<< HEAD
    async function getGrupos(){
        try{
            const response = await fetch(`${baseURL}/grupo`);
    
            if(response.ok){
                let jsonResponse = await response.json();
                setGrupos(jsonResponse);
            }
    
        } catch(error){
=======
    async function getGrupos() {
        try {
            const response = await fetch(`${baseURL}/grupo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                let jsonResponse = await response.json();
                setGrupos(jsonResponse);
            }

        } catch (error) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            console.log(error);
        }
    }



    //State to search checks by filter
    const [chequesList, setChequeslist] = useState();

    //State to store the search params, so it can be reloaded after user makes an edit
<<<<<<< HEAD
    const [frozenParams, setFrozenParams] = useState(); 

    //Submit check search and get results from db
    const handleSubmit = async (e) => {
        e && e.preventDefault();

        const searchParams = new URLSearchParams({
                cliente_cod: formValues.cliente_cod ? formValues.cliente_cod : '',
                data_init: formValues.data_init ? formValues.data_init : '',
                data_fim: formValues.data_fim ? formValues.data_fim : '',
                compensado: formValues.compensado ? formValues.compensado : '',
                destino_id: formValues.destino_id ? formValues.destino_id : '',
                vencido: formValues.vencido ? formValues.vencido : '',
                pedido: formValues.pedido ? formValues.pedido : '',
                grupo: formValues.grupo ? formValues.grupo : '',
                pedido: formValues.pedido ? formValues.pedido : '',
                número_cheque: formValues.número_cheque ? formValues.número_cheque : ''
=======
    const [frozenParams, setFrozenParams] = useState();

    //Submit check search and get results from db
    const handleSubmit = async (e) => {
        e?.preventDefault();

        const searchParams = new URLSearchParams({
            cliente_cod: formValues.cliente_cod ? formValues.cliente_cod : '',
            data_init: formValues.data_init ? formValues.data_init : '',
            data_fim: formValues.data_fim ? formValues.data_fim : '',
            compensado: formValues.compensado ? formValues.compensado : '',
            destino_id: formValues.destino_id ? formValues.destino_id : '',
            vencido: formValues.vencido ? formValues.vencido : '',
            pedido: formValues.pedido ? formValues.pedido : '',
            grupo: formValues.grupo ? formValues.grupo : '',
            número_cheque: formValues.número_cheque ? formValues.número_cheque : ''
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        })

        const response = await fetch(`${baseURL}/${props.endPoint}?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
<<<<<<< HEAD
                'Content-Type': 'application/json'
            },
        })
        
        if(response.ok){
            let jsonResponse = await response.json();
            setChequeslist(jsonResponse);
            clearInputs('input');
                
        }  else {
=======
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            let jsonResponse = await response.json();
            setChequeslist(jsonResponse);
            clearInputs('input');

        } else {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            console.error('Erro ao obter os cheques da API.');
        }

        setFrozenParams({
            cliente: "",
            cliente_cod: formValues.cliente_cod,
            data_init: formValues.data_init,
            data_fim: formValues.data_fim,
            compensado: formValues.compensado,
            destino_id: formValues.destino_id,
            vencido: formValues.vencido
        }
<<<<<<< HEAD
            
=======

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        )

        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
<<<<<<< HEAD
            compensado:null,
            destino_id:null,
            vencido:null
=======
            compensado: null,
            destino_id: null,
            vencido: null
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        })
    }

    useEffect(() => {
<<<<<<< HEAD
        if(props.submitOnMount){
=======
        if (props.submitOnMount) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            handleSubmit();
        }
    }, []);

    const handleClear = (e) => {
        e.preventDefault();
        clearInputs('input');
        setFormValues({
            cliente: "",
            cliente_cod: null,
            data_init: null,
            data_fim: null,
<<<<<<< HEAD
            compensado:null,
            destino_id:null,
            vencido:null
=======
            compensado: null,
            destino_id: null,
            vencido: null
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        })
    }

    const handleCloseEdit = (e) => {
        e.preventDefault();
        clearInputs('editInput');

        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        deleteEditClass();
<<<<<<< HEAD
        
        
    }

    const transformDate = (data) =>{
=======
    }

    const transformDate = (data) => {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        const date = new Date(data);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }

    const transformCurrency = (value) => {
        return value?.replace("$", "R$").replace(",", "x").replace(".", ",").replace("x", ".");
    }

<<<<<<< HEAD
    const refreshSearch = async () =>{
            const searchParams = new URLSearchParams({
                    cliente_cod: frozenParams.cliente_cod ? frozenParams.cliente_cod : '',
                    data_init: frozenParams.data_init ? frozenParams.data_init : '',
                    data_fim: frozenParams.data_fim ? frozenParams.data_fim : '',
                    compensado: frozenParams.compensado ? frozenParams.compensado : '',
                    destino_id: frozenParams.destino_id ? frozenParams.destino_id : '',
                    vencido: frozenParams.vencido ? frozenParams.vencido : ''
            })
    
            const response = await fetch(`${baseURL}/cheques?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            
            if(response.ok){
                let jsonResponse = await response.json();
                setChequeslist(jsonResponse);
                    
            }  else {
                console.error('Erro ao obter os cheques da API.');
            }
    
    }

    const handleDelete = async (id) =>{
        const confirmation = confirm('Você realmente deseja apagar esse cheque?')

        if(confirmation){
            try{
                const response = await fetch(`${baseURL}/cheques`,{
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
=======
    const refreshSearch = async () => {
        const searchParams = new URLSearchParams({
            cliente_cod: frozenParams.cliente_cod ? frozenParams.cliente_cod : '',
            data_init: frozenParams.data_init ? frozenParams.data_init : '',
            data_fim: frozenParams.data_fim ? frozenParams.data_fim : '',
            compensado: frozenParams.compensado ? frozenParams.compensado : '',
            destino_id: frozenParams.destino_id ? frozenParams.destino_id : '',
            vencido: frozenParams.vencido ? frozenParams.vencido : ''
        })

        const response = await fetch(`${baseURL}/cheques?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            let jsonResponse = await response.json();
            setChequeslist(jsonResponse);

        } else {
            console.error('Erro ao obter os cheques da API.');
        }

    }

    const handleDelete = async (id) => {
        const confirmation = confirm('Você realmente deseja apagar esse cheque?')

        if (confirmation) {
            try {
                const response = await fetch(`${baseURL}/cheques`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                    },
                    body: JSON.stringify({
                        id: id
                    })
                }
                );
<<<<<<< HEAD
    
                if(response.ok){
                    alert('Cheque removido com sucesso!')
                }
            } catch(error){
                alert('Erro:' + error.message)
            }
    
            refreshSearch()
        }
        
=======

                if (response.ok) {
                    alert('Cheque removido com sucesso!')
                }
            } catch (error) {
                alert('Erro:' + error.message)
            }

            refreshSearch()
        }

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }


    const rearrangeDate = (date) => {
        const parts = date.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }

<<<<<<< HEAD
    const [chequeId, setChequeId] = useState(); 

    const deleteEditClass = () => {
        const allTds = document.querySelectorAll('td, img');
        for(let td of allTds) {
=======
    const [chequeId, setChequeId] = useState();

    const deleteEditClass = () => {
        const allTds = document.querySelectorAll('td, img');
        for (let td of allTds) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            td.classList.remove(`${style.editTrue}`);
        }
    }

    const handleEdit = (e) => {
        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "flex";

        const id = e.target.name;
        setChequeId(id);

        deleteEditClass();

        const selectRow = document.getElementsByName(e.target.name);
<<<<<<< HEAD
        for(let cell of selectRow) {
=======
        for (let cell of selectRow) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            cell.classList.add(`${style.editTrue}`);
        }

        const codCli = document.getElementById(`codCli${id}`).innerHTML;
<<<<<<< HEAD
    
=======

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        const cliente = document.getElementById(`client${id}`).innerHTML;
        const numCheque = document.getElementById(`numCheque${id}`).innerHTML;

        const valorString = document.getElementById(`valor${id}`).innerHTML;
        const valor = Number(valorString.replace('R$', '').replace('.', '').replace(',', '.'))

        const dataVencString = document.getElementById(`data_venc${id}`).innerHTML;
        const data_venc = rearrangeDate(dataVencString);

        const linha = document.getElementById(`linha${id}`).innerHTML;

        const clienteInput = document.getElementById('editCliente');
        const numChequeInput = document.getElementById('editNumCheque');
        const valorInput = document.getElementById('editValor');
        const data_vencInput = document.getElementById('editDataVenc');
        const linhaInput = document.getElementById('editLinha');
        const dataCompInput = document.getElementById('data_compen')
<<<<<<< HEAD
        
=======

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        const destinoInput = document.getElementById('editDestino');
        const destinoName = document.getElementById(`destino${id}`).innerHTML;
        const options = destinoInput.options;
        for (let option of options) {
            if (option.innerHTML === destinoName) {
                option.selected = true;
                break;
            }
        }

        clienteInput.value = cliente;
        clienteInput.setAttribute('codCli', codCli);
        numChequeInput.value = numCheque;
        valorInput.value = valor;
        data_vencInput.value = data_venc;
        linhaInput.value = linha;
<<<<<<< HEAD
        
        const dataCompDate = chequesList.find(cheque => cheque.id === Number(id)).data_compen;
        const dataCompString = dataCompDate && transformDate(dataCompDate);
        const dataComp = dataCompString ? rearrangeDate(dataCompString): null;
        dataCompInput.value = dataComp;

        setEditFormValues({
            ...editFormValues, 
=======

        const dataCompDate = chequesList.find(cheque => cheque.id === Number(id)).data_compen;
        const dataCompString = dataCompDate && transformDate(dataCompDate);
        const dataComp = dataCompString ? rearrangeDate(dataCompString) : null;
        dataCompInput.value = dataComp;

        setEditFormValues({
            ...editFormValues,
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            cliente_cod: codCli,
            número_cheque: numCheque,
            valor: valor,
            data_venc: data_venc,
            linha: linha,
            data_compen: dataComp,
            destino_id: destinoInput.value,
<<<<<<< HEAD
            
=======

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        })
    }

    const [selectedObs, setSelectedObs] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    useEffect(() => {
<<<<<<< HEAD
    if (chequeId !== undefined) {
        setSelectedObs(
        chequesList && chequesList.find(cheque => cheque.id === Number(chequeId))?.obs || ""
        );
    }
=======
        if (chequeId !== undefined) {
            setSelectedObs(
                chequesList?.find(cheque => cheque.id === Number(chequeId))?.obs || ""
            );
        }
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }, [chequeId, chequesList]);

    useEffect(() => {
        setTextareaValue(selectedObs);
    }, [selectedObs]);

    const handleTextareaChange = (e) => {
        setTextareaValue(e.target.value);
<<<<<<< HEAD
};
=======
    };
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const obs = document.getElementById('editObsTextarea').value;

<<<<<<< HEAD
        chequeId && fetch(`${baseURL}/cheques`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
=======
        chequeId && fetch(`${baseURL}/cheques`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            },
            body: JSON.stringify({
                id: chequeId,
                cliente: editFormValues.cliente_cod,
                numCheque: editFormValues.número_cheque,
                valor: editFormValues.valor,
                data_venc: editFormValues.data_venc,
                compensado: isCompensado(editFormValues, 15),
                vencido: isVencido(editFormValues, 4),
                linha: editFormValues.linha,
                destino: editFormValues.destino_id,
<<<<<<< HEAD
                obs : obs,
                data_compen : editFormValues.data_compen
            })
        })
        .then(response => {
            if(response.ok){
                alert(`Cheque ${editFormValues.número_cheque} editado com sucesso!`)
                if(props.endPoint === 'cheques'){
                    refreshSearch();
                } else{
                    handleSubmit()
                }
                
                
            } else{
                alert(`Erro ao editar, tente novamente`)
            }
        })
        .then(clearInputs('editInput'))
        .then(deleteEditClass())



        
=======
                obs: obs,
                data_compen: editFormValues.data_compen
            })
        })
            .then(response => {
                if (response.ok) {
                    alert(`Cheque ${editFormValues.número_cheque} editado com sucesso!`)
                    refreshSearch();
                } else {
                    alert(`Erro ao editar, tente novamente`)
                }
            })
            .then(clearInputs('editInput'))
            .then(deleteEditClass)




>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        const editWindow = document.getElementById('editWindowBackground');
        editWindow.style.display = "none";

        const editRow = document.getElementById(`row${chequeId}`);
<<<<<<< HEAD
        if(editRow){
            editRow.style.backgroundColor = "white"
        }
        
=======
        if (editRow) {
            editRow.style.backgroundColor = "white"
        }

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }

    const toggleOverflow = () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
    };

<<<<<<< HEAD
    const closeObs = () =>{
        const module = document.getElementsByClassName('obsScreen')[0];

        toggleOverflow();

        module.style.display = "none";

        
=======
    const closeObs = () => {
        const module = document.getElementsByClassName('obsScreen')[0];
        toggleOverflow();
        module.style.display = "none";
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
    }

    const [obsDetails, setObsDetails] = useState({
        cliente: "",
        obs: "",
        num: ""
    });


    const handleOpenObs = (cheque) => {
        cheque &&
<<<<<<< HEAD
        setObsDetails({
            id: cheque.id,
            cliente: cheque.cliente,
            obs: cheque.obs,
            num: cheque.número_cheque
        })

        toggleOverflow();
        const module = document.getElementsByClassName('obsScreen')[0];
        module.style.display = "flex";

    }

    const handleEditObs = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
=======
            setObsDetails({
                id: cheque.id,
                cliente: cheque.cliente,
                obs: cheque.obs,
                num: cheque.número_cheque
            })
        toggleOverflow();
        const module = document.getElementsByClassName('obsScreen')[0];
        module.style.display = "flex";
    }

    const handleEditObs = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                },
                body: JSON.stringify({
                    id: obsDetails.id,
                    obs: obsDetails.obs
                })
            })

<<<<<<< HEAD
            if(response.ok){
                alert('Observação atualizada com sucesso!')
                closeObs();
                refreshSearch();
                
            }

        }catch(error){
=======
            if (response.ok) {
                alert('Observação atualizada com sucesso!')
                closeObs();
                refreshSearch();

            }

        } catch (error) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            alert('Erro' + error.message);
        }
    }

<<<<<<< HEAD
    const handleClearObs = async (e) =>{
        e.preventDefault();

        try{
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
=======
    const handleClearObs = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/cheques/obs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                },
                body: JSON.stringify({
                    id: obsDetails.id,
                    obs: null
                })
            })

<<<<<<< HEAD
            if(response.ok){
=======
            if (response.ok) {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                alert('Observação deletada com sucesso!');
                closeObs();
                refreshSearch();
            }
<<<<<<< HEAD
        } catch(error) {
            alert('Erro' + error.message);
        }
    }
    
    const assignClassStyle = (cheque) =>{
    
=======
        } catch (error) {
            alert('Erro' + error.message);
        }
    }

    const assignClassStyle = (cheque) => {
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
        if (cheque.vencido && !cheque.compensado && !cheque.linha && !cheque.destino) {
            return style.vencTrue;
        } else if (cheque.compensado) {
            return style.chequeOK;
        } else if (cheque.linha) {
            return style.semFundo;
<<<<<<< HEAD
        } else if(!cheque.compensado && cheque.destino){
            return style.withDestino;
        }
            
    }

    

    return(
        <>


            {/* FILTER SCREEN */}
            <fieldset className={style.filterField} style={{display: `${props.display}`}}>
                <legend id={style.mainLegend}>Opções de Filtros</legend>
                <form className={style.formCtr} id={style.clienteForm}>
                    <div className={style.filterCtr}>
                        
=======
        } else if (!cheque.compensado && cheque.destino) {
            return style.withDestino;
        }
    }



    return (
        <>
            {/* FILTER SCREEN */}
            <fieldset className={style.filterField} style={{ display: `${props.display}` }}>
                <legend id={style.mainLegend}>Opções de Filtros</legend>
                <form className={style.formCtr} id={style.clienteForm}>
                    <div className={style.filterCtr}>

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                        <div className={style.inputCtrBox}>
                            <div className={style.inputCtr} >
                                <h4>Destino</h4>
                                <select name="destino_id" onChange={handleInputChange} placeholder="Selecione Vendedor" className={`${style.select} input`}>
<<<<<<< HEAD
                                    <option key="0"></option>
                                    {
                                        destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
=======
                                    <option></option>
                                    {
                                        destinoList?.map(destino => <option key={`destino-${destino.id}`} value={destino.id}>{destino.nome}</option>)
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                    }
                                </select>
                            </div>

                            <div className={style.inputCtr} >
                                <h4>Grupo</h4>
                                <select name="grupo" onChange={handleInputChange} className={`${style.select} input`}>
<<<<<<< HEAD
                                    <option key="0"></option>
                                    {
                                        grupos && grupos.map(grupo => <option key={grupo.id} value={grupo.nome}>{grupo.nome}</option>)
                                    }
                                </select>
                                
                            </div>
                            
                        </div>
                        
                        

                        

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleInputChange} id="cliente" placeholder="Pesquise o Cliente" className="input"/>
                            <div className={style.searchBox} id="searchBox">
                                <select size={4} id={`${style.clienteSelect} input`} onChange={handleInputChange}>
                                    {
                                        searchResult.map(client => <option onClick={handleClick} key={client.cod} value={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>
                            
                        </div>

                    </div>
                    
                    <div className={style.inputCtr}>
                        <div className={style.inputCtrBox}>
                                <div className={style.inputCtr}>
                                    <h4>No. Pedido</h4>
                                    <input type="text" name="pedido" onChange={handleInputChange} id="pedido" className="input"/>
                                </div>

                                <div className={style.inputCtr}>
                                    <h4>No. Cheque</h4>
                                    <input type="text" name="número_cheque" onChange={handleInputChange} id="num"  className="input"/>
                                </div>
=======
                                    <option></option>
                                    {
                                        grupos?.map(grupo => <option key={`grupo-${grupo.id}`} value={grupo.nome}>{grupo.nome}</option>)
                                    }
                                </select>

                            </div>

                        </div>


                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >
                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleInputChange} id="cliente" placeholder="Pesquise o Cliente" className="input" />
                            <div className={style.searchBox} id="searchBox">
                                <select size={4} id={`${style.clienteSelect} input`} onChange={handleInputChange}>
                                    {
                                        searchResult.map(client => <option onClick={handleClick} key={`cliente-${client.cod}`} value={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={style.inputCtr}>
                        <div className={style.inputCtrBox}>
                            <div className={style.inputCtr}>
                                <h4>No. Pedido</h4>
                                <input type="text" name="pedido" onChange={handleInputChange} id="pedido" className="input" />
                            </div>

                            <div className={style.inputCtr}>
                                <h4>No. Cheque</h4>
                                <input type="text" name="número_cheque" onChange={handleInputChange} id="num" className="input" />
                            </div>
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                        </div>

                        <div className={style.inputCtrBox}>
                            <fieldset className={`${style.formCtr} ${style.fieldset}`}>
                                <legend>Vencimento</legend>
                                <div className={style.inputCtr} >
                                    <h4>Data Inicial:</h4>
<<<<<<< HEAD
                                    <input type="date" name="data_init" onChange={handleInputChange} id="data_init" className="input"/>
=======
                                    <input type="date" name="data_init" onChange={handleInputChange} id="data_init" className="input" />
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Data Fim:</h4>
<<<<<<< HEAD
                                    <input type="date" name="data_fim" onChange={handleInputChange} id="data_fim" className="input"/>
=======
                                    <input type="date" name="data_fim" onChange={handleInputChange} id="data_fim" className="input" />
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                </div>
                            </fieldset>

                            <fieldset className={`${style.formCtr} ${style.fieldset}`}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensado:</h4>
                                    <select className={`${style.select} input`} name="compensado" id="compensado" onChange={handleInputChange} >
                                        <option value={null}></option>
                                        <option value={false}>Não</option>
                                        <option value={true}>Sim</option>
<<<<<<< HEAD
                                        
=======
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                    </select>
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Vencido:</h4>
                                    <select className={`${style.select} input`} name="vencido" id="vencido" onChange={handleInputChange}>
                                        <option value={null}></option>
                                        <option value={false}>Não</option>
                                        <option value={true}>Sim</option>
<<<<<<< HEAD
                                        
                                    </select>
                                </div>

                            </fieldset>
                        </div>
                        
                    </div>

                    
=======
                                    </select>
                                </div>
                            </fieldset>
                        </div>
                    </div>

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                    <div className={style.buttonCtr}>
                        <button type="submit" className={style.button} id="buscaCheque" onClick={handleSubmit}>Buscar</button>
                        <button className={style.button} onClick={handleClear}>Limpar</button>
                    </div>
<<<<<<< HEAD
                    
=======
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                </form>
            </fieldset>

            {/* EDIT SCREEN */}
            <HeaderLine name={props.headerLine} />
            <div id="editWindowBackground" className={style.editBackground}>
                <section className={style.editFieldset} id="editWindow">
                    <div className={style.popupHeader}>
                        <h2>Edição de Cheque</h2>
<<<<<<< HEAD
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit}/>
                    </div>
                    
=======
                        <img src="/images/x-icon.svg" onClick={handleCloseEdit} />
                    </div>

>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                    <form className={style.formCtr} id={style.editForm}>

                        <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox" >

                            <h4>No. Cheque</h4>
<<<<<<< HEAD
                            <input type="text" onChange={handleEditInputChange} name="número_cheque" className="editInput" id="editNumCheque"/>

                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleEditInputChange} id="editCliente" placeholder="Pesquise o Cliente" className="editInput"/>
                            <div className={style.searchBox} id="searchBoxEdit">
                                <select size={4} id={`${style.clienteSelect} editInput`} onChange={handleEditInputChange}>
                                    {
                                    searchResult.map(client => <option onClick={handleEditClick} key={client.cod} value={client.cod} codCli={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>

                            <h4>Valor</h4>
                            <input type="number" onChange={handleEditInputChange} name="valor" className="editInput" id="editValor"/>

                        </div>
                        
                        <div className={style.inputCtr}>
                            

                            <h4>Vencimento</h4>
                            <input type="date" onChange={handleEditInputChange} name="data_venc" className="editInput" id="editDataVenc"/>

                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleEditInputChange} placeholder="Selecione Vendedor" className={`${style.select} editInput`} id="editDestino">
                                <option key="0"></option>
                                {
                                    destinoList && destinoList.map(destino => <option key={destino.id} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>

                            <h4>Data Entrega:</h4>
                            <input type="date" name="data_destino" onChange={handleEditInputChange} className="input"/>
                            

                        </div>
                        
                            <div className={style.statusCtr}>
                                <fieldset className={style.formCtr}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensação:</h4>
                                    <input type="date" name="data_compen" onChange={handleEditInputChange} id="data_compen" className="input"/>
=======
                            <input type="text" onChange={handleEditInputChange} name="número_cheque" className="editInput" id="editNumCheque" />

                            <h4>Cliente:</h4>
                            <input type="text" name="cliente" onChange={handleEditInputChange} id="editCliente" placeholder="Pesquise o Cliente" className="editInput" />
                            <div className={style.searchBox} id="searchBoxEdit">
                                <select size={4} id={`${style.clienteSelect} editInput`} onChange={handleEditInputChange}>
                                    {
                                        searchResult.map(client => <option onClick={handleEditClick} key={`cod-cli-${client.cod}`} value={client.cod} codCli={client.cod}>{client.nome}</option>)
                                    }
                                </select>
                            </div>
                            <h4>Valor</h4>
                            <input type="number" onChange={handleEditInputChange} name="valor" className="editInput" id="editValor" />
                        </div>

                        <div className={style.inputCtr}>
                            <h4>Vencimento</h4>
                            <input type="date" onChange={handleEditInputChange} name="data_venc" className="editInput" id="editDataVenc" />

                            <h4>Destino</h4>
                            <select name="destino_id" onChange={handleEditInputChange} placeholder="Selecione Vendedor" className={`${style.select} editInput`} id="editDestino">
                                <option></option>
                                {
                                    destinoList?.map(destino => <option key={`destino-${destino.id}`} value={destino.id}>{destino.nome}</option>)
                                }
                            </select>
                            <h4>Data Entrega:</h4>
                            <input type="date" name="data_destino" onChange={handleEditInputChange} className="input" />
                        </div>

                        <div className={style.statusCtr}>
                            <fieldset className={style.formCtr}>
                                <legend>Status</legend>
                                <div className={style.inputCtr} >
                                    <h4>Compensação:</h4>
                                    <input type="date" name="data_compen" onChange={handleEditInputChange} id="data_compen" className="input" />
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                </div>

                                <div className={style.inputCtr} >
                                    <h4>Linha:</h4>
                                    <select className={`${style.select} input`} name="linha" id="editLinha" onChange={handleEditInputChange}>
                                        <option></option>
                                        {
<<<<<<< HEAD
                                            linhas.map(linha => <option value={linha} key={linha}>{linha}</option>)
=======
                                            linhas.map(linha => <option value={linha} key={`linha-${linha}`}>{linha}</option>)
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                                        }
                                    </select>
                                </div>

<<<<<<< HEAD
                        </fieldset>
=======
                            </fieldset>
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e

                            <div className={style.inputCtr} id={style.editObs}>
                                <h4>Observação:</h4>
                                <textarea id="editObsTextarea" value={textareaValue} onChange={handleTextareaChange}></textarea>
                            </div>
                        </div>
<<<<<<< HEAD
                            


                        <div className={style.buttonCtr}>
                                <button type="submit" className={style.button} id="editaCheque" onClick={handleEditSubmit}>Salvar</button>
                        </div>
                        
                    </form>
                </section>
            </div>
            



            
=======



                        <div className={style.buttonCtr}>
                            <button type="submit" className={style.button} id="editaCheque" onClick={handleEditSubmit}>Salvar</button>
                        </div>

                    </form>
                </section>
            </div>


>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod. Cliente</th>
                        <th>Cliente</th>
                        <th>Grupo</th>
                        <th>No. Cheque</th>
                        <th>Pedido</th>
                        <th>Valor</th>
                        <th>Destino</th>
                        <th>Data Venc.</th>
                        <th>Comp.</th>
                        <th>Venc.</th>
                        <th>Linha</th>
                        <th>Obs</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
<<<<<<< HEAD
                {chequesList && chequesList.map((cheque) => (
                    <tr key={cheque.id} id={`row${cheque.id}`} className="chequeRow">
                        <td name={cheque.id} id={`codCli${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cod_cliente}</td>
                        <td name={cheque.id} id={`client${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cliente}</td>
                        <td name={cheque.id} id={`grupo${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.grupo}</td>
                        <td name={cheque.id} id={`numCheque${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.número_cheque}</td>
                        <td name={cheque.id} id={`pedido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.pedido}</td>
                        <td name={cheque.id} id={`valor${cheque.id}`} className={assignClassStyle(cheque)}>{transformCurrency(cheque.valor)}</td>
                        <td name={cheque.id} id={`destino${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.destino}</td>
                        <td name={cheque.id} id={`data_venc${cheque.id}`} className={assignClassStyle(cheque)}>{transformDate(cheque.data_venc)}</td>
                        <td name={cheque.id} id={`compensado${cheque.id}` } className={assignClassStyle(cheque)}>{cheque.compensado ? "Sim" : 'Não'}</td>
                        <td name={cheque.id} id={`vencido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.vencido ? "Sim" : "Não"}</td>
                        <td name={cheque.id} id={`linha${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.linha}</td>
                        <td name={cheque.id} id={`obs${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.obs && <img src="/images/message.svg" onClick={() => handleOpenObs(cheque)}/>}</td>
                        <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/edit.svg" name={cheque.id} value={cheque.id} onClick={handleEdit}/></td>
                        <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/trash-bin.svg" onClick={() => handleDelete(cheque.id)}/></td>
                    
                    </tr>
                    
                ))}
=======
                    {
                        chequesList?.map((cheque) => (
                            <tr key={cheque.id} id={`row${cheque.id}`} className="chequeRow">
                                <td name={cheque.id} id={`codCli${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cod_cliente}</td>
                                <td name={cheque.id} id={`client${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.cliente}</td>
                                <td name={cheque.id} id={`grupo${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.grupo}</td>
                                <td name={cheque.id} id={`numCheque${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.número_cheque}</td>
                                <td name={cheque.id} id={`pedido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.pedido}</td>
                                <td name={cheque.id} id={`valor${cheque.id}`} className={assignClassStyle(cheque)}>{transformCurrency(cheque.valor)}</td>
                                <td name={cheque.id} id={`destino${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.destino}</td>
                                <td name={cheque.id} id={`data_venc${cheque.id}`} className={assignClassStyle(cheque)}>{transformDate(cheque.data_venc)}</td>
                                <td name={cheque.id} id={`compensado${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.compensado ? "Sim" : 'Não'}</td>
                                <td name={cheque.id} id={`vencido${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.vencido ? "Sim" : "Não"}</td>
                                <td name={cheque.id} id={`linha${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.linha}</td>
                                <td name={cheque.id} id={`obs${cheque.id}`} className={assignClassStyle(cheque)}>{cheque.obs && <img src="/images/message.svg" onClick={() => handleOpenObs(cheque)} />}</td>
                                <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/edit.svg" name={cheque.id} value={cheque.id} onClick={handleEdit} /></td>
                                <td name={cheque.id} className={assignClassStyle(cheque)}> <img src="/images/trash-bin.svg" onClick={() => handleDelete(cheque.id)} /></td>
                            </tr>
                        ))}
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                </tbody>
            </table>
            <div id={style.obsBackground} className="obsScreen">
                <div id={style.obsCtr}>
                    <div className={style.popupHeader}>
                        <h4>{`Observação do Cheque ${obsDetails.num} do cliente ${obsDetails.cliente}`}</h4>
<<<<<<< HEAD
                        <img src="/images/x-icon.svg" onClick={closeObs}/>
                    </div>
                    <div className={style.obsContent}>
                        <textarea value={obsDetails.obs} onChange={(e) => setObsDetails({...obsDetails, obs: e.target.value})}></textarea>
=======
                        <img src="/images/x-icon.svg" onClick={closeObs} />
                    </div>
                    <div className={style.obsContent}>
                        <textarea value={obsDetails.obs} onChange={(e) => setObsDetails({ ...obsDetails, obs: e.target.value })}></textarea>
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                    </div>

                    <div className={style.obsButtonCtr}>
                        <button type="submit" className={style.button} id="editObs" onClick={handleEditObs}>Salvar</button>
                        <button type="submit" className={style.button} id="deleteObs" onClick={handleClearObs}>Deletar</button>
                    </div>
<<<<<<< HEAD
                    
                    
=======
>>>>>>> 34ef091f73f675edfe04bdf32de5ff7d7c83260e
                </div>
            </div>
        </>
    )
}