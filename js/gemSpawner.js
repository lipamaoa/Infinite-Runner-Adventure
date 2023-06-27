class GemSpawner extends ObstacleSpawner {
    spawn() {
        const howMany = Math.ceil(Math.random() * 5);

        for (let i = 0; i < howMany; i++) {
            const obstacle = new Obstacle(this.gameScreen, 350, i * 100, `gem`);
            this.obstacles.push(obstacle);
        }
    }
}