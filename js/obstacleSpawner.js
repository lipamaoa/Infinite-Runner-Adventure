class ObstacleSpawner {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.obstacles = [];
      this.spawnInterval = 2000; 
      this.lastSpawnTime = Date.now();
    }
  
    update(speed, player, collisionCallback) {
      // Check if it's time to spawn a new obstacle
      if (Date.now() - this.lastSpawnTime >= this.spawnInterval) {
        this.spawnObstacle();
        this.lastSpawnTime = Date.now();
      }

      // Update all obstacles
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
        const obstacle = this.obstacles[i];
        obstacle.move(speed);
  
        const collidedWithPlayer = obstacle.collidedWithPlayer(player);

        // Remove the obstacle if it's off the screen or collided with the player
        if (obstacle.isOutOfScreen() || collidedWithPlayer) {
          this.gameScreen.removeChild(obstacle.element);
          this.obstacles.splice(i, 1);
        }

        if (collidedWithPlayer){
            collisionCallback();
        }
      }
    }
  
    spawnObstacle() {
        const obstacleStyle = Math.ceil(Math.random() * 3);
      const obstacle = new Obstacle(this.gameScreen, 150, `obstacle-type-${obstacleStyle}`);
      this.obstacles.push(obstacle);
    }
  }