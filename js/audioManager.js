class AudioManager {
    constructor() {
        this.introSound = document.getElementById("intro-sound");
        this.startGame = document.getElementById("startGame-sound");
        this.jumpSound = document.getElementById("jump-sound");
        this.obstacleSound = document.getElementById("obstacle-sound");
        this.gemSound = document.getElementById("gem-sound");
        this.endGameSound = document.getElementById("endGame-sound");

        this.audios = [];
        this.audios.push(this.introSound);
        this.audios.push(this.startGame);
        this.audios.push(this.jumpSound);
        this.audios.push(this.obstacleSound);
        this.audios.push(this.gemSound);
        this.audios.push(this.endGameSound);

        this.isMuted = false;
    }

    muteAudio() {
        this.audios.forEach(audio => audio.muted = true);
        this.isMuted = true;
    }

    unmuteAudio() {
        this.audios.forEach(audio => audio.muted = false);
        this.isMuted = false;
    }

    stopAudio() {
        this.audios.forEach(audio => audio.pause());
    }
}