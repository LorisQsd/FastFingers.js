const APIEndpoint = "http://api.quotable.io/random";
const generateSentence = document.querySelector("#sentence-generator");
const textarea = document.querySelector("textarea");
let spansFromAPISentence;

window.addEventListener("load", sentenceAPICall)

async function sentenceAPICall() {
    try {
        const response = await fetch(`http://api.quotable.io/random`)

        if (!response.ok) {
            throw new Error(`${response.status}`)
        }

        const data = await response.json();

        for (let i = 0; i < data.content.length; i++) {
            const span = document.createElement("span")
            span.textContent = data.content[i]
            generateSentence.appendChild(span)
        }
        spansFromAPISentence = generateSentence.querySelectorAll("span")

        textarea.value = "";
    } catch (error) {
        generateSentence.textContent = `${error}`
    }
}

const score = document.querySelector("#score");
const timer = document.querySelector("#time");

//LISTEN BACKSPACE & ESCAPE
document.addEventListener("keydown", handleStart)
let i = 0;
let s = 0;
let time = 60;
let intervalId;

function handleStart(event) {

    const letters = [...generateSentence.querySelectorAll("span")]
    if (event.key === "Escape" || event.Code === 27) {
        time = 60;
        s = 0;
        i = 0;
        textarea.value = "";
        score.textContent = s;
        timer.textContent = time;
        checkInputValue();
    }

    if (i != 0 && event.key === 'Backspace') {
        if (textarea.value[i] !== generateSentence.textContent[i]) {
            s--;
            score.textContent = s;
            i -= 2;
            letters[i + 1].style.backgroundColor = "transparent";
        }

        if (i < 0) { i = 0; }
    }

    //CHECK INPUT VALUE
    function checkInputValue() {

        //TIMER
        intervalId = setInterval(startTimer, 1000)

        function startTimer() {
            time--
            timer.textContent = time;

            if (time === 0) { clearInterval(intervalId) };
        }

        textarea.addEventListener("input", checkInput);

        function checkInput(event) {
            if (textarea.value === generateSentence.textContent) {
                textarea.value = "";
                generateSentence.textContent = "";
                sentenceAPICall();
            } else if (textarea.value[i] === generateSentence.textContent[i]) {
                letters[i].style.backgroundColor = "green";
                i++;
                s++;
                score.textContent = s;

            } else {
                letters[i].style.backgroundColor = "crimson";
                i++;

            }

        }

    }
}