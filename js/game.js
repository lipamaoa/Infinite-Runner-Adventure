class Game {
  constructor(audioManager) {
    this.audioManager = audioManager;

    this.startScreen = document.getElementById("game-intro-background");
    this.gameScreen = document.getElementById("game-screen");
    this.platform = document.getElementById("platform");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesContainer = document.getElementById("lives-container");
    this.scoreElement = document.getElementById('score');
    this.gemElement = document.getElementById('gemScore');

    this.score = 0;
    this.lives = 3;
    this.gemCounter = 0;
    this.isGameOver = false;
    this.animatedId;

    this.speed = 2;
    this.frameDuration = 33.33; // 30fps (approximately 33.33ms per frame)
    this.platformDistance = 1958; // Distance covered by the platform animation in pixels

    this.player = new Player(this.gameScreen);
    this.obstacleSpawner = new ObstacleSpawner(this.gameScreen, 2000, 4000);
    this.gemSpawner = new GemSpawner(this.gameScreen, 1000, 3000);
  }

  start() {
    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    this.lastFrameTime = performance.now();
    this.updateSpeed();

    // Start the game loop
    this.gameLoop();

    // Increase difficulty every 5 seconds
    this.updateSpeedIntervalId = setInterval(() => this.updateSpeed(), 5000)
  }

  gameLoop() {
    if (this.isGameOver) {
      return;
    }

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
    this.obstacleSpawner.update(pixelsTraveled, this.player, () => this.onCollisonObstacle());
    this.gemSpawner.update(pixelsTraveled, this.player, () => this.onCollisionGem());
    this.updateScore(pixelsTraveled);

    if (this.lives <= 0) {
      this.endGame();
      this.isGameOver = true;
      return;
    }
  }

  updateSpeed() {
    this.speed += 0.5;
    const platformDuration = (10 / this.speed) * 1000; // Duration of the platform animation in milliseconds
    this.platformSpeed = this.platformDistance / (platformDuration / 1000); // Platform speed in pixels per second

    const newDuration = 10 / this.speed;
    this.platform.style.animation = this.platform.style.animation.replace(/\d+(?=s)/, newDuration);
    this.platform.style.animationDuration = (newDuration * 1000) + 'ms';
  }

  onCollisonObstacle() {
    this.audioManager.obstacleSound.play();

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

  onCollisionGem() {
    this.gemCounter++;
    this.gemElement.textContent = this.gemCounter;

    this.audioManager.gemSound.play();
  }

  jump(){
    if (this.isGameOver){
      return;
    }

    this.player.jump();
    this.audioManager.jumpSound.play();
  }

  endGame() {
    this.player.element.remove();
    this.audioManager.endGameSound.play();

    clearInterval(this.updateSpeedIntervalId);

    this.platform.style.animationPlayState = 'paused';;
    const parallaxes = document.getElementsByClassName('parallax');
    const array = Array.from(parallaxes);

    array.forEach(element => {
      element.style.animationPlayState = 'paused';;
    });
    setTimeout(() => {
      this.gameEndScreen.style.display = "block";
    }, 500)
  }
}
