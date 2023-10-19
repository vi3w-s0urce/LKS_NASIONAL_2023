const welcomeScreen = document.getElementById("welcome-screen");
const hexagonBox = document.getElementById("hexagon-box");

const welcomeDom = `<h1>WELCOME TO HEXARIA</h1>
                    <p>Instruction: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, id esse? <br> Et doloribus tempore, tempora unde cupiditate <br> architecto consequatur reiciendis?</p>
                    <button class="button start-hover" onclick="level()">START GAME</button>`;

const levelDom = `<p>SELECT LEVEL</p>
                <button class="button color-hover" id="level-easy">EASY</button>
                <button class="button color-hover" id="level-medium">MEDIUM</button>
                <button class="button color-hover" id="level-hard">HARD</button>`;

const selectDom = `<p>SELECT ENEMY</p>
<div class="select-enemy">
    <button class="button color-hover" id="select-bot">BOT</button>
    <button class="button color-hover" id="select-player">PLAYER 2</button>
</div>
<form id="form-player" onsubmit="play_game(event)">
</form>
`;

const inputBotDom = `<input type="text" name="playerOne" placeholder="Input your name" required>
<button type="submit" class="button start-hover">PLAY NOW</button>`;

const inputPlayerDom = `<input type="text" name="playerOne" placeholder="Input player 1 name" required>
<input type="text" name="playerSecond" placeholder="Input player 2 name" required>
<button type="submit" class="button start-hover">PLAY NOW</button>`;

const hexagonSvgDom = `<svg width="64px" height="64px" style="margin: -12px -4px;" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" id="hexagon-svg">
                        <path d="M14 4.21281L7.5 0.421143L1 4.21281V10.7872L7.5 14.5788L14 10.7872V4.21281Z" fill="none" stroke="#ffffff" stroke-width="0.45"></path>
                        <text x="5.5" y="8.5" id="hex-number"></text>
                        </svg>`;

const hexagonSvgDomBreak = `<svg width="64px" height="64px" style="margin: -12px -4px; transform:translate(27.5px, 0)" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" id="hexagon-svg">
<path d="M14 4.21281L7.5 0.421143L1 4.21281V10.7872L7.5 14.5788L14 10.7872V4.21281Z" fill="none" stroke="#ffffff" stroke-width="0.45"></path>
<text x="5.5" y="8.5" id="hex-number"></text>
</svg>`;

let levelValue = 'hard';
let enemy;
let playerOneName;
let playerSecondName;
let currentNumber;
let gameOver;
let playerTurn = 1;
let randomNumber;


function welcome_screen() {
    welcomeScreen.innerHTML = welcomeDom;
}

function level() {
    welcomeScreen.innerHTML = levelDom;
    
    const levelButtonEasy = document.getElementById('level-easy');
    const levelButtonMedium = document.getElementById('level-medium');
    const levelButtonHard = document.getElementById('level-hard');
    
    levelButtonEasy.addEventListener('click', ()=> {
        levelValue = 'easy';
        select_enemy();
    })
    
    levelButtonMedium.addEventListener('click', ()=> {
        levelValue = 'medium';
        select_enemy();
    })
    
    levelButtonHard.addEventListener('click', ()=> {
        levelValue = 'hard';
        select_enemy();
    })
}

function select_enemy() {
    welcomeScreen.innerHTML = selectDom;
    
    const selectBotButton = document.getElementById('select-bot');
    const selectPlayerButton = document.getElementById('select-player');
    const inputPlayerForm = document.getElementById('form-player');
    
    selectBotButton.addEventListener('click', ()=> {
        enemy = 'bot';
        inputPlayerForm.innerHTML = inputBotDom;
    });
    
    selectPlayerButton.addEventListener('click', ()=> {
        enemy = 'player';
        inputPlayerForm.innerHTML = inputPlayerDom;
    });
}

function play_game(e) {
    e.preventDefault();

    playerOneName = e.target.playerOne.value;

    if (e.target.playerSecond) {
        playerSecondName = e.target.playerSecond.value;
    }

    welcomeScreen.remove();
}

function current_number() {
    const currentHexagon = document.getElementById('hexagon-current');
    const currentHexagonNumber = currentHexagon.getElementById('hex-number');
    currentNumber = (1 + Math.floor(Math.random() * 20));

    if (playerTurn === 1) {
        currentHexagon.classList = 'hexagon-red';
        currentHexagonNumber.innerHTML = currentNumber;
    } else {
        currentHexagon.classList = 'hexagon-blue';
        currentHexagonNumber.innerHTML = currentNumber;
    }
}

function buildHexagon() {
    let hexdom = hexagonSvgDom;
    for (let i = 1; i <= 80; i++) {
        hexagonBox.innerHTML += hexdom;
        if ( i >= 10 && i < 20 || i >= 30 && i < 40 || i >= 50 && i < 60 || i >= 70 && i < 80 ) {
            hexdom = hexagonSvgDomBreak;
        } else {
            hexdom = hexagonSvgDom;
        }
        if (i === 10 || i === 20 || i === 30 || i === 40 || i === 50 || i === 60 || i === 70) {
            hexagonBox.innerHTML += `<br>`;
        }
    }
    disabled_hexagon();
    hexagon_logic();
    current_number();
}

function random_number() {
    return Math.floor(Math.random() * 81);
}

