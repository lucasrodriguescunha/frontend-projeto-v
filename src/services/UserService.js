import api from "./axios-config";

class UserService {
    async postUsuario(usuario) {
        try {
            const response = await api.post("/usuarios", usuario);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getUsuarios() {
        try {
            const response = await api.get("/usuarios/consulta");
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async login(dados) {
        try {
            const response = await api.post("/auth/login", dados);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error("Erro na requisição:", error); // <-- adicionado
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Erro de requisição.");
        } else {
            throw new Error("Erro ao conectar com o servidor.");
        }
    }
}

const userService = new UserService();
export default userService;
