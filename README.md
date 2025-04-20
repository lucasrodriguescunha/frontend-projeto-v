# QualiAI
## Sistema de Reconhecimento de Imagens para Controle de Qualidade

O **QualiAI** é um sistema em desenvolvimento voltado para a inspeção visual automatizada, utilizando tecnologias de visão computacional e aprendizado de máquina. Seu objetivo é identificar defeitos e classificar produtos durante o processo de fabricação. Com essa solução, é possível reduzir custos operacionais, aumentar a precisão das inspeções e garantir altos padrões de qualidade de forma eficiente e confiável.

### Funcionalidades

**Detecção Automática de Defeitos:**  
- Classificação de produtos como "Defeituosos" ou "Não Defeituosos" com base em imagens capturadas.

**Análise em Tempo Real:**  
- Processamento instantâneo de imagens através de uma API Flask com suporte a CORS.

**Relatórios de Qualidade:**  
- Geração de dados que podem ser integrados ao ERP da empresa para análise de desempenho e rastreabilidade.

**Aprendizado Contínuo:**  
- Modelo treinado com CNNs utilizando dados aumentados para melhorar a robustez da IA ao longo do tempo.

**Interface Amigável (em construção)**  
- Visão futura: Interface web para upload e visualização dos resultados das inspeções.

### Tecnologias utilizadas

**Inteligência Artificial**

- Python
- TensorFlow / Keras
- Flask
- NumPy
- PIL (Python Imaging Library)
- Matplotlib (para visualização do treinamento)

**Frontend**

- React.js (JavaScript)
- Vite
- CSS
- Prime React
- Prime Icons

**Backend**

- Spring Boot (Java)
- Flyway
- PostgreSQL
- Docker

**Testes**

-


### Funcionamento
1. Uma imagem do produto é enviada para o endpoint `/api/upload`.
2. A imagem é processada e redimensionada para 256x256 pixels.
3. O modelo treinado classifica a imagem como "Defeituosa" ou "Não defeituosa".
4. O resultado é retornado como JSON para fácil integração com outros sistemas.

---

## 🧪 Treinamento do Modelo

O modelo é uma CNN (Rede Neural Convolucional) treinada com `TensorFlow` e `Keras`. Os dados passaram por:
- Redimensionamento e normalização
- Aumento de dados (data augmentation)
- Validação cruzada com separação entre `train` e `val`

```python
model = keras.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(256, 256, 3)),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(128, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])
```

## 📡 API

POST /api/upload

Descrição: Recebe uma imagem e retorna a classificação

Body (form-data):

file: Arquivo de imagem .jpg, .png ou .jpeg

Resposta:

json
Copiar
Editar
{
  "resultado": "Não defeituosa"
}

## 💡 Motivação
Manter a qualidade dos produtos é essencial para a satisfação dos clientes e a reputação da empresa. Métodos manuais são lentos e propensos a erros. Ao empregar IA e visão computacional, conseguimos automação, agilidade e precisão no processo de inspeção.

## 🧠 Tecnologias utilizadas
🐍 Python
🤖 TensorFlow / Keras
🌐 Flask
📊 NumPy
🖼️ PIL (Python Imaging Library)
📈 Matplotlib (para visualização do treinamento)
