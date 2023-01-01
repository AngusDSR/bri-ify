const inputField = document.getElementById('text-input');
const runButton = document.querySelector('.button#run');
const resetButton = document.querySelector('.button#reset');
const speakButton = document.getElementById("speakButton");
let originalText = "";

// turn on live tranlate based on key strokes
inputField.addEventListener('keyup', (e) => {
  if (e.code == "Space" || e.code == "Enter") {
    originalText = inputField.value;
    let newText = originalText
    .replace(/isn't|is not|am not|are not|aren't|have not|haven't|hasn't|has not/gi, "ain't")
    .replace(/you(?=[ \.])/gi, "ya")
    .replace(/th/gi, "f")
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
    .replace(/a '/gi, "an '");
    newText[0]
    inputField.value = newText;
  }
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
