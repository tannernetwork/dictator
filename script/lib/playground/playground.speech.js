(function() {

    PLAYGROUND.Application.prototype.speech = {};

    PLAYGROUND.Speech = function(app) {
        this.app = app;
        PLAYGROUND.Application.prototype.speech.plugin = this;
        app.on('step', this.step.bind(this));

        this.voices = [];
    }

    if('speechSynthesis' in window)
        PLAYGROUND.Speech.plugin = true;

    PLAYGROUND.Speech.prototype = {
        step: function() {
            if(!this.ready)
            {
                if(speechSynthesis.getVoices().length > 0)
                {
                    this.voices = speechSynthesis.getVoices();
                }
            }
        }
    }
    
    PLAYGROUND.Application.prototype.speech.say = function(text, langOrVoice, callback) {
        var args = arguments
        var utterance = new SpeechSynthesisUtterance();
        var voices = this.plugin.voices;
        utterance.text = text;

        if(typeof langOrVoice == 'string')
        {
            utterance.lang = langOrVoice || 'en-US';
        }
        else if(Number.isInteger(langOrVoice))
        {
            utterance.voice = voices[langOrVoice];
        }
        else if(voices.indexOf(langOrVoice) != -1)
        {
            utterance.voice = langOrVoice;
        }

        utterance.onend = function(event) {
            if(typeof args[1] == 'function')
            {
                callback = langOrVoice;
            }
            if(typeof callback == 'function')
            {
                callback.call(event);
            }
        };

        speechSynthesis.speak(utterance);
    }

    PLAYGROUND.Application.prototype.speech.getVoices = function() {
        return this.plugin.voices;
    }

})();