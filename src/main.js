import GameConfig from './constants/GameConfig'
import 'pixi'
import Phaser from 'phaser'
import BootState from './states/BootState'
import GameState from './states/GameState'
import { STATE_BOOT, STATE_GAME } from './constants/Constants'

class Game extends Phaser.Game {
  constructor () {
    super(
      GameConfig.gameWidth,
      GameConfig.gameHeight,
      Phaser.CANVAS,
      'gameContainer'
    )

    this.state.add(STATE_BOOT, BootState, true)
    this.state.add(STATE_GAME, GameState, false)
  }
}

window.game = new Game()
