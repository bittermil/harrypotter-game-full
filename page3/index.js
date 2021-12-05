const apiKeyGiphy = 'iujMH9NwfgyVbEVfsKcDnWpqV6vPQqVP';
class Character {
    constructor(gender, name, species, house, ancestry, hogwartsStaff, hogwartsStudent, actor, hairColor, eyeColor, patronus, wizard) {
        this.gender = gender;
        this.name = name;
        this.species = species;
        this.house = house;
        this.ancestry = ancestry;
        this.hogwartsStaff = hogwartsStaff;
        this.hogwartsStudent = hogwartsStudent;
        this.actor = actor;
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.patronus = patronus;
        this.wizard = wizard;
    }

    //функция, которая рендерит всю информацию, собранную про героя. Выводятся только не пустые поля
    renderCharacter() {
        let gameResult = document.querySelector('.game-result');
        gameResult.style.display = 'block';

        let actorDiv = document.createElement('div');
        actorDiv.classList.add('character__actor');
        actorDiv.innerText = `This character is played by ${this.actor}`;

        let wizardDiv = document.createElement('div');
        wizardDiv.classList.add('character__wizard');
        wizardDiv.innerText = `This character is a wizard`;
        if (!this.wizard) {
            wizardDiv.innerText = `This character isn't a wizard`;
        }

        let speciesDiv = document.createElement('div');
        speciesDiv.classList.add('character__species');
        if (this.species) {
            speciesDiv.innerText = `This character is a ${this.species}`;
        }

        let houseDiv = document.createElement('div');
        houseDiv.classList.add('character__house');
        if (this.house) {
            houseDiv.innerText = `House: ${this.house}`;
        }

        let ancestryDiv = document.createElement('div');
        ancestryDiv.classList.add('character__ancestry');
        if (this.ancestry) {
            ancestryDiv.innerText = `Ancestry: ${this.ancestry}`;
        }

        let statusDiv = document.createElement('div');
        statusDiv.classList.add('character__status');
        if (this.hogwartsStudent) {
            statusDiv.innerText = `Status: Hogwarts student`;
        }
        if (this.hogwartsStaff) {
            statusDiv.innerText = `Status: Hogwarts teacher`;
        }

        let hairColorDiv = document.createElement('div');
        hairColorDiv.classList.add('character__hair-color');
        if (this.hairColor) {
            hairColorDiv.innerText = `Hair color: ${this.hairColor}`;
        }

        let eyeColorDiv = document.createElement('div');
        eyeColorDiv.classList.add('character__eye-color');
        if (this.eyeColor) {
            eyeColorDiv.innerText = `Eye color: ${this.eyeColor}`;
        }

        let patronusDiv = document.createElement('div');
        patronusDiv.classList.add('character__patronus');
        if (this.patronus) {
            patronusDiv.innerText = `Patronus: ${this.patronus}`;
        }

        gameResult.append(actorDiv, wizardDiv, speciesDiv, houseDiv, ancestryDiv, statusDiv, hairColorDiv, eyeColorDiv, patronusDiv);
    }
}

//вывести имя из локального хранилища
function getName() {
    let username = '';
    if (localStorage.getItem('username')) username = localStorage.getItem('username');

    let nameDiv = document.querySelector('.name');
    nameDiv.innerText = username + '!';
}

