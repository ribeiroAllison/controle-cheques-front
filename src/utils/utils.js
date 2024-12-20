import { toast } from "react-toastify";

//FORMS & AUX FUNCTIONS
export const clearInputs = (inputId) => {
  const inputs = document.getElementsByClassName(inputId);
  for (let input of inputs) {
    input.value = "";
  }
};

export const linhas = [
  11, 12, 13, 14, 20, 22, 28, 30, 31, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43,
  44, 45, 48, 49, 59, 60, 61, 64,
];

//SHOW ADD DATA FORM
export function showAddForm() {
  const addForm = document.getElementById("addForm");
  addForm.style.display = "flex";

  const addButton = document.getElementById("addButton");
  addButton.style.display = "none";
}

export function hideAddForm() {
  const addForm = document.getElementById("addForm");
  addForm.style.display = "none";

  const addButton = document.getElementById("addButton");
  addButton.style.display = "block";
}


// PAYMENT CALCULATION & VALIDATION
export const isVencido = (formValues, excessDays) => {
  const hoje = new Date();
  const compDate = formValues.data_compen
    ? new Date(formValues.data_compen)
    : "";
  const vencDate = new Date(formValues.data_venc);
  vencDate.setDate(vencDate.getDate() + (excessDays + 1));

  let result;

  if (vencDate < hoje && !compDate) {
    result = true;
  } else if (compDate > vencDate) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

export const isVencidoVar = (formValues, excessDays, i) => {
  const hoje = new Date();
  const compDate = formValues[`data_compen${i}`]
    ? new Date(formValues[`data_compen${i}`])
    : "";
  const vencDate = new Date(formValues[`data_venc${i}`]);
  vencDate.setDate(vencDate.getDate() + excessDays);

  let result;

  if (vencDate < hoje && !compDate) {
    result = true;
  } else if (compDate > vencDate) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

export const isCompensado = (formValues, excessDays) => {
  const hoje = new Date();
  const compDate = formValues.data_compen && new Date(formValues.data_compen);
  const destino = formValues.destino_id;
  const data_venc = formValues.data_venc && new Date(formValues.data_venc);
  const dataAutoCompensaçao =
    destino && data_venc.setDate(data_venc.getDate() + excessDays);
  const linha = formValues.linha;

  let result;

  if (!compDate && !destino) {
    result = false;
  } else if (hoje > dataAutoCompensaçao && !linha) {
    result = true;
  } else if (compDate) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

export const isCompensadoVar = (formValues, excessDays, i) => {
  const hoje = new Date();
  const compDate =
    formValues[`data_compen${i}`] && new Date(formValues[`data_compen${i}`]);
  const destino = formValues.destino_id;
  const data_venc =
    formValues[`data_venc${i}`] && new Date(formValues[`data_venc${i}`]);
  const dataAutoCompensaçao =
    destino && data_venc.setDate(data_venc.getDate() + excessDays);
  const linha = formValues[`linha${i}`];

  let result;

  if (!compDate && !destino) {
    result = false;
  } else if (hoje > dataAutoCompensaçao && !linha) {
    result = true;
  } else if (compDate) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

// DATE & CURRENCY FORMATTING
export const transformDate = (data) => {
  const date = new Date(data);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export const rearrangeDate = (date) => {
  const parts = date.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

export const transformValue = (value) => {
  return value
    .toString()
    .replace(",", "x")
    .replace(".", ",")
    .replace("x", ".")
    .replace("R$", "$");
};

export function getKeyByValue(object, value) {
  let correctObj;
  if (object.length > 0) {
    for (let obj of object) {
      if (obj["nome"] === value) {
        correctObj = obj;
      }
    }
    const result = correctObj ? correctObj.id : null;

    return result;
  }
}

export const transformCurrency = (value) => {
  return value
    ?.replace("$", "R$")
    .replace(",", "x")
    .replace(".", ",")
    .replace("x", ".");
};

export const convertToNumber = (value) => {
  return Number(value.replace(/[^0-9.-]+/g, ""));
};

export function formatPhoneNumber(input) {
  const phoneNumber = input.replace(/\D/g, "");
  if (phoneNumber.length <= 2) {
    return `${phoneNumber}`;
  } else if (phoneNumber.length <= 7) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
  } else {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7)}`;
  }
}

// TOASTIFY MESSAGES
export const notifySuccess = (msg) => toast.success(msg);
export const notifyFailure = (msg) => toast.error(msg);
