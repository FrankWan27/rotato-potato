function keyboard(keyCode) 
{
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
  if (event.keyCode === key.code) {
    if (key.isUp && key.press) key.press();
    key.isDown = true;
    key.isUp = false;
  }
  event.preventDefault();
  };
    
  //The `upHandler`
  key.upHandler = event => {
  if (event.keyCode === key.code) {
    if (key.isDown && key.release) key.release();
    key.isDown = false;
    key.isUp = true;
  }
  event.preventDefault();
  };
  
  //Attach event listeners
  window.addEventListener(
  "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
  "keyup", key.upHandler.bind(key), false
  );
  return key;
}
function defkeys()
{
  let left = keyboard(65), //a
  jump = keyboard(87), //w
  right = keyboard(68); //d
  q = keyboard(81); //q
  e = keyboard(69); //e
  s = keyboard(83); //s
  r = keyboard(82); //r
  
  
// reset
r.press = () => {
  reset();
}

//switch to debug mode
s.press = () => {
  // goNext();
  // debugging = !debugging;
  // if(debugging){
  //   bubble.width = bubbleD;
  //   bubble.height = bubbleD;
  // }else{
  //   bubble.width = bubbleR;
  //   bubble.height = bubbleR;
  // }
  console.log(debugging, bubble.width, bubble.height);
}
//Rotate CoutnerClockers
q.press = () => {
  rCounter = true;
};

q.release = () => {
  rCounter = false;
};
//Rotate Clockwise
e.press = () => {
  rClock = true;
};

e.release = () => {
  rClock = false;
};



//Left arrow key `press` method
  left.press = () => {
    potato.ax = -1.5;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    if(!right.isDown){
      potato.ax = 0;
    }
  };

  
//Right
  right.press = () => {
    potato.ax = 1.5;
  };
  right.release = () => {
    if(!left.isDown){
      potato.ax = 0;
    }
  };

  //Jump
  jump.press = () => {
    if(!potato.midair){
      potato.vy = -15;
      potato.midair = true;
    }
  };
  

}
      