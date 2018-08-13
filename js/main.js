import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Gamebegin from './runtime/gamebegin'
import Music from './runtime/music'
import DataBus from './databus'
import GameHu from './runtime/hu'
import Room from './runtime/room'
import Loginon from './runtime/loginon'

let ctx = canvas.getContext('2d')
let databus = new DataBus()
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    ctx.bmob = 0
    ctx.objectid = 0
    ctx.width = 0
    ctx.height = 0
    ctx.i = 0
    ctx.status = false
    this.aniId = 0
    ctx.username = ''
    ctx.password = ''
    ctx.rusername = ''
    ctx.rpassword = ''
    ctx.email = ''
    ctx.phonenum = ''
    ctx.rre = 0
    ctx.cvalue = 1
    ctx.pickdata = 0
    ctx.num = 0
    ctx.nockname = 0
    ctx.join = 0
    ctx.joinn = 0
    ctx.loginon = 0
    ctx.register = 0
    ctx.back = false
    ctx.rid = 0  //获取data数据里的rid
    ctx.masterKey
    ctx.hu = 0  //胡牌的堆数
    ctx.c = 0.0 //游戏场景的id
    ctx.worker = 0
    ctx.objectid1 = 0
    ctx.objectid2 = 0
    ctx.objectid3 = 0
    ctx.objectid4 = 0
    ctx.showcard = 0 //打出去的牌
    ctx.makesure = 0
    this.time = 0
    this.single = 0
    ctx.data = []
    ctx.card1 = 0
    ctx.changecard = 1
    ctx.phu = []
    ctx.name = []
    ctx.query = []
    for (this.i = 0; this.i <= 13; this.i++) {
      var num1 = Math.floor(Math.random() * 34)
      ctx.data[this.i] = num1
      ctx.phu[this.i] = 0
    }
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()
    this.gamebegin = new Gamebegin()
    this.gamehu = new GameHu()
    this.music = new Music()
    this.room = new Room()
    this.loginon = new Loginon()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )

  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for (let i = 0, il = databus.enemys.length; i < il; i++)       {
        let enemy = databus.enemys[i]

        if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
          enemy.playAnimation()
          that.music.playExplosion()

          bullet.visible = false
          databus.score += 1

          break
        }
      }
    })

    for (let i = 0, il = databus.enemys.length; i < il; i++) 
    {
      let enemy = databus.enemys[i]

      if (this.player.isCollideWith(enemy)) {
        databus.gameOver = false
        break
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea
    let areas = this.gamebegin.btnArea

    //出牌判断
    if (y >= (ctx.height / 2 - 100 + 180) && y <= (ctx.height / 2 - 100 + 230))
    {
      ctx.flag = x 
      ctx.flag = (ctx.flag - 80)/30
      ctx.status = !ctx.status
    }

    

    if (ctx.status)
    {
      if(x <= ctx.width && x >= ctx.width -100 && 
         y <= ctx.height /2 + 37 && y >= ctx.height /2)
         {
            for (var i = 0; i <= 13; i++) 
            {
              if (ctx.flag >= i && ctx.flag <= i + 1)
              {
                ctx.status = !ctx.status
                ctx.data[i] = Math.floor(Math.random() * 34)
                setTimeout(function () {
                  if (ctx.objectid1) {
                    const query = ctx.bmob.Query('_User');
                    query.get(ctx.objectid).then(res => {
                      ctx.showcard = res.cardData1
                    }).catch(err => {
                      console.log(err)
                    })
                    console.log("input=", ctx.showcard);
                    ctx.makesure = 1
                  }
                }, 500)
              }
            }
         }      
    }

    //判断输入username
    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y <= screenHeight / 2 - 24 && y >= screenHeight / 2 - 39 && ctx.loginon != 2 && !ctx.register)
    {
      wx.showKeyboard({
        defaultValue: 0,
        maxLength: 20,
        multiple: false,
        confirmHold: true,
        confirmType: 'done'
      });
      ctx.cvalue = 2;
    }

    //判断输入password
    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y <= screenHeight / 2 + 10 && y >= screenHeight / 2 - 5 && ctx.loginon != 2 && !ctx.register) 
    {
      wx.showKeyboard({
        defaultValue: 0,
        maxLength: 20,
        multiple: false,
        confirmHold: true,
        confirmType: 'done'
      });
      ctx.cvalue = 3;
    }
    //注册输入
    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= screenHeight
      / 2 - 51 && y <= screenHeight / 2 - 37 && ctx.register && ctx.loginon != 2)
    {
        wx.showKeyboard({
          defaultValue: 0,
          maxLength: 20,
          multiple: false,
          confirmHold: true,
          confirmType: 'done'
        });
        ctx.cvalue = 4;
    }

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= screenHeight
      / 2 - 20 && y <= screenHeight / 2 - 6 && ctx.register && ctx.loginon != 2) 
    {
      wx.showKeyboard({
        defaultValue: 0,
        maxLength: 20,
        multiple: false,
        confirmHold: true,
        confirmType: 'done'
      });
        ctx.cvalue = 5;
    }

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= screenHeight
      / 2 + 13 && y <= screenHeight / 2 + 27 && ctx.register && ctx.loginon != 2) 
    {
      wx.showKeyboard({
        defaultValue: 0,
        maxLength: 20,
        multiple: false,
        confirmHold: true,
        confirmType: 'done'
      });
        ctx.cvalue = 6;
    }

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= screenHeight
      / 2 + 45 && y <= screenHeight / 2 + 59 && ctx.register && ctx.loginon != 2) 
    {
      wx.showKeyboard({
        defaultValue: 0,
        maxLength: 20,
        multiple: false,
        confirmHold: true,
        confirmType: 'done'
      });
        ctx.cvalue = 7;
    }

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= screenHeight
      / 2 + 100 && y <= screenHeight / 2 + 114 && ctx.register && ctx.loginon != 2)
      {
        ctx.rre = 1;
        ctx.register = 0;
        this.single = 0;
      }

    setTimeout(function () {
      if (ctx.objectid1) {
        const query = ctx.bmob.Query('_User');
        query.get(ctx.objectid).then(res => {
          ctx.showcard = res.cardData1
        }).catch(err => {
          console.log(err)
        })
        console.log("input=", ctx.showcard);
      }
    }, 500)

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y >= 
      screenHeight / 2 + 44 && y <= screenHeight / 2 + 59 && ctx.loginon != 2 
      && !ctx.register && ctx.username && ctx.password)
      {
        ctx.loginon = 2;
        this.single = 0;
      }

    if (x >= screenWidth / 2 + 101 && x <= screenWidth / 2 + 260 && y>= 
      screenHeight / 2 + 74 && y <= screenHeight / 2 + 89)
      {
        ctx.register = 1;
      }

    //创建房间列表
    if (x >= areas.startX
      && x <= areas.endX
      && y >= areas.startY
      && y <= areas.endY && !ctx.join && ctx.loginon == 2)
      // this.restart()
      {
        ctx.c = 2
        ctx.back = true
      }

    //加入房间列表
    if (x >= areas.startX - 169 
      && x <= areas.endX -169 
      && y >= areas.startY
      && y <= areas.endY && !ctx.join && ctx.loginon == 2)
      {
        ctx.c = 3
        ctx.back = true
      }

    //大厅界面
    if (x >= ctx.width/2 + 129 && x <= ctx.width/2 + 249 && y >= ctx.height/2 - 100 && y <= ctx.height/2 -60 && !ctx.back)
      {
        ctx.c = 0
        render()
        console.log("你好")
      }

    //game界面
    if (x >= 380 && x <= 530 && ctx.join)
      {
        ctx.c = 1
        ctx.join = 1
        ctx.back = false
      }
  }
 

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (this.time == 0) {
      this.touchHandler = this.touchEventHandler.bind(this);
      canvas.addEventListener('touchstart', this.touchHandler);
      this.onKeyboardOK = this.onKeyboardConfirm.bind(this);
      wx.onKeyboardConfirm(this.onKeyboardConfirm);
      ctx.loginon = 0;
      this.time = 1;
    }

    if(ctx.c == 0)
    {
        if (ctx.loginon == 2 && this.single == 0) {
          this.room.onStart(ctx);
          this.single = 1;
        }
        if (ctx.rre == 1 && this.single == 0){
          this.room.tryregister(ctx);
          this.single = 1;
        }
        this.bg.render(ctx);
        this.gamebegin.renderGameBegin(ctx, databus.score);
        if(ctx.loginon != 2)
        {
          this.loginon.renderLoginon(ctx);
        }
        ctx.join = 0;
        // if (!ctx.num) {
          
        //   ctx.num++
        // }
        
    }
        
    if(ctx.c == 1)
    {
        this.gamehu.rendergamehu(ctx)
        this.gamebegin.rendergameshow(ctx)
    }

    if(ctx.c == 2)
    {
        this.room.renderroom(ctx)
    }

    if(ctx.c == 3)
    {
        this.room.renderroom(ctx)
    }
    // this.gameinfo.renderGameScore(ctx)
    // this.gameinfo.renderGameScore(ctx, ctx.flag)
    // 游戏结束停止帧循环
    // if (databus.gameOver) {
    //   this.gameinfo.renderGameOver(ctx, databus.score)

    //   if (!this.hasEventBind) {
    //     this.hasEventBind = true
    //     this.touchHandler = this.touchEventHandler.bind(this)
    //     canvas.addEventListener('touchstart', this.touchHandler)
    //   }
    // }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.bg.update(ctx)

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update()
      }) 

    this.collisionDetection()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  onKeyboardConfirm(value){
    wx.hideKeyboard();
    if (!value)
      return;
    value = value.value;
    //登录
    if(ctx.cvalue == 2)
    {
      ctx.username = value;
    }
    if(ctx.cvalue == 3)
    {
      ctx.password = value;
    }
    //注册
    if(ctx.cvalue == 4)
    {
      ctx.rusername = value;
    }
    if(ctx.cvalue == 5)
    {
      ctx.rpassword = value;
    }
    if(ctx.cvalue == 6)
    {
      ctx.email = value;
    }
    if(ctx.cvalue == 7)
    {
      ctx.phonenum = value;
    }
  }
}
