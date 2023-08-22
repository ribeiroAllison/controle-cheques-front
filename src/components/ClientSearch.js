import style from "@/styles/clientes.module.css";

export default function ClientSearch(props) {
  return (
    <div className={`${style.inputCtr} ${style.nameCtr}`} id="clienteBox">
      <h4>Cliente:</h4>
      <input
        type="text"
        name="cliente"
        onChange={props.handleInputChange}
        id={props.id}
        placeholder="Pesquise o Cliente"
        className="input"
      />
      <div className={style.searchBox} id={props.divId}>
        <select
          size={4}
          id={`${style.clienteSelect} input`}
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
