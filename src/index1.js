const flex_messages = require('./flex_message');
const line = require('@line/bot-sdk');
const _ = require('lodash')

const CarouselText = 'this is a Carousel Template'
var card1 = [
  {title:'雲林故事館', text:'雲林故事館・雲林的老故事都在這棟老房子裡', postBackData:'action', uri:'https://img.journey.tw/20180408220323_54.jpg',},
  {title:'虎尾驛', text:'虎尾驛為中華民國雲林縣虎尾鎮一已廢棄木造火車站，原是虎尾糖廠小火車車站。', postBackData:'action', uri:'https://i2.wp.com/ivychi.com/wp-content/uploads/20201104123257_57.jpg',},
  {title:'不，我想看看商圈美食', text:'美食才是王道', postBackData:'action', uri:'https://saratrip.com/wp-content/uploads/2021/04/%E7%B6%B2%E9%A0%81%E6%A8%99%E9%A1%8C.003-1-1.jpg',}]
var card2 = [
  {title:'虎尾王家當歸鴨麵線', text:'每日嚴選！開業超過半世紀的當歸鴨名店', postBackData:'action', uri:'https://candicecity.com/wp-content/uploads/2020/06/DSC06797.jpg',},
  {title:'虎尾魷魚羹麵', text:'在地銅板小吃飄香40年。肉羹麵/魷魚羹/切仔麵/滷肉飯/嘴邊肉', postBackData:'action', uri:'https://tour.yunlin.gov.tw/upload/shopInfo/20180719115952.jpg',},
  {title:'阿榮古早味', text:'銅板價格的美食，大推半熟香煎鴨蛋', postBackData:'action', uri:'https://pic.pimg.tw/max11015/1570999264-4058536552_l.jpg',},
  {title:'不，我想看看伴手禮糕餅店', text:'2021雲林虎尾8家必買伴手禮', postBackData:'action', uri:'https://www.niusnews.com/upload/posts/posts_image3_105518_1619689639.jpg',}]
var card3 = [
  {title:'隨性探索家', text:'髓性探索家喜歡不受拘束的旅程，享受著旅程中的大小事。不一定要安排很多行程，凡事講求剛剛好就好', label:'匹配屬於我的專屬行程', displayText:'匹配屬於我的專屬行程', postBackData:'action', uri:'https://d189djjbmcrkk.cloudfront.net/tinymce/wQ4p1N68i9K0m5xVFPEN6LiWzyWsc9a8vaCZ9hhz.jpeg',}]
const toColumn = record => {
  return {
    thumbnailImageUrl: record.uri,
    title: record.title,
    text: record.text,

    actions: [{
        type: 'postback',
        label: record.label?record.label:'選擇',
        displayText: record.displayText?record.displayText:record.title,
        data: record.postBackData,
    }, ]
  }
}

const bot = new line.Client({channelAccessToken: process.env.LINE_ACCESS_TOKEN});
const user_table = []
const own_name = '頑伴'

