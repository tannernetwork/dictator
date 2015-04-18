ENGINE.Over = {
    enter: function() {
        this.app.speech.say('You\'ve killed all your citizens your majesty! You were right in all cases! Now go and rate this entry on Ludum Dare!', 0);
    },
    render: function() {
        var layer = this.app.layer;

        layer.clear("#111");
        layer.align(0,0);
        layer.save();
        layer.font("24px Consolas");
        layer
            .fillStyle("#fff")
            .wrappedText('You\'ve killed all your citizens your majesty! You were right in all cases! Now go and rate this entry on Ludum Dare!', 40, 70, 460)
        
        layer.font("bold 16px Consolas");
        layer
            .fillStyle("#555")
            .wrappedText('To clarify: none of them deserved to die. Words can really be a weapon. They can hurt or even kill. Use them wisely!', 40, 190, 460)
        layer.font("20px Consolas");
        layer
            .fillStyle("#1af")
            .wrappedText('Developed by Tanner for Ludum Dare 32: An Unconventional Weapon. THANKS FOR PLAYING! <3 Click to play again...', 40, 270, 520)

        layer.restore();
    },

    mousedown: function() {
        app.sound.stop(app.frog);
        app.setState(ENGINE.Game);
    }
};