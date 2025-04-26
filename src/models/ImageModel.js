class ImageModel {
    constructor({file, name, preview, status = 'Aguardando upload...', data_analise = null, confianca = null}) {
        this.file = file;
        this.name = name;
        this.preview = preview;
        this.status = status;
        this.data_analise = data_analise;
        this.confianca = confianca;
    }

    atualizarStatus(resultado) {
        this.status = `Qualidade: ${resultado.resultado}`;
        this.data_analise = resultado.data_analise;
        this.confianca = resultado.confianca;
    }

    marcarErro(mensagem) {
        this.status = `Erro ao conectar: ${mensagem}`;
    }
}

export default ImageModel;
