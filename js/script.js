window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const muteButton = document.getElementById("mute-button");
const restartButton= document.getElementById("restart-button")
  let game = null;

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

    document.addEventListener('keydown', event => {
    const key = event.key;
    const possibleKeystrokes = [
      ' '
    ];

    if (possibleKeystrokes.includes(key)) {

      event.preventDefault();
      switch (key) {
        case " ":
          game.player.jump();
          break
      }

    }
  })
  startButton.addEventListener("click", function () {
    startGame();
  });
  muteButton.addEventListener("click", function () {
    // TODO: Mute
  });
  restartButton.addEventListener("click", function () {
    location.reload()
      
  });
  
});