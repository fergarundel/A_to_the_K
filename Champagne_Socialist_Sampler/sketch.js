let faceapi;
let detections = [];

let video;
let canvas;
let surprised;
let happy;
let neutral;
let angry;
let emotionSmooth = 1;
let shakeEmotion = false;
let emotionHold = true;
let instanceCounter;

let on = true;
let easing = 0.03;
let target = 68;
let start = 53;
let x = 60;

let eyesAnimation = 0;
let eyebrowAnimation = 0;
let surprisedEmotion = 0;
let neutralEmotion = 0;
let angryEmotion = 0;
let angryAnimation = 0;
let mouthAnimation = 0;
let leftEye = 70;
let rightEye = 110;

function preload (){
  ChampagneSocialist = loadFont ('elements/ChampagneSocialist-Variable.ttf')
}

function setup() {
  let canvas = createCanvas (windowWidth,windowHeight);
  canvas.position(0,0,'fixed');
  frameRate(300);
  textFont(ChampagneSocialist);
  angleMode(DEGREES);

  video = createCapture(VIDEO);
  video.id('video');
  video.size(240, 180)
  video.hide();

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5
  };

  faceapi = ml5.faceApi(video,faceOptions,faceReady);

  p = createP('Champagne<br>Socialist');


}

function faceReady (){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    print(error);
    return;  
  }
  clear();
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(225);
  faceAnim();

  let posX = 0;
  let posY = height/4;

  let splitString = split(p.elt.innerText,'');
  let dynamicSize = constrain(map(splitString.length,1,11,width*0.277778,width*0.083333),width*0.083333,width*0.277778);

  if (detections.length > 0){

    let {neutral,surprised,angry}
    = detections[0].expressions;

     surprised = (nf(surprised * 1000,2,2));
     surprisedEmotion = surprised;
     
     if (surprised > 600 && emotionSmooth < 2500){
       emotionSmooth=emotionSmooth + 20;    
      if (emotionSmooth>1500){
       setTimeout(emotionShake,0)
      }   
     }

     angry = (nf(angry * 1000,2,2));
     angryEmotion = angry;

     if (angry > 600){
       setTimeout(emotionShake,0)
       } 
       if (angry < 600){
        shakeEmotion = false;
       }

     neutral = (nf(neutral * 1000,2,2));
     neutralEmotion = neutral;

      if (neutral > 600){
       shakeEmotion = false;
       emotionSmooth=emotionSmooth - 20;
      }    
  }

  instanceCounter=emotionSmooth;
  if (emotionSmooth<1){
    emotionSmooth = 1;
  }
  if (instanceCounter > 1000){
    instanceCounter = 1000;
  }
  if (instanceCounter < 1){
    instanceCounter = 1;
  }

  p.style('font-size' ,dynamicSize+'px');
  p.style('font-weight' ,emotionSmooth);
  p.style('align', 'center');
  p.attribute('contenteditable',true)
  p.attribute('spellcheck', false)
  p.position(posX,posY);

  push();
  textSize(width/102.857143);
  text ("Instance Value: "+ instanceCounter,width/1.170732,height*0.038217);
  text ('Fergus Arundel',width/1.1505532,height-height*0.042);
  text ('Champagne Socialist Variable',width*0.013889,height*0.038217)
  pop(); 

  if (shakeEmotion){
  shake();
  } else {
    stopShake();
  }
}

function faceAnim(){
   if (surprisedEmotion>600){
    eyesAnimation=eyesAnimation+2;
    if (eyesAnimation>8){
      eyesAnimation=8;
    }

    mouthAnimation=mouthAnimation+3;
    if (mouthAnimation>15){
      mouthAnimation=15;
    }

    eyebrowAnimation=eyebrowAnimation+4;
    if (eyebrowAnimation>12){
      eyebrowAnimation=12;
    }
    angryAnimation = 0;

    angryAnimation=angryAnimation-6
    if (angryAnimation<-6){
      angryAnimation=-6;
    }
  }

  if (neutralEmotion>600){
    eyesAnimation=eyesAnimation-2;
    if (eyesAnimation<0){
      eyesAnimation=0;
    }

    mouthAnimation=mouthAnimation-3;
    if (mouthAnimation<0){
      mouthAnimation=0;
    }

    eyebrowAnimation=eyebrowAnimation-4;
    if (eyebrowAnimation<0){
      eyebrowAnimation=0;
    }

    angryAnimation=angryAnimation-6;
    if (angryAnimation<0){
      angryAnimation=0;
    }
  }

  if (angryEmotion>600){
    angryAnimation=angryAnimation+6;
    eyebrowAnimation=eyebrowAnimation-4
    eyesAnimation=eyesAnimation+2;

    if (angryAnimation>24){
      angryAnimation=24;
    }
    if (eyebrowAnimation<0){
      eyebrowAnimation=0;
    }
    if (eyesAnimation>5){
      eyesAnimation=5;
    }

    mouthAnimation=mouthAnimation+3;
    if (mouthAnimation>6){
      mouthAnimation=6;
    }
  }

  if (detections.length == 0){
    if (x > target - 1){
      on = false;
    } 
    if (x < start + 1){
      on = true;
    }
    
    if(on){
      x = x + (target - x) * easing
    } else {
      x = x + (start - x) * easing; 
    }

    angryAnimation=angryAnimation-6
    if (angryAnimation<-6){
      angryAnimation=-6;
    }

    eyebrowAnimation=20;

   }

  if (detections.length == 1){
    if (x>60){
      x=x-0.5;
      if (x == 60){
        x = 60;
      }
    }
    if (x<60){
      x=x+0.5;
      if (x = 60){
        x = 60;
      }
    }
   }

  noStroke();
  fill(0);
  ellipse (x*(width*0.000694),height*0.9,13*(width*0.000694),(13+eyesAnimation)*(width*0.000694));
  ellipse ((x+40)*(width*0.000694),height*0.9,13*(width*0.000694),(13+eyesAnimation)*(width*0.000694));

  push();
  translate (width*0.048611,height*0.877333);
  scale (-1,1);
  rotate (-angryAnimation);
  rect(0,(0-eyebrowAnimation/2)*(height*0.001333),width*0.013889,width*0.002778,10)
  pop();

  push();
  translate (width*0.0625,height*0.877333);
  rotate (-angryAnimation);
  rect(0,(0-eyebrowAnimation/2)*(height*0.001333),width*0.013889,width*0.002778,10)
  pop();

  push ();
  rect (width*0.041667,height*0.930667,width*0.027778,(9+mouthAnimation)*(width*0.000694),4);
  pop();
}

  function shake(){
    p.addClass('shakeAnimation');
  }

  function stopShake (){
    p.removeClass('shakeAnimation');
  }

function emotionShake (){
  shakeEmotion = true;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}