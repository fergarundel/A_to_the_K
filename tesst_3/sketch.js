let faceapi;
let detections = [];

let video;
let canvas;
let surprised;
let happy;
let neutral;
let emotionSmooth = 1;
let instanceCounter;
let emotionHold = true;
let shakeEmotion = false;


function preload (){
  ChampagneSocialist = loadFont ('elements/UniFont-UniFontVariable.ttf')
}

function setup() {
  createCanvas (windowWidth,windowHeight);
  frameRate(300);
  textFont(ChampagneSocialist);

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
    console.log(error);
    return;  
  }
  clear();
  detections = result;
  faceapi.detect(gotFaces);
}

function draw() {
  background(225);

  let posX = 0;
  let posY = height/4;

  let splitString = split(p.elt.innerText,'');
  let dynamicSize = constrain(map(splitString.length,1,25,windowWidth*0.243056,windowWidth*0.083333),windowWidth*0.083333,windowWidth*0.243056);

  if (detections.length > 0){
    let {neutral,happy,surprised}
    = detections[0].expressions;

     surprised = (nf(surprised * 1000,2,2));
     if (surprised > 800 && emotionSmooth < 2500){
       emotionSmooth=emotionSmooth + 20;
      if (emotionSmooth>2400){
       setTimeout(emotionShake,0)
      }
     }

     happy = (nf(happy * 1000,2,2));
     if (happy > 800 && emotionSmooth < 2500){
       emotionSmooth=emotionSmooth + 20;
       if (emotionSmooth>2400){
       setTimeout(emotionShake,1500)}
       }

     neutral = (nf(neutral * 1000,2,2));
      if (neutral > 800 && emotionSmooth > 1){
       shakeEmotion = false;
       emotionSmooth=emotionSmooth - 20;
      //  element.classList.remove("shakeAnimation");
     }    
  }

  instanceCounter=emotionSmooth;
  if (instanceCounter > 1000){
    instanceCounter = 1000;
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
  text ('Champagne Socialist Variable',width*0.013889,height*0.038217)
  pop(); 


  if (shakeEmotion){
  square (10,10,10,10);
  let element = document.getElementById("p").innerHTML;
  element.classList.add("shakeAnimation");
  }

    // if (detections.length > 0){
  //   for (f=0; f < detections.length; f++){
  //     let points = detections[f].landmarks.positions;
  //     for(let i=0; i<points.length;i++){
  //       stroke(0);
  //       strokeWeight(2);
  //       point(points[i]._x,points[i]._y)
        
  //       }
  //     }
  //   }
}

function emotionShake (){
  shakeEmotion = true;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}