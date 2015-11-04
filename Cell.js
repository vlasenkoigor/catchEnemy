function Cell(){
    PIXI.Sprite.apply(this, arguments);

    this.interactive = true;
    this.buttonMode = true;
    this.pos = {x:0, y:0};
    this.pressed = false;
    this.reset();

    this.on('mousedown', function(){
        if (this.pressed) { return }
        this.select();
        grid.setWalkableAt(this.pos.x, this.pos.y, false);
    });

    this.on('mouseover', function(){
        if (this.pressed) { return }
        this.alpha = 0.4;
    });

    this.on('mouseout', function(){
        if (this.pressed) { return }
        this.alpha = 1;
    });

// now you can set the cursor to be what you need
    this.defaultCursor = "pointer";

}
Cell.prototype = new PIXI.Sprite();
Cell.prototype.constructor = Cell;

Cell.prototype.reset = function(){
    this.filters =  [new PIXI.filters.GrayFilter()];
    this.pressed = false;
}

Cell.prototype.select = function(){
//    this.interactive = false;
//    this.buttonMode  = false;
    this.filters = null;
    this.pressed = true;
    this.alpha = 1;
}

Cell.prototype.debugPath = function(){
    this.tint = "0xF91118";
}
