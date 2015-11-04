function Frog(frames){
    PIXI.Container.apply(this, arguments);

    var self = this;
    this.direction = "x"; // x, y
    this.jumpLength = 800;
    this.state = "idle"; //idle, jumping
    this.frames = frames;
    this.x = this.lastx = 0;
    this.y = this.lasty = 0;


    this.framesLeft = 0;
    this.currentClip = null;
    this.animationSpeed = 0.1;
    this.clipsInstances = [];

    this.moveWestClip  = utils.createClip("0,1,2,0"   , this.frames, this.animationSpeed);
    this.moveEastClip  = utils.createClip("3,4,5,3"   , this.frames, this.animationSpeed);
    this.moveSouthClip = utils.createClip("6,7,8,6"   , this.frames, this.animationSpeed);
    this.moveNorthClip = utils.createClip("9,10,11,9" , this.frames, this.animationSpeed);

    this.clipsInstances.push(this.moveWestClip);
    this.clipsInstances.push(this.moveEastClip);
    this.clipsInstances.push(this.moveSouthClip);
    this.clipsInstances.push(this.moveNorthClip);

    this.addChild(this.moveWestClip);
    this.addChild(this.moveEastClip);
    this.addChild(this.moveSouthClip);
    this.addChild(this.moveNorthClip);

    this.restart();
    game.renderer.view.addEventListener("enterFrame", function(){
        if (self.currentClip.playing){
            self.framesLeft++;
            self[self.currentClip.mainAxis] = self['last'+ self.currentClip.mainAxis] + self.framesLeft * self.currentClip.movementSpeed;
        } else if(self.state == "jumping") {
            self.lastx = self.x;
            self.lasty = self.y;
            self.state = "idle";
        }

    });

    var down = false;
    document.addEventListener('keydown', function(e){
        console.log("keydown", e.keyCode )
        switch (e.keyCode){
            case 37:
                self.moveWest();
                break;
            case 38:
                self.moveNorth();
                break;
            case 39 :
                self.moveEast();
                break;
            case 40 :
                self.moveSouth();
                break;
        }
        e.preventDefault();
    })

    document.addEventListener('keyup', function(e){
        console.log("keyup", e.keyCode )
        e.preventDefault();
    })
}

Frog.prototype = new PIXI.Container();
Frog.prototype.constructor = Frog;


Frog.prototype.restart = function(){
    this.currentClip = this.moveWestClip;
    this.currentClip.visible = true;
    this.currentClip.gotoAndStop(0);
}

Frog.prototype._move = function(axis, value, clip){
    clip.movementSpeed = value / (clip.totalFrames * (1/this.animationSpeed) );
    clip.mainAxis = axis;
    this.currentClip = clip;
    this.framesLeft = 0;

    for (var i = 0 ; i< this.clipsInstances.length ; i++)
    {
        this.clipsInstances[i].visible = false;
    }
    clip.visible =  true;
    clip.gotoAndPlay(0);
    this.state = "jumping";
};

Frog.prototype.moveWest = function(){
    this._move('x',-this.jumpLength, this.moveWestClip);
}

Frog.prototype.moveEast = function(){
    this._move('x', this.jumpLength, this.moveEastClip);
}

Frog.prototype.moveSouth = function(){
    this._move('y', this.jumpLength , this.moveSouthClip);
}

Frog.prototype.moveNorth = function(){
    this._move('y', -this.jumpLength, this.moveNorthClip);
}