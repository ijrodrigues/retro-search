import {games} from './data.js';

// Função para mostrar os jogos filtrados com base na busca
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    if (query.length !== 0) {
        const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
        displayGames(filteredGames);
    } else {
        resultsContainer.innerHTML = '';
    }
});

// Função para exibir todos os jogos sem filtro
document.getElementById('showAllBtn').addEventListener('click', function () {
    displayGames(games);
});

// Função para exibir jogos filtrados pela plataforma Nintendo
document.getElementById('showNintendoBtn').addEventListener('click', function () {
    const nintendoGames = games.filter(game => game.platform === "Nintendo");
    displayGames(nintendoGames);
});

// Função para exibir jogos filtrados pela plataforma Master System
document.getElementById('showMasterSystemBtn').addEventListener('click', function () {
    const masterSystemGames = games.filter(game => game.platform === "Master System");
    displayGames(masterSystemGames);
});

// Função para exibir jogos filtrados pela plataforma PlayStation
document.getElementById('showPlayStationBtn').addEventListener('click', function () {
    const playStationGames = games.filter(game => game.platform === "PlayStation");
    displayGames(playStationGames);
});

// Função para exibir os jogos
function displayGames(gameList) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = gameList.map(game => `
    <a href="${game.gameLink}" target="_blank" class="game-link">
        <div class="sn-wrapper">
            <div class="sn-ear left-ear"></div>
            <div class="sn-center">
                <div class="sn-image">
                    <img src="assets/${game.image}" alt="${game.name}">
                </div>
                <div class="sn-label">
                    <h3>${game.name}</h3>
                    <p>${game.description}</p>
                </div>
            </div>
            <div class="sn-ear right-ear"></div>
        </div>
    </a>
    `).join('');
}