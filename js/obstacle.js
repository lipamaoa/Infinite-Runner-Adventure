class Obstacle {
    constructor(gameScreen, gapHeight, speed, obstacleType) {

        this.gameScreen = gameScreen;
        //this.left = Math.floor(Math.random() * 300 + 70);
        this.left = gameScreen.offsetWidth;
        this.top = gameScreen.offsetHeight - gapHeight;

        this.element = document.createElement("div");
        this.element.className = `obstacle ${obstacleType}`;

        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;

        this.gameScreen.appendChild(this.element);
    }


    move(speed) {
        // Move the obstacle 
        this.left -= speed;
        // Update the obstacle's position on the screen
        this.updatePosition();
    }
    updatePosition() {

        this.element.style.left = `${this.left}px`;

    }
    isOutOfScreen() {
        return this.left + this.width < 0;
    }
}