const container = document.querySelector('.container');
const telas = document.querySelectorAll('.screen');
const screens = [
    document.getElementById('top-right'),
    document.getElementById('top-left'),
    document.getElementById('bottom-right'),
    document.getElementById('bottom-left')
];
const dinossauros = [
    document.getElementById('player1'),
    document.getElementById('player2'),
    document.getElementById('player3'),
    document.getElementById('player4')
];
const scores = [
    document.getElementById('s1'),
    document.getElementById('s2'),
    document.getElementById('s3'),
    document.getElementById('s4')
];

let estadosJogadores = ['jogando', 'jogando', 'jogando', 'jogando'];
let scoresAtual = [0, 0, 0, 0];
let vel = 3000;
let jumpSound = new Audio('./sounds/jump.m4a'); jumpSound.volume = 0.1;
let hitSound = new Audio('./sounds/hit.m4a'); hitSound.volume = 0.15;

function jump(dino) {
    if (dino.style.animation === '') {
        sounds('jump')
        dino.style.animation = `jump-animation 0.7s ease-in-out`;
        setTimeout(() => {
            dino.style.animation = '';
        }, 650);
    }
}
function sounds(params){
    if(params == 'jump'){
        jumpSound.currentTime = 0;
        jumpSound.play();
    } else if (params == 'hit'){
        hitSound.currentTime = 0;
        hitSound.play();
    }
}

function mutar(){
    console.log('mutou')
}

function geraIMGAleat() {
    let num = Math.floor(Math.random() * 3) + 1;
    return `cactus${num}.gif`;
}

function gerarCacto(screen, playerIndex){
    if(estadosJogadores[playerIndex] == 'jogando'){
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
    const dinoPosition = +window.getComputedStyle(dinossauros[playerIndex]).marginBottom.replace('px', '');
    let checavertical = parseInt(window.getComputedStyle(container).width)

        //// colisão em dispositivos mobile
        if (checavertical > '620' && marginLeftPercentual <= 14 && marginLeftPercentual >= 4 && dinoPosition <= 130) {
            clearInterval(intervaloColisao);
            pararAnimações(screen);
            estadosJogadores[playerIndex] = 'perdeu';
            sounds('hit')
        } else if(marginLeftPercentual <= 12 && marginLeftPercentual >= 6 && dinoPosition <= 90) {
            clearInterval(intervaloColisao);
            pararAnimações(screen);
            estadosJogadores[playerIndex] = 'perdeu';
            sounds('hit')
        }
    }, 100);
    if(estadosJogadores[playerIndex] == 'jogando'){
    newObstacle.style.animation = `obstacle-animation ${vel}ms linear infinite`;
    setTimeout(() => {
        if (estadosJogadores[playerIndex] === 'jogando') {
            newObstacle.style.animation = '';
            screen.removeChild(newObstacle);
        }
    }, vel);
    }
    }
}

function pararAnimações(screen) {
    const elementosComAnimacao = screen.querySelectorAll('.obstacle, .animations');
    elementosComAnimacao.forEach(elemento => {
        elemento.style.animationPlayState = 'paused';
    });
    screen.style.animationPlayState = 'paused';

    const gameOverTela = document.createElement('div');
    screen.appendChild(gameOverTela);
    gameOverTela.setAttribute('class', 'gameOverTela');
    gameOverTela.innerHTML = `Fim de Jogo! score: ${scores[screens.indexOf(screen)].innerHTML}`;
}

function chamarCactos(screen, playerIndex) {
        gerarCacto(screen, playerIndex);
        if (Math.random() < 0.5 && vel > 1000){
            setTimeout(() => {
                gerarCacto(screen, playerIndex);
            }, vel / 2);
        }
        setTimeout(() => {
            chamarCactos(screen, playerIndex);
        }, vel);
}

function pontos_vel() {
    for (let i = 0; i < estadosJogadores.length; i++) {
        if (estadosJogadores[i] === 'jogando') {
            scoresAtual[i]++;
            scores[i].innerText = scoresAtual[i];
        }
    }
    vel = Math.max(1000, vel - 2); // Impede que a velocidade fique abaixo de 1000
}

setInterval(pontos_vel, 100);

function escutaTeclado(event) {
    const keyMap = {
        'q': 0,
        'p': 1,
        'x': 2,
        'm': 3
    };

    const playerIndex = keyMap[event.key];
    if (playerIndex !== undefined && estadosJogadores[playerIndex] === 'jogando') {
        jump(dinossauros[playerIndex]);
    }
}

document.addEventListener('keypress', escutaTeclado);

Adaptativo_vertical();
// Ativa o touch para cada tela
function Adaptativo_vertical() {
    let flexDirection = window.getComputedStyle(container).flexDirection;
    if (flexDirection === 'column') {
        screens.forEach((screen, index) => {
            screen.addEventListener('touchstart', () => { if(estadosJogadores[index]=='jogando'){jump(dinossauros[index]) }});
        });
    }
}

// Inicia o jogo chamando cactos para cada jogador
screens.forEach((screen, index) => {
    chamarCactos(screen, index);
});