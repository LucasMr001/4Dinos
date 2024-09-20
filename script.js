const container = document.querySelector('.container');
const telas = document.querySelectorAll('.screen')
const screen1 = document.getElementById('top-right');
const screen2 = document.getElementById('top-left');
const screen3 = document.getElementById('bottom-right');
const screen4 = document.getElementById('bottom-left');
const obstacle = document.querySelector('.obstacle');
const dino1 = document.getElementById('player1');
const dino2 = document.getElementById('player2');
const dino3 = document.getElementById('player3');
const dino4 = document.getElementById('player4');
const score1 = document.getElementById('s1');
const score2 = document.getElementById('s2');
const score3 = document.getElementById('s3');
const score4 = document.getElementById('s4');
let player1 = 'jogando'
let score = 0;
let vel = 3300;

function jump(dino) {
    if (dino.style.animation === '') {
        dino.style.animation = `jump-animation 0.7s ease-in-out`;
        setTimeout(() => {
            dino.style.animation = '';
        }, 650);
    }
}

function geraIMGAleat() {
    let num = Math.floor(Math.random() * 3) + 1;
    return `cactus${num}.gif`;
}

function gerarCacto(screen) {
    let img = geraIMGAleat();
    let newObstacle = document.createElement('div');
    newObstacle.setAttribute('class', 'obstacle');
    screen.appendChild(newObstacle);

    let cacto = document.createElement('img');
    cacto.setAttribute('src', `./images/cactus/${img}`);
    newObstacle.appendChild(cacto);

    // Verifica colisão
    const intervaloColisao = setInterval(() => {
        const estilo = getComputedStyle(newObstacle);
        const marginLeftPixels = parseFloat(estilo.marginLeft);
        const larguraPaiPixels = screen.clientWidth;
        const marginLeftPercentual = (marginLeftPixels / larguraPaiPixels) * 100;
        const dino1Position = +window.getComputedStyle(dino1).marginBottom.replace('px', '');

        if (marginLeftPercentual <= 14 && marginLeftPercentual >= 6 && dino1Position <= 130) {
            clearInterval(intervaloColisao);
            pararAnimações(); // Chama a função para parar animações
            player1 = 'perdeu'
        }
    }, 100);

    newObstacle.style.animation = `obstacle-animation ${vel}ms linear infinite`;
    setTimeout(() => {
        if(player1=='jogando'){
        newObstacle.style.animation = '';
        screen.removeChild(newObstacle);}
    }, vel);
}

function pararAnimações() {
    const elementosComAnimacao = document.querySelectorAll('.obstacle, .animations');
    elementosComAnimacao.forEach(elemento => {
        elemento.style.animationPlayState = 'paused';
    });

    const gameOverTela = document.createElement('div');

    screen1.appendChild(gameOverTela);
    gameOverTela.setAttribute('class', 'gameOverTela');
    gameOverTela.innerHTML = `Fim de Jogo! score: ${score1.innerHTML}</small>`;
}

chamarCactus(screen1);

function chamarCactus(screen) {
    if(player1 == 'jogando'){
    gerarCacto(screen);
    if (Math.random() < 0.5 && vel > 1000) {
        setTimeout(() => {
            gerarCacto(screen);
        }, vel / 2);
    }
    setTimeout(() => {
        chamarCactus(screen);
    }, vel);}
}

function pontos_vel() {
    score++;
    if(player1=='jogando'){
        score1.innerText = score;
    }
    score2.innerText = score;
    score3.innerText = score;
    score4.innerText = score;
    vel = Math.max(1000, vel - 2); // Impede que a velocidade fique abaixo de 1000
}

setInterval(pontos_vel, 100);

function escutaTeclado(event) {
    if (event.key === 'q' && player1 == 'jogando') {
        jump(dino1);
    }
    if (event.key === 'p') {
        jump(dino2);
    }
    if (event.key === 'x') {
        jump(dino3);
    }
    if (event.key === 'm') {
        jump(dino4);
    }
}

document.addEventListener('keypress', escutaTeclado);

Adaptativo_vertical();

function Adaptativo_vertical() {
    let flexDirection = window.getComputedStyle(container).flexDirection;
    if (flexDirection === 'column') {
        screen1.addEventListener('touchstart', () => { jump(dino1) });
        screen2.addEventListener('touchstart', () => { jump(dino2) });
        screen3.addEventListener('touchstart', () => { jump(dino3) });
        screen4.addEventListener('touchstart', () => { jump(dino4) });
    }
}
