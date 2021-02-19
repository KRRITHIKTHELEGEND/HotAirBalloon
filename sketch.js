var ball;
var hball;
var database;
var position;
var HotAirBalloonImg, backgroungImg;

function preload() {
    HotAirBalloonImg = loadImage("Hot Air Ballon.png");
    backgroungImg = loadImage("background.png");
}

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(windowWidth,windowHeight);
    hball = createSprite(250,250,10,10);
    hball.addImage(HotAirBalloonImg);
    hball.scale = 0.75;
    //hball.shapeColor = "red";
    var hballposition = database.ref('ball/position');
    hballposition.on("value", readPosition, showError);
}

function draw(){
    background(backgroungImg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set(
        {
            'x' : position.x + x,
            'y' : position.y + y
        }
    )
}

function readPosition(data) {
    position = data.val();
    hball.x = position.x;
    hball.y = position.y;
}

function showError() {
    console.log("error")
}
