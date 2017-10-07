const TelegramBot = require('node-telegram-bot-api');
const token = '412462310:AAGfeocr8AAm-aT-kvwGHl5lonE5K2ovjwE';
const game = new TelegramBot(token, {polling: true});
const authors = ['Boris','Maurizio','Michele']
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


var test = [] // tutti gli user id
var usernames = {} // usernames del gioco per calcolare i punteggi
var problem_completed = [] // la lista di tutti gli indovinelli risolti
var problem_solved = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1]
// TODO:EasterEgg trucco per risolvere tutto il gioco, by Polneve (/BruPolSpa I <3 you)

var funny_errors = [
    'Easter Egg',
    './sounds/3.mpeg',
    './sounds/2.ogg',
    './sounds/haha.mp3',
]
var string_errors = [
    'Errore caro mio',
    'Acqua acquaaa',
    'Mmmh ritenta..',
    'Fuoco!\naspetta, aspetta che guardo.. \n no no, è proprio acqua!',
    'No no! Mi dicono che ci sei quasi eh! XD..',
    'Mmmh, anche no..',
]
var flag_error = ['Ester Egg',true, false];



console.log('Game Running..');
game.onText(/\/BruPolSpaI<3you/, (msg) => {
  problem_completed = problem_solved;
  for (var i = 0; i < test.length; i++){
      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\nUna volta risolto digitate \\sol final-...');
  }
});

game.onText(/\/start/, (msg) => {

      const chatId = msg.chat.id;
      const chatName = msg.chat.first_name;
      const resp = '!!! INTRAPPOLATO !!!\nUSERNAME: '+chatName;
      console.log('Registered: '+ chatName + ' ' + chatId );
    //   console.log('MSG:');
    //   console.log(msg);
      if (test.indexOf(chatId)>=0) {
          game.sendMessage(chatId, "Ti sei già registrato..\n Leggi bene le istruzioni.");
      }else {
          game.sendMessage(chatId, "!!! INTRAPPOLATO !!!\n USERNAME: "+chatName);
          test.push(chatId);
          usernames[chatName] = 0;
      }
      game.sendMessage(chatId, "ISTRUZIONI:\n Segui attentamente le regole del gioco...\nLa soluzione agli indovinelli va digitata proprio qui nella chat di Telegram.. e dovrà essere rigorosamente scritta nel seguente formato\n<<slash+sol+spaziovuoto+numeroquesito+latuasoluzione>>.\nProprio come vedi nell'esempio qui sotto.\n\n\nESEMPIO:\n''/sol 3-cacca''\n''/sol 12-pupù''\n\n Pensa attentamente alle soluzioni, le vite non sono infinite, per il migliore ci sarà un piccolo premio ;)\n\n\nBuona fortuna <"+chatName+'>\nBruPolSpa');

    //   console.log(test);
    //   console.log(usernames);
});

game.onText(/\/adminScores/, (msg) => {

    const chatId = msg.chat.id;
    var scores = []
    for (key in usernames){
        scores.push(key+' - '+usernames[key]);
    }
    game.sendMessage(chatId, 'I punteggi aggiornati:\n'+scores.join('\n'))
});

// possiamo mandare messaggi a tutti i registrati con il comando start
game.onText(/\/adminB (.+)/, (msg, match) => {

          for (var i = 0; i<test.length; i++){
             game.sendMessage(test[i], match[1]+'. Bru');
          }
      });

game.onText(/\/adminP (.+)/, (msg, match) => {

        const chatId = msg.chat.id;

      //   game.sendMessage(365293854, 'michi culo');
        for (var i = 0; i<test.length; i++){
           game.sendMessage(test[i], match[1]+'. Polneve');
        }
        });

game.onText(/\/adminS (.+)/, (msg, match) => {

          const chatId = msg.chat.id;
          const resp = 'Bot active';

          for (var i = 0; i<test.length; i++){
             game.sendMessage(test[i], match[1]+'. Spaturno');
          }
          });

