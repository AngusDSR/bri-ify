const inputField = document.getElementById('text-input');
const runButton = document.getElementById('run');
const resetButton = document.getElementById('reset');
const speakButton = document.getElementById("speakButton");
const liveToggle = document.getElementById("toggle-live");
const liveTranslateLabel = document.getElementById("live-translate");

let originalText = "";

const translate = function(e) {
  originalText = inputField.value;
  if (e.code == "Space" || e.code == "Enter" || e.type == "click") {
    let newText = originalText
    .replace(/isn't|is not|am not|are not|aren't|have not|haven't|hasn't|has not/gi, "ain't")
    .replace(/Hey/, "Oi")
    .replace(/eaten/, "ate")
    .replace(/does not|doesn't/gi, "don't")
    .replace(/really/gi, "well")
    .replace(/party/gi, "knees-up")
    .replace(/house|flat|apartment|place/gi, "gaff")
    .replace(/happy|pleased/gi, "chuffed")
    .replace(/disappointed/gi, "gutted")
    .replace(/tired|exhausted/gi, "knackered")
    .replace(/friend|pal|buddy/gi, "mate")
    .replace(/food|dinner|lunch|supper|meal/gi, "nosh")
    .replace(/mom|mother/gi, "mum")
    .replace(/man|guy|dude/gi, "bloke")
    .replace(/womman|lady|chic/gi, "bird")
    .replace(/boy/gi, "lad")
    .replace(/silly|dumb|stupid|mad/gi, "daft")
    .replace(/cup of tea/gi, "cuppa")
    .replace(/potato chip/gi, "crisp")
    .replace(/thank you/gi, "cheers")
    .replace(/toilet|bathroom|restroom/gi, "loo")
    .replace(/cigarette/gi, "fag")
    .replace(/cookie/gi, "biscuit")
    .replace(/dessert/gi, "pudding")
    .replace(/going to/gi, "gonna")
    .replace(/want to/gi, "wanna")
    .replace(/thanks/gi, "ta")
    .replace(/those/gi, "them")
    .replace(/were/gi, "was")
    .replace(/you(?=[ \.])/gi, "ya")
    .replace(/(?<=\w)th(?=\w)/gi, "f")
    .replace(/my/gi, "me")
    .replace(/\'m not/, " ain't")
    .replace(/have to|have got to|got to/gi, "gotta")
    .replace(/(?<=go )to/gi, "down")
    .replace(/(ing)\b/gi, "in'")
    .replace(/\b[h]/gi, "'")
    .replace(/(?<=[aeiou])t+(?![h'])/gi, "'")
    .replace(/a '/gi, "an '");
    newText[0]
    inputField.value = newText;
  }
}

resetButton.addEventListener('click', () => {
  inputField.value = originalText
})

runButton.addEventListener('click', translate);

liveToggle.addEventListener('click', (e) => {
  if (liveToggle.checked) {
    inputField.addEventListener('keyup', translate);
    runButton.style.display = 'none';
    resetButton.style.display = 'none';
  } else {
    inputField.removeEventListener('keyup', translate);
    runButton.style.display = '';
    resetButton.style.display = '';
  };
});

speakButton.addEventListener("click", () => {
  if ('speechSynthesis' in window) {
    const text = inputField.value;

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(voice => voice.name === "Google UK English Male");
        // const voice = voices.find(voice => voice.name === "Google español");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        speechSynthesis.speak(utterance);
      });
    } else {
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(voice => voice.name === "Google UK English Male");
      // const voice = voices.find(voice => voice.name === "Google español");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;

      speechSynthesis.speak(utterance);
    }
  }
});
