window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const muteButton = document.getElementById("mute-button");
  const restartButton = document.getElementById("restart-button");
  const fullscreenToggle = document.getElementById("fullscreen-toggle");
  const gameContainer = document.getElementById("game-container");
  const containerRect = gameContainer.getBoundingClientRect();



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


  function handleTouch(event) {
    // Get the touch coordinates
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const containerX = touchX - containerRect.left;
    const containerY = touchY - containerRect.top;

    if (containerX > 0 && containerX < containerRect.width &&
      containerY > 0 && containerY < containerRect.height) {
      game.player.jump();
      audioManager.jumpSound.play();
    }
  }

  document.addEventListener('touchstart', handleTouch);


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

  function resizeGameContainer() {
    var container = document.getElementById("game-container");
    container.style.width = window.innerWidth + "px";
    container.style.height = window.innerHeight + "px";
  }

  window.addEventListener("resize", resizeGameContainer);

});
