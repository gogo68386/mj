const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let loginon = new Image();
loginon.src = 'images/登录.png'
let register = new Image();
register.src = 'images/注册.png'

export default class Loginon {
  renderLoginon(ctx){
    if(ctx.register == 0)
    {
      ctx.drawImage(
        loginon,
        0, 0, 200, 250,
        screenWidth / 2 + 80,
        screenHeight / 2 - 120,
        200, 250
      )
      ctx.fillText(
        ctx.username,
        screenWidth / 2 + 158,
        screenHeight / 2 - 27
      )
      ctx.fillText(
        ctx.password,
        screenWidth / 2 + 158,
        screenHeight / 2 + 6
      )
    }
    if(ctx.register == 1)
    {
      ctx.drawImage(
        register,
        0, 0, 200, 250,
        screenWidth / 2 + 80,
        screenHeight / 2 - 120,
        200, 250
      )
      ctx.fillText(
        ctx.rusername,
        screenWidth / 2 + 110,
        screenHeight / 2 - 39
      )
      ctx.fillText(
        ctx.rpassword,
        screenWidth / 2 + 110,
        screenHeight / 2 - 7
      )
      ctx.fillText(
        ctx.email,
        screenWidth / 2 + 110,
        screenHeight / 2 + 25
      )
      ctx.fillText(
        ctx.phonenum,
        screenWidth / 2 + 110,
        screenHeight / 2 + 57
      )
    }
    ctx.loginon = 0.5
    ctx.fillStyle = "#ffffff"
    ctx.font = "12px Arial"
    
  }
} 