async function guessCharacter() {
    try {
        const response = await fetch(`https://hp-api.herokuapp.com/api/characters`)
        const characters = await response.json();

        console.log(characters);

        // в оригинальном API больше 250 героев, для большей части которых не заполнены поля. Пользователь не угадал бы их, поэтому 
        // я собрала 50 самых популярных. В игре участвую только они.
        const popularCharacters = characters.filter(function (character) {
            return character.name === 'Harry Potter' ||
                character.name === 'Ron Weasley' ||
                character.name === 'Hermione Granger' ||
                character.name === 'Albus Dumbledore' ||
                character.name === 'Fred Weasley' ||
                character.name === 'George Weasley' ||
                character.name === 'Ginny Weasley' ||
                character.name === 'Lord Voldemort' ||
                character.name === 'Severus Snape' ||
                character.name === 'Draco Malfoy' ||
                character.name === 'Rubeus Hagrid' ||
                character.name === 'Molly Weasley' ||
                character.name === 'Sirius Black' ||
                character.name === 'Arthur Weasley' ||
                character.name === 'Remus Lupin' ||
                character.name === 'Minerva McGonagall' ||
                character.name === 'James Potter' ||
                character.name === 'Neville Longbottom' ||
                character.name === 'Lucius Malfoy' ||
                character.name === 'Percy Weasley' ||
                character.name === 'Bill Weasley' ||
                character.name === 'Bellatrix Lestrange' ||
                character.name === 'Luna Lovegood' ||
                character.name === 'Dobby' ||
                character.name === 'Alastor Moody' ||
                character.name === 'Dolores Umbridge' ||
                character.name === 'Peter Pettigrew' ||
                character.name === 'Dean Thomas' ||
                character.name === 'Dudley Dursley' ||
                character.name === 'Vernon Dursley' ||
                character.name === 'Seamus Finnegan' ||
                character.name === 'Petunia Dursley' ||
                character.name === 'Cedric Diggory' ||
                character.name === 'Gregory Goyle' ||
                character.name === 'Fleur Delacour' ||
                character.name === 'Cho Chang' ||
                character.name === 'Nymphadora Tonks' ||
                character.name === 'Cornelius Fudge' ||
                character.name === 'Victor Krum' ||
                character.name === 'Vincent Crabbe' ||
                character.name === 'Hedwig' ||
                character.name === 'Gilderoy Lockhart' ||
                character.name === 'Barty Crouch' ||
                character.name === 'Horace Slughorn' ||
                character.name === 'Oliver Wood' ||
                character.name === 'Argus Filch' ||
                character.name === 'Sybill Trelawney' ||
                character.name === 'Kreecher' ||
                character.name === 'Rita Skeeter' ||
                character.name === 'Ludo Bagman'
        });

        console.log(popularCharacters);

        const propertiesSets = getAllProperties(popularCharacters);
        playGame(propertiesSets, popularCharacters);

    } catch (error) {
        alert(`Something went wrong! ${error.message}`);
        console.log(error.name);
        console.log(error.message);
    }
}

// получаем все свойства героя, мы будем использовать их для отгадывания
function getAllProperties(characters) {
    const propertiesSets = [];

    // используем set чтобы они не повторялись, добавляем название свойства, чтоб можно было его искать
    // (уже поздно поняла, что это необязательно...)
    let genderSet = new Set(['gender']);
    let speciesSet = new Set(['species']);
    let houseSet = new Set(['house']);
    let ancestrySet = new Set(['ancestry']);
    let hogwartsStaffSet = new Set(['hogwartsStaff']);
    let hogwartsStudentSet = new Set(['hogwartsStudent']);
    let actorSet = new Set(['actor']);
    let hairColorSet = new Set(['hairColour']);
    let eyeColorSet = new Set(['eyeColour']);
    let patronusSet = new Set(['patronus']);
    let wizardSet = new Set(['wizard']);

    characters.forEach(character => {
        genderSet.add(character.gender);
        speciesSet.add(character.species);
        houseSet.add(character.house);
        ancestrySet.add(character.ancestry);
        hogwartsStaffSet.add(character.hogwartsStaff);
        hogwartsStudentSet.add(character.hogwartsStudent);
        actorSet.add(character.actor);
        hairColorSet.add(character.hairColour);
        eyeColorSet.add(character.eyeColour);
        patronusSet.add(character.patronus);
        wizardSet.add(character.wizard);
    });

    propertiesSets.push(genderSet, speciesSet, houseSet, ancestrySet, hogwartsStaffSet, hogwartsStudentSet, actorSet, hairColorSet, eyeColorSet, patronusSet, wizardSet);

    // фильтруем свойства, чтобы сверху вывести простые, где 2 варианта: пол, да/нет
    propertiesSets.sort(function (a, b) {
        return a.size - b.size
    });

    return propertiesSets;
}

// получаем самые популярные значения для свойств, чтобы спросить пользователя сначала про них
function getMostPopularValue(characters, property) {
    let count = 0;
    let obj = {};
    let val;
    characters.forEach(character => {
        val = character[`${property}`];
        if (!val.length) return;
        if (val.length) count++;

        obj[`${val}`] = count;
    });

    let keys = Object.keys(obj);

    keys.sort(function (a, b) {
        return obj[b] - obj[a]
    });

    // берем самое популярное
    let mostPopular = keys[0];
    return mostPopular;
}