game.onText(/\/sol (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const chatName = msg.chat.first_name;
  var resp = match[1];
  var quesito = resp.split('-');
  var num_quesito = quesito[0];
  var soluzione = quesito[1];

  switch (num_quesito) {
      case '1':
          if (soluzione == 'corretto'){
            if (problem_completed.indexOf(num_quesito)>=0) {
              game.sendMessage(chatId, "Problema già risolto..")
            }else{
                  for (var i = 0; i < test.length; i++){
                      game.sendMessage(test[i], 'quesito 5. \nPuò aiutare a leggere qualcosa di incomprensibile');
                  }
                  problem_completed.push(num_quesito)
                  usernames[chatName] += 1;

              }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '2':
          if (soluzione == 'abbondanza'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
                for (var i = 0; i < test.length; i++){
                  game.sendMessage(test[i], 'quesito 6.\nè sempre meglio descrivere bene la scena che si vede  sopra.');
                }
                problem_completed.push(num_quesito)
                usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '3':
          if (soluzione == '???'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
                for (var i = 0; i < test.length; i++){
                  game.sendMessage(test[i], 'quesito 4.\nleggerlo ad un cieco potrebbe aiutare');
                }
                problem_completed.push(num_quesito)
                usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '4':
          if (soluzione == 'orari'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 8.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

        }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '5':
          if (soluzione == 'gufo su ramo'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 9.\na polneve piacciono i cerchi.');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;

      case '6':
      if (soluzione == '312211'){
          if (problem_completed.indexOf(num_quesito)>=0) {
            game.sendMessage(chatId, "Problema già risolto..")
          }else{
        for (var i = 0; i < test.length; i++){
          game.sendMessage(test[i], 'quesito 7.\n');
        }
        problem_completed.push(num_quesito)
        usernames[chatName] += 1;

        }
      }else {
          if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
              game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
          }else{
              game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
          }
      }
          break;
      case '7':
          if (soluzione == '11' || soluzione == 'undici'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 11.\nsi accende la candela, si dice bonaseeeera(accento derrone).');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '8':
          if (soluzione == '5' || soluzione == 'cinque'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 12.\nla triste verità che non siamo in cima alla piramide, siamo alla base. Fortunatamente son siamo al livello più basso');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '9':
          if (soluzione == '6675'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 10.\n2,5,3,1,2');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '10':
          if (soluzione == 'z1e' ){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 14.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '11':
          if (soluzione == 'agente italiano' || soluzione == 'Agente Italiano'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 15.\na volte le cose non vanno pensate su un foglio di carta.');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '12':
          if (soluzione == 'bum'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 13.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '13':
          if (soluzione == 'giuseppe' || soluzione == 'Giuseppe'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 17.\ngran cosa la forza centrifuga, è sempre meglio partire dal centro');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '14':
          if (soluzione == 'tetraedro' || soluzione == 'piramide'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 18.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '15':
          if (soluzione == 'acobbays'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 16.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '16':
          if (soluzione == '21'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 20.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '17':
          if (soluzione == '69'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 21.\nnon sempre una cosa ovvia è corretta, non sempre 2+2=4');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '18':
          if (soluzione == 'P' || soluzione == 'p'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'quesito 19.\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          break;
      case '19':
          if (soluzione == '52'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], '\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          if (problem_completed.length == 21) {
                  for (var i = 0; i < test.length; i++){
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\nUna volta risolto digitate \\sol final-...');
                  }
          }
          break;
      case '20':
          if (soluzione == '12'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], '\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          if (problem_completed.length == 21) {
                  for (var i = 0; i < test.length; i++){
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\nUna volta risolto digitate \\sol final-...');
                  }
          }
          break;
      case '21':
          if (soluzione == 'tomyovytf'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], '\n???');
            }
            problem_completed.push(num_quesito)
            usernames[chatName] += 1;

            }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
          if (problem_completed.length == 21) {
                  for (var i = 0; i < test.length; i++){
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\nUna volta risolto digitate \\sol final-...');
                  }
          }
          break;
          //TODO:  al 21 punteggio mandare a tutti il messaggio trovare indizion finale..
      case 'final':
      if (problem_completed.length == 21) {
          if (soluzione == 'perito meccanico'){
              for (var i = 0; i < test.length; i++){
                  game.sendMessage(test[i], 'CE L\'AVETE FATTA..\nAFFACCIATEVI DAL BALCONE DELLA PASTORALE');
              }
          }else {
              if (flag_error[Math.floor((Math.random() * 2) + 1)] == true) {
                  game.sendVoice(chatId, funny_errors[Math.floor((Math.random() * 3) + 1)]);
              }else{
                  game.sendMessage(chatId, string_errors[Math.floor((Math.random() * string_errors.length-1) + 1)]);
              }
          }
      }else {
          game.sendMessage(chatId, "Il livello è ancora nascosto!\nDevi sbloccare prima tutti e 21 i livelli precedenti.");
      }
          break;

      default:
        game.sendMessage(chatId, "Oooh! Chi minghia guaddi..")

  }


});
