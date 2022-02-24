var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Função para definir o ambiente inicial
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  database.ref('ballon/position').on("value",readPosition, showError);



  textSize(20); 
}

// função para exibir a UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use as setas para mover o balão de ar quente!",40,40);
}

 function updatePosition(x,y){
   database.ref('ballon/position').set({
     posX: height.posX + x ,
     posY: height.posY + y
   })
 }

function readPosition(data){
  height = data.val();
  balloon.x = height.posX;
  balloon.y = height.posY;
 }

function showError(){
  console.log("Erro ao escrever no banco de dados");
}
