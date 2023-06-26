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
    this.obstacles = [];
    this.animatedId;
    this.speed = 2;

    this.frameDuration = 33.33; // 30fps (approximately 33.33ms per frame)
    this.lastFrameTime = 0;
    this.platformDistance = 1958; // Distance covered by the platform animation in pixels
    this.platformDuration = (10/this.speed)*1000; // Duration of the platform animation in milliseconds
    this.platformSpeed = this.platformDistance / (this.platformDuration / 1000); // Platform speed in pixels per second
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

    // Create different types of obstacles
    this.platform.style.animation = `movePlatform ${10/this.speed}s linear infinite`
    const obstacle1 = new Obstacle(this.gameScreen, 150, this.speed, 'obstacle-type-1');
    //const obstacle2 = new Obstacle(this.gameScreen, 150, 25, 'obstacle-type-2');
    //const obstacle3 = new Obstacle(this.gameScreen, 150, 25, 'obstacle-type-3');
    this.obstacles.push(obstacle1);
    //this.obstacles.push(obstacle2);
    //this.obstacles.push(obstacle3);
  }

  gameLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;

    if (deltaTime >= this.frameDuration) {
      const obstacleDistance = this.platformSpeed * (deltaTime / 1000);
      this.update(obstacleDistance);

      // Reset the frame time
      this.lastFrameTime = currentTime;
    }

    requestAnimationFrame(() => this.gameLoop());
  }

  update(obstacleDistance) {
    this.player.move();
    const obstaclesToKeep = [];
    this.obstacles.forEach((obstacle) => {
      obstacle.move(obstacleDistance);
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.lives -= 1;
        this.updateLives();
      } else if (obstacle.top > this.gameScreen.offsetHeight) {
        this.score += 1;
      } else {
        obstaclesToKeep.push(obstacle);
      }
    });
    this.obstacles = obstaclesToKeep;

    if (this.lives <= 0) {
      this.endGame();
      this.isGameOver = true;
    }
  }

  updateLives() {
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

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    setTimeout(() =>{
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "block";
    }, 1000)
  }
}
