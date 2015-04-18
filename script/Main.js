var app = new PLAYGROUND.Application({
  width: 640,
  height: 360,
  smoothing: false,

  create: function() {
    this.loadSounds('frog', 'laugh', 'meh');
    this.loadAtlases("sheet");
    this.loadData('data');
  },

  ready: function() {
    this.setState(ENGINE.Intro);
  }

});
