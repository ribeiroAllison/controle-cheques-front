import { baseURL } from "@/utils/url";

export default class User {
    static registerUser = async (user) => {
        try {
            const responseUsers = await fetch(`${baseURL}/usuarios`);

            if (!responseUsers.ok) {
                throw new Error('Falha ao obter a lista de usuários.');
            }

            const users = await responseUsers.json();

            const userExists = users.some((u) => u.email === user.email);

            if (userExists) {
                throw new Error('Email já está em uso.');
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
                throw new Error('Falha ao registrar usuário.');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
