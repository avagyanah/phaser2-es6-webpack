import Phaser from 'phaser'

export default class GameState extends Phaser.State {
  create () {
    this.mushroom = this.game.add.sprite(
      this.world.centerX,
      this.world.centerY,
      'mushroom'
    )
    this.mushroom.anchor.setTo(0.5)
  }

  update () {
    this.mushroom.angle++
  }

  render () {
    if (process.env.NODE_ENV === 'development') {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
