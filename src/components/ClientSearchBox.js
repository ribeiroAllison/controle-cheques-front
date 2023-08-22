import styles from "@/styles/clienteSearchBox.module.css";
import { useState, useEffect } from "react";

export default function ClientSearchBox(props) {
  const [searchResult, setSearchResult] = useState([{}]);

  const findClient = () => {
    if (props.clientList) {
      const foundClientByName = props.clientList.filter((client) =>
        client.cliente
          .toLowerCase()
          .includes(props.formValues.cliente?.toLowerCase())
      );
      setSearchResult(foundClientByName);

      document.getElementById("searchBox").style.display =
        searchResult.length === 0 || !document.getElementById("cliente").value
          ? "none"
          : "block";
    }
  };

  useEffect(() => {
    findClient();
  }, [props.formValues.cliente]);

  return (
    <div className={`${styles.inputCtr}`} id="clienteBox">
      <label htmlFor="cliente">Cliente:</label>
      <input
        type="text"
        name="cliente"
        onChange={props.handleInputChange}
        id="cliente"
        placeholder="Pesquise o Cliente"
        className="input"
        required={props.required}
        autoComplete="off"
      />
      <div className={styles.searchBox} id="searchBox">
        <select
          size={4}
          id={`${styles.clienteSelect}`}
          onChange={props.handleInputChange}
        >
          {searchResult.map((client) => (
            <option
              onClick={props.handleClick}
              key={`clientCodigo-${client.id}`}
              value={client.id}
            >
              {client.cliente}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
