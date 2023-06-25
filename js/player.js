class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 100;
    this.height = 100;
    this.top = 100;
    this.left = 180;

    this.velocityY = 0;
    this.gravity = 0.05;
    this.onGround = false;

    this.element = document.createElement("div");

    this.element.className = "player";

    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    if (!this.onGround) {
      if (this.velocityY < 0 && this.velocityY + this.gravity >= 0) {
        this.element.style.animation =
          "jump-down-animation 0.5s steps(8) infinite";
      }

      this.velocityY += this.gravity;
      this.top += this.velocityY;

      if (this.top > this.gameScreen.offsetHeight - this.height - 100) {
        this.top = this.gameScreen.offsetHeight - this.height - 100;
        this.onGround = true;
        this.element.style.animation = "run-animation 0.5s steps(8) infinite";
      }
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  jump() {
    console.log("jump");
    if (this.onGround) {
      this.velocityY = -5;
      this.onGround = false;
      this.element.style.animation = "jump-up-animation 0.5s steps(8) infinite";
    }
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
