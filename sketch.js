let enterTime;

let gameMode;

let starColor;
let stars;


let bgX;
let bgY;
let changeBg;

let currentCharacter;
let characterArray;

//voices
let currentVoice;
let voiceArray;
let randomArray;
let randomVoice;
let currentVol;
let talkedKaze;
let talkedYu;
let talkedTaya;

let textStuff;
let currentText;
let currentFont;
let showScript;
let currentSize;

//pattern
let patternChange;
let patternLight;
//
let withSound;


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

    //background bgm
    welcomeBgm = loadSound("resource/sound/welcome.mp3");
    menuBgm = loadSound("resource/sound/menu.mp3");
    mainBgm = loadSound("resource/sound/main.mp3");

    //voices
    kaze001 = loadSound("resource/sound/kaze001.mp3");
    kaze002 = loadSound("resource/sound/kaze002.mp3");
    kaze003 = loadSound("resource/sound/kaze003.mp3");
    kaze004 = loadSound("resource/sound/kaze004.mp3");
    kaze005 = loadSound("resource/sound/kaze005.mp3");
    kaze006 = loadSound("resource/sound/kaze006.mp3");
    kaze007 = loadSound("resource/sound/kaze007.mp3");
    kaze008 = loadSound("resource/sound/kaze008.mp3");
    kaze009 = loadSound("resource/sound/kaze009.mp3");
    kaze010 = loadSound("resource/sound/kaze010.mp3");

    yu001 = loadSound("resource/sound/yu001.mp3");
    yu002 = loadSound("resource/sound/yu002.mp3");
    yu003 = loadSound("resource/sound/yu003.mp3");
    yu004 = loadSound("resource/sound/yu004.mp3");
    yu005 = loadSound("resource/sound/yu005.mp3");
    yu006 = loadSound("resource/sound/yu006.mp3");
    yu007 = loadSound("resource/sound/yu007.mp3");
    yu008 = loadSound("resource/sound/yu008.mp3");
    yu009 = loadSound("resource/sound/yu009.mp3");
    yu010 = loadSound("resource/sound/yu010.mp3");

    textStuff = loadJSON("script.json");

    //fonts
    jpFont = loadFont('resource/fonts/NotoSerifJP-Regular.otf');
    chFont = loadFont('resource/fonts/MaShanZheng-Regular.ttf');
    enFont = loadFont('resource/fonts/CrimsonText-Regular.ttf');

    //menu
    pattern = loadImage("resource/pic/pattern.png");
    arrow = loadImage("resource/pic/arrow.png");
    globe = loadImage("resource/pic/whiteglobe.png");
    book = loadImage("resource/pic/whitebook.png");
    yesSound = loadImage("resource/pic/whitesound.png");
    noSound = loadImage("resource/pic/whitenosound.png");

    //button sound
    click = loadSound("resource/sound/click.wav");
}


function setup() {
    cnv = createCanvas(1200, 600);
    centerCanvas();

    noStroke();

    userStartAudio();
    welcomeBgm.loop();

    gameMode = 1;

    bgX = 2700;
    bgY = 1350;
    changeBg = false;

    currentCharacter = 1;
    characterArray = [yu,kaze,taya];
    talkedKaze = false;
    voiceArray = [[yu001,yu002,yu003,yu004,yu005],
    [kaze001,kaze002,kaze003,kaze004,kaze005]];
    currentVoice = voiceArray[1][1];
    currentVol = 2;
    randomArray =[0,1,2,3]
    showScript = false;

    starColor = color(230,230,230);

    patternLight =200;
    patternChange =0.4;

    withSound = true;
    bgOp = 255;
}

function draw(){
    
    image(starsky,0,0,bgX,bgY);
    
    checkBg();

    if(gameMode == 1){
        starColor.setAlpha(128 + 128 * sin(millis() / 1000));
    }else if(gameMode == 2){

        if(!changeBg){
            characterImg();

            scriptBox();
        
            magic();

            menu();
        }
        
        
    }else if(gameMode == 3){
        
        fill(220,220,220,200);
        rect(0,0,1200,600);

        fill(0, 0, 0, 200);
        rect(0,50,1200,500);
    }
    
}

function talked(){
    if(currentCharacter == 0){
        currentVol = 2.5;
        currentSize = 22;
        currentFont = chFont;
        return talkedYu;
    }else if(currentCharacter == 1){
        currentVol = 9;
        currentSize = 18;
        currentFont = jpFont;
        return talkedKaze;
    }else if(currentCharacter == 2){
        return talkedTaya;
    }
}


