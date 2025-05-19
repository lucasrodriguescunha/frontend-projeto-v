import { userApi } from "./axios-config";

class UserService {
    async postUsuario(usuario) {
        try {
            const response = await userApi.post("/usuarios", usuario);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUsuarios() {
        try {
            const response = await userApi.get("/usuarios/consulta");
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUsuarioByEmail(email) {
        try {
            const response = await userApi.get(`/usuarios?emailUsuario=${email}`);
            return response.data.usuario;
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateUsuario(idUsuario, usuario) {
        try {
            const response = await userApi.put(`/usuarios?idUsuario=${idUsuario}`, usuario);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async unlockUser(email) {
        try {
            const params = new URLSearchParams({
                emailUsuario: email,
                operacao: "false",
                ativo: "true"
            });

            const response = await userApi.put(`/auth/controle?${params.toString()}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async login(dados) {
        try {
            const response = await userApi.post("/auth/login", dados);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error("Erro na requisição:", error);
        // Lança o erro completo para o frontend tratar melhor
        throw error;
    }
}

const userService = new UserService();
export default userService;
