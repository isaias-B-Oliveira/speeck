
const button = document.querySelector('button');
const text = document.querySelector('.text');

const recognition = CreaterRecognition();
let Ouvindo = false;

button.addEventListener('click', e => {
    if(!recognition) return;

    Ouvindo ? recognition.stop() : recognition.start()
    button.innerHTML = Ouvindo ? 'Aperte para falar' : 'parar de escutar'
    button.classList.toggle('bg-purple-200')
    button.classList.toggle('text-red-500')
});

function CreaterRecognition () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null;

    if(!recognition){
        text.innerHTML = "speech recognition is no found"
        return  null
    }

    recognition.lang = 'pt-BR';

    recognition.onstart = () => Ouvindo = true
    recognition.onend = () =>  Ouvindo = false
    
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript
    return recognition
};