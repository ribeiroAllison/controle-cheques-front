function validarCNPJ(cnpj) {
  if (cnpj) {

    // Remove qualquer caracter que não seja número
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ possui 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 11111111111111)
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    // Calcula os dois dígitos verificadores
    let soma = 0;
    let peso = 2;
    let digito1 = 0;
    let digito2 = 0;

    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }

    digito1 = soma % 11 < 2 ? 0 : 11 - soma % 11;

    soma = 0;
    peso = 2;

    for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }

    digito2 = soma % 11 < 2 ? 0 : 11 - soma % 11;

    // Verifica se os dígitos calculados são iguais aos dígitos informados
    return !(parseInt(cnpj.charAt(12)) !== digito1 || parseInt(cnpj.charAt(13)) !== digito2);
  }
}

export default validarCNPJ;