function mousePressed(){
    


    if(gameMode == 1){
        enterTime = millis();
        changeBg = true;
        gameMode = 2;
        welcomeBgm.fade(0,6);
    }else if(gameMode == 2){
        if(mouseInRect(30,480,150,600)){
        
            if(!currentVoice.isPlaying() && !changeBg){
                if(!showScript){
                    
                    if(!talked()){
                        currentVoice = voiceArray[currentCharacter][0];
                        currentText = textStuff[currentCharacter][0].translation;
                        currentTranslation = textStuff[currentCharacter][0].english;
                        if(currentCharacter == 0){
                            talkedYu = true;
                        }else if(currentCharacter == 1){
                            talkedKaze = true;
                        }else if(currentCharacter == 2){
                            talkedTaya = true;
                        }
                        currentVoice.play(0,1,currentVol);
                        voiceArray[currentCharacter].shift();
                        textStuff[currentCharacter].shift();
                    }else{
                        randomVoice = random(randomArray);
                        currentVoice = voiceArray[currentCharacter][randomVoice];
                        currentText = textStuff[currentCharacter][randomVoice].translation;
                        currentTranslation = textStuff[currentCharacter][randomVoice].english;
                        currentVoice.play(0,1,currentVol);
                        console.log(currentVol);
                    }
                    showScript = true;
                }else{
                    showScript = false;
                }


                
                
            }
        
        }

        if(mouseInRect(610,680,200,270)){
            if(!showScript){
                click.play();
                currentCharacter = (currentCharacter +1) % 3;
            }
            
        }

        if(mouseInRect(660,720,440,500)){
            click.play();
            window.open("https://github.com/baoatwork/fortune");
        }

        if(mouseInRect(960,1030,440,510)){
            click.play();
            if(withSound){
                withSound = false;
                welcomeBgm.setVolume(0);
                menuBgm.setVolume(0);
                mainBgm.setVolume(0);
                click.setVolume(0);
            }else{
                withSound = true;
                welcomeBgm.setVolume(1);
                menuBgm.setVolume(1);
                mainBgm.setVolume(1);
                click.setVolume(1);
            }
        }

        if(mouseInRect(1020,1080,200,260)){
            click.play();
            gameMode = 3;
            
        }
    }else if(gameMode == 3){
        

        if(mouseInRect(0,1200,50,550)){
            click.play();
            gameMode = 2;
            
        }
        
    }
    
    
}

//check if we should change the background image
function checkBg(){
    if (changeBg){
        bgX =bgX - 150/36;
        bgY = bgY - 75/36;
        if(millis()>enterTime + 4000 && welcomeBgm.isPlaying()){
            menuBgm.loop();
            welcomeBgm.stop();
        }

        if(millis()>enterTime + 6000){
            
            changeBg =false;
        }
      }

    
}


//the image of the characters;
function characterImg(){
    if(gameMode == 2 && !changeBg){
        image(characterArray[currentCharacter],30,150,450,450);
    }
}

//check if mouse in Rect
function mouseInRect(a, b, c, d) {
    if (mouseX >= a && mouseX <= b && mouseY >= c && mouseY <= d) {
        return true;
    } else {
        return false;
    }
}

//the script box
function scriptBox(){
    if(showScript){
        fill(28, 28, 28, 200);
        rect(20,440,470,150,10);

        textSize(currentSize);
        textFont(currentFont);
        fill(220,220,220);
        text(currentText,30,460,450,60);
        textFont(enFont);
        textSize(22);
        text(currentTranslation,30,520,450,50)
    }
}

//the magical pattern
function magic(){
    patternLight = patternLight + patternChange;
    if(patternLight >= 255){
        patternChange = -patternChange;
    }else if(patternLight <= 100){
        patternChange = -patternChange;
    }

    if(!changeBg){
        push();
        translate(840, 320);
        rotate(frameCount * PI / 1440);
        tint(255,patternLight);
        image(pattern, -250, -250,500, 500);
        pop();

        tint(255,255);
    }

    
    
}

//the menu
function menu(){
    
    fill(220,220,220);
    if(mouseInRect(610,680,200,270)){
        textFont(enFont);
        textSize(35);
        text("Switch Character",530,245);
    }else{
        tint(255,220);
        image(arrow,610,200,70,70);
    }
    

    if(mouseInRect(660,720,440,500)){
        textFont(enFont);
        textSize(35);
        text("More Information",560,485);
    }else{
        tint(255,240);
        image(globe,660,440,60,60);
    }

    if(mouseInRect(1020,1080,200,260)){
        textFont(enFont);
        textSize(35);
        text("Story",1020,245);
    }else{
        tint(255,240);
        image(book,1020,200,60,60);
    }

    if(mouseInRect(960,1030,440,510)){
        textFont(enFont);
        textSize(35);
        if(withSound){
            text("Sound: On",920,485);
        }else{
            text("Sound: Off",920,485);
        }

    }else{
        tint(255,240);
        image(yesSound,960,440,70,70);
    }
    
    
}