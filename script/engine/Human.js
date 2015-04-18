ENGINE.Human = function(i) {
    this.index = i;
    if(i === 0)
    {
        this.x = app.center.x;
        this.y = app.center.y
        this.a = 1;
    }
    else
    {
        this.x = app.center.x + i*50 +50;
        this.y = app.center.y - 20;
        this.a = 0.2;
    }
    if(i == 0)
    {
        var answers = app.data['data'];
        this.text = answers.sentences[Math.floor(Math.random()*answers.sentences.length)].text;
        app.speech.say(this.text, 0);
    }
    this.frame = Math.floor(Math.random()*8);
};

ENGINE.Human.prototype = {
    render: function(){
        app.layer.save();
        app.layer.align(0.5, 0.5);
        app.layer.a(this.a);
        app.layer.drawAtlasFrame(app.atlases.sheet, this.frame+6, this.x, this.y);
        app.layer.restore();
    },

    next: function(pos, array){
        var answers = app.data['data'];
        if(pos > this.index)
        {
            app.sound.play("meh");
            array.push(array.shift());
            app.speech.say(answers.later[Math.floor(Math.random()*answers.later.length)], 0);
        }
        if(pos == this.index)
        {

        }
        else if(pos == -1){
            app.speech.say(answers.kill[Math.floor(Math.random()*answers.kill.length)], 0);
            app.sound.play("laugh");
            app.tween(this).to({
                x: -100
            }, 2, 'linear');
            setTimeout(function(){
                array.shift();
            }, 2500);
            this.text = "";
        } else if(pos == 0) {
            var random = answers.sentences[Math.floor(Math.random()*answers.sentences.length)].text;
            this.text = random;
            app.tween(this).to({
                x: app.center.x,
                y: app.center.y,
                a: 1
            }, 1, 'linear');
            setTimeout(function(){
                app.speech.say(random, 0);
            }, 1000);
        } else {
            app.tween(this).to({
                x: app.center.x + pos*50 +50,
                y: app.center.y - 20,
                a: 0.2
            }, 1, 'linear');
        }
        this.index = pos;
    }
};