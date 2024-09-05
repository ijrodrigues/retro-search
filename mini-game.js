let hits = 0;
let currentAlienIndex = 0;

// Lista de aliens com diferentes imagens e número de hits
const aliens = [
    { imagePath: 'assets/alien1.gif', hitsToKill: 10, class: 'alien' },
    { imagePath: 'assets/alien2.gif', hitsToKill: 18, class: 'alien2' },
    { imagePath: 'assets/t3.jpg', hitsToKill: 30, class: 'alien3' },
];

const collisionSound = document.getElementById('collision-sound');
const deathSound = document.getElementById('death-sound');
const restartButton = document.getElementById('restartButton');

// Função para criar um novo alien com base no índice atual
function criarAlien() {
    const alienData = aliens[currentAlienIndex];

    if (!alienData) {
        // Não há mais aliens, fim do jogo
        restartButton.style.display = 'block'; // Mostra o botão de reiniciar
        return;
    }

    const alien = document.createElement('img');
    alien.src = alienData.imagePath; // Define a imagem do alien
    alien.alt = 'alien';
    alien.classList.add(alienData.class);
    document.body.appendChild(alien);

    hits = 0; // Reseta o contador de hits para o novo alien

    // Atualiza o número de hits necessários para matar o alien
    let hitsToKill = alienData.hitsToKill;

    // Função para verificar colisão do tiro com o alien
    function checkCollision(tiro) {
        const tiroRect = tiro.getBoundingClientRect();
        const alienRect = alien.getBoundingClientRect();

        if (tiroRect.top <= alienRect.bottom &&
            tiroRect.bottom >= alienRect.top &&
            tiroRect.left >= alienRect.left &&
            tiroRect.right <= alienRect.right) {

            hits += 1;
            // collisionSound.play();
            tiro.remove();
            clearInterval(tiro.checkCollision);

            // Verifica se o alien atingiu o limite de hits
            if (hits >= hitsToKill) {
                // deathSound.play();
                alien.remove();
                currentAlienIndex += 1;
                criarAlien();
            }
        }
    }

    // Disparar tiros quando o usuário clica
    document.addEventListener('click', criarTiro);

    function criarTiro() {
        const nave = document.querySelector('.nave');
        const tiro = document.createElement('div');
        tiro.classList.add('tiro');
        tiro.style.left = `${nave.offsetLeft + nave.offsetWidth / 2 - 15}px`;
        document.body.appendChild(tiro);

        tiro.checkCollision = setInterval(() => checkCollision(tiro), 50);

        // Remover o tiro depois que ele sai da tela
        setTimeout(() => {
            tiro.remove();
            clearInterval(tiro.checkCollision); // Para de checar a colisão se o tiro sair da tela
        }, 2000);
    }
}

// Função para mover a nave junto com o mouse
document.addEventListener('mousemove', function (event) {
    const nave = document.querySelector('.nave');
    const x = event.clientX;
    nave.style.left = `${x}px`;
});

// Evento para recarregar a página quando o botão de reiniciar for clicado
restartButton.addEventListener('click', function () {
    location.reload();
});

// Inicializa o primeiro alien
criarAlien();
