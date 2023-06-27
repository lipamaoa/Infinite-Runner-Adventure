class ObstacleSpawner {
    constructor(gameScreen, minSpawnInterval, maxSpawnInterval) {
        this.gameScreen = gameScreen;
        this.obstacles = [];
        this.minSpawnInterval = minSpawnInterval;
        this.maxSpawnInterval = maxSpawnInterval;
        this.nextSpawnTime = Date.now() + this.getRandomSpawnInterval();
    }

    update(speed, player, collisionCallback) {
        // Check if it's time to spawn a new obstacle
        if (Date.now() > this.nextSpawnTime) {
            this.spawn();
            this.nextSpawnTime = Date.now() + this.getRandomSpawnInterval();
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

            if (collidedWithPlayer) {
                collisionCallback();
            }
        }
    }

    spawn() {
        const obstacleStyle = Math.ceil(Math.random() * 3);
        const obstacle = new Obstacle(this.gameScreen, 150, 0, `obstacle obstacle-type-${obstacleStyle}`);
        this.obstacles.push(obstacle);
    }

    getRandomSpawnInterval() {
        return Math.random() * (this.maxSpawnInterval - this.minSpawnInterval) + this.minSpawnInterval;
    }
}