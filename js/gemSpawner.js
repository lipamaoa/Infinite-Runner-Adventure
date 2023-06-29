class GemSpawner extends ObstacleSpawner {
    spawn() {
        const howMany = Math.ceil(Math.random() * 3);

        for (let i = 0; i < howMany; i++) {
            const obstacle = new Obstacle(this.gameScreen, getRandomHeight(), i * 100, `gem`);
            this.obstacles.push(obstacle);

        }
    }
}

function getRandomHeight() {
    const minHeight = 300;
    const maxHeight = 400;

    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
}
