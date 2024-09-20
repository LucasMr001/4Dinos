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
let velaux = 20;


function escutaTeclado(event){
    console.log(event.code)
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
        dino.style.animation = `jump-animation 1s ease-in-out`
        setTimeout(()=>{
            dino.style.animation = ''
        },800)
    }
}

function geraCactoAleat(){
    let num = Math.floor(Math.random() * 3) + 1;
    console.log(`cactus${num}.gif`)
    return `cactus${num}.gif`
}

function gerarCacto(screen, vel){
    let img = geraCactoAleat()
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    screen.appendChild(obstacle)

    let cacto = document.createElement('img')
    cacto.setAttribute('src', `./images/cactus/${img}`);
    obstacle.appendChild(cacto)

    if(obstacle.style.animation == ''){
        obstacle.style.animation = `obstacle-animation ${vel}ms linear infinite`
        setTimeout(()=>{
            obstacle.style.animation = ''
            obstacle.removeChild(cacto)
            gerarCacto(screen, vel);
        },vel)
    }
}

function chamarCactus(){
    gerarCacto(screen1, 4000)
    gerarCacto(screen2, 3000)
    gerarCacto(screen3, 2000)
    gerarCacto(screen4, 1000)
}

chamarCactus()


if(container.style.flexDirection == 'column'){
    /// responsivo para celulares
    screen1.addEventListener('click', ()=> {jump(dino1)})
    screen2.addEventListener('click', ()=> {jump(dino2)})
    screen3.addEventListener('click', ()=> {jump(dino3)})
    screen4.addEventListener('click', ()=> {jump(dino4)})
}

document.addEventListener('keydown', escutaTeclado)