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
          game.sendMessage(chatId, "Ti sei già registrato testa di zucca, ti faccio rileggere le istruzioni ne :P..\n\n Leggi bene le istruzioni.");
      }else {
          game.sendMessage(chatId, "!!! INTRAPPOLATO !!!\n USERNAME: "+chatName);
          test.push(chatId);
          usernames[chatName] = 0;
      }
      game.sendMessage(chatId, "ISTRUZIONI:\n Segui attentamente le regole del gioco...\nLa soluzione agli indovinelli va digitata proprio qui nella chat di Telegram.. e dovrà essere RIGOROSAMENTE scritta nel seguente formato\n<<slash+sol+spaziovuoto+numeroquesito+latuasoluzione>>.\nProprio come vedi nell'esempio qui sotto.\n\n\nESEMPIO:\n/sol 3-cacca\n/sol 12-pupù\n\n Pensa attentamente alle soluzioni, le vite non sono infinite, per il migliore ci sarà un piccolo premio ;)\n\nNOTA BENE: quando indovinerai riceverai una risposta:\nuna parte del messaggio potrà indicare il luogo e un\'altra parte potrà darti un indizio. \n\n PS: se proprio non dovesse più funzionare niente riavvierò tutto e tu potrai ricominciare premendo il tasto /start, ma se succede riceverai un messaggio!!! \n\n\nBuona fortuna <"+chatName+'>\nBruPolSpa');

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
                      game.sendMessage(test[i], 'USA. è vecchia e ingombrante, ma di solito funziona tranne quando la si far lavorare troppo. in questi casi si ferma e si prende il suo tempo. \n\nPuò aiutare a leggere qualcosa di incomprensibile');
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
                  game.sendMessage(test[i], 'è giunto il momento di mandarvi a cagare(se siete indecisi su dove andare, Polneve consiglia quello a metà). Già che ci siete cercate nel posto più in alto.\n\nè sempre meglio descrivere bene la scena che si vede  sopra.');
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
          if (soluzione == 'sale' || soluzione == 'Sale'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
                for (var i = 0; i < test.length; i++){
                  game.sendMessage(test[i], 'Torino. Le cose importanti si trovano dietro i volti delle persone che hanno fatto la GiOC\n\nleggerlo ad un cieco potrebbe aiutare');
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
              game.sendMessage(test[i], 'In pastorale. r315, più preciso di così.');
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
          if (soluzione == 'gufo su ramo' || soluzione == 'Gufo su ramo' || soluzione == 'gufo sul ramo' || soluzione == 'Gufo sul ramo' || soluzione == 'Gufo su un ramo' || soluzione == 'gufo su un ramo'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'Forma di associazione costituita da enti (stanza). In bella mostra dietro due giocatori d\'oro si trova la prossima prova\n\na polneve piacciono i cerchi.');
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
          game.sendMessage(test[i], 'Stanza federazione comodino nero secondo cassetto (Spaturno è un tipo preciso).');
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
              game.sendMessage(test[i], 'Master chef. Rendeva la stanza meno spoglia anche se non è stato quasi mai acceso, ora al suo posto si trova una prova.\n\nsi accende la candela, si dice bonaseeeera(accento derrone).');
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
              game.sendMessage(test[i], 'Il maschile della piccola centrale. C\'è ben poca roba, quella che vi interessa ha uno stile egiziano..\n\nla triste verità che non siamo in cima alla piramide, siamo alla base. Fortunatamente son siamo al livello più basso');
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
              game.sendMessage(test[i], 'Il nostro addetto al suono ha bisogno del mixer, se gli date una mano potreste guadagnarci anche voi.\n\n2,5,3,1,2');
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
              game.sendMessage(test[i], 'Federazione. Ma che bel ritratto. SALUTI DA IRENE.');
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
                game.sendMessage(chatId, "Problema già risolto.")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'Bruco cappucino non sa nuotare trovate qualcosa che gli possa servire e la ricompensa vi arriverà..\n\na volte le cose non vanno pensate su un foglio di carta.');
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
              game.sendMessage(test[i], 'Cucina. Al buio sta, sotto fiumi e fiumi di posate.');
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
              game.sendMessage(test[i], 'A casa del 7 bello. Non vi rendete conto neanche dove posate le chiappe, fate più attenzione a dove vi sedete.\ngran cosa la forza centrifuga, è sempre meglio partire dal centro');
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
              game.sendMessage(test[i], 'Prova di coraggio, andate nel cimitero degli scarafaggi dove gli stolti non si osano avventurare. Bisogna sempre avere delle piastrelle (Polneve suppone che lo siano ma non ne è sicuro) pronte nel caso in cui si dovesse rompere il pavimento.');
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
              game.sendMessage(test[i], 'Andate al monte Rushmore. Aprite la porta e non fate più di un passo. Leggete un libro a portata di mano, ma che sia quello giusto.');
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
              game.sendMessage(test[i], 'Non è in nessuna stanza. Sta tra un "mare bianco" e Guadalupe.');
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
              game.sendMessage(test[i], 'Vi siete mai chiesti cosa ci sia nei cassetti dei tavoli della gioc? Ora è un buon momento per farlo..\n\nnon sempre una cosa ovvia è corretta, non sempre 2+2=4');
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
              game.sendMessage(test[i], '"Beeeeee". Se non fosse per il nastro adesivo la prova cadrebbe a terra.');
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
              game.sendMessage(test[i],'Quasi alla fine...');
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
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\n\nUna volta risolto digitate \\sol final-...');
                  }
          }
          break;
      case '20':
          if (soluzione == '12'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'Manca veramente poco.. Bravi!');
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
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno rosso nella biblioteca..\n\nUna volta risolto digitate \\sol final-...');
                  }
          }
          break;
      case '21':
          if (soluzione == 'tomyovytf'){
              if (problem_completed.indexOf(num_quesito)>=0) {
                game.sendMessage(chatId, "Problema già risolto..")
              }else{
            for (var i = 0; i < test.length; i++){
              game.sendMessage(test[i], 'Dai che ci siete..');
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
                      game.sendMessage(test[i], 'Un ultimo sforzo, il quesito finale sta nel quaderno verde nella biblioteca..\nUna volta trovata la soluzione digitate:\n\n \\sol final-<<..vostra soluzione..>>');
                  }
          }
          break;
          //TODO:  al 21 punteggio mandare a tutti il messaggio trovare indizion finale..
      case 'final':
      if (problem_completed.length == 21) {
          if (soluzione == 'perito meccanico' || soluzione == 'Perito Meccanico'){
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
