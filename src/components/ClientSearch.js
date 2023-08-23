"use client";

import styles from "../styles/clientSearch.module.css"

export default function ClientSearch(props) {
  return (
    <div className={`${styles.inputWrapper}`} id="clienteBox">
      <div className={styles.inputField}>
        <label htmlFor="cliente">Cliente:</label>
        <input
          type="text"
          name="cliente"
          onChange={props.handleInputChange}
          id={props.id}
          placeholder="Pesquise o Cliente"
          className="input"
        />
      </div>
      <div className={styles.searchBox} id={props.divId}>
        <select
          size={4}
          id={`${styles.clientSelect} input`}
          onChange={props.handleInputChange}
        >
          {props.searchResult.map((client) => (
            <option
              onClick={props.handleClick}
              key={`codClient-${client.cod}`}
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
