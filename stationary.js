
class Stationary extends PIXI.Sprite {
    constructor(texture, x, y, w, h){
        super(texture);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.collType = collTypes["Rect"];
        this.door = false;
    }
}