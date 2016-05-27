/* eslint new-cap: 0 */

import buzz from 'node-buzz';
import sfxWing from './assets/sfx_wing.ogg';
import sfxHit from './assets/sfx_hit.ogg';
import sfxPoint from './assets/sfx_point.ogg';
import sfxDie from './assets/sfx_die.ogg';
import sfxSwooshing from './assets/sfx_swooshing.ogg';

export default class Sound {
  constructor() {
    const volume = 30;
    this.soundJump = new buzz.sound(sfxWing);
    this.soundScore = new buzz.sound(sfxPoint);
    this.soundHit = new buzz.sound(sfxHit);
    this.soundDie = new buzz.sound(sfxDie);
    this.soundSwoosh = new buzz.sound(sfxSwooshing);
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
    this.soundHit.play().bindOnce('ended', callback);
  }

  playSoundDie(callback) {
    this.soundDie.play().bindOnce('ended', callback);
  }

  playSoundSwoosh() {
    this.soundSwoosh.stop();
    this.soundSwoosh.play();
  }
}
