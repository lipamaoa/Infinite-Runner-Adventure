class Obstacle {
    constructor(gameScreen) {

        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = -150;
        this.width = 80;
        this.heigth = 150;
        this.element = document.createElement('img');

        this.element.src ='./images/redCar.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.heigth = `${this.heigth}px`;

        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;

        this.gameScreen.appendChild(this.element);
    }
    

    move() {
        // Move the obstacle down by 3px
        this.top += 3;
        // Update the obstacle's position on the screen
        this.updatePosition();
    }
    updatePosition() {
        
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }
}