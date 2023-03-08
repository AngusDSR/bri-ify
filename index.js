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
    .replace(/you(?=[ \.])/gi, "ya")
    // replace hey (not they, etc.) - start of string, line or sentence - with 'Oi!
    .replace(/th(?!e)/gi, "f")
    .replace(/my/gi, "me")
    .replace(/eaten/, "ate")
    .replace(/\'m not/, " ain't")
    .replace(/does not|doesn't/gi, "don't")
    .replace(/want to/gi, "wanna")
    .replace(/(?<=go )to/gi, "down")
    .replace(/really/gi, "well")
    .replace(/party/gi, "knees-up")
    .replace(/house|flat|apartment|place/gi, "gaff")
    .replace(/happy|pleased/gi, "chuffed")
    .replace(/tired|exhausted/gi, "knackered")
    .replace(/friend|pal|buddy/gi, "mate")
    .replace(/(ing)\b/gi, "in'")
    .replace(/food|dinner|lunch|supper|meal/gi, "nosh")
    .replace(/\b[h]/gi, "'")
    .replace(/(?<=[aeiou])t+(?![h'])/gi, "'")
    .replace(/a '/gi, "an '")
    .replace(/(?<!eh)\?/gi, ", eh?");
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
    runButton.style.display = 'flex';
    resetButton.style.display = 'flex';
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
