class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen);
    this.height = 600;
    this.width = 1200;
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.obstacles = [];
    this.animatedId;
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
  }

  gameLoop() {
    this.update();

    // if (this.animatedId % 200 === 0) {
    //   this.obstacles.push(new Obstacle(this.gameScreen));
    // }

    // if (this.isGameOver) {
    //   this.endGame();
    // } else {
       this.animatedId = requestAnimationFrame(() => this.gameLoop());
    // }
  }

  update() {
    this.player.move();
    const obstaclesToKeep = [];
    this.obstacles.forEach((obstacle) => {
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.lives -= 1;
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
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameScreen.style.display = "none";

    this.gameEndScreen.style.display = "block";
  }
}
