const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let hu = new Image()
hu.src = 'images/Title.png'

export default class Gamehu{
  rendergamehu(ctx){
    //判断一坵牌
    for(var i=0;i<=13;i++)
    {
      if ((ctx.data[i] == ctx.data[i + 1] && ctx.data[i] == ctx.data[i + 2])||(ctx.data[i] == (ctx.data[i + 1] - 1) && ctx.data[i] == (ctx.data[i + 2] - 2)))
      {
        if(ctx.phu[i]==0&&ctx.phu[i+1]==0&&ctx.phu[i+2]==0)
        {
          ctx.hu++
          ctx.phu[i]++
          ctx.phu[i+1]++
          ctx.phu[i+2]++
        }
        ctx.fillText
        (
          ctx.phu[i],
          screenWidth / 2 - 30,
          screenHeight / 2 - 100
        )
        ctx.fillText
        (
          i,
          screenWidth / 2 - 100 + 5 * i,
          screenHeight / 2 - 100
        )
      }
    }
    for (var i = 0; i <= 13; i++) {
      if (ctx.hu == 4) {
        if (ctx.data[i] == ctx.data[i + 1]&&ctx.data[i] != ctx.data[i+2]) {
          ctx.drawImage(
            hu,
            65, 34, 20, 22,
            screenWidth / 2,
            screenHeight / 2,
            40, 40
          )
        }
      }
    }
    
    ctx.fillText(
      ctx.hu,
      screenWidth / 2,
      screenHeight / 2 - 100
    )
  }
}