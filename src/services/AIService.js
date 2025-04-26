import {aiApi} from "./axios-config";

class AIService {
    async uploadImage(file, grupoId) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("grupo_id", grupoId);

        try {
            const response = await aiApi.post("/upload", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async listAnalysis() {
        try {
            const response = await aiApi.get("/listar");
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async filterDefeituosa() {
        try {
            const response = await aiApi.get("/filtrar/defeituosa");
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async filterNaoDefeituosa() {
        try {
            const response = await aiApi.get("/filtrar/nao_defeituosa");
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
