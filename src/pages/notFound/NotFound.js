import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Página não encontrada</p>
                <a href="/" className="not-found-link">Voltar para a página inicial</a>
            </div>
        </div>
    );
};

export default NotFound;
