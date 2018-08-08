import Sprite from '../base/sprite'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let bg = new Image()
bg.src = 'images/kaer.jpg'
let logo = new Image()
logo.src = 'images/logo.png'
const BG_WIDTH     = 512
const BG_HEIGHT    = 512

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super()

    this.render(ctx)

    this.top = 0
  }

  update(ctx) {
    // this.top += 2
    
    // if ( this.top >= screenHeight )
    //   this.top = 0
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      bg,
      0,
      0,
      1280,
      720,
      0,
      0,
      screenWidth,
      screenHeight
    )
    ctx.drawImage(
      logo,
      0,
      0,
      350,
      150,
      screenWidth/2 -300,
      screenHeight/2 - 150,
      screenWidth/2 + 50,
      screenHeight/2 
    )
    
  }
}
