let hits = 0; // Variável para contar o número de tiros acertados no alien

// Carregar os sons
const collisionSound = document.getElementById('collision-sound');
const deathSound = document.getElementById('death-sound');
const restartButton = document.getElementById('restartButton'); // Botão de reiniciar

// Função para criar os tiros da nave
function criarTiro() {
    const nave = document.querySelector('.nave');
    const tiro = document.createElement('div');
    tiro.classList.add('tiro');
    tiro.style.left = `${nave.offsetLeft + nave.offsetWidth / 2 - 20}px`;
    document.body.appendChild(tiro);

    // Verifica se o tiro colide com o alien
    const checkCollision = setInterval(() => {
        const tiroRect = tiro.getBoundingClientRect();
        const alien = document.querySelector('.alien');

        if (!alien) {
            // Se o alien não existe mais, para de checar a colisão
            clearInterval(checkCollision);
            return;
        }

        const alienRect = alien.getBoundingClientRect();

        if (tiroRect.top <= alienRect.bottom &&
            tiroRect.bottom >= alienRect.top &&
            tiroRect.left >= alienRect.left &&
            tiroRect.right <= alienRect.right) {

            hits += 1; // Incrementa o contador de hits
            collisionSound.play(); // Toca o som de colisão
            tiro.remove(); // Remove o tiro
            clearInterval(checkCollision); // Para de checar a colisão para esse tiro

            // Verifica se o alien atingiu o limite de hits e o remove
            if (hits >= 10) { // Pode ajustar o número de hits conforme necessário
                deathSound.play(); // Toca o som de morte
                alien.remove();
                restartButton.style.display = 'block'; // Mostra a imagem de reiniciar
            }
        }
    }, 50);

    // Remover o tiro depois que ele sai da tela
    setTimeout(() => {
        tiro.remove();
        clearInterval(checkCollision); // Para de checar a colisão se o tiro sair da tela
    }, 2000);
}

// Disparar tiros quando o usuário clica
document.addEventListener('click', criarTiro);

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

// Função para mover a nave junto com o mouse
document.addEventListener('mousemove', function(event) {
    const nave = document.querySelector('.nave');
    const x = event.clientX; // Pega a posição X do mouse
    nave.style.left = `${x}px`; // Move a nave na posição X do mouse
});

// Evento para recarregar a página quando o botão de reiniciar for clicado
restartButton.addEventListener('click', function() {
    location.reload(); // Recarrega a página para reiniciar o minijogo
});

// Função de busca de jogos retro
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    // Exemplo de resultados estáticos
    const games = [
        { name: "Super Mario Bros", description: "A classic platformer game by Nintendo.", image: "super-mario.png" },
        { name: "The Legend of Zelda", description: "An action-adventure game with puzzles and exploration.", image: "zelda.webp" },
        { name: "Pac-Man", description: "A maze arcade game with ghosts and pellets.", image: "pac-man.png" },
        { name: "Street Fighter II", description: "A popular fighting game with memorable characters.", image: "street-fighter.png" },
        { name: "Mega Man X", description: "A side-scrolling platformer with robot enemies.", image: "mega-man.png" },
        { name: "Sonic the Hedgehog", description: "A fast-paced platformer featuring Sonic the blue hedgehog.", image: "sonic.png" },
        { name: "Tetris", description: "A puzzle game with falling blocks.", image: "tetris.png" },
        { name: "Donkey Kong", description: "An arcade game with barrels and a giant ape.", image: "donkey-kong.png" }
    ];

    if(query.length !== 0) {
        const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
        resultsContainer.innerHTML = filteredGames.map(game => `
        <div class="sn-card">
            <div class="sn-image">
                <img src="assets/${game.image}" alt="${game.name}">
            </div>
            <div class="sn-label">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            </div>
            <div class="sn-ear right-ear"></div>
        </div>
    `).join('');
    }else {
        resultsContainer.innerHTML = '';
    }
});