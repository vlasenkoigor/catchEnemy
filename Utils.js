function Utils(){}
Utils.prototype.cropSpriteSheet = function( texture, cols, rows ){
    var frames = [],
        width  = texture.width  / cols,
        height = texture.height / rows;

    for ( var j = 0; j < rows; j++ ){
        for ( var i = 0; i<cols; i++ ){
            frames.push( new PIXI.Texture(texture, new PIXI.Rectangle(i * width, j * height, width, height) ));
        }
    }

    return frames;
}

Utils.prototype.createClip = function(pattern, allFrames, speed){

    var pattern = pattern.split(','),
        frames  = [];

    for (var i = 0; i < pattern.length; i++){
        frames.push( allFrames[ parseInt(pattern[i]) ]);
    }

    var clip = new PIXI.extras.MovieClip(frames);
    clip.loop = false;
    clip.visible = false;
    clip.animationSpeed = speed;
    return clip;
};



var utils = new Utils();
