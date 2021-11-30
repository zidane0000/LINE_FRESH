const { LineClient } = require('messaging-api-line');

const client = new LineClient({
  accessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

client.pushText(process.env.userid, '嗨，林哲立，還喜歡這次安排的旅遊行程嗎？相信在走訪各個景點時，發現了各種有趣的事情、聽到了不少趣味的在地故事，也想將本次的旅行經驗分享給更多人，讓更多人知道。\n昨天你拜訪了雲林布袋戲館，你在這邊有什麼有趣的事情或故事嗎？或是你在附近發現了什麼隱藏版的美食嗎？趕快跟我分享吧 ~')
client.pushTemplate(process.env.userid, '分享旅行心得', {
  type: 'buttons',
  thumbnailImageUrl: 'https://media.zenfs.com/en/yahoo__216/12bd2d1293bf54b2596286db5577c5a7',
  title: '分享旅行心得',
  text: '趕快跟我分享',
  actions: [
    {
      type: 'uri',
      label: '上 Line Spot 分享！',
      uri: 'https://liff.line.me/1656666015-WGqkN4Z9',
    }
  ],
});