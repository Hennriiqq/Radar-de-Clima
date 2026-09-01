# 🌤️ Radar de Clima

Aplicação de clima construída em **HTML, CSS e JavaScript puro** (sem frameworks), que permite buscar qualquer cidade do mundo e visualizar o clima atual e a previsão para os próximos 7 dias.

Projeto desenvolvido como parte do meu portfólio, aplicando na prática os fundamentos de JavaScript: manipulação assíncrona de dados, consumo de APIs REST, manipulação do DOM e tratamento de erros.

##  Site :

*https://hennriiqq.github.io/Radar-de-Clima/*

##  Funcionalidades

-  Busca de clima por nome de cidade (em qualquer idioma/país)
-  Exibição do clima atual: temperatura, condição climática e velocidade do vento
-  Previsão detalhada para os próximos 7 dias (temperatura máxima, mínima e condição)
-  Tratamento de erros para cidades não encontradas
-  Validação de campo vazio antes da busca
-  Indicador de carregamento (loading state) durante as requisições
-  Botão desabilitado durante o carregamento, evitando cliques duplicados

##  Imagens
-  Busca :
  
<img width="563" height="154" alt="clima-1" src="https://github.com/user-attachments/assets/da843eaf-6064-403f-bbc9-ab8244c0ff3e" />


-  Retorno da busca :
<img width="575" height="601" alt="clima-2" src="https://github.com/user-attachments/assets/3f4b171f-1906-488b-857a-561f5eae5650" />

-  Erro - Nada Escrito :
<img width="402" height="184" alt="Erro-semCidade" src="https://github.com/user-attachments/assets/18d4ae5a-ca9d-4eaf-983b-d0876f3b0cfa" />


-  Erro - Cidade desconhecida :
  <img width="440" height="193" alt="erro-nenhumaCidade" src="https://github.com/user-attachments/assets/0d958a4d-1f5d-4ac1-9c6f-9ad7cc40076f" />

##  Tecnologias utilizadas

- **HTML5** — estrutura semântica da página
- **CSS3** — estilização, incluindo:
  - Glassmorphism (efeito de vidro fosco)
  - Gradientes dinâmicos via variáveis CSS
  - Layout responsivo (mobile-first com media queries)
- **JavaScript (ES6+)** — lógica da aplicação, incluindo:
  - `fetch` + `async/await` para chamadas assíncronas
  - Destructuring de objetos (inclusive aninhados)
  - Manipulação do DOM via `innerHTML`
  - `.map()` para transformar arrays de dados em elementos visuais
  - `try/catch` para tratamento de erros
  - Manipulação de eventos (`click`, `keydown`)

## 🌐 APIs utilizadas

Este projeto consome as APIs gratuitas da [Open-Meteo](https://open-meteo.com/), que não exigem cadastro nem chave de API:

1. **[Geocoding API](https://open-meteo.com/en/docs/geocoding-api)** — converte o nome da cidade digitada pelo usuário em coordenadas geográficas (latitude e longitude).
2. **[Forecast API](https://open-meteo.com/en/docs)** — retorna o clima atual e a previsão diária a partir das coordenadas obtidas na etapa anterior.

O fluxo de dados funciona assim:

```
Usuário digita o nome da cidade
        ↓
Geocoding API retorna latitude/longitude
        ↓
Forecast API retorna clima atual + previsão de 7 dias
        ↓
Dados são traduzidos e exibidos na tela
```

## 📂 Estrutura do projeto

```
├── index.html      # Estrutura da página
├── style.css       # Estilização e responsividade
├── script.js       # Lógica de busca, consumo de API e renderização
└── README.md
```
##  Sobre o projeto

Este projeto foi desenvolvido como parte da minha jornada de aprendizado em JavaScript, aplicando na prática conceitos como objetos, destructuring, closures, async/await e tratamento de erros — consolidados em um projeto real de consumo de API.

Desenvolvido por **Henrique** — [LinkedIn](#) · [GitHub](#)
