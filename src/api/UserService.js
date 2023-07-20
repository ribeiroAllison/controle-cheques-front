import { baseURL } from "@/utils/url";
import { setCookie } from "@/utils/cookie";

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
            const responseLogin = await fetch(`${baseURL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    senha: user.senha
                })
            });
            if (responseLogin.ok) {
                const jsonResponse = await responseLogin.json();

                setCookie('token', jsonResponse.response.token);
                return jsonResponse;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // USER EDITION
    static editUser = async (user) => {
        try {
            const responseEdit = await fetch(`${baseURL}/usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: user.nome,
                    senha: user.senha
                })
            });

            if (responseEdit.ok) {
                const jsonResponse = await responseEdit.json();
                setCookie('token', jsonResponse.token);

                return jsonResponse;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
