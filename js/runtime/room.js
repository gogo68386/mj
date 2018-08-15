import BGS from '../bmobgamesdk/bgsapi'

let model = BGS.instance
let bc = new Image()
bc.src = 'images/bcroom.jpg'
let atlas = new Image()
atlas.src = 'images/btn_enter_room.png'
let page = new Image()
page.src = 'images/Title.png'
let c = 0
var i = 0
var name = []
var createid = false
var ObjectId = "id"
var join = 0
//加载Bmob的sdk
var Bmob = require("../hydrogen-js-sdk-master/dist/Bmob-1.6.1.min");
Bmob.initialize("3d6121b8af9a2e00a7a16c768cbed4c5", "e035be4f6e3d3ee3ef8daa5d057f87e6","cd76e191abe815c3d95c1b3cdcc76dc0");

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Gamehu {
  onStart(ctx) {
    this.alert('正在登录1...');
    this.isTrying = false;
    this.tryLogin1(ctx);
  }

  tryLogin1(ctx) {
    Bmob.User.login(ctx.username, ctx.password).then(res => {
      ObjectId = res.objectId
      ctx.objectid = ObjectId
      ctx.roomid = res.roomid
      ctx.createid = res.createid
      console.log(res.objectId)
      console.log("ObjectId=",ObjectId)
      ctx.bmob = Bmob
    }).catch(err => {
      console.log(err)
    });
    //给房间列表赋值，并获取房间号
    const query = Bmob.Query('_User');
    query.equalTo("createid", "==", true);
    query.order("roomid");
    query.count().then(res => {
      console.log(res)
      ctx.roomidd = res;
      console.log("ctx.roomidd=", ctx.roomidd);
    });
    setTimeout(function () {
      query.equalTo("createid", "==", true);
      query.order("roomid");
      query.find().then(res => {
        for (this.i = 0; this.i <= ctx.roomidd; this.i++) {
          console.log(res[this.i].roomid)
          ctx.name[this.i] = res[this.i].username
        }
      });
    }, 0)
  }

  tryregister(ctx) {
      let params = {
        username: ctx.rusername,
        password: ctx.rpassword,
        email: ctx.email,
        phone: ctx.phonenum,
      }
      Bmob.User.register(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
  }

  alert(msg) {
    this.alertText = msg;
    console.log(msg)
  }

  renderroom(ctx){
    //创建房间并对createid赋值为true
    if(!ctx.join && ctx.c != 3)//此处只能执行一次
    {
      const query = Bmob.Query('_User');
      query.get(ObjectId).then(res => {
        ctx.roomid = res.roomid
        ctx.createid = res.createid
      }).catch(err => {
        console.log(err)
      })
      console.log("1roomid =",ctx.roomid);
      setTimeout(function(){
        console.log("createid1 =", ctx.createid);
      },1000)
      if(!ctx.createid){
        query.get(ObjectId).then(res => {
          console.log(res)
          res.set('createid', true)
          res.save()
        }).catch(err => {
          console.log(err)
        })
      }
      ctx.join = 1
    }
    //绘制背景图片
    ctx.drawImage(
      bc,
      0, 0, 900, 506,
      0, 0, screenWidth, screenHeight
    )

    if (ctx.c != 3) {
      setTimeout(function(){
        console.log("ictx.createid=", ctx.createid);        
      },1000)
      if (!ctx.joinnn && !ctx.createid){
        const query = Bmob.Query('_User');
          query.get(ObjectId).then(res => {
          console.log(res)
          res.set('roomid', ctx.roomidd)
          res.save()
        }).catch(err => {
          console.log(err)
        })
        console.log("Helloworld!");
        query.equalTo("createid", "==", true);
        query.order("roomid");
        query.count().then(res => {
          console.log(res)
          ctx.roomidd = res + 1;
          // console.log("ctx.roomidd=", ctx.roomidd);
        });
        setTimeout(function () {
          query.equalTo("createid", "==", true);
          query.order("roomid");
          query.find().then(res => {
            for (this.i = 0; this.i <= ctx.roomidd-1; this.i++) {
              console.log(res[this.i].roomid)
              ctx.name[this.i] = res[this.i].username
            }
          });
        }, 1000)
        ctx.joinnn = 1;
      }
      ctx.fillText(
        '房间号:',
        5, 70
      )
      if (ctx.createid) {
        // console.log("1=",ctx.roomid)
        ctx.fillText(
          ctx.roomid,
          75, 70
        )
      } else {
        // console.log("2=",ctx.roomidd)
        ctx.fillText(
          ctx.roomidd,
          75, 70
        )
      }
      ctx.fillText(
        '房主:',
        105, 70
      )
      ctx.fillText(
        ctx.username,
        155, 70
      )
      ctx.fillText(
        '房间人数:',
        240, 70
      )
      ctx.fillText(
        4,
        330, 70
      )
      ctx.fillText(
        '等待玩家加入...',
        380, 70
      )
      ctx.drawImage(
        atlas,
        0, 0, 383, 159,
        380, 120, 120, 40
      )
    }
    ctx.font = "16px Arial"
    if (ctx.c == 3) {
      ctx.join = 1;
    // console.log("ctx.roomidd_1=",ctx.roomidd);
    for (var i = 1; i <= ctx.roomidd; i++) {
        
        ctx.fillText(
          '房间号:',
          5, 70 + (i - 1) * 80
        )
        ctx.fillText(
          i,
          75, 70 + (i - 1) * 80
        )
        ctx.fillText(
          '房主:',
          105, 70 + (i - 1) * 80
        )
        ctx.fillText(
          ctx.name[i - 1],
          155, 70 + (i - 1) * 80
        )
        ctx.fillText(
          '房间人数:',
          240, 70 + (i - 1) * 80
        )
        ctx.fillText(
          4,
          330, 70 + (i - 1) * 80
        )
        ctx.drawImage(
          atlas,
          0, 0, 383, 159,
          380, 40 + (i - 1) * 80, 120, 40
        )
        ctx.drawImage(
          page,
          109, 34, 123, 45,
          530, 140, 14, 11
        )
        ctx.drawImage(
          page,
          109, 34, 123, 45,
          530, 180, 14, 11
        )
      }
    }
  
      // if(!join){
      // const query1 = Bmob.Query('_Role');
      // if (roomid == 1) {
      //   query1.get('s0zG3339').then(res => {
      //     console.log(res)
      //     res.set('userobjectid', ObjectId)
      //     res.save()
      //   }).catch(err => {
      //     console.log(err)
      //   });
      // } else if (roomid == 2) {
      //   console.log("switch case in");
      //   query1.get('s0zG3339').then(res => {
      //     console.log(res)
      //     res.set('userobjectid1', ObjectId)
      //     res.save()
      //   }).catch(err => {
      //     console.log(err)
      //   });
      // } else if (roomid == 3) {
      //   query1.get('s0zG3339').then(res => {
      //     console.log(res)
      //     res.set('userobjectid2', ObjectId)
      //     res.save()
      //   }).catch(err => {
      //     console.log(err)
      //   });
      // } else {
      //   query1.get('s0zG3339').then(res => {
      //     console.log(res)
      //     res.set('userobjectid3', ObjectId)
      //     res.save()
      //   }).catch(err => {
      //     console.log(err)
      //   });
      // }
      // query1.get('s0zG3339').then(res => {
      //   console.log("success=", res.userobjectid, res.userobjectid1, res.userobjectid2, res.userobjectid3);
      //   ctx.objectid1 = res.userobjectid
      //   ctx.objectid2 = res.userobjectid1
      //   ctx.objectid3 = res.userobjectid2
      //   ctx.objectid4 = res.userobjectid3
      // }).catch(err => {
      //   console.log(err)
      // })
      // join = 1;
      // }
    } 
}       


