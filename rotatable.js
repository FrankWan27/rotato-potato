var collTypes = {
    "Rect": 1,
    "Circle": 2
}
class Rotatable extends PIXI.Sprite {
    constructor(texture, x, y, w, h){
        super(texture);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.collType = collTypes["Rect"];
        this.bubblex = this.x;
        this.bubbley = this.y;
        this.bubbleangle = this.rotation;
        this.bubblevx = this.x;
        this.bubblevy = this.y;
        this.circular = false;
    }
    tryMove(rotatableSprites){
        return;
    }
}