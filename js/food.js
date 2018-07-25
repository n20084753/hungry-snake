class Food {    

    constructor() {
        this.pulse = false;
        this.cols = floor(gridWidth / cellSize);
        this.rows = floor(gridHeight / cellSize);
        this.createNewFoodInGrid();
    }

    createNewFoodInGrid() {
        this.x = floor(random(this.cols)) * cellSize;
        this.y = floor(random(this.rows)) * cellSize;

        this.x = constrain(this.x, cellSize, gridWidth - (cellSize * 2));
        this.y = constrain(this.y, cellSize, gridHeight - (cellSize * 2));
    }
    
    show() {
        // fill(255, 0, 100);
        push();
        imageMode(CENTER);
        let foodSize = cellSize * 2;
        if (this.pulse) {
            foodSize += 1;   
        } else {
            foodSize -= 1;
        }        
        this.pulse = !this.pulse;
        image(foodImg, this.x, this.y, foodSize, foodSize);
        pop();
        // rect(this.x, this.y, cellSize, cellSize);
    }
}