window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const muteButton = document.getElementById("mute-button");
  const restartButton = document.getElementById("restart-button");

  let game = null;

  const audioManager = new AudioManager();

  function startGame() {
    console.log("start game");
    audioManager.stopAudio();
    game = new Game(audioManager);
    audioManager.startGame.play();
    game.start();
  }

  function toggleMute() {
    if (audioManager.isMuted) {
      muteButton.innerHTML = "Mute";
      audioManager.unmuteAudio();
    } else {
      muteButton.innerHTML = "Unmute";
      audioManager.muteAudio();
    }
  }

  document.addEventListener('click', handleUserInteraction);

  function handleUserInteraction() {
    audioManager.introSound.play();
  
    document.removeEventListener('click', handleUserInteraction);
  }

  document.addEventListener('keydown', event => {
    const key = event.key;
    const possibleKeystrokes = [
      ' ', 'm'
    ];

    if (possibleKeystrokes.includes(key)) {

      event.preventDefault();
      switch (key) {
        case " ":
          game.player.jump();
          audioManager.jumpSound.play();
          break
        case "m":
          toggleMute();
          break;
      }

    }
  });

  startButton.addEventListener("click", function () {
    startGame();
  });

  muteButton.addEventListener("click", function () {
    toggleMute();
  });

  restartButton.addEventListener("click", function () {
    audioManager.stopAudio();
    location.reload();
  })
});
