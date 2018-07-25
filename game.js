const cellSize = 15;
const gridWidth = 900;
const gridHeight = 540;
const LS = localStorage;
const baseFrameRate = 10;

const arrowKeyCodeMap = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
};

class Game {
    constructor() {
        createCanvas(gridWidth, gridHeight);        
        
        this.$scoreDiv = document.getElementById('score');
        this.$highScoreDiv = document.getElementById('high-score');        
        this.$livesContainerDiv = document.getElementById('lives-container');        

        this.$popupDiv = document.getElementById('popup');
        this.$popupBoxDiv = document.getElementById('popup-box');

        this.$livesCountSpan = document.getElementById('lives-count');
        
        this.$startBtnDiv = document.getElementById('start-btn');
        this.$startBtnDiv.addEventListener('click', this.start);        
        
        this.$skipReviveBtnDiv = document.getElementById('skip-revive-btn');
        this.$skipReviveBtnDiv.addEventListener('click', this.skipRevive);
        
        this.$retryBtnDiv = document.getElementById('retry-btn');
        this.$retryBtnDiv.addEventListener('click', this.retry);
        this.reset();
        this.showPopup();        
    }

    reset() {
        this.snake = new Snake();
        this.food = new Food();
        this.status = "START";
        this.score = 0;
        this.lives = 3;
        this.showScore();
        this.getHigScore();
        this.renderLives();
        this.updateFrameRate();
    }

    start() {
        game.reset();
        game.status = "PROGRESS";
        game.hidePopup();
    }

    retry() {        
        game.snake.revive();
        game.status= "PROGRESS";
        game.hidePopup();
    }

    skipRevive() {
        game.status = "END";
        game.$popupBoxDiv.className = "popup__content action action--gameover";
        game.$startBtnDiv.innerText = "PLAY AGAIN";
    }

    play() {        
        background(0);
        image(backgroundImg, 0, 0, gridWidth, gridHeight);

        this.snake.show();
        this.food.show();

        if (this.status !== "PROGRESS") {
            return;
        }

        this.snake.updateHeadPosition();

        if (this.snake.isDead()) {
            deadAudio.play();
            this.looseLife();            
            this.status = "PAUSED";
            this.showPopup();
            return;
        }

        if (this.snake.eats(this.food)) {
            foodAudio.play();
            this.snake.getFat();
            this.updateScore();
            this.food.createNewFoodInGrid();
        } else {
            this.snake.removeTail();
        }

        this.snake.move();
    }

    showPopup() {
        this.$popupDiv.className = "popup show";

        if (this.status == "PAUSED") {
            if (this.lives > 0) {
                this.$popupBoxDiv.className = "popup__content action action--revive";
                this.$livesCountSpan.innerText = this.lives;
            } else {
                this.status = "END";
                this.$popupBoxDiv.className = "popup__content action action--gameover";
                this.$startBtnDiv.innerText = "PLAY AGAIN";
            }            
        }
    }

    hidePopup() {
        this.$popupDiv.className = "popup";
    }

    looseLife() {
        this.lives--;
        this.renderLives();
    }

    getHigScore() {        
        let highScore = LS.getItem("highScore") || 0;

        this.highScore = parseInt(highScore);
        this.showHighScore();
    }

    handleKeyPress(keyCode) {
        if (arrowKeyCodeMap[keyCode]) {
            keyPressAudio.play();
            this.snake.setDirection(arrowKeyCodeMap[keyCode]);
        } else if (keyCode === 32 && (this.status === "START" || this.status === "END")) { //Space pressed
            this.start();
        }
    }

    updateScore() {
        this.score++;
        this.showScore();  
        this.updateFrameRate();      
    }

    // Frame rate decides the level of the game
    updateFrameRate() {
        let newFrameRate = baseFrameRate + this.score / 15;
        frameRate(newFrameRate);
    }

    showScore() {
        this.$scoreDiv.innerText = this.score;
        if (this.score > this.highScore) {
            this.updateHighScore();
        }
    }

    updateHighScore() {
        this.highScore = this.score;        
        LS.setItem("highScore", this.highScore);
        this.showHighScore();
    }

    showHighScore() {
        this.$highScoreDiv.innerText = this.highScore;
    }

    renderLives() {        
        let livesDomString = `<i class=${this.lives >= 1  ? "'heart active'" : "heart"}></i>`;
        livesDomString += `<i class=${this.lives >= 2  ? "'heart active'" : "heart"}></i>`;
        livesDomString += `<i class=${this.lives >= 3  ? "'heart active'" : "heart"}></i>`;
        
        this.$livesContainerDiv.innerHTML = livesDomString;
    }
}