class Bullet extends Movable
{
    constructor(texture, x, y, w, h, r){
        super(texture, x, y, w, h);
        
        let speed = 10;
        
        this.vx = Math.sin(r) * speed;
        this.vy = -Math.cos(r) * speed;
     }
     
    tryMove(collidables){
        this.y += this.vy;
        this.x += this.vx;
        if(this.y < -30) this.removeObject(this);
        if(this.y > 630) this.removeObject(this);
        if(this.x < -30) this.removeObject(this);
        if(this.x > 830) this.removeObject(this);
        for(let i in collidables){
            //no self-collision
            if(this != collidables[i]){
                let otherColl = collidables[i];
                if(otherColl.collType == collTypes["Rect"]){
                    let xrot = Math.cos(-otherColl.rotation) * (this.x - otherColl.x) - Math.sin(-otherColl.rotation) * (this.y - otherColl.y) + otherColl.x;
                    let yrot = Math.sin(-otherColl.rotation) * (this.x - otherColl.x) + Math.cos(-otherColl.rotation) * (this.y - otherColl.y) + otherColl.y;
                    let closestx = xrot;
                    let closesty = yrot;
                    if(xrot < otherColl.x - otherColl.width/2){
                        closestx = otherColl.x - otherColl.width/2;
                    }
                    else if(xrot > otherColl.x + otherColl.width/2){
                        closestx = otherColl.x + otherColl.width/2;
                    }
                    if(yrot < otherColl.y - otherColl.height/2){
                        closesty = otherColl.y - otherColl.height/2;
                    }
                    else if(yrot > otherColl.y + otherColl.height/2){
                        closesty = otherColl.y + otherColl.height/2;
                    }
                    let distance = Math.sqrt(Math.pow(xrot - closestx,2)+Math.pow(yrot - closesty,2));
                    if(distance <= this.width/2){
                        if(otherColl instanceof Cracked)
                        {
                            this.removeObject(otherColl);
                        }
                        this.removeObject(this);
                    }
                }
                else if(otherColl.collType == collTypes["Circle"])
                {
                    let dx = this.x - otherColl.x;
                    let dy = this.y - otherColl.y;
                    let dist =  Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
                    if(dist < this.width / 2 + otherColl.width / 2)
                    {
                        this.removeObject(this);
                        if(otherColl != potato)
                        {
                            this.removeObject(otherColl);
                        }
                        else
                        {
                            reset();
                        }
                    }
                }
            }
        }
    }
    
    removeObject(object)
    {
        app.stage.removeChild(object);
        let index = rotatableSprites.indexOf(object);
        if (index > -1) {
            rotatableSprites.splice(index, 1);
        }
        index = stationarySprites.indexOf(object);
        if (index > -1) {
            stationarySprites.splice(index, 1);
        }
    }
}