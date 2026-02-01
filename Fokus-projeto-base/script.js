// eventos de mudança de cor

const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
//Eventos de mudança de imagem
const banner = document.querySelector('.app__image')
//Evento mudança de Título
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
//Evento de música
const musicaFocoInput = document.getElementById('alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const pauseBt = new Audio('./sons/pause.mp3')
const playBt = new Audio('./sons/play.wav')
const beepBt = new Audio('./sons/beep.mp3')
musica.loop = true;

//valor do temporizador
let tempoDecorridoEmSegundos = 1500
const startPauseBtn = document.getElementById('start-pause')
let intervaloId = null
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon')

//Print tempo na tela
const tempoNatela = document.getElementById('timer')

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
        musica.currentTime = 0;
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    monstrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                break; 
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                break;
        default:
            break;
    }
}

const contagemRegresiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        beepBt.play()
        return
    }
    tempoDecorridoEmSegundos -= 1
    monstrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)
    


function iniciarOuPausar(){
    if(intervaloId){
        pauseBt.play()
        zerar()
        return
    }
    playBt.play()
    intervaloId = setInterval(contagemRegresiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarImg.setAttribute('src', `./imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    iniciarOuPausarImg.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function monstrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNatela.innerHTML = `${tempoFormatado}`
}

monstrarTempo()