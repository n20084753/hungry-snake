var game;
var backgroundImg, foodImg, snakeHeadImg;
var deadAudio, foodAudio, keyPressAudio;

// Loading medias
function preload() {
    backgroundImg = loadImage('img/background.png');
    foodImg = loadImage('img/food.png');
    snakeHeadImg = loadImage('img/snake-head.png');
    deadAudio = loadSound('audio/dead.mp3');
    foodAudio = loadSound('audio/eat.mp3');
    keyPressAudio = loadSound('audio/keypress.mp3');
}

function setup() {    
    game = new Game();
}

function draw() {    
    game.play();
}

function keyPressed() {
    game.handleKeyPress(keyCode);
}