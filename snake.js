class Snake {
    constructor() {
        this.direction = "RIGHT";

        // Initializing with 3 length so snake tail is visible from begining
        this.path = [
            {x: 0 + cellSize, y: 0 + cellSize}, 
            {x: 0 + cellSize, y: 0 + cellSize},
            {x: 0 + cellSize, y: 0 + cellSize}
        ];
        this.head = {x: 0 + cellSize, y: 0 + cellSize};
    }    
    
    updateHeadPosition() {
        if (this.direction == "RIGHT") this.head.x = this.head.x + (cellSize);
        if (this.direction == "LEFT") this.head.x = this.head.x - (cellSize);
        if (this.direction == "UP") this.head.y = this.head.y - (cellSize);
        if (this.direction == "DOWN") this.head.y = this.head.y + (cellSize);
        
        this.head.x = constrain(this.head.x, cellSize , gridWidth - cellSize);
        this.head.y = constrain(this.head.y, cellSize, gridHeight - cellSize);
    }

    move() {
        this.path.unshift(JSON.parse(JSON.stringify(this.head)));
    }

    getFat() {
        this.path[0]['food'] = true;
    }

    removeTail() {
        this.path.pop();
    }

    eats(food) {
        return (dist(this.head.x, this.head.y, food.x, food.y) <= 15)
    }

    isDead() {
        // out of bounds
        if (this.head.x < 0 
            || this.head.y < 0 
            || this.head.x > gridWidth - cellSize 
            || this.head.y > gridHeight - cellSize
        ) {            
            return true;
        }

        // colloiding with itself
        for (let i = 0; i < this.path.length; i++) {
            if (this.head.x == this.path[i].x && this.head.y == this.path[i].y) {
                return true;
            }
        }

        return false;
    }

    revive() {
        this.head = {
            x: 0 + cellSize,
            y: 0 + cellSize
        };
        for (let i = 0; i < this.path.length; i++) {
            this.path[i] = {
                x: 0 + cellSize,
                y: 0 + cellSize
            };
        }
        this.direction = "RIGHT";
    }

    show() {
        noFill();
        fill(69, 198, 235);                
        noStroke();
        
        this.drawSnakeBody();
        this.drawSnakeTail();
        this.drawSnakeHead();
    }

    drawSnakeBody() {
        for (let i = 1; i < this.path.length - 1; i++) {
            push();
            rectMode(CENTER);
            translate(this.path[i].x, this.path[i].y);
            rect(0, 0, cellSize, cellSize);
            if (this.path[i].food) {
                ellipse(0, 0, cellSize + 10, cellSize + 10);
            }
            pop();
        }
    }

    drawSnakeHead() {
        push();
        translate(this.path[0].x, this.path[0].y)
        if (this.direction === "RIGHT") {
            rotate(PI / 180 * 0);
        } else if (this.direction === "DOWN") {
            rotate(PI / 180 * 90);
        } else if (this.direction === "LEFT") {
            rotate(PI / 180 * 180);
        } else if (this.direction === "UP") {
            rotate(PI / 180 * 270);
        }      
        imageMode(CENTER);
        smooth();
        image(snakeHeadImg, 0, 0, cellSize * 3, cellSize * 2);
        rotate(PI/180 * 0);
        pop();
    }

    drawSnakeTail() {        
        let tailIndex = this.path.length - 1; 
        if (tailIndex == 0) {
            return;
        }

        let tail = this.path[tailIndex],
            tailConnector = this.path[tailIndex - 1];

        push();
        translate(tail.x, tail.y);        
        if (tail.x - tailConnector.x < 0) {
            rotate(PI / 180 * 0);
        } else if (tail.y - tailConnector.y < 0) {
            rotate(PI / 180 * 90);
        } else if (tail.x - tailConnector.x > 0) {
            rotate(PI / 180 * 180);
        } else if (tail.y - tailConnector.y > 0) {
            rotate(PI / 180 * 270);
        }
        rectMode(CENTER);
        rect(0, 0, cellSize, cellSize, cellSize/2, 0, 0, cellSize/2);
        pop();
    }

    setDirection(direction) {
        if ((this.direction == "UP" && direction == "DOWN")
            || (this.direction == "DOWN" && direction == "UP")
            || (this.direction == "LEFT" && direction == "RIGHT")
            || (this.direction == "RIGHT" && direction == "LEFT")
        ) {
            return;
        }
        this.direction = direction; 
    }
}