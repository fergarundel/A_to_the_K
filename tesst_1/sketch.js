let glythCount=0;

function setup() {
  createCanvas (windowWidth,windowHeight);
  p = createP('Champagne<br>Socialist');
}

function draw() {
  background(224);
  
  let posX = 0;
  let posY = height/4;

  let splitString = split(p.elt.innerText,'');
  let dynamicSize = constrain(map(splitString.length,1,25,300,120),120,300);

  let fts = 200;

    
  let pfat = constrain(map(mouseX,0,width,1,999),1,999);
  
  p.style('font-size' ,fts+'px');
  p.style('font-weight' ,pfat);
  p.style('align', 'center');
  p.attribute('contenteditable',true)
  p.attribute('spellcheck', false)
  p.position(posX,posY);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
