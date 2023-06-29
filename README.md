# Ruby's Endless Run

Welcome to Ruby's Endless Run! This is a simple endless runner game where you control Ruby, the adventurous character, as she tries to avoid the obstacles and collect gems.

## Game Description

In Ruby's Endless Run, you join Ruby on an exciting adventure as she navigates through an endless obstacle course. Dodge obstacles, collect gems, and strive for the highest score as you help Ruby escape from the challenging environment. Immerse yourself in the captivating visuals and addictive gameplay, and see how far you can go in this thrilling endless runner experience.

## Minimum Viable Product (MVP)

The Minimum Viable Product (MVP) of Ruby's Endless Run includes the following core features:

1. Character Controls: You can control Ruby using the space bar to make her jump and avoid obstacles. In case of playing on mobile devices, you can control Ruby with a simple touch on the screen.

2. Endless Runner Gameplay: The game features an endless runner mechanic where Ruby continuously runs forward, and your objective is to survive as long as possible by avoiding obstacles.

3. Score System: You earn points for each obstacle avoided and collect gems to increase your score. The game keeps track of your current score.

4. Lives System: Ruby starts with three lives, and colliding with an obstacle will reduce her lives. The game ends when all lives are lost.

5. Game Over and Restart: When Ruby loses all her lives, the game ends, and you have the option to restart and try to beat your previous high score.

## Backlog Functionalities

1. Additional Game Levels: Create new levels or environments with unique challenges and obstacles to provide variety and progression in the gameplay experience.

2. Power-Ups or Special Abilities: Introduce power-ups or special abilities that can be collected or earned during gameplay to enhance the player's abilities or introduce new gameplay mechanics.

3. Leaderboards and Achievements: Implement a system for tracking and displaying high scores, achievements, or challenges to add competitiveness and replay value for players.

4. New Characters or Player Customization: Introduce additional playable characters with different abilities or allow players to customize their character's appearance through unlockable outfits, accessories, or skins.

5. Audio and Visual Enhancements: Improve the game's audio effects, background music, or visual assets, including animations, particle effects, or improved graphics.

6. Localization and Internationalization: Translate the game's text and user interface into multiple languages to reach a wider audience.

7. Performance Optimization: Optimize the game's code, assets, or rendering pipeline to improve performance and ensure smooth gameplay on various devices.

8. Bug Fixes and Quality Assurance: Continuously address and fix any bugs, glitches, or usability issues reported by players or identified during testing to ensure a polished and bug-free experience.

## Technologies Used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- Git
- GitHub
- GitHub Pages

## Implementation Details

### game.js

- **Class Description**: This class handles the game loop, player movement, obstacle and gem spawning, score tracking, collision detection, and game end conditions.
- **External resources used by the Game class**: Player class, ObstacleSpawner class, GemSpawner class, and the audioManager object.
- **Class Properties**:  
  - `audioManager`: Represents the audio manager object used for managing game audio.
  - `startScreen`, `gameScreen`, `platform`, `gameEndScreen`, `livesContainer`, `scoreElement`, `gemElement`: DOM elements used for displaying and interacting with different game screens and UI elements.
  - `score`, `lives`, `gemCounter`: Variables for tracking the player's score, remaining lives, and collected gems.
  - `isGameOver`: A boolean flag indicating whether the game is over.
  - `animatedId`: Used for storing the ID of the animation frame request.
  - `speed`, `frameDuration`, `platformDistance`, `platformSpeed`: Variables controlling the game speed, frame duration, platform animation distance, and platform speed.
  - `player`, `obstacleSpawner`, `gemSpawner`: Instances of other classes responsible for player movement, obstacle spawning, and gem spawning.
- **Class Methods**:
  - `start()`: Starts the game by hiding the start screen, showing the game screen, initializing the game loop, and triggering the difficulty increase at regular intervals.
  - `gameLoop()`: The main game loop that updates the game state and triggers the animation frame request.
  - `update(pixelsTraveled)`: Updates the game state based on the distance traveled, including player movement, obstacle and gem updates, score calculation, and checking for game over conditions.
  - `updateSpeed()`: Updates the game speed and platform animation speed based on the current level.
  - `onCollisionObstacle()`: Handles the logic when the player collides with an obstacle, including reducing lives, updating UI, and playing sound effects.
  - `updateScore(pixelsTraveled)`: Updates the player's score based on the distance traveled.
  - `onCollisionGem()`: Handles the logic when the player collects a gem, including updating the gem counter, UI, and playing sound effects.
  - `jump()`: Triggers the player to jump if the game is not over, including player animation and playing sound effects.
  - `endGame()`: Ends the game, including removing player element, pausing animations, playing end game sound effects, and displaying the game over screen.

## Game Assets

The game assets, including images and sounds, are stored in the respective folders within the project directory.

## Deployment

You can try out the live version of the project [here](https://lipamaoa.github.io/Infinite-Runner-Adventure/).