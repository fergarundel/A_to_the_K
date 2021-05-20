let faceapi;
let detections = [];

let video;
let canvas;
let surprised;
let happy;
let neutral;
let emotionSmooth = 1;

function setup() {
  createCanvas (windowWidth,windowHeight);

  video = createCapture(VIDEO);
  video.id('video');
  video.size(1280,720)
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
     if (surprised > 500 && emotionSmooth < 999){
       emotionSmooth=emotionSmooth + 50;
     }

     happy = (nf(happy * 1000,2,2));
     if (happy > 500 && emotionSmooth < 999){
       emotionSmooth=emotionSmooth + 50;
     }

     neutral = (nf(neutral * 1000,2,2));
     if (neutral > 500 && emotionSmooth > 1){
       emotionSmooth=emotionSmooth - 50;
     }
  } 
    
  p.style('font-size' ,dynamicSize+'px');
  p.style('font-weight' ,emotionSmooth);
  p.style('align', 'center');
  p.attribute('contenteditable',true)
  p.attribute('spellcheck', false)
  p.position(posX,posY);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