module.exports = async function App(context) {
  // 1.確認使用者是否在user_table中  
  if(user_table[context.event.source.userId] == undefined){
    if (Object.keys(user_table).length < 10) {
      await bot.getProfile(context.event.source.userId)
      .then((profile) => {
        user_table[context.event.source.userId] = {
          'profile': profile,
          'count': 0,
        }
      })
      .catch((err) => {
        console.log('Error in getProfile')
      });
    }
    else{
      await context.replyText(`親，現在正在測試中，請稍等喔~`);
    }
  }
  
  // 2.根據使用者的count回答
  switch (user_table[context.event.source.userId].count) {    
//     case 0:
//       await context.replyText(
// `${user_table[context.event.source.userId].profile.displayName},您好！
// 歡迎使用${own_name}的旅程顧問服務，我們致力於提供依據心理測驗結果的客製化旅遊行程。
// 有什麼我可以幫您的嗎？`);
//       break;
    case 1:
      await context.replyText(
`國慶連假的話住宿目前已經快被訂完囉～
不過如果只有兩位的話，${own_name}剛剛幫您們看了一下，目前還是有很多選擇的。
想請問您有什麼特定的景點是您特別想去的嗎？`);
      break;
    case 2:
      await context.replyText(`您是說雲林布袋戲館嗎？您真有眼光，這可是雲林虎尾商圈的三寶之一呢～`);
      await context.replyText(`除了雲林布袋戲館，還有需要安排相關的歷史古蹟景點嗎`);      
      await context.replyCarouselTemplate( CarouselText, _.map(card1, toColumn));
      break;    
    case 3:
      await context.replyCarouselTemplate( CarouselText, _.map(card2, toColumn));
      break;
    case 4:
      await context.replyText(
`您的選擇是虎尾王家當歸鴨麵線
虎尾王家當歸鴨麵線，台灣南部為數眾多的當歸鴨，中藥熬煮的湯頭深色卻清爽，即使不愛中藥的人也可以接受。鴨腿麵線貼心的將骨肉分離，肉質Ｑ軟不乾柴，另外拌入鴨油蔥及醬油膏的乾麵線及鴨油飯則是香氣撲鼻，簡單就很美味，小菜部分可以選擇每桌必點的米血，軟嫩口感帶著淡淡米香一片只要10元ＣＰ值非常高。
以上是虎尾王家當歸鴨麵線的資料提供您參考
地圖連結:https://g.page/huweiduckcom?share`);
      await context.replyConfirmTemplate('感覺到你很喜歡美食，有興趣參與我們的人格測驗，匹配出專屬你的專屬行程嗎?', {
        text: '感覺到你很喜歡美食，有興趣參與我們的人格測驗，匹配出專屬你的專屬行程嗎?',
        actions: [
          {
            type: 'message',
            label: '是',
            text: '是',
          },
          {
            type: 'message',
            label: '否',
            text: '否',
          },
        ],
      });
      break;
    case 5:
      await context.replyConfirmTemplate('在旅行中，你是個注重儀式感的人嗎?', {
        text: '在旅行中，你是個注重儀式感的人嗎?\n是，選擇特色餐廳\n否，選擇在地小吃',
        actions: [
          {
            type: 'message',
            label: '是',
            text: '是，選擇特色餐廳',
          },
          {
            type: 'message',
            label: '否',
            text: '否，選擇在地小吃',
          },
        ],
      });
      break;
    case 6:
      await context.replyConfirmTemplate('如果今天有一條百年老店美食街，你會選擇', {
        text: '如果今天有一條百年老店美食街，你會選擇\n從頭逛到尾，再決定在哪間店用餐\n逛第一條街，遇到心儀的店家就直接用餐',
        actions: [
          {
            type: 'message',
            label: '從頭逛到尾',
            text: '從頭逛到尾，再決定在哪間店用餐',
          },
          {
            type: 'message',
            label: '逛第一條街',
            text: '逛第一條街，遇到心儀的店家就直接用餐',
          },
        ],
      });
      break;
    case 7:
      await context.replyConfirmTemplate('進入店家後點餐，發現你想吃的餐點賣完了，你會', {
        text: '進入店家後點餐，發現你想吃的餐點賣完了，你會\n點其他餐點，之後再到其他間吃\n不用餐直接離開這間店',
        actions: [
          {
            type: 'message',
            label: '點其他餐點',
            text: '點其他餐點，之後再到其他間吃',
          },
          {
            type: 'message',
            label: '不用餐',
            text: '不用餐直接離開這間店',
          },
        ],
      });
      break;
    case 8:
      await context.replyConfirmTemplate('在下一間店享用完餐點後，當店員推銷伴手禮，你會', {
        text: '在下一間店享用完餐點後，當店員推銷伴手禮，你會\n心動了不比價，直接在餐廳購買\n貨比三家，選擇逛完整條街的店家再做選擇',
        actions: [
          {
            type: 'message',
            label: '不比價',
            text: '心動了不比價，直接在餐廳購買',
          },
          {
            type: 'message',
            label: '貨比三家',
            text: '貨比三家，選擇逛完整條街的店家再做選擇',
          },
        ],
      });
      break;
    case 9:
      await context.replyText(`在旅程中，您通常會需要有充足的購物時間嗎？`)
      break;
    case 10:
      await context.replyText(
`原來您跟我一樣式血拼的同道中人呢（笑
比起隨性的行程安排，您會更喜歡緊湊的行程安排，這樣才能去更多地方嗎？`)
      break;    
    case 11:
      await context.replyText(`在人多熱鬧的地方，您通常會感到活力充沛，還是覺得頗有壓力呢？`)
      break;
    case 12:
      await context.replyText(`那麼除了吃美食，也會想買伴手禮和家人分享嗎?`)
      break;
    case 13:
      await context.replyText(
`拍照打卡能記錄當下的美好，我也很喜歡呢?
在旅程的最後，到商圈附近的戶外景點與特色咖啡廳
帶張美景和咖啡回家，也會是不錯的選擇喔`)
      break;  
    case 14:
      await context.replyText(
`沒問題！旅程顧問正在安排你的行程
在此預祝你有個美好的旅程，也期待你再次訪問虎尾商圈`)
      await context.replyText(`測驗結果計算中..`)
      await context.replyCarouselTemplate( CarouselText, _.map(card3, toColumn));
      break;
    case 15:
      await context.replyText(`正在匹配屬於您的專屬行程..`)
      await context.replyImage({
        originalContentUrl: 'https://i.imgur.com/7z2jGSr.jpeg',
        previewImageUrl: 'https://i.imgur.com/7z2jGSr.jpeg',
      });
      await context.replyCarouselTemplate( CarouselText, [{
          thumbnailImageUrl: 'https://th.bing.com/th/id/R.c1320301e5bbfbbdcbcf90f0682195c4?rik=UB1WWCrGlJA2kQ&pid=ImgRaw&r=0',
          title: '虎尾文創之旅',
          text: '適合熱愛文化，且勇於探索的你',
          actions: [
            {
              type: 'uri',
              label: '查看行程規劃',
              uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
            },
            {
              type: 'uri',
              label: '上LINE Spot看心得！',
              uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
            },
          ],
        },
        {
          thumbnailImageUrl: 'https://th.bing.com/th/id/OIP.PBE3tCnh9OksNsZULnbrgwHaHf?pid=ImgDet&rs=1',
          title: '虎尾美食探索',
          text: '適合以食為天，喜歡品嘗地方美食的你',
          actions: [
            {
              type: 'uri',
              label: '查看行程規劃',
              uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
            },
            {
              type: 'uri',
              label: '上LINE Spot看心得！',
              uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
            },
          ],
        },
      ]);      
      break;
    case 16:
      await context.replyText(
`嗨，${user_table[context.event.source.userId].profile.displayName}，還喜歡這次安排的旅遊行程嗎？相信在走訪各個景點時，發現了各種有趣的事情、聽到了不少趣味的在地故事，也想將本次的旅行經驗分享給更多人，讓更多人知道。
昨天你拜訪了雲林布袋戲館，你在這邊有什麼有趣的事情或故事嗎？或是你在附近發現了什麼隱藏版的美食嗎？趕快跟我分享吧 ~`)
      await context.replyCarouselTemplate( CarouselText, [{
          thumbnailImageUrl: 'https://media.zenfs.com/en/yahoo__216/12bd2d1293bf54b2596286db5577c5a7',
          title: '分享旅行心得',
          text: '趕快跟我分享~',
          actions: [
            {
              type: 'uri',
              label: '上LINE Spot 分享！',
              uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
            }
          ],
        },        
      ]);      
      break;
  }

  // 3.計數，當超過設定時歸零
  user_table[context.event.source.userId].count+=1
  if(user_table[context.event.source.userId].count > 16){
    user_table[context.event.source.userId].count = 0
  }

  // await context.replyText(`測試${user_table[context.event.source.userId].count}`);
};