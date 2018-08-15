const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let atlas1 = new Image()
atlas1.src = 'images/btn_enter_room.png'
let atlas = new Image()
atlas.src = 'images/btn_create_room.png'
let atlas2 = new Image()
atlas2.src = 'images/btn_return_room.png'
let pai = new Image()
pai.src = 'images/Majpai.png'
let pick = new Image()
pick.src = 'images/pick.png'
let bc = new Image()
bc.src = 'images/bg2.png'

var single = 0

export default class GameBegin {
    renderGameBegin(ctx, score) {
      // ctx.drawImage(atlas, 0, 0, 119, 108,  screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)
      ctx.drawImage(
        atlas1,
        0, 0, 383, 159,
        screenWidth / 2 - 209,
        screenHeight / 2 - 100 + 205,
        120, 40
      )
      ctx.drawImage(
        atlas,
        0, 0, 383, 159,
        screenWidth / 2 - 40,
        screenHeight / 2 - 100 + 205,
        120, 40
      )
      // ctx.fillText(
      //   '游戏开始',
      //   screenWidth / 2 - 40,
      //   screenHeight / 2 - 100 + 205
      // )

      /**
      * 重新开始按钮区域
      * 方便简易判断按钮点击
      */
      this.btnArea = {
        startX: screenWidth / 2 - 40,
        startY: screenHeight / 2 - 100 + 180,
        endX: screenWidth / 2 + 50,
        endY: screenHeight / 2 - 100 + 255
      }
    }

    /**
     * 设置随机数，先排序后开牌
     */
      
    rendergameshow(ctx){
      ctx.drawImage(
        bc,
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
        atlas2,
        0, 0, 383, 159,
        screenWidth / 2 + 129,
        screenHeight / 2 - 130,
        120, 40
      )
      if(ctx.makesure == 1)
      {
        ctx.drawImage(
          pai,
          ctx.showcard * (1620 / 36), 0, 44, 70,
          screenWidth / 2,
          screenHeight / 2,
          30, 50
        )
        
      }
      
      // console.log("card1=", ctx.showcard);
      ctx.width = screenWidth
      ctx.height = screenHeight
      for (this.i = 0;this.i<=13;this.i++)  
      {
        for (this.j = 0; this.j <= 13-this.i;this.j++)  
        {
          if (ctx.data[this.j] > ctx.data[this.j + 1]) 
          {
            ctx.num = ctx.data[this.j]
            ctx.data[this.j] = ctx.data[this.j + 1]
            ctx.data[this.j + 1] = ctx.num
          }
        }
      }  

      for(var i=0;i<=13;i++)
      {
        /*
          选择要出的牌，这里进行判断
        */
        if (ctx.flag >= i && ctx.flag <= i + 1 && ctx.status){
          
          ctx.fillText(
            ctx.flag,
            screenWidth / 2,
            screenHeight / 2 - 100
          )
          ctx.drawImage(
            pick,
            0,0,71,37,
            screenWidth-100,
            screenHeight / 2,
            71, 37
          )
          ctx.drawImage(
            pai,
            ctx.data[i] * (1620 / 36), 0, 44, 70,
            screenWidth / 2 - 210 + i * 30,
            screenHeight / 2 - 100 + 160,
            30, 50
          )
          if (ctx.data[i] != ctx.card1) {
            single = 0;
          }
          if (!single) {
            ctx.card1 = ctx.data[i];

            if (ctx.objectid1) {
              console.log("ctx.data =",ctx.data[i]);
              console.log("input=", ctx.card1);
              const query = ctx.bmob.Query('_User');
              query.get(ctx.objectid1).then(res => {
                console.log(res)
                res.set('cardData1', ctx.card1)
                res.save()
              }).catch(err => {
                console.log(err)
              })
              query.get(ctx.objectid2).then(res => {
                console.log(res)
                res.set('cardData1', ctx.card1)
                res.save()
              }).catch(err => {
                console.log(err)
              })
              query.get(ctx.objectid3).then(res => {
                console.log(res)
                res.set('cardData1', ctx.card1)
                res.save()
              }).catch(err => {
                console.log(err)
              })
              query.get(ctx.objectid4).then(res => {
                console.log(res)
                res.set('cardData1', ctx.card1)
                res.save()
              }).catch(err => {
                console.log(err)
              })
              //   query.get(ctx.objectid).then(res => {
              //     ctx.showcard = res.cardData1
              //   }).catch(err => {
              //     console.log(err)
              //   })
              //   makesure = 1;
            }
            single = 1;
          }
        }
        else
        {    
          ctx.drawImage(
            pai,
            ctx.data[i] * (1620 / 36), 0, 44, 70,
            screenWidth / 2 - 210 + i * 30,
            screenHeight / 2 - 100 + 180,
            30, 50
          )
        }
        ctx.drawImage(
          pai,
          1574,0,18,40,
          screenWidth / 2 - 240,
          screenHeight / 2 + 120 - 60,
          18, 60
        )
        ctx.drawImage(
          pai,
          1574,0,18,21,
          screenWidth / 2 - 240 + i*3,
          screenHeight / 2 + 60 - (18-i*0.5)*i,
          18-i*0.5,18-i*0.5
        )
        ctx.drawImage(
          pai,
          1591,0,18,40,
          screenWidth / 2 + 220,
          screenHeight / 2 + 60,
          18,60 
        )
        ctx.drawImage(
          pai,
          1591,0,18,21,
          screenWidth / 2 + 220 - i*1.5,
          screenHeight / 2 + 60 - (18 - i * 0.5) * i,
          18 - i * 0.5, 18 - i * 0.5
        )
        ctx.drawImage(
          pai,
          816,197,24,35,
          screenWidth / 2 - 160 + i*24,
          screenHeight / 2 - 95,
          24,35
        )
        
      }
    }
}

