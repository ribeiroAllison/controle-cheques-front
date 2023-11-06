"use client";

import styles from "@/styles/ClientSearch.module.css";
import { InputForms } from "./InputForms";

export default function ClientSearch(props) {
  return (
    <div className={`${styles.inputWrapper}`} id="clienteBox">
      <div className="inputField">
        <label htmlFor="cliente">Cliente:</label>
        <InputForms
          type="text"
          name="cliente"
          onChange={props.handleInputChange}
          id={props.id}
          placeholder="Pesquise o Cliente"
          className="input"
          autoComplete="off"
        />
      </div>
      <div className={styles.searchBox} id={props.divId}>
        <div className={styles.customSelect}>
          {props.searchResult.map((client) => (
            <option
              onClick={props.handleClick}
              key={`codClient-${client.cod}`}
              value={client.id}
              className={styles.customOption}
            >
              {client.cliente}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
}
