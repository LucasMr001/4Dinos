const container = document.querySelector('.container');
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
let score = 0;
let vel = 3300;

function jump(dino){
    if(dino.style.animation == ''){
        dino.style.animation = `jump-animation 0.7s ease-in-out`
        setTimeout(()=>{
            dino.style.animation = ''
        },600)
    }
}


function geraIMGAleat(){
    let num = Math.floor(Math.random() * 3) + 1;
    return `cactus${num}.gif`
}


function gerarCacto(screen) {
    let img = geraIMGAleat();

    let newObstacle = document.createElement('div');
    newObstacle.setAttribute('class', 'obstacle');
    screen.appendChild(newObstacle);

    let cacto = document.createElement('img');
    cacto.setAttribute('src', `./images/cactus/${img}`);
    newObstacle.appendChild(cacto);

    Monitorar(newObstacle, 1, 1000)

    if (newObstacle.style.animation == '') {
        newObstacle.style.animation = `obstacle-animation ${vel}ms linear infinite`;
        setTimeout(() => {
            newObstacle.style.animation = '';
            screen.removeChild(newObstacle);
            Monitorar(newObstacle, 0)
        }, vel);
    }
}

function Monitorar(newObstacle, existe, interval) {
    if (existe == 1) {
        interval = setInterval(() => {
            console.log(dino1.style)
            console.log(dino1.style)
            console.log(dino1.style)
            console.log(dino1.style)
        }, 1000);
    } else if (existe == 0) {
        console.log('cacto passou')
        clearInterval(interval);
    }
    return interval;
}



function chamarCactus(screen){
    gerarCacto(screen);
    if(Math.random() < 0.5 && vel > 1000){
        setTimeout(()=>{
            gerarCacto(screen)
        },vel/2)
    }
    setTimeout(()=>{
        chamarCactus(screen)
    }, vel)
}

function pontos_vel(){
    score++;
    score1.innerText = score
    score2.innerText = score
    score3.innerText = score
    score4.innerText = score
    vel = Math.max(1000, vel - 2); // Impede que a velocidade fique abaixo de 1000
}

setInterval(pontos_vel, 100)

function escutaTeclado(event){
    if(event.key == 'q'){
        jump(dino1);
    }
    if(event.key == 'p'){
        jump(dino2);
    }
    if(event.key == 'x'){
        jump(dino3);
    }
    if(event.key == 'm'){
        jump(dino4);
    }
}

document.addEventListener('keypress', escutaTeclado)

chamarCactus(screen1)
chamarCactus(screen2)
chamarCactus(screen3)
chamarCactus(screen4)

Adaptativo_vertical()
function Adaptativo_vertical(){
    let flexDirection = window.getComputedStyle(container).flexDirection;
    if(flexDirection === 'column'){
        /// responsivo para celulares
        screen1.addEventListener('click', ()=> {jump(dino1)})
        screen2.addEventListener('click', ()=> {jump(dino2)})
        screen3.addEventListener('click', ()=> {jump(dino3)})
        screen4.addEventListener('click', ()=> {jump(dino4)})
    }

}