// прописываем вопросы под каждое свойство, часть вопрос потом дополнится соотв. value 
function askQuestion(topic) {
    let question = document.querySelector('.question').innerText;
    switch (topic) {
        case 'gender':
            question = 'Is this character a male?';
            break;
        case 'hogwartsStaff':
            question = 'This character hasn\'t ever been a Hogwarts professor?';
            break;
        case 'hogwartsStudent':
            question = 'This character is a Hogwarts student?';
            break;
        case 'wizard':
            question = 'Is this character a wizard?';
            break;
        case 'ancestry':
            question = 'Is this character\'s ancestry a ';
            break;
        case 'house':
            question = 'Is this character in house ';
            break;
        case 'hairColour':
            question = 'Is this character\'s hair ';
            break;
        case 'eyeColour':
            question = 'Are this character\'s eyes ';
            break;
        case 'species':
            question = 'Is this character\'s species a ';
            break;
        case 'patronus':
            question = 'Is this character\'s patronus a ';
            break;
        case 'actor':
            question = 'Is this character played by ';
            break;
    }

    return question;
}

// алгоритм героя
function playGame(array, characters) {
    // кажется копирования массивов можно было избежать
    const propertiesSets = [...array];
    characters = [...characters];

    // создаем прототип героя
    let guessedCharacter = new Character();

    const questionDiv = document.querySelector('.question');
    let buttons = document.querySelectorAll('.game-button');

    // счетчик для вопросов
    let counter = 0;

    // флаг для перехода в режим угадывания по актеру и счетчик
    let chooseByActor;
    let actorCount = 0;

    // кажется, это можно было проще сделать через set get
    let vals = propertiesSets[0].values();
    let propName = vals.next().value;

    // задаем самый первый вопрос
    let question = askQuestion(propName);
    questionDiv.innerText = question;

    // теперь по клику на кнопку будем отслеживать ответы
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // готовим данные для след. вопроса, тут точно можно было проще
            let propNameNext = propertiesSets[counter].values().next().value;
            if (propertiesSets[counter + 1]) propNameNext = propertiesSets[counter + 1].values().next().value;
            let questionNext = askQuestion(propNameNext);

            vals = propertiesSets[counter].values();
            propName = vals.next().value;
            let valOne = vals.next().value;
            let valTwo = vals.next().value;

            // сюда будем класть отфильтрованных героев
            let charactersFiltered = [];
            let answer;

            // логика для простых вопросов да/нет м/ж
            if (propertiesSets[counter].size === 3) {
                answer = button.dataset.name;

                if (answer === 'y') {
                    // если да, берем первый ответ
                    charactersFiltered = characters.filter(character => character[`${propName}`] === valOne);

                    characters.length = 0;
                    characters = [...charactersFiltered];

                    // ответ да и герои закончились: мы не смогли угадать
                    if (characters.length === 0) {
                        questionDiv.innerText = 'Looks like I cannot read your mind...';
                        onGameOver();
                        return;
                    }
                };

                if (answer === 'n') {
                    // если нет, берем второй ответ
                    charactersFiltered = characters.filter(character => character[`${propName}`] === valTwo);

                    characters.length = 0;
                    characters = [...charactersFiltered];

                    // если ответ нет, а герои закончились, то мы не смогли найти такого героя
                    if (characters.length === 0) {
                        questionDiv.innerText = 'Looks like I cannot read your mind...';
                        onGameOver();
                        return;
                    }
                };

                // на шаге 3 переходим на другую логику задавания вопроса (тут проверяется value)
                if (counter === 3) {
                    let questionSubj = getMostPopularValue(characters, propNameNext);
                    questionNext = questionNext + questionSubj + '?';

                    // но если дальше остались только актеры (это может произойти, если оставшихся вариантов 3), значит, мы уже на последнем шаге
                    if (propNameNext === 'actor') {
                        let name = characters.find(character => character.actor === questionSubj).name;
                        loadGif(characters[name], 0);
                    }
                }

                questionDiv.innerText = questionNext;
            }

            // логика для ответов с value (берем самое популярное значение, спрашиваем о нем. Была идея удалять его, если ответ "нет", но не стала)
            if (counter > 3) {
                answer = button.dataset.name;
                compareSubj = getMostPopularValue(characters, propName);

                // логика для режима "угадай по актеру"
                if (chooseByActor === 'on') {
                    compareSubj = characters[actorCount].actor;
                    propName = 'actor';
                    if (characters[actorCount]) actorCount++;
                }

                // если ответ да, оставляем всех героев с таким свойством
                if (answer === 'y') {
                    charactersFiltered = characters.filter(character => character[`${propName}`] === compareSubj);

                    characters.length = 0;
                    characters = [...charactersFiltered];

                    // ответ да и герои закончились: мы не смогли угадать
                    if (characters.length === 0) {
                        questionDiv.innerText = 'Looks like I cannot read your mind...';
                        onGameOver();
                        return;
                    }

                    guessedCharacter[`${propName}`] = compareSubj;

                    // если компьютер угадал актера, значит в массиве героев точно один вариант, ура, мы угадали
                    if (guessedCharacter.actor != undefined) {
                        let guessedCharacterName = characters[0].name;
                        guessedCharacter.name = guessedCharacterName;

                        questionDiv.innerText = 'I see ' + guessedCharacterName + ' is on your mind. And this is what we\'ve learned: ';
                        loadGif(guessedCharacter.name, 1);

                        localStorage.setItem('Вы загадали', guessedCharacterName);
                        //заканчиваем игру, выводим данные
                        onGameOver();

                        guessedCharacter.gender = characters[0].gender;
                        guessedCharacter.species = characters[0].species;
                        guessedCharacter.house = characters[0].house;
                        guessedCharacter.ancestry = characters[0].ancestry;
                        guessedCharacter.hogwartsStaff = characters[0].hogwartsStaff;
                        guessedCharacter.hogwartsStudent = characters[0].hogwartsStudent;
                        guessedCharacter.actor = characters[0].actor;
                        guessedCharacter.hairColor = characters[0].hairColour;
                        guessedCharacter.eyeColor = characters[0].eyeColour;
                        guessedCharacter.patronus = characters[0].patronus;
                        guessedCharacter.wizard = characters[0].wizard;

                        guessedCharacter.renderCharacter();
                        return;
                    };
                };

                // если нет, оставляем все героев без этого свойства
                if (answer === 'n') {
                    charactersFiltered = characters.filter(character => character[`${propName}`] != compareSubj);
                    characters.length = 0;
                    characters = [...charactersFiltered];

                    actorCount = 0;

                    // ответ нет и герои закончились: мы не смогли угадать
                    if (characters.length === 0) {
                        questionDiv.innerText = 'Looks like I cannot read your mind...';
                        onGameOver();
                        return;
                    }
                };

                // пользователь несколько раз ответил не знаю, варианты закончились
                if (answer === 'na') {
                    if (!characters[actorCount]) {
                        questionDiv.innerText = 'Looks like I cannot read your mind...';
                        onGameOver();
                        return;
                    }
                };

                // логика для прописывания вопросов в режиме обычном и режиме поиска по актеру
                if (guessedCharacter.actor === undefined) {
                    questionSubj = getMostPopularValue(characters, propNameNext);
                    if (!questionSubj) questionSubj = 'secret for muggles';
                    questionNext = questionNext + questionSubj + '?';
                    questionDiv.innerText = questionNext;

                    if (propNameNext === 'actor' || characters.length <= 3 || counter === propertiesSets.length - 1) {
                        chooseByActor = 'on';
                        questionSubj = characters[actorCount].actor;
                        questionNext = 'Is this character played by ' + questionSubj + ' ?';
                        questionDiv.innerText = questionNext;
                        loadGif(characters[actorCount].name, 0);
                    }
                }
            }

            // увеличиваем счетчик для перехода к след вопросу, пока они есть
            if (counter < propertiesSets.length - 1) counter++;
        });
    });
}

// грузим гифки для вывода каждому персонажу, так как в изначальном апи, картинки были не для всех
async function loadGif(q, offset) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKeyGiphy}&q=${q}&limit=1&offset=${offset}&rating=g&lang=en
        `)
        const data = await response.json();
        const gif = data.data;

        let src = gif[0]['images']['original']['url'];
        let imgDiv = document.querySelector('.pic');
        imgDiv.style.backgroundImage = `url(${src})`;
        imgDiv.style.width = 'auto';
        imgDiv.style.height = '500';

        return src;
    } catch (error) {
        alert(`Something went wrong! ${error.message}`);
        console.log(error.name);
        console.log(error.message);
    }
}

// скрываем игровую панель по завершению игры, оставляем кнопку "Перезагрузить"
function onGameOver() {
    document.querySelector('.question__buttons').style.display = 'none';
    document.querySelector('.game-result').style.display = 'block';
    document.querySelector('.result_buttons').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', getName);
guessCharacter();