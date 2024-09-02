// Função para criar as estrelas
function criarEstrelas(quantidade) {
    const estrelasDiv = document.querySelector('.estrelas');
    for (let i = 0; i < quantidade; i++) {
        const estrela = document.createElement('div');
        estrela.classList.add('estrela');
        estrela.style.top = `${Math.random() * 100}%`;
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.animationDelay = `${Math.random() * 2}s`; // Adiciona um delay aleatório para o piscar
        estrelasDiv.appendChild(estrela);
    }
}

// Chamando a função para criar 200 estrelas
criarEstrelas(100);

// Função de busca de jogos retro
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    // Exemplo de resultados estáticos
    const games = [
        { name: "Super Mario Bros", description: "A classic platformer game by Nintendo." },
        { name: "The Legend of Zelda", description: "An action-adventure game with puzzles and exploration." },
        { name: "Pac-Man", description: "A maze arcade game with ghosts and pellets." },
        { name: "Street Fighter II", description: "A popular fighting game with memorable characters." },
        { name: "Mega Man X", description: "A side-scrolling platformer with robot enemies." },
        { name: "Sonic the Hedgehog", description: "A fast-paced platformer featuring Sonic the blue hedgehog." },
        { name: "Tetris", description: "A puzzle game with falling blocks." },
        { name: "Donkey Kong", description: "An arcade game with barrels and a giant ape." }
    ];

    const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));

    resultsContainer.innerHTML = filteredGames.map(game => `
        <div class="card">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        </div>
    `).join('');
});
