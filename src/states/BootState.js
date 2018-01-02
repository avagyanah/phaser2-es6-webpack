import Phaser from 'phaser'
import { STATE_GAME } from '../constants/Constants'
import GameConfig from '../constants/GameConfig'

export default class BootState extends Phaser.State {
  init (...args) {
    this.stage.backgroundColor = GameConfig.backgroundColor
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.game.renderer.renderSession.roundPixels = true
  }

  preload () {
    this.game.load.image('mushroom', 'assets/mushroom.png')
  }

  create () {
    this.state.start(STATE_GAME, true, false)
  }
}
