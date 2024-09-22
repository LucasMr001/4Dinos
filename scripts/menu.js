let buttons = document.querySelectorAll('button');
let isMuted = false;
let arrowdiv = document.createElement('div');
arrowdiv.classList.add('arrow');
let arrow = document.createElement('img');
arrow.setAttribute('src', '../images/menu/seta.gif');
arrowdiv.appendChild(arrow)

async function loadSound(url) {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener('canplaythrough', () => {
            resolve(audio);
        });
        audio.load();
    });
}

async function setupSounds() {
    jumpSound = await loadSound('../sounds/jump.m4a');
    jumpSound.volume = 0.1;

    hitSound = await loadSound('../sounds/hit.m4a');
    hitSound.volume = 0.15;
}

setupSounds().then(() => {
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            jumpSound.currentTime = 0;
            jumpSound.play();
            button.appendChild(arrowdiv)
        });
    });
});

function mutar(){
    isMuted = !isMuted;
    jumpSound.muted = isMuted;
    hitSound.muted = isMuted;
}