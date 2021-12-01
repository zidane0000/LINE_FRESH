const line = require('@line/bot-sdk');
const { LineClient } = require('messaging-api-line');

const user_table = []
const bot = new line.Client({channelAccessToken: process.env.LINE_ACCESS_TOKEN});

const client = new LineClient({
    accessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
  });
  
// client.pushText(process.env.userid, '林哲立您好\n我是虎尾商圈的小管家頑伴，作為你們的一日嚮導，我會帶領你們體驗商圈文化與在地美食，解救觀光客對於美食與景點的選擇困難症。')
client.pushConfirmTemplate(process.env.userid, '請選擇你要體驗的關卡', {
    text: '請選擇你要體驗的關卡',
    actions: [
        {
        type: 'message',
        label: '美食',
        text: '美食',
        },
        {
        type: 'message',
        label: '美景',
        text: '美景',
        },
    ],
})



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
        case 0:
        await context.replyConfirmTemplate('闖關者你好歡迎來到「假網美」在地人的景點關卡，只有和景點進行指定動作五連拍後，才能獲得最終的「真文青」在地人勳章\n請從兩個主題關鍵字，選擇你要成為的在地人', {
            text: '闖關者你好歡迎來到「假網美」在地人的景點關卡，只有和景點進行指定動作五連拍後，才能獲得最終的「真文青」在地人勳章\n請從兩個主題關鍵字，選擇你要成為的在地人',
            actions: [
            {
                type: 'message',
                label: '歷史古蹟',
                text: '歷史古蹟',
            },
            {
                type: 'message',
                label: '書店打卡',
                text: '書店打卡',
            },
            ],
        });
        break;
        case 1:
        await context.replyConfirmTemplate('你的選擇是「歷史古蹟」，雲林布袋戲館將會是你的闖關起點\n雲林布袋戲館，原為日治時代之台南州虎尾郡郡役所，據雲林縣虎尾鎮都市發展計畫所列，民國八十六年雲林縣在虎尾鎮舉辦全國文藝季，結合多項虎尾當地重要文史特色，如糖廠產業文化，布袋戲展演藝術等，舊郡役所的價值與保存出現契機。\n請從兩個體驗活動，選擇你想要了解的歷史\n布袋戲的源流\n布袋戲館建築特色', {
            text: '你的選擇是「歷史古蹟」，雲林布袋戲館將會是你的闖關起點\n雲林布袋戲館，原為日治時代之台南州虎尾郡郡役所，據雲林縣虎尾鎮都市發展計畫所列，民國八十六年雲林縣在虎尾鎮舉辦全國文藝季，結合多項虎尾當地重要文史特色，如糖廠產業文化，布袋戲展演藝術等，舊郡役所的價值與保存出現契機。\n請從兩個體驗活動，選擇你想要了解的歷史\n布袋戲的源流\n布袋戲館建築特色',
            actions: [
            {
                type: 'message',
                label: '源流',
                text: '源流',
            },
            {
                type: 'message',
                label: '建築特色',
                text: '建築特色',
            },
            ],
        });
        break;    
        case 2:
        await context.replyText('你的選擇是「布袋戲的源流」，分為「洲派」和「閣派」\n台灣有兩大布袋戲流派源自雲林，黃海岱所創立「五洲園」及其傳徒，為「洲派」；鍾任祥創立「新興閣」及其傳徒，為「閣派」，兩大布袋戲派系，對近代台灣布袋戲發展，均有重要的影響力。\n請移動到雲林布袋戲館後發送定位訊息，即可開始挑戰');
        break;    
        case 3:
        await context.replyText('歡迎來到雲林布袋戲館！請問布袋戲的發展歷史大致可以分為哪四個時期呢？\nP.S. 答案就在一樓的展區中喔～～');
        break;   
        case 4:
        await context.replyText('正確答案！！！\n瞭解完布袋戲的發展歷史後，我們來看看現代的布袋戲究竟有哪些趨勢～\n請到二樓掃雲林國際偶戲節的QR Code並透過網站上的探險包，並到館內尋找「洲派」和「閣派」的服裝作品 ，完成最後的闖關合照，並上傳按下完成，即可成功闖關。');
        break;  
        case 5:
        await context.replyText('恭喜闖關成功！！歡迎至初八拉麵使用五折優惠券，享用豚骨拉麵。\nhttps://lin.ee/6POhHSn');
        break;
    }

    // 3.計數，當超過設定時歸零
    user_table[context.event.source.userId].count+=1
    if(user_table[context.event.source.userId].count > 5){
        user_table[context.event.source.userId].count = 0
    }

    // await context.replyText(`測試${user_table[context.event.source.userId].count}`);
};