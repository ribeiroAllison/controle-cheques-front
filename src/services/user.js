import { baseURL } from "@/utils/url";

export default class User {
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
                document.cookie = `token=${jsonResponse.response.token}; path=/; expires=1d`;
                return jsonResponse;
            } else {
                alert('Falha ao logar usuário.');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
