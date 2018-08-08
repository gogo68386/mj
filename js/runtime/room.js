import BGS from '../bmobgamesdk/bgsapi'

let model = BGS.instance
let bc = new Image()
bc.src = 'images/bcroom.jpg'
let atlas = new Image()
atlas.src = 'images/btn_enter_room.png'
let c = 0
let name = 0
var createid = false
var roomid = 0
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
      console.log(res.objectId)
      console.log("ObjectId=",ObjectId)
      ctx.bmob = Bmob
    }).catch(err => {
      console.log(err)
    });
  }

  alert(msg) {
    this.alertText = msg;
    console.log(msg)
  }

  renderroom(ctx){
    
    if(!ctx.join && ctx.c != 3)//此处只能执行一次
    {
      // model.CreateRoom(model.getUserId(),4,console.log("创建房间成功!"),ctx);
      setTimeout(function(){console.log(ctx.rid)},1500);
      // ctx.c = 1
      const query = Bmob.Query('_User');
      query.get(ObjectId).then(res => {
        console.log("success,name =", res.name)
        name = res.name
        roomid = res.roomid
      }).catch(err => {
        console.log(err)
      })
      const query1 = Bmob.Query('_User');
      query1.get(ObjectId).then(res => {
        console.log(res)
        res.set('createid', true)
        res.save()
      }).catch(err => {
        console.log(err)
      })
      ctx.join = 1
    }
    
    ctx.drawImage(
      bc,
      0, 0, 900, 506,
      0, 0, screenWidth, screenHeight
    )
    if (ctx.c == 3 && !ctx.join) {
      const query = Bmob.Query('_User');
      query.get(ObjectId).then(res => {
        name = res.name
        roomid = res.roomid
        createid = res.createid
        console.log("success,name =", res.roomid)
        
      }).catch(err => {
        console.log(err)
      })
      
      ctx.join = 1
    }
   

    for (var i = 0 ; i <= roomid - 1; i++) {
      
      ctx.fillText(
        '房间号:',
        5, 70 + i * 80
      )
      ctx.fillText(
        i,
        75, 70 + i * 80
      )
      if(createid)
      {
        ctx.fillText(
          '房主:',
          105, 70 + i * 80
        )
        ctx.fillText(
          name,
          155, 70 + i * 80
        )
      }else{
        ctx.fillText(
          '玩家:',
          105, 70 + i * 80
        )
        ctx.fillText(
          name,
          155, 70 + i * 80
        )
      }
      ctx.fillText(
        '房间人数:',
        240, 70 + i * 80
      )
      ctx.fillText(
        4,
        330, 70 + i * 80
      )
      ctx.drawImage(
        atlas,
        0, 0, 383, 159,
        380, 40 + i * 80, 120,40
      )
      if (!join) {
        console.log(roomid)
        const query1 = Bmob.Query('_Role');
        if (roomid == 1) {
          query1.get('s0zG3339').then(res => {
            console.log(res)
            res.set('userobjectid', ObjectId)
            res.save()
          }).catch(err => {
            console.log(err)
          });
        } else if (roomid == 2) {
          console.log("switch case in");
          query1.get('s0zG3339').then(res => {
            console.log(res)
            res.set('userobjectid1', ObjectId)
            res.save()
          }).catch(err => {
            console.log(err)
          });
        } else if (roomid == 3) {
          query1.get('s0zG3339').then(res => {
            console.log(res)
            res.set('userobjectid2', ObjectId)
            res.save()
          }).catch(err => {
            console.log(err)
          });
        } else {
          query1.get('s0zG3339').then(res => {
            console.log(res)
            res.set('userobjectid3', ObjectId)
            res.save()
          }).catch(err => {
            console.log(err)
          });
        }
        query1.get('s0zG3339').then(res => {
          console.log("success=", res.userobjectid, res.userobjectid1, res.userobjectid2, res.userobjectid3);
          ctx.objectid1 = res.userobjectid
          ctx.objectid2 = res.userobjectid1
          ctx.objectid3 = res.userobjectid2
          ctx.objectid4 = res.userobjectid3
        }).catch(err => {
          console.log(err)
        })
        join = 1;
      }
    }
  }
}