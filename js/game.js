class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.platform = document.getElementById("platform");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesContainer = document.getElementById("lives-container");
    this.player = new Player(this.gameScreen);
    this.height = 600;
    this.width = 1000;
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.animatedId;
    this.speed = 2;

    this.frameDuration = 33.33; // 30fps (approximately 33.33ms per frame)
    this.lastFrameTime = 0;
    this.platformDistance = 1958; // Distance covered by the platform animation in pixels
    this.platformDuration = (10 / this.speed) * 1000; // Duration of the platform animation in milliseconds
    this.platformSpeed = this.platformDistance / (this.platformDuration / 1000); // Platform speed in pixels per second
    this.scoreElement = document.getElementById('score');

    this.obstacleSpawner = new ObstacleSpawner(this.gameScreen);
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    // Start the game loop
    this.gameLoop();

    // TODO: adjust through the game
    this.platform.style.animation = `movePlatform ${10 / this.speed}s linear infinite`
  }

  gameLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime >= this.frameDuration) {
      const pixelsTraveled = this.platformSpeed * (deltaTime / 1000);
      this.update(pixelsTraveled);

      // Reset the frame time
      this.lastFrameTime = currentTime;
    }

    requestAnimationFrame(() => this.gameLoop());
  }

  update(pixelsTraveled) {
    this.player.move();
    this.obstacleSpawner.update(pixelsTraveled, this.player, () => this.updateLives());
    this.updateScore(pixelsTraveled);

    if (this.lives <= 0) {
      this.endGame();
      this.isGameOver = true;
    }
  }

  updateLives() {
    this.lives--;
    switch (this.lives) {
      case 2:
        this.livesContainer.children[2].classList.add("heart-empty");
        break;
      case 1:
        this.livesContainer.children[1].classList.add("heart-empty");
        break;
      case 0:
        this.livesContainer.children[0].classList.add("heart-empty");
        break;
      default:
        break;
    }
  }

  updateScore(pixelsTraveled) {
    this.score += Math.floor(pixelsTraveled / 10);
    this.scoreElement.textContent = this.score;
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    setTimeout(() => {
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "block";
    }, 1000)
  }
}