function disabled_hexagon() {
    const hexagonSvg = document.querySelectorAll('#hexagon-svg');

    if (levelValue === 'easy') {
        let randomArray = [];
        while (randomArray.length < 8) {
            randomNumber = random_number();
            if (!randomArray.includes(randomNumber)) {
                randomArray.push(randomNumber);
            } else {
                randomNumber = random_number();
            }
        }
        for (let i = 0; i < randomArray.length; i++) {
            const random = randomArray[i];
            hexagonSvg[random].classList = 'disabled';
        }
    } else if (levelValue === 'medium') {
        let randomArray = [];
        while (randomArray.length < 8) {
            randomNumber = random_number();
            if (!randomArray.includes(randomNumber)) {
                randomArray.push(randomNumber);
            } else {
                randomNumber = random_number();
            }
        }
        for (let i = 0; i < randomArray.length; i++) {
            const random = randomArray[i];
            hexagonSvg[random].classList = 'disabled';
        }
    } else if (levelValue === 'hard') {
        let randomArray = [];
        while (randomArray.length < 8) {
            randomNumber = random_number();
            if (!randomArray.includes(randomNumber)) {
                randomArray.push(randomNumber);
            } else {
                randomNumber = random_number();
            }
        }
        for (let i = 0; i < randomArray.length; i++) {
            const random = randomArray[i];
            hexagonSvg[random].classList = 'disabled';
        }
    }
}

function hexagon_logic() {
    const hexagonSvg = document.querySelectorAll('#hexagon-svg');
    for (let i = 0; i < hexagonSvg.length; i++) {
        const hexagonNumber = hexagonSvg[i].getElementById('hex-number');
        
        hexagonSvg[i].addEventListener('click', ()=> {
            if (!hexagonSvg[i].classList.contains('isFilled') && !hexagonSvg[i].classList.contains('disabled')) {
                if (playerTurn === 1) {
                    hexagonSvg[i].classList = 'hexagon-red isFilled';
                    hexagonNumber.innerHTML = currentNumber;
                    playerTurn = 2;
                    
                    // let hexR = hexagonSvg[i+1].classList = 'hexagon-red isFilled';
                    // let hexL = hexagonSvg[i-1].classList = 'hexagon-red isFilled';
                    let hexTR = hexagonSvg[i-10].classList = 'hexagon-red isFilled';
                    // let hexTL = hexagonSvg[i-8].classList = 'hexagon-red isFilled';
                    // let hexBR = hexagonSvg[i+9].classList = 'hexagon-red isFilled';
                    // let hexBL = hexagonSvg[i-1].classList = 'hexagon-red isFilled';

                    current_number();
                } else {
                    hexagonSvg[i].classList = 'hexagon-blue isFilled';
                    hexagonNumber.innerHTML = currentNumber;
                    playerTurn = 1;
                    current_number();
                }
            } else if (hexagonSvg[i].classList.contains('isFilled')) {
                if (hexagonNumber.innerHTML < currentNumber && playerTurn === 1 && hexagonSvg[i].classList.contains('hexagon-blue')) {
                    hexagonSvg[i].classList = 'hexagon-red isFilled';
                    hexagonNumber.innerHTML = currentNumber
                    playerTurn = 2;
                    current_number();
                } else if (hexagonNumber.innerHTML < currentNumber && playerTurn === 2 && hexagonSvg[i].classList.contains('hexagon-red')) {
                    hexagonSvg[i].classList = 'hexagon-blue isFilled';
                    hexagonNumber.innerHTML = currentNumber;
                    playerTurn = 1;
                    current_number();
                } else {
                    alert('Your hexagon number should be bigger than you enemy!');
                }
            } else {
                alert('Fill the empty hexagon!')
            }
            check_filled();
        });
        hexagonSvg[i].addEventListener('mouseover', ()=> {
            if (!hexagonSvg[i].classList.contains('isFilled') && !hexagonSvg[i].classList.contains('disabled') && playerTurn == 1) {
                hexagonSvg[i].classList = 'hexagon-red-hover';
                hexagonNumber.innerHTML = currentNumber;
            } else if (!hexagonSvg[i].classList.contains('isFilled') && !hexagonSvg[i].classList.contains('disabled') && playerTurn == 2) {
                hexagonSvg[i].classList = 'hexagon-blue-hover';
                hexagonNumber.innerHTML = currentNumber;
            }
        });
        hexagonSvg[i].addEventListener('mouseleave', ()=> {
            if (!hexagonSvg[i].classList.contains('isFilled') && !hexagonSvg[i].classList.contains('disabled') && playerTurn == 1) {
                hexagonSvg[i].classList = '';
                hexagonNumber.innerHTML = '';
            } else if (!hexagonSvg[i].classList.contains('isFilled') && !hexagonSvg[i].classList.contains('disabled') && playerTurn == 2) {
                hexagonSvg[i].classList = '';
                hexagonNumber.innerHTML = '';
            }
        });
    }
}

function check_filled() {
    const hexagonSvg = document.querySelectorAll('.isFilled');

    if (levelValue === 'easy' && hexagonSvg.length === 76) {
        window.location.href = 'www.youtube.com';
    } else if (levelValue === 'medium' && hexagonSvg.length === 74) {
        window.location.href = 'www.youtube.com';
    } else if (levelValue === 'hard' && hexagonSvg.length === 72) {
        window.location.href = 'www.youtube.com';
    }
}

buildHexagon();

// welcome_screen();
