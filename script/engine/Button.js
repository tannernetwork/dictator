ENGINE.Button = function(frame, hoverFrame, x, y) {
    this.frame = frame;
    this.hoverFrame = hoverFrame;
    this.x = x;
    this.y = y;
    this.offsetY = 0;
    this.click = function(){};
};

ENGINE.Button.prototype = {
    step: function() {
        if(Math.abs(app.mouse.x - this.x) < 35 && Math.abs(app.mouse.y - this.y) < 20) {
            this.renderFrame = this.hoverFrame;

            if(app.mouse.left && !this.isDown){
                this.isDown = true;
                app.tween(this).to({
                    offsetY: 5
                }, 0.1, "linear");
            }
            this.inside = true;
        } else {
            this.renderFrame = this.frame;
            this.inside = false;
        }
        if((!app.mouse.left || !this.inside) && this.isDown)
        {
            app.tween(this).to({
                offsetY: 0
            }, 0.2, "linear");
            this.isDown = false;
            if(this.inside){
                this.click();
            }
        }
    },

    render: function() {
        app.layer.align(0.5, 0.5);
        app.layer.drawAtlasFrame(app.atlases.sheet, this.renderFrame, this.x, this.y+this.offsetY);
    }
};