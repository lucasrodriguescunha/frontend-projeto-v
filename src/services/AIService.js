import {aiApi} from "./axios-config"; // seu arquivo com baseURL configurada

class AIService {
    async uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await aiApi.post("/upload", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async listarResultados() {
        try {
            const response = await aiApi.get("/listar");
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        console.error("Erro na requisição:", error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Erro na requisição.");
        } else {
            throw new Error("Erro ao conectar com o servidor.");
        }
    }
}

const aiService = new AIService();
export default aiService;
