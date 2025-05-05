// Importações de bibliotecas e componentes
import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast"; // Componente de notificação
import {Card} from "primereact/card"; // Componente de cartão para layout
import {Button} from "primereact/button"; // Botão estilizado do PrimeReact
import Dropdown from "../../components/Dropdown/Dropdown"; // Componente customizado de dropdown
import {useNavigate} from "react-router"; // Hook para navegação de rotas
import aiService from "../../services/AIService"; // Serviço que faz chamadas à API
import styles from "./Report.module.css"; // Estilos CSS module específicos deste componente

// Filtros disponíveis para dropdowns
const filterByQuality = ["Defeituosa", "Não defeituosa", "Todas"];
const filterByDate = ["Últimas 24 horas", "Últimos 7 dias", "Últimos 30 dias", "Todas"];
const filterByProduct = ["Maçãs", "Mangas"];

const Report = () => {
    // Estados do componente
    const [groups, setGroups] = useState([]); // Guarda os grupos de análises
    const [currentPage, setCurrentPage] = useState(0); // Controle de paginação
    const [loading, setLoading] = useState(true); // Indica se os dados estão sendo carregados
    const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
    const [selectedQuality, setSelectedQuality] = useState(null); // Qualidade selecionada
    const [selectedDate, setSelectedDate] = useState(null); // Período selecionado

    const toast = useRef(null); // Referência ao componente Toast
    const navigate = useNavigate(); // Hook para navegação entre páginas

    // useEffect para buscar análises ao montar o componente
    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);  // Ativa o estado de carregamento

            try {
                const data = await aiService.listAnalysis(); // Chamada à API para listar análises
                const analysisArray = Object.values(data).flat(); // Converte objeto em array plano

                // Agrupa as análises por grupo_id
                const groupedAnalyses = new Map();
                analysisArray.forEach(item => {
                    const group = item.grupo_id || 'Sem ID';
                    if (!groupedAnalyses.has(group)) {
                        groupedAnalyses.set(group, []);
                    }
                    groupedAnalyses.get(group).push(item);
                });

                // Atualiza o estado com os grupos ordenados (recente primeiro)
                setGroups(Array.from(groupedAnalyses.entries()).reverse());
            } catch (error) {
                // Exibe erro no Toast se falhar
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message,
                    life: 3000
                });
            } finally {
                setLoading(false); // Desativa o loading
            }
        };

        fetchAnalysis(); // Executa a função ao carregar
    }, []); // Executa apenas uma vez (componente montado)

    // Atualiza a página atual (para paginação, se usada futuramente)
    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    // Função chamada sempre que algum filtro do dropdown mudar
    const handleQualityChange = async (quality, product, date) => {
        // Atualiza os estados locais com os filtros selecionados
        setSelectedQuality(quality);
        setSelectedProduct(product);
        setSelectedDate(date);

        try {
            let data = {};

            // Se qualquer filtro for diferente de "Todas", aplica o filtro
            if (quality !== "Todas" || product !== "Todas" || date !== "Todas") {
                data = await aiService.filterAnalysis(quality, product, date); // Chama a API com filtros
                console.log("Dados filtrados recebidos da API:", data);
            } else {
                data = await aiService.listAnalysis(); // Busca todos os dados
                console.log("Todos os dados (sem filtro):", data);
            }

            // Agrupa os dados filtrados por grupo_id
            const analysisArray = Object.values(data).flat();
            const groupedAnalyses = new Map();
            analysisArray.forEach(item => {
                const group = item.grupo_id || 'Sem ID';
                if (!groupedAnalyses.has(group)) {
                    groupedAnalyses.set(group, []);
                }
                groupedAnalyses.get(group).push(item);
            });

            // Atualiza o estado com os grupos filtrados
            setGroups(Array.from(groupedAnalyses.entries()).reverse());
            setCurrentPage(0); // Reseta para primeira página
            setLoading(false); // Finaliza carregamento
        } catch (error) {
            setLoading(false);
            // Mostra erro no Toast
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
                life: 3000
            });
        }
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>

            <Card className={styles.card}>
                <p className={styles.title}>Relatórios</p>

                {/* Dropdowns para filtros */}
                <div className={styles.dropdownContainer}>
                    <Dropdown
                        options={filterByProduct}
                        placeholder="Selecione o produto"
                        selectedOption={selectedProduct}
                        onOptionChange={(value) => handleQualityChange(selectedQuality, value, selectedDate)}
                    />

                    <Dropdown
                        options={filterByQuality}
                        placeholder="Selecione a qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={(value) => handleQualityChange(value, selectedProduct, selectedDate)}
                    />

                    <Dropdown
                        options={filterByDate}
                        placeholder="Selecione o período"
                        selectedOption={selectedDate}
                        onOptionChange={(value) => handleQualityChange(selectedQuality, selectedProduct, value)}
                    />
                </div>

                {/* Descrição para instruções */}
                <p className={styles.description}>
                    Escolha os filtros e clique em uma opção para gerar um relatório na forma de tabela, CSV, PDF ou
                    JSON
                    {/* Comentado: Exibir nome do grupo atual */}
                </p>

                {/* Botão para ir para tabela de relatórios */}
                <Button
                    label="Visualizar tabela"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => navigate("/app/table")}
                />

                {/* Botões para gerar outros formatos (em desenvolvimento) */}
                <Button
                    label="Gerar CSV"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
                />

                <Button
                    label="Gerar PDF"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
                />

                <Button
                    label="Gerar JSON"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
                />

                {/* Botão para voltar à home */}
                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => navigate("/app/home")}
                />
            </Card>
        </div>
    );
};

export default Report;
