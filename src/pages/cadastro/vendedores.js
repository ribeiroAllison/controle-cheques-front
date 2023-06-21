import HeaderLine from "@/components/HeaderLine"
import Header from "@/components/Header"
import SearchFilter from "@/components/SearchFilter"
import style from "@/styles/clientes.module.css"
import { baseURL } from "@/utils/url"
import { useState, useEffect } from "react"



export default function Vendedores() {

    const [formValues, setFormValues] = useState({ nome: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const clearInputs = () => {

        const nomeInput = document.getElementById('nome');
        nomeInput.value = "";

    }

    const [vendedores, setVendedores] = useState();
    const [filteredList, setFilteredList] = useState();

    async function getAllVendedores() {
        try {
            const response = await fetch(`${baseURL}/vendedores`);

            if (response.ok) {
                let jsonResponse = await response.json();
                setVendedores(jsonResponse);
                setFilteredList(jsonResponse);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllVendedores()
    }, []);

    // POST

    const handleSubmit = (e) => {
        e.preventDefault();

        formValues.nome && fetch(`${baseURL}/vendedores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                nome: formValues.nome,

            })
        })
            .then(response => {
                if (response.ok) {
                    alert(`Destino ${formValues.nome} cadastrado com sucesso!`)
                    getAllVendedores();
                }
            }

            )
            .then(clearInputs())

    }

    // DELETE 

    const handleDelete = (e) => {

        const confirmation = confirm('Você realmente quer apagar este vendedor?');

        if (confirmation) {
            const id = e.target.closest('tr').getAttribute('data-cod');

            fetch(`${baseURL}/vendedores`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
                .then(response => {
                    if (response.ok) {
                        getAllVendedores();
                    }
                })

        }
    }



    // UPDATE

    const [editId, setEditId] = useState();
    const handleEdit = (e) => {
        const id = e.target.closest('tr').getAttribute('data-cod');
        setEditId(id);
        const nome = document.getElementById(id).innerHTML;


        const nomeInput = document.getElementById('nome');

        nomeInput.value = nome;

        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'none';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "block";


    }

    const handleClear = (e) => {
        e.preventDefault();

        clearInputs();
        const addButton = document.getElementById('adicionaCliente');
        addButton.style.display = 'block';

        const editButton = document.getElementById('editButton');
        editButton.style.display = "none";
    }

    async function submitEdit(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const id = editId;


        nome && fetch(`${baseURL}/vendedores`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nome: nome
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    getAllVendedores();
                }
            }

            )
            .then(clearInputs())
            .then(() => {
                const addButton = document.getElementById('adicionaCliente');
                addButton.style.display = 'block';

                const editButton = document.getElementById('editButton');
                editButton.style.display = "none";
            })
    }




    return (
        <>
            <Header />
            <h3 className={style.name}>Cadastro de Vendedores</h3>
            <form className={style.formCtr}>

                <div className={`${style.nameCtr} ${style.inputCtr}`} >
                    <h4>Nome:</h4>
                    <input type="text" name="nome" onChange={handleInputChange} id="nome" required placeholder="Nome do Vendedor" />
                </div>
                <button className={`${style.button} ${style.editButton}`} id="editButton" onClick={submitEdit} >Editar</button>
                <button className={style.button} id="adicionaCliente" onClick={handleSubmit}>Adicionar</button>
                <button className={style.button} onClick={handleClear} id="limpar">Limpar</button>
            </form>

            <HeaderLine name="Vendedores" />
            <SearchFilter
                name="Vendedor"
                list={vendedores}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                param="nome"
            />

            <table className="table" id={style.smallTable}>
                <thead>
                    <tr>
                        <th>Vendedor</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList && filteredList.map((destino) => (
                        <tr key={destino.nome} data-cod={destino.id}>
                            <td id={destino.id}>{destino.nome}</td>
                            <td name={destino.id} onClick={handleEdit}><img src="/images/edit.svg" /></td>
                            <td name={destino.nome} onClick={handleDelete}><img src="/images/trash-bin.svg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )


}