import { connection } from "@/utils/connection";
import { setCookie } from "@/utils/cookie";

export default class User {
  // GET USER
  static getUserById = async (id) => {
    try {
      const response = await connection.get(`/usuarios/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  // USER CREATION
  static registerUser = async (user) => {
    const tax_id = user.tax_id.replace(/\D/g, "");
    try {
      const response = await connection.post("/usuarios/register", {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        tax_id: tax_id,
        birth_date: user.birth_date,
        phones: user.phones,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  // USER LOGIN
  static loginUser = async (user) => {
    try {
      const response = await connection.post(`/usuarios/login`, {
        email: user.email,
        senha: user.senha,
      });

      if (response && response.status === 200) {
        setCookie("token", response.data.token.token);
        setCookie("user", response.data.userName);
        setCookie("userAllowed", response.data.isUserAllowed);
        setCookie("trialDays", response.data.trialDays);
        return response;
      } else {
        return;
      }
    } catch (error) {
      return error.response;
    }
  };

  // USER EDIT
  static editUser = async (user) => {
    try {
      const response = await connection.put(`/usuarios/${user.id}`, {
        nome: user.nome,
        email: user.email,
        birth_date: user.birth_date,
        phones: user.phones,
        pagseguro_id: user.pagseguro_id,
      });
      if (response && response.status === 201) {
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  // GENERATE TEMP PWD
  static generateToken = async (user) => {
    try {
      const response = await connection.put("/temporary-password", {
        email: user.email,
      });
      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  };

  // RESET PWD
  static resetPassword = async (user) => {
    try {
      const response = await connection.put("/update-password", {
        email: user.email,
        senha: user.senha,
        token: user.token,
      });

      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  };

  // SEND MSG TO EMAIL
  static sendIssue = async (issue) => {
    try {
      const response = await connection.post("/usuarios/issue", {
        name: issue.name,
        email: issue.email,
        subject: issue.subject,
        message: issue.message,
      });

      if (response && response.status === 200) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  };
}
