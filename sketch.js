// set the canvas at the center of the page
function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function preload(){
    //characters
    yu = loadImage("resource/pic/yu.png");
    kaze = loadImage("resource/pic/kaze.png");
    taya = loadImage("resource/pic/taya.png");

    //background pic
    starsky = loadImage("resource/pic/starsky.jpg");
}


function setup() {
    cnv = createCanvas(1200, 600);
    centerCanvas();

    noStroke();


}

function draw(){
    background(starsky);

    image(yu,30,150,450,450);
}