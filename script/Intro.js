ENGINE.Intro = {
    enter: function() {
        this.app.speech.say('Dictator is a game in which your words decide about somebody\'s life. Please allow usage of microphone, then click to proceed.', 1);
        reco();
    },
    render: function() {
        var layer = this.app.layer;

        layer.clear("#111");
        layer.align(0,0);
        layer.save();
        layer.font("24px Consolas");
        layer
            .fillStyle("#fff")
            .wrappedText('Dictator is a game in which your words decide about somebody\'s life. Kill now or later. Please allow usage of microphone, then click to proceed.', 40, 70, 460);

        layer.font("bold 16px Consolas");
        layer
            .fillStyle("#555")
            .wrappedText('This game works only in WebKit based browsers as it needs some experimental features like speech synthesis and speech recognition. It works in Google Chrome! If you don\'t hear any voice now, probably your browser is unsupported', 40, 240, 460)
        layer.restore();
    },

    mousedown: function() {
        app.setState(ENGINE.Game);
    }
};
function reco() {
  window.recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onend = function() {
    reco();
  }
  recognition.onresult = function (event) {
    app.currentTranscript = event.results[0][0].transcript;
    t = app.currentTranscript.toLowerCase();
    switch(true) {
      case t.indexOf('kill')!=-1:
      case t.indexOf('heal')!=-1:
      case t.indexOf('die')!=-1:
      case t.indexOf('execut')!=-1:
      case t.indexOf('dead')!=-1:
      case t.indexOf('death')!=-1:
      case t.indexOf('destroy')!=-1:
      case t.indexOf('punish')!=-1:
      case t.indexOf('fuck')!=-1:
      case t.indexOf('***')!=-1:
      case t.indexOf('perish')!=-1:
      case t.indexOf('exterm')!=-1:
      case t.indexOf('later')!=-1:
      case t.indexOf('save')!=-1:
      case t.indexOf('forgive')!=-1:
      case t.indexOf('allow')!=-1:
        recognition.abort();
        break;
    }
  }
}