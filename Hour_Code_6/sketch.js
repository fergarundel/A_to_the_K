let MonoSans, words;
let index = -1;

let MyText = "A monospaced font, also called a fixed-pitch, fixed-width, or non-proportional font, is a font whose letters and characters each occupy the same amount of horizontal space. This contrasts with variable-width fonts, where the letters and spacings have different widths"

function preload() {
  MonoSans = loadFont ('data/MonoSans.v4.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont (MonoSans);
 words = MyText.split(' ');
  textSize (62);
  fill (255);
  textAlign(CENTER);
  textLeading(24);
  frameRate (3);
}

function draw() {
  background(255,69,0);
  index = index + 1;
  text (words[index],width/2,height/2)

  if (index > words.length-1){
    index = -1;
  }
}
