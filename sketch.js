//Create variables here
var database ;
var dog;
var dogImage;
var happyDog;
var happydogImage;
var feed;
var foodStock;
var foodS;

function preload()
{
	//load images here
  dogImage = loadImage("dogImg.png");
  happydogImage = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(700, 600);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
  foodStock.set(20);
 
  dog = createSprite(350,500,10,10);
  dog.addImage(dogImage)
  dog.scale=0.2
}

function draw() {  
  background(46, 139, 87);

  if(foodS!==undefined){
    fill("black");
  textSize(30);
  text("food Available:" + foodS,250,200);

  fill("black");
  textSize(30);
  text("Press the Up arrow to feed the Tommy",100,100);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage("doghappy",happydogImage);
   }
   else(keyWentUp(UP_ARROW))
    dog.addImage("dog",dogImage);
  
  
   if(foodS === 0){
     foodS = 20;
   }

   drawSprites();
  }

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      food:x
    }
  )
}



