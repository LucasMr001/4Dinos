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
let vel = 3500;


function escutaTeclado(event){
    let tecla = event.code;
    if(tecla == 'KeyQ'){
        jump(dino1);
    }
    if(tecla == 'KeyP'){
        jump(dino2);
    }
    if(tecla == 'KeyX'){
        jump(dino3);
    }
    if(tecla == 'KeyM'){
        jump(dino4);
    }
}


function jump(dino){
    if(dino.style.animation == ''){
        dino.style.animation = jump-animation 0.7s ease-in-out
        setTimeout(()=>{
            dino.style.animation = ''
        },700)
    }
}

function geraIMGAleat(){
    let num = Math.floor(Math.random() * 3) + 1;
    return cactus${num}.gif
}

function gerarCacto(screen){
    let img = geraIMGAleat();
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    screen.appendChild(obstacle)

    let cacto = document.createElement('img')
    cacto.setAttribute('src', ./images/cactus/${img});
    obstacle.appendChild(cacto)

    if(obstacle.style.animation == ''){
        obstacle.style.animation = obstacle-animation ${vel}ms linear infinite;
        setTimeout(()=>{
            obstacle.style.animation = ''
            screen.removeChild(obstacle)
        },vel)
    }
}
function Booleano(){
    return Math.random() < 0.5;
}

function chamarCactus(){
    if(vel > 1000){gerarCacto(screen1)}
    if(Booleano()){
        setTimeout(()=>{
            gerarCacto(screen1)
        },vel/2)
    }
    if(vel > 1000){gerarCacto(screen2)}
    if(Booleano()){
        setTimeout(()=>{
            gerarCacto(screen2)
        },vel/2)
    }
    if(vel > 1000){gerarCacto(screen3)}
    if(Booleano()){
        setTimeout(()=>{
            gerarCacto(screen3)
        },vel/2)
    }
    if(vel > 1000){gerarCacto(screen4)}
    if(Booleano()){
        setTimeout(()=>{
            gerarCacto(screen4)
        },vel/2)
    }
    setTimeout(()=>{
        chamarCactus()
    }, vel)
}

setInterval(() => {
    ///aumenta a velocidade com o tempo
    vel-=100;
}, 2000);

setInterval(() => {
    score++;
    score1.innerText = score;
    score2.innerText = score;
    score3.innerText = score;
    score4.innerText = score;
},100);

function Adaptativo(){
    let flexDirection = window.getComputedStyle(container).flexDirection;
    if(flexDirection === 'column'){
        /// responsivo para celulares
        screen1.addEventListener('click', ()=> {jump(dino1)})
        screen2.addEventListener('click', ()=> {jump(dino2)})
        screen3.addEventListener('click', ()=> {jump(dino3)})
        screen4.addEventListener('click', ()=> {jump(dino4)})
    }

}

document.addEventListener('keydown', escutaTeclado)
chamarCactus()
Adaptativo()
