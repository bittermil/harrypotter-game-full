const userName = localStorage.getItem(`username`);
const greeting = document.querySelector(`#greeting`).innerHTML = "Поздравляю тебя, Войн " + userName + "! Ты добрался до следующего этапа.";

const timerTime = 5;
let amount = timerTime * 60;

const message = document.querySelector(`.message`);
const guess = document.querySelector(`input`);
let play = false;
let timerOn = false;
const namesList = ["Поттер", "Уизли", "Гермиона", "Дамблдор", "Вольдеморт", "Снегг", "Малфой", "Сириус", "Люпин", "Хагрид", "Беллатрикс", "Петтигрю", "Амбридж", "Макгонагалл", "Добби", "Невилл"];
let score = 0;
let incorrect = 0;

const btn = document.querySelector(`.btn`);
btn.addEventListener(`click`, start);

function calculateTime() {
    const rules = document.querySelector(`.rules`);
    rules.classList.add(`timer`);
    let minutes = Math.floor(amount / 60);
    let seconds = amount % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    rules.innerHTML = `${minutes} : ${seconds}`;
    amount--;

    console.log(amount);
    if (amount < 0 || namesList.length === 0) {
        stopTimer();
        amount = 0;
        endGame();
    }
}

function stopTimer() {
    clearInterval(timerID);
    timerOn = false;
}

let timerID = setInterval(1000);

function start() {

    if (!timerOn) {
        timerOn = true;
        timerID = setInterval(calculateTime, 1000);
        calculateTime();
    }

    if (!play) {
        play = true;
        btn.innerHTML = "Рискнуть";
        guess.classList.toggle(`hidden`);
        newWords = createNewWords();


        randWords = scrambleWords(newWords.split(``)).join(``);
        message.innerHTML = randWords;


    } else {
        check();
    }

}

function createNewWords() {
    let tempNameList = namesList[Math.floor(Math.random() * namesList.length)];
    console.log(tempNameList);
    return tempNameList;
}

function scrambleWords(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let temp = arr[i];
        let j = Math.floor(Math.random() * (i + 1));
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function check() {
    let attempt = guess.value;
    if (attempt === newWords) {
        play = false;

        let NewwordIndex = namesList.indexOf(newWords);
        namesList.splice(NewwordIndex, 1);
        console.log(namesList);

        message.innerHTML = ` Невероятно! Ты угадал! Это ${newWords}`;
        score++;
        incorrect == 0;
        console.log(score);
        btn.innerHTML = `Дальше?!`;
        guess.classList.toggle('hidden');
        guess.value = ``;
        incorrect = 0;
    } else {
        message.innerHTML = `Нет, это не этот герой. Попробуй ещё раз!` + `<br>` + `${randWords}`;
        incorrect++;
        guess.value = ``;
        if (incorrect == 3) {
            play = false;
            message.innerHTML = ` Хм.. Это слишком сложно? Я загадаю тебе нового героя.`;
            btn.innerHTML = `Дальше?!`;
            guess.classList.toggle('hidden');
            guess.value = ``;
            incorrect == 0;
        }
    }

}

function endGame() {
    message.innerHTML = "СТОП  ИГРА !!!! Твоё время истекло. Количество отгаданных героев: " + score + ". Твои знания просто поражают." + "<br>" + "Хочешь сыграть ещё? Нажми кнопку под этим сообщением.  Если горишь желанием узнать, что я еще приготовил для тебя - следуй за стрелой внизу...";
    localStorage.setItem(`score`, score);
    play = false;
    timerOn = false;
    guess.classList.add(`hidden`);
    btn.classList.add(`hidden`)

    score = 0;
    incorrect = 0;
    guess.value = ``;

    let btn2 = document.createElement('button');
    btn2.classList.add(`one`);
    btn2.innerHTML = `Сыграем ещё?`;
    document.querySelector(`.btn_btn`).appendChild(btn2);

    btn2.addEventListener(`click`, function () {
        window.location.reload()
    });

    document.querySelector(`.a_btn`).style.display = "block";
}


gsap.from(".a1", {
    x: -200,
    duration: 5,
    delay: 6,
    opacity: 0,
});
gsap.from(".a2", {
    x: 200,
    duration: 5,
    delay: 6,
    opacity: 0
});