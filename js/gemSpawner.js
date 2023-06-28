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
    // Define the range of possible heights for the obstacles
    const minHeight = 300; // Minimum height
    const maxHeight = 400; // Maximum height

    // Generate a random height within the defined range
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
}
