import buzz from 'node-buzz';

export default class Sound {
    constructor() {
        var volume = 30;
        this.soundJump = new buzz.sound(require("./assets/sfx_wing.ogg"));
        this.soundScore = new buzz.sound(require("./assets/sfx_point.ogg"));
        this.soundHit = new buzz.sound(require("./assets/sfx_hit.ogg"));
        this.soundDie = new buzz.sound(require("./assets/sfx_die.ogg"));
        this.soundSwoosh = new buzz.sound(require("./assets/sfx_swooshing.ogg"));
        buzz.all().setVolume(volume);
    }

    playSoundJump() {
        this.soundJump.stop();
        this.soundJump.play();
    }

    playSoundScore() {
        this.soundScore.stop();
        this.soundScore.play();
    }

    playSoundHit(callback) {
        this.soundHit.play().bindOnce("ended", callback);
    }

    playSoundDie(callback) {
        this.soundDie.play().bindOnce("ended", callback);
    }

    playSoundSwoosh() {
        this.soundSwoosh.stop();
        this.soundSwoosh.play();
    }
}