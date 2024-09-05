let hits = 0;
let currentAlienIndex = 0;
let timerInterval = null;
let startTime = null;
let timerRunning = false;
let gameEnded = false; // Variável para controlar o fim do jogo

// Lista de aliens com diferentes imagens e número de hits
const aliens = [
    { imagePath: 'assets/alien1.gif', hitsToKill: 15, class: 'alien' },
    { imagePath: 'assets/alien2.gif', hitsToKill: 20, class: 'alien2' },
    { imagePath: 'assets/alien3.gif', hitsToKill: 30, class: 'alien3' },
];

const collisionSound = document.getElementById('collision-sound');
const deathSound = document.getElementById('death-sound');
const restartButton = document.getElementById('restartButton');
const nave = document.getElementById('nave');
const timerElement = document.getElementById('timer');

// Função para iniciar o cronômetro
function startTimer() {
    if (timerRunning || gameEnded) return; // Não reiniciar se o jogo acabou

    startTime = Date.now();
    timerRunning = true;

    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
        timerElement.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

// Função para criar um novo alien com base no índice atual
function criarAlien() {
    const alienData = aliens[currentAlienIndex];

    if (!alienData) {
        stopTimer(); // Para o cronômetro quando o último alien for derrotado
        gameEnded = true; // Define o jogo como finalizado
        restartButton.style.display = 'block'; // Mostra o botão de reiniciar
        nave.remove();
        return;
    }

    const alien = document.createElement('img');
    alien.src = alienData.imagePath; // Define a imagem do alien
    alien.alt = 'alien';
    alien.classList.add(alienData.class);
    document.body.appendChild(alien);

    hits = 0; // Reseta o contador de hits para o novo alien

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
            collisionSound.play();
            tiro.remove();
            clearInterval(tiro.checkCollision);

            // Verifica se o alien atingiu o limite de hits
            if (hits >= hitsToKill) {
                deathSound.play();
                alien.remove();
                currentAlienIndex += 1;
                criarAlien(); // Cria o próximo alien
            }
        }
    }

    // Disparar tiros quando o usuário clica
    document.addEventListener('click', criarTiro);

    function criarTiro() {
        if (gameEnded) return; // Não dispara tiros se o jogo acabou

        if (!timerRunning) {
            startTimer(); // Inicia o cronômetro ao disparar o primeiro tiro
        }

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
    if (gameEnded) return; // Impede movimentação após o fim do jogo
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
