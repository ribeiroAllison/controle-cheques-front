"use client";

import styles from "../styles/ClienteSearchBox.module.css";
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
    <>
      <div className={`${styles.inputCtr}`} id="clienteBox">
        <div className={styles.inputField}>
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
        </div>
        <div className={styles.searchBox} id="searchBox">
          <div className={styles.customSelect}>
            {searchResult.map((client) => (
              <option
                onClick={props.handleClick}
                key={`clientCodigo-${client.id}`}
                value={client.id}
                className={styles.customOption}
              >
                {client.cliente}
              </option>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
