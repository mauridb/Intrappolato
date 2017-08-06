const TelegramBot = require('node-telegram-bot-api');
const token = '412462310:AAGfeocr8AAm-aT-kvwGHl5lonE5K2ovjwE';
const game = new TelegramBot(token, {polling: true});

var test = []

var attempts = 0;
console.log('Game Running');
console.log('Digits..');
game.onText(/\/start/, (msg) => {
     
      const chatId = msg.chat.id;
      const resp = 'Bot active';
      console.log('ChatID: '+ chatId);
      console.log('MSG:');
      console.log(msg);
      test.push(chatId);
      console.log(test);
       
      game.sendMessage(365293854, 'michi culo');   
      game.sendMessage(chatId, resp);
      attempts += 1;
      console.log(attempts);
      });


game.onText(/\/administrator/, (msg) => {

          const chatId = msg.chat.id;
          const resp = 'Bot active';
          console.log('ChatID: '+ chatId);
          console.log('MSG:');
          console.log(msg);

          game.sendMessage(365293854, 'michi culo');
          game.sendMessage(chatId, resp);
          attempts += 1;
          console.log(attempts);
          });

game.onText(/\/1 (.+)/, (msg, match) => {

          const chatId = msg.chat.id;
          const resp = match[1];
          if (resp == 'corretto'){
            for (var i = 0; i<test.length; i++){
              game.sendMessage(test[i], 'vai in cucina ..');
            } 
          }else {
          game.sendMessage(chatId, 'ERRORE!!!!');
          }
          attempts += 1;
          console.log(attempts);
          });
