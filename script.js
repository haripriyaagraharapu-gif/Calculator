const display = document.getElementById("display");
const historyDiv = document.getElementById("history");

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {

    try {

        const expression = display.value;
        const result = eval(expression);

        historyDiv.innerHTML += `<p>${expression} = ${result}</p>`;

        localStorage.setItem(
            "calcHistory",
            historyDiv.innerHTML
        );

        display.value = result;

    }

    catch {
        display.value = "Error";
    }
}

window.onload = () => {

    const savedHistory =
        localStorage.getItem("calcHistory");

    if (savedHistory) {
        historyDiv.innerHTML = savedHistory;
    }
}

document
    .getElementById("theme-btn")
    .onclick = () => {

        document.body.classList.toggle("light");
    }

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (
        (key >= '0' && key <= '9') ||
        key === '+' ||
        key === '-' ||
        key === '*' ||
        key === '/' ||
        key === '.'
    ) {
        append(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});

/* Voice Input */


const voiceBtn = document.getElementById("voice-btn");

if ('webkitSpeechRecognition' in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {

        let speech =
            event.results[0][0].transcript.toLowerCase();

        speech = speech
            .replace(/plus/g, '+')
            .replace(/minus/g, '-')
            .replace(/times/g, '*')
            .replace(/multiply by/g, '*')
            .replace(/multiplied by/g, '*')
            .replace(/divide by/g, '/')
            .replace(/divided by/g, '/')
            .replace(/point/g, '.')
            .replace(/ /g, '');

        display.value = speech;
    };

    recognition.onerror = () => {
        alert("Voice recognition failed");
    };

    voiceBtn.onclick = () => {
        recognition.start();
    };

} else {

    voiceBtn.disabled = true;
}