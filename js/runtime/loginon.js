const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let loginon = new Image();
loginon.src = 'images/loginon.png'

export default class Loginon {
  renderLoginon(ctx){
    ctx.drawImage(
      loginon,
      0, 0, 160, 178,
      screenWidth / 2 + 110,
      screenHeight / 2 - 100,
      160, 178
    )
    ctx.loginon = 0.5
    ctx.fillStyle = "#ffffff"
    ctx.font = "15px Arial"
    ctx.fillText(
      ctx.username,
      screenWidth / 2 + 158,
      screenHeight / 2 - 37
    )
    ctx.fillText(
      ctx.password,
      screenWidth / 2 + 158,
      screenHeight / 2 - 11
    )
  }
} 