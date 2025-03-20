import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {useNavigate} from 'react-router-dom';

import "./NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <Card className="not-found-content" title={<span className="not-found-title">404</span>}>
                <p className="not-found-message">Página não encontrada</p>
                <Button label={<span style={{color: 'white'}}>Voltar para a página inicial</span>} icon="pi pi-home"
                        className="p-button-primary" onClick={() => navigate('/')}/>
            </Card>
        </div>
    );
};

export default NotFound;