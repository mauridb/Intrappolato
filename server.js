const TelegramBot = require('node-telegram-bot-api');
const token = '412462310:AAGfeocr8AAm-aT-kvwGHl5lonE5K2ovjwE';
const game = new TelegramBot(token, {polling: true});
/*
TODO:
-1) istruzioni messaggi soluzioni per il player allo start;
    - breve ma chiara ed esaustiva con
    ESEMPIO:
        -"/sol 3-cacca"
        -"/sol 12-pupù"
-2) capire i messaggi(SMSprivati) ed il loro testo
    - 'Siete stati intrappolati! Controllate se volete! La porta è chiusa... Per sapere come uscire aprite il bot su Telegram: t.me/Intrappolato_bot. i BruPolSpa'

-3) logo
-4) indovinelli
-5) mappa indovinelli
-6) c'è da organizzare una cena
-7) Audio errore:
    -nelson
    -camera cafè cretino
    -capra capra capra
-8) video di invito
-9) sentire shorty
-10) pensare alla data   -----IMPORTANTE------
*/


var indovinelli = {
    "1":{
        "nome": "David",
        "soluzione":"abbondanza",
        "indizio":"vai in cucina, indizio"
    },
    "2":{
        "nome": "Cesare",
        "soluzione":"corretto",
        "indizio":"locazione quesito successivo, indizio2"
    },
    // "3":{
    //     "nome": "David",
    //     "soluzione":"abbondanza",
    //     "indizio":"vai in cucina, indizio"
    // },

}
var test = []
console.log(test)

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

    //   game.sendMessage(365293854, 'michi culo');
      game.sendMessage(chatId, resp);
      attempts += 1;
      console.log(attempts);
      });

// possiamo mandare messaggi a tutti i registrati con il comando start
game.onText(/\/adminB (.+)/, (msg, match) => {

          for (var i = 0; i<test.length; i++){
             game.sendMessage(test[i], match[1]+'. Bru');
          }
      });

game.onText(/\/adminP (.+)/, (msg, match) => {

        const chatId = msg.chat.id;
        const resp = 'Bot active';
        console.log('ChatID: '+ chatId);
        console.log('MSG:');
        console.log(msg);

      //   game.sendMessage(365293854, 'michi culo');
        for (var i = 0; i<test.length; i++){
           game.sendMessage(test[i], match[1]+'. Polneve');
        }
        game.sendMessage(chatId, resp);
        attempts += 1;
        console.log(attempts);
        });

game.onText(/\/adminS (.+)/, (msg, match) => {

          const chatId = msg.chat.id;
          const resp = 'Bot active';
          console.log('ChatID: '+ chatId);
          console.log('MSG:');
          console.log(msg);

        //   game.sendMessage(365293854, 'michi culo');
          for (var i = 0; i<test.length; i++){
             game.sendMessage(test[i], match[1]+'. Spaturno');
          }
          game.sendMessage(chatId, resp);
          attempts += 1;
          console.log(attempts);
          });



game.onText(/\/sol (.+)/, (msg, match) => { // gestisce soluzione quesito 1

  const chatId = msg.chat.id;
  var resp = match[1];
  var quesito = resp.split('-');
  var num_quesito = quesito[0];
  var soluzione = quesito[1];

  switch (num_quesito) {
      case '1':
          if (soluzione == 'corretto'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'vai in cucina ..');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
              game.sendAudio(chatId, './sounds/scream.wav');
          }
          break;
      case '2':
          if (soluzione == 'abbondanza'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'vai a cagare ..');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
    //   case expression:
    //
    //       break;
    //   case expression:
    //
    //       break;
    //   case expression:
    //
    //       break;
    //   case expression:
    //
    //       break;

      default:
        game.sendMessage(chatId, "Numero non trovato..")

  }


});
