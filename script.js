const container = document.querySelector('.container');
const screen1 = document.getElementById('top-right');
const screen2 = document.getElementById('top-left');
const screen3 = document.getElementById('bottom-right');
const screen4 = document.getElementById('bottom-left');
const dino1 = document.getElementById('player1');
const dino2 = document.getElementById('player2');
const dino3 = document.getElementById('player3');
const dino4 = document.getElementById('player4');


function escutaTeclado(event){
    let tecla = event.code;
    if(tecla == 'KeyQ'){
        jump(dino1);
    }
    if(tecla == 'KeyW'){
        jump(dino2);
    }
    if(tecla == 'KeyE'){
        jump(dino3);
    }
    if(tecla == 'KeyR'){
        jump(dino4);
    }
}


function jump(dino){
    if(dino.style.animation == ''){
        dino.style.animation = `jump-animation 1s ease-in-out`
        setTimeout(()=>{
            dino.style.animation = ''
        },900)
    }
}





if(container.stye.flexDirection == 'column'){
    /// responsivo para celulares
    screen1.addEventListener('click', ()=> {jump(dino1)})
    screen2.addEventListener('click', ()=> {jump(dino2)})
    screen3.addEventListener('click', ()=> {jump(dino3)})
    screen4.addEventListener('click', ()=> {jump(dino4)})
}

document.addEventListener('keydown', escutaTeclado)