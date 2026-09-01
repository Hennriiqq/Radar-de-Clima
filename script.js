const botaoBuscar = document.getElementById('buscar');
const input = document.getElementById('inputCidade');
const divError = document.getElementById('error');
const divCarregando = document.getElementById('carregando');
const card = document.getElementById('card');

const descricoesClima = {
  0: 'Céu limpo', 1: 'Poucas nuvens', 2: 'Parcialmente nublado', 3: 'Nublado',
  45: 'Neblina', 48: 'Neblina com geada',
  51: 'Garoa fraca', 53: 'Garoa moderada', 55: 'Garoa forte',
  61: 'Chuva fraca', 63: 'Chuva moderada', 65: 'Chuva forte',
  71: 'Neve fraca', 73: 'Neve moderada', 75: 'Neve forte',
  80: 'Pancadas fracas', 81: 'Pancadas moderadas', 82: 'Pancadas fortes',
  95: 'Tempestade', 96: 'Tempestade com granizo'
};

const emojisClima = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌦️', 82: '🌦️',
  95: '⛈️', 96: '⛈️'
};

function formatarHora(isoString) {
  const data = new Date(isoString);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function nomeDiaCurto(dataISO, indice) {
  if (indice === 0) return 'Hoje';
  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const data = new Date(dataISO + 'T00:00:00');
  return dias[data.getDay()];
}

async function buscarClima() {
  botaoBuscar.disabled = true;
  botaoBuscar.textContent = "Buscando...";
  divError.innerHTML = "";
  card.style.display = "none";
  divCarregando.innerHTML = "Carregando...";

  try {
    const cidade = input.value;

    if (!cidade) {
      divError.innerHTML = "Digite uma cidade";
      divCarregando.innerHTML = "";
      return;
    }

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}`);
    const data = await response.json();
    const { results } = data;

    if (!results || results.length === 0) {
      throw new Error("Não foi possível achar essa cidade");
    };

    const { latitude, longitude, name, country } = results[0];

    const responseClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,precipitation_probability_max&timezone=auto`);
    const dataClima = await responseClima.json();
    const { temperature, weathercode, windspeed, time } = dataClima.current_weather;
    const { daily } = dataClima;

    divCarregando.innerHTML = "";
    card.style.display = "block";

    // Cabeçalho
    document.getElementById('iconePrincipal').textContent = emojisClima[weathercode] || '🌡️';
    document.getElementById('dataHora').textContent = new Date(time).toLocaleString('pt-BR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    document.getElementById('tituloClima').textContent = `${descricoesClima[weathercode]} ${Math.round(temperature)}°C`;
    document.getElementById('cidadeNome').textContent = `${name}, ${country}`;

    // Nascer/pôr do sol
    const nascer = formatarHora(daily.sunrise[0]);
    const por = formatarHora(daily.sunset[0]);
    document.getElementById('nascerSol').textContent = `☀️ ${nascer}`;
    document.getElementById('porSol').textContent = `🌙 ${por}`;
    document.getElementById('duracaoDia').textContent = 'hoje';

    // Chance de chuva
    const chuva = daily.precipitation_probability_max[0];
    document.getElementById('pillChuva').innerHTML = `🌧️ Chance de chuva: <strong>${chuva}%</strong>`;

    // Vento
    document.getElementById('ventoInfo').textContent = `💨 Vento: ${windspeed} km/h`;

    // Previsão em pílulas
    const pills = daily.time.map((data, indice) => {
      const codigo = daily.weathercode[indice];
      const max = Math.round(daily.temperature_2m_max[indice]);
      const min = Math.round(daily.temperature_2m_min[indice]);
      const nome = nomeDiaCurto(data, indice);
      const classe = indice === 0 ? 'dia-pill hoje' : 'dia-pill';

      document.getElementById('min-max').innerHTML = `Temp Mín: ${min}°C <br> Temp Máx: ${max}°C`


      return `
        <div class="${classe}">
          <span class="nome-dia">${nome}</span>
          <span class="emoji-dia">${emojisClima[codigo] || '🌡️'}</span>
          <span class="max">${max}°</span>
          <span class="min">${min}°</span>
        </div>
      `;
    }).join('');

    document.getElementById('previsao').innerHTML = pills;


  } catch (erro) {
    divCarregando.innerHTML = "";
    divError.innerHTML = erro.message;
    card.style.display = "none";
  } finally {
    input.value = "";
    botaoBuscar.disabled = false;
    botaoBuscar.textContent = "buscar";
  }
}

botaoBuscar.addEventListener('click', buscarClima);

input.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    buscarClima();
  }
});