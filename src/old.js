const coinranking = require('./coinranking'); // 還記得我們上面寫的 coinranking.js 吧
const flex_messages = require('./flex_message');

const coins = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin',},
  { id: 2, symbol: 'ETH', name: 'Ethereum',},
  { id: 3, symbol: 'XRP', name: 'XRP',},
];

module.exports = async function App(context) {
  if (context.event.isText) {
    await context.sendText(`哎呦，是文字訊息 - ${context.event.text}`);
  } else if (context.event.isImage) {
    await context.sendText(`哎呦，是圖片訊息 - ${context.event.image.url}`);
  } else if (context.event.isSticker) {
    await context.sendText('哎呦，是貼圖訊息');
    await context.sendSticker({
      packageId: '1',
      stickerId: '1',
    });
  } else if (context.event.isLocation) {
    await context.sendLocation({
      title: 'my location',
      address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
      latitude: 35.65910807942215,
      longitude: 139.70372892916203,
    });    
  } else if (context.event.isPayload) {
    console.log(context.event.payload); // 'USER_DEFINED_PAYLOAD'
  }

  // if ask BTC/ETH/XRP
  const { text } = context.event;
  for (let c of coins) {
    if (new RegExp(`(${c.symbol})|(${c.name})`, 'i').test(text)) {
      const {
        data: { coin },
      } = await coinranking.getCoin(c.id);
      await context.sendText(`${c.symbol} 現在價格是 ${coin.price} TWD`);
      return;
    }
  }
  
  // if ask flex
  const altText = 'this is a Flex';
  if(text == 'minimum') {
    await context.sendFlex(altText, flex_messages.Minimum);
  } else if(text == 'advanced') {
    await context.sendFlex(altText, flex_messages.Advanced);
  } else if(text == 'carousel') {
    await context.sendFlex(altText, flex_messages.Carousel);
  }
};


server.get('/send-id', (req, res) => {
  res.json({ id: process.env.LINE_LIFF_ID });
});

server.get('/liff', (req, res) => {
  const filename = path.join(`${__dirname}/liff.html`);
  res.sendFile(filename);
});