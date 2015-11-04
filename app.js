function Game (renderer){
    var self = this;
    this.renderer = renderer;

    document.body.appendChild(renderer.view);
    // create the root of the scene graph
    this.stage = new PIXI.Container();
    // pixi exposes a premade instance for you to use.
    this.loader = PIXI.loader;

    this.loader.once('complete',function(){
        self.onLoad();
        self.animate();
    });
}
Game.prototype.animate = function(){
    requestAnimationFrame(this.animate.bind(this));
    // render the root container
    this.renderer.render(this.stage);
    this.renderer.view.dispatchEvent(new Event('enterFrame'))
}
var game = new Game(PIXI.autoDetectRenderer(1000, 1000,{backgroundColor : 0x1099bb}));
game.loader.add("./circle_green.png");
game.loader.add("./frog.png");
game.loader.load();

game.onLoad = function(){
//    frog.play();

    grid = new PF.Grid(gridCnt, gridCnt);
    var circleTexture = new PIXI.Texture(PIXI.TextureCache["./circle_green.png"]);
    for (var i = 0; i < gridCnt; i++) {
        cells.push([]);
        for (var j = 0; j < gridCnt; j++) {
            var cell = new Cell(circleTexture);
            cell.x = circleTexture.width * i + 0//+(j%2 != 0 ? circleTexture.width / 2 : 0  );
            cell.y = circleTexture.height * j;
            cell.pos.x = i;
            cell.pos.y = j;
            cells[i].push(cell);
            container.addChild(cell);
        };
    };
    frog = new Frog( utils.cropSpriteSheet(PIXI.TextureCache["./frog.png"], 3,4) );
    container.addChild(frog);
    container.x = 0;
    container.y = 0;
};

var container = new PIXI.Container();
game.stage.addChild(container);
var grid;
var cells = [];
var gridCnt = 7;
var finder = new PF.AStarFinder({
    allowDiagonal: true
//    dontCrossCorners: true
});

function findPath(){
    var path = finder.findPath(5, 5, 0, 0, grid);
    var pos = [5,5];
    var currentSteps = 0;
//    for (var i = 0; i<gridCnt; i++){
//        for (var j = 0; j<gridCnt; j++){
//            if (i)
//        }
//    }
    for (var i = 0; i <path.length; i++ ){
        var p = path[i];
        cells[p[0]][p[1]].debugPath();
    }
};



