let rotatable = [];
let stationary = [];
let turrets = [];
//make platform array here
function loadLevel(currentLevel) {
    meter = 100;
    app.stage.addChild(bg);
    // app.stage.addChild(door);
    rotatable = [];
    stationary = [];
    turrets = [];
    stationary.push(door);
    console.log(loader.resources["levels.json"].data);
    let levels = loader.resources["levels.json"].data.levels;

    level = currentLevel;
    potato.x = levels[level].spawn[0];
    potato.y = levels[level].spawn[1];
    potato.midair = false;
    rotatableSprites.push(potato);
    
    if(levels[level].door)
    {
        door.x = levels[level].door[0];
        door.y = levels[level].door[1];
    }

    for (i in levels[level].rotatable) {
        platform = levels[level].rotatable[i];
        platObj = new Rotatable(PIXI.loader.resources["resources/platform.png"].texture, platform[0], platform[1], 100, 20);
        if (platform.length > 2) {
            platObj.rotation = platform[2];
        }
        rotatable.push(platObj);
    }
    for (i in levels[level].stationary) {
        platform = levels[level].stationary[i];
        platObj = new Stationary(PIXI.loader.resources["resources/stationary.png"].texture, platform[0], platform[1], platform[2], platform[3]);
        if (platform.length > 4) {
            platObj.rotation = platform[4];
        }
        stationary.push(platObj);
    }
    if(levels[level].cracked)
    {
        for (i in levels[level].cracked) {
            platform = levels[level].cracked[i];
            platObj = new Cracked(PIXI.loader.resources["resources/cracked.png"].texture, platform[0], platform[1], platform[2], platform[3]);
            if (platform.length > 4) {
                platObj.rotation = platform[4];
            }
                    console.log(platObj);
    
            stationary.push(platObj);
        }
    }
    
    if(levels[level].turret)
    {
        for (i in levels[level].turret) {
            platform = levels[level].turret[i];
            platObj = new Turret(PIXI.loader.resources["resources/turret.png"].texture, platform[0], platform[1], 40, 40);
            if (platform.length > 2) {
                platObj.rotation = platform[2];
            }
            turrets.push(platObj);
        }
    }
    rotatableSprites = rotatableSprites.concat(rotatable);
    stationarySprites = stationarySprites.concat(stationary);
    turretSprites = turretSprites.concat(turrets);
    for (let i in stationarySprites) {
        app.stage.addChild(stationarySprites[i]);
    }
    for (let i in rotatableSprites) {
        app.stage.addChild(rotatableSprites[i]);
    }    
    for (let i in turretSprites) {
        app.stage.addChild(turretSprites[i]);
    }

    if (currentLevel == 'tutorial1') {
        let tut1 = new PIXI.Sprite(PIXI.loader.resources["resources/tut1.png"].texture);
        tut1.x = 50;
        tut1.y = 440;
        app.stage.addChild(tut1);
        
        tut2 = new PIXI.Sprite(PIXI.loader.resources["resources/tut2.png"].texture);
        tut2.x = 340;
        tut2.y = 380;
        tut2.visible = false;
        app.stage.addChild(tut2);
    }
    else if (currentLevel == 'tutorial2') {
        tut3 = new PIXI.Sprite(PIXI.loader.resources["resources/tut3.png"].texture);
        tut3.x = 200;
        tut3.y = 360;
        app.stage.addChild(tut3);
    }
    else if (currentLevel == 'tutorial3') {
        tut4 = new PIXI.Sprite(PIXI.loader.resources["resources/tut4.png"].texture);
        tut4.x = 150;
        tut4.y = 360;
        app.stage.addChild(tut4);
    }
    else if (currentLevel == 'win') {
        youWin = new PIXI.Text('You Win!\nThanks for playing!',{fontFamily : 'Arial', fontSize: 36, align : 'center'});
        youWin.anchor.x = 0.5;
        youWin.anchor.y = 0.5;        
        youWin.x = 400;
        youWin.y = 380;
        app.stage.addChild(youWin);
    }

    app.stage.addChild(bar);
    app.stage.addChild(bubble);
    app.stage.addChild(arrow);

}

function clearScreen() {
    app.stage.removeChildren();
    for (let i = rotatableSprites.length; i > 0; i--)
        rotatableSprites.pop();
    for (let i = stationarySprites.length; i > 0; i--)
        stationarySprites.pop();
    for (let i = turretSprites.length; i > 0; i--)
        turretSprites.pop();
}
