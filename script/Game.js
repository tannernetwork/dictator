ENGINE.Game = {
  create: function() {
    var app = this.app;

    this.killBtn = new ENGINE.Button(2, 3, app.center.x - 40, app.center.y + 100);
    this.killBtn.click = this.kill.bind(this);
    this.laterBtn = new ENGINE.Button(4, 5, app.center.x + 40, app.center.y + 100);
    this.laterBtn.click = this.later.bind(this);
  },

  kill: function(){
      if(!this.ready) return false;
      for(var i = 0; i < this.people.length; i++)
      {
        this.people[i].next(i-1, this.people);
        this.ready = false;
      }
      if(this.people.length)
      {
        setTimeout(function(){
          if(this.people.length)
          {
            app.currentTranscript = "";
            this.ready = true;
          }
          else
          {
            app.speech.say('It\'s over!', 1);
            app.setState(ENGINE.Over);
          }
        }.bind(this), 2500);
      }
  },
  later: function(){
      if(!this.ready) return false;
      var first = false;
      for(var i = 0; i < this.people.length; i++)
      {
        var next = i;
        if(!first)
        {
          next = this.people.length;
        }
        this.people[i].next(next, this.people);
        if(!first)
        {
          i--;
          first = true;
        }
        
        this.ready = false;
      }
      if(this.people.length)
      {
        var time;
        if(this.people.length == 1)
          time = 500;
        else
          time = 1500;
        setTimeout(function(){
          this.ready = true;
          app.currentTranscript = "";
        }.bind(this), time);
      }
  },

  enter: function(){
      app.currentTranscript = "";
      app.frog = app.sound.play("frog", true);
      app.sound.setVolume(app.frog, 0.3);
      app.sound.fadeIn(app.frog);
      app.sound.setMaster(0.5);

      this.people = [];
      for(var i = 0; i < 32; i++)
      {
        this.people.push(new ENGINE.Human(i));
      }
      this.ready = true;
  },

  step: function(dt) {
    if(this.ready)
    {
      this.killBtn.step();
      this.laterBtn.step();
    }
    var t = app.currentTranscript.toLowerCase();
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
        this.kill();
        break;
      case t.indexOf('later')!=-1:
      case t.indexOf('save')!=-1:
      case t.indexOf('forgive')!=-1:
      case t.indexOf('allow')!=-1:
        this.later();
        break;
    }
  },

  render: function() {

    var app = this.app;
    var layer = this.app.layer;

    layer.font("16px Consolas");
    layer.clear("#222");
    layer.save();

    for(var i = 0; i < this.people.length; i++)
    {
      this.people[i].render();
    }

    layer.align(0.5, 0.5);
    layer.drawAtlasFrame(app.atlases.sheet, 0, 20, app.center.y);
    layer.drawAtlasFrame(app.atlases.sheet, 1, app.center.x, app.center.y);
    if(this.people.length)
    {
      var text = "";
      if(this.people[0].text)
        text = this.people[0].text;
      else if(this.people.length > 1)
        text = this.people[1].text;
      layer
        .fillStyle("#fff")
        .textAlign("center")
        .wrappedText(text, app.center.x, 40, 460)
    }
    layer
      .fillStyle("#555")
      .fillText(this.people.length+' citizen(s) left', app.center.x, 20)

    layer
      .fillStyle("#fff")
      .textAlign("center")
      .wrappedText('~ '+app.currentTranscript+' ~', app.center.x, 330, 460)

    if(this.ready)
    {
      this.killBtn.render();
      this.laterBtn.render();
    }
    layer.restore();

  }

};
