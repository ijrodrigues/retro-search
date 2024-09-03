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
criarEstrelas(200);

// Função para criar os tiros da nave
function criarTiro() {
    const nave = document.querySelector('.nave');
    const tiro = document.createElement('div');
    tiro.classList.add('tiro');
    tiro.style.left = `${nave.offsetLeft + nave.offsetWidth / 2 - 1}px`;
    document.body.appendChild(tiro);

    // Remover o tiro depois que ele sai da tela
    setTimeout(() => {
        tiro.remove();
    }, 2000);
}

// Disparar tiros a cada 500ms
setInterval(criarTiro, 500);

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

document.addEventListener('mousemove', function(event) {
    const nave = document.querySelector('.nave');
    const x = event.clientX; // Pega a posição X do mouse
    nave.style.left = `${x}px`; // Move a nave na posição X do mouse
});