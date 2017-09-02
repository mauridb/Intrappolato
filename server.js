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
    - 'Siete stati intrappolati! Controllate se volete! La porta è chiusa... Per sapere come uscire aprite il bot su Telegram: t.me/Intrappolato_bot e avviate scrivendo /start. i BruPolSpa'

-6) c'è da organizzare una cena, organizziamo assieme ad ele (MAURI) cena-mail scrivere da mail BruPolSpa di incontrare ele
-8) video di invito (BORIS) https://www.youtube.com/watch?v=k3yXl9mQCH0
-9) sentire shorty (SCRIVERE MAIL)(MICHI)
-10) pensare alla data 22 settembre??? scrivere a ele 2 o 3 settembre
-11) capire come rivelarsi, fosforescienti 10 settembre
-12) prepare quesiti (MICHI)
-13) posizionare quesiti (MAURI) da 3 giorni prima
-14) MICHI e MAURI testare il bot
*/


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
              game.sendMessage(test[i], 'quesito 5. \n');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
              game.sendAudio(chatId, './sounds/scream.wav');
          }
          break;
      case '2':
          if (soluzione == 'abbondanza'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 6.\nciò che avete trovato può aiutare a leggere qualcosa di incomprensibile.');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '3':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 4.\nleggerla a un cieco può aiutare');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '4':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 8.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '5':
          if (soluzione == 'abbondanza'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 5.\na polneve piacciono i cerchi.');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '6':
          if (soluzione == '312211'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 7.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '7':
          if (soluzione == '11' || soluzione == 'undici'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 11.\nsi accende la candela, si dice buonasera(accento derrone).');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '8':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 12.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '9':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 10.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '10':
          if (soluzione == '???' ){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 14.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '11':
          if (soluzione == 'agente italiano'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 15.\na volte le cose non vanno pensate su un foglio di carta.');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '12':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 13.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '13':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 17.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '14':
          if (soluzione == 'tetraedro' || soluzione == 'piramide'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 18.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '15':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '16':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '17':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '18':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '19':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '20':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case '21':
          if (soluzione == '???'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;
      case 'final':
          if (soluzione == 'perito meccanico'){
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'CE L\'AVETE FATTA..\nAFFACCIATEVI DAL BALCONE DELLA PASTORALE');
            }
          }else {
              game.sendMessage(chatId, 'ERRORE!!!!');
          }
          break;

      default:
        game.sendMessage(chatId, "Che minghia guaddi..")

  }


});
