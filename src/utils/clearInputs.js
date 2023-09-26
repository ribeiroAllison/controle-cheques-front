const clearInputs = (className) => {
  const inputs = document.getElementsByClassName(className);
  for (let input of inputs) {
    input.value = "";
  }
};

export default clearInputs;
