

const message = document.querySelector(`.message`);
const input = document.querySelector(`#input`);
input.addEventListener(`change`, instruction);


function instruction(){
    const userName = input.value;
    localStorage.setItem('username', userName);
    input.value =``;
    input.style.display ="none";
    message.innerHTML = `Приветствую, тебя, ${userName}! <br> Тебе предстоит пройти безумно сложный Путь Война. Сначала я буду отгадывать героя, которого задумаешь ты. Потом проходить испытание будешь уже ты. Если все трудности и невзгоды не сломают тебя, в конце ты получишь самое ценное - моё предсказание о твоей судьбе. Вперед!
    `;
    document.querySelector(`.a_btn`).style.display ="block";
    document.querySelector(`.pictures_2`).style.display ="block";
    document.querySelector(`.pictures`).style.display ="none";

    gsap.from(".mini2", {y:-200, duration:3, delay:1, opacity:0 });

}

gsap.from(".mini", {stagger:.8, duration:8, delay:1, opacity:0 });

