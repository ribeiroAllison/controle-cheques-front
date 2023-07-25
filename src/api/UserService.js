import { baseURL } from "@/utils/url";
import { setCookie } from "@/utils/cookie";
import { connection } from "@/utils/connection";

export default class User {

    // USER CREATION
    static registerUser = async (user) => {
        try {
            const responseUsers = await fetch(`${baseURL}/usuarios`);
            const users = await responseUsers.json();
            const userExists = users.some((u) => u.email === user.email);

            if (userExists) {
                alert('Email já está em uso.');
                return;
            }

            const responseRegister = await fetch(`${baseURL}/usuarios/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha
                })
            });

            if (responseRegister.ok) {
                const jsonResponse = await responseRegister.json();
                return jsonResponse;
            } else {
                alert('Falha ao registrar usuário.');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // USER LOGIN
    static loginUser = async (user) => {
        try {
            const response = await connection.post(`/usuarios/login`, {
                email: user.email,
                senha: user.senha
            });
            if (response && response.status === 200) {
                setCookie('token', response.data.token.token);
                return response;
            } else {
                return;
            }
        } catch (error) {
            return error.response;
        }
    }

    // USER EDITION
    static editUser = async (user) => {
        try {
            const responseEdit = await connection.put(`/usuarios/${user.id}`, {
                nome: user.nome,
                senha: user.senha
            });
            return responseEdit;
        } catch (error) {
            console.error(error);
        }
    }
}
