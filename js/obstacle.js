class Obstacle {
    constructor(gameScreen, gapHeight, obstacleType) {

        this.gameScreen = gameScreen;
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

    collidedWithPlayer(player) {
        const playerRect = player.element.getBoundingClientRect();
        const obstacleRect = this.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true; // Collision detected
        }

        return false; // No collision
    }
}