window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const muteButton = document.getElementById("mute-button");
  const restartButton = document.getElementById("restart-button");
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
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


  function handleInput(event) {
    const key = event.key;
    const possibleKeystrokes = [
      ' ', 'm'];

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
  }

  document.addEventListener('keydown', handleInput);
  document.addEventListener('touchstart', handleInput);


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

  //Fullscreen API in JS
  function toggleFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }

  fullscreenToggle.addEventListener('click', toggleFullscreen);

});
