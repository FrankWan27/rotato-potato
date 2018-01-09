class Movable extends Rotatable {
    constructor(texture, x, y, w, h){
        super(texture, x, y, w, h);
        this.collide = false;
        this.collType = collTypes["Circle"];
        this.circular = true;
    }
    tryMove(collidables){
        let oldx = this.x;
        let oldy = this.y;
        this.y += this.vy;
        this.x += this.vx;
        this.collide = false;
        this.supercollide = false;
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
                        if(otherColl.door)
                        {
                            goNext();
                            break;
                        }
                        //if too far clipped, don't bother pushing back out, just undo the whole movement
                        if(distance <= this.width/5){
                            this.supercollide = true;
                            this.collide = true;
                            this.x = oldx;
                            this.y = oldy;
                            this.vx = 0;
                            this.vy = 0;
                            break;
                        }
                        //find vx in new coords
                        let vxrot = Math.cos(-otherColl.rotation) * (this.vx) - Math.sin(-otherColl.rotation) * (this.vy);
                        //find vy in new coords
                        let vyrot = Math.sin(-otherColl.rotation) * (this.vx) + Math.cos(-otherColl.rotation) * (this.vy);
                        //find vector perpendicular to surface of platform
                        let contactVec = [(closestx-xrot)/distance,(closesty-yrot)/distance];
                        //project vx,vy onto the perpendicular vector
                        let dotprod = (vxrot*contactVec[0]+vyrot*contactVec[1]);
                        contactVec[0] *= dotprod;
                        contactVec[1] *= dotprod;
                        //subtract perpendicular vector if it is in same direction only leaving only the velocity that is parallel to surface
                        if(vxrot/contactVec[0] > 0){
                            vxrot -= contactVec[0];
                        }
                        if(vyrot/contactVec[1] > 0){
                            vyrot -= contactVec[1];
                        }
                        this.vx = Math.cos(otherColl.rotation) * (vxrot) - Math.sin(otherColl.rotation) * (vyrot);
                        this.vy = Math.sin(otherColl.rotation) * (vxrot) + Math.cos(otherColl.rotation) * (vyrot);
                        /*if(this.vx < 0.001){
                            this.vx = 0;
                        }
                        if(this.vy < 0.001){
                            this.vy = 0;
                        }*/
                        this.collide = true;
                        
                    }
                }
            }
            
        }
        if(this.collide){
            if(!this.supercollide){ //if supercollide we want to undo move and skip this part
                this.y = oldy + this.vy;
                this.x = oldx + this.vx;
                for(let i in collidables){
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
                            let unrotclosestx = Math.cos(otherColl.rotation) * (closestx - otherColl.x) - Math.sin(otherColl.rotation) * (closesty - otherColl.y) + otherColl.x;
                            let unrotclosesty = Math.sin(otherColl.rotation) * (closestx - otherColl.x) + Math.cos(otherColl.rotation) * (closesty - otherColl.y) + otherColl.y;
                            let distance = Math.sqrt(Math.pow(xrot - closestx,2)+Math.pow(yrot - closesty,2));
                            if(distance <= this.width/2){
                                let vx = this.x - unrotclosestx;
                                let vy = this.y - unrotclosesty;
                                this.x = vx*(this.width/2+0.3)/distance+unrotclosestx;
                                this.y = vy*(this.width/2+0.3)/distance+unrotclosesty;
                            }
                        }
                    }
                }
            }
        }
        this.rotation += this.vx/15;
        if(this.x+this.width/2 > app.view.width){
            this.x = app.view.width-this.width/2;
        }
        if(this.x < this.width/2){
            this.x = this.width/2;
        }
        if(this.y+this.width/2 > app.view.height){
            console.log("fail, respawn");
            reset();
        }
    }
}