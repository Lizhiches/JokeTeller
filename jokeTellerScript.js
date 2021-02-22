                                        
const button= document.getElementById('button');
const audioElement= document.getElementById('audio');

// Disable/Enable Button 

function toggleButton() {

    button.disabled= !button.disabled; 

}
// Passing Joke to VoiceRSS API 

function tellMe(joke) {
    console.log('tell me:', joke);
    
    VoiceRSS.speech({
        key: '111d674c2c0c46ba881cb69bed3f20a5',
        src:joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
 }    

// Get Jokes from API

async function getJokes(){
    let joke= '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response  = await fetch(apiUrl);
        const data = await response.json(); 

        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;

        }
        else {
            joke= data.joke;
        }

        //text-to-speech
        tellMe(joke);
        //disabled Button 
        toggleButton();
    }
    catch (error) {
        console.log('woops', error);
    }
}

// Event listener 

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);


