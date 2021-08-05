var man,man_standing,man_left,man_right,man_explosion_IMG,man_explosion;
var bomb,bomb_IMG,background_IMG,background1,life1;
var flag_IMG,flagGroup,bombGroup,life_IMG,explosion,reset_IMG;
var x=0;
var life=1;
var lifeGroup;
var gameState="play";
var time=0;
var millitime=0;
var timer=0;
var reset;
var explosion
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	bomb_IMG=loadImage("images/bomb.png")
	background_IMG=loadImage("images/images.jpg")
	man_standing=loadAnimation("images/standing.png")
	man_left=loadAnimation("images/left.png")
	man_right=loadAnimation("images/right.png");
	flag_IMG=loadImage("images/flag.png")
	life_IMG=loadImage("images/life.png")
	man_explosion_IMG=loadImage("images/explosion.png")
	explosion=loadSound("bg music.mp3")
	reset_IMG=loadImage("images/RESTART.png")
}

function setup() {
	createCanvas(800, 700);
man=createSprite(600,535);
man.addAnimation("stand",man_standing)
man.addAnimation("left",man_left)
man.addAnimation("right",man_right)
man.scale=2

man.setCollider("circle",-50,-10,40)

flagGroup=new Group()
bombGroup=new Group()
lifeGroup=new Group()

man_explosion=createSprite(man.x,450)
man_explosion.addImage(man_explosion_IMG)
man_explosion.scale=1.5



 reset=createSprite(400,350)
reset.addImage(reset_IMG);
man_explosion.visible=false

	reset.visible=false
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
  
}


function draw() {
	explosion.play();
  rectMode(CENTER);
  background(background_IMG)
  console.log(gameState)
  if(gameState==="play"){
	man.visible=true
	  millitime=millitime+5
	  if(millitime%100===0){
		  timer=timer+1
		  millitime=0
	  }
	  textSize(30)
	  fill("black")
	  text("Survival time:"+timer,50,100)
	  text("  :  "+millitime, 255,100)
	man.changeAnimation("stand",man_standing)
	if(keyDown("LEFT_ARROW")){
		man.x=man.x-10
		man.changeAnimation("left",man_left)
		 }
		 if(keyDown("RIGHT_ARROW")){
		   man.x=man.x+10
		   man.changeAnimation("right",man_right)
			}
			spawnFlag();
spawnBomb();
if(flagGroup.isTouching(man)){
	flagGroup.destroyEach()
	life=life+1
	x=x+10
	if(life%5===0){
		 life1=createSprite(x,650);
		life1.addImage(life_IMG)
		life1.scale=0.1
		lifeGroup.add(life1)
	}
}
for(var i=0; i<bombGroup.length; i++){
	if(bombGroup.get(i).isTouching(man)){
		life=life-5
		bombGroup.get(i).destroy()
for(var n=0; n<lifeGroup.length; n++){
	lifeGroup.get(n).destroy()
}	
	   }
}

if(life<=0){

	gameState="end"
}
  }
  if(gameState==="end"){
man.visible=false
	man_explosion.visible=true

	reset.visible=true
if(mousePressedOver(reset)){
	//man.changeAnimation("stand",man_standing)
	
	man_explosion.visible=false

	reset.visible=false
	timer=0
	millitime=0
	life=1
	gameState="play"
	
}
  }
  textSize(30)
	  fill("black")
	  text("Survival time:"+timer,50,100)
	  text("  :  "+millitime, 255,100)
  drawSprites();
 
}

function spawnBomb(){
	if(frameCount%80===0){
var bomb=createSprite(100,-10,10,10)
bomb.addImage(bomb_IMG);
bomb.scale=0.3
bomb.x=Math.round(random(10,690))
bomb.velocityY=20
bombGroup.add(bomb)
bomb.setCollider("rectangle",0,0,200,500)
	}
}

function spawnFlag(){
	if(frameCount%150===0){
var flag=createSprite(100,-10,10,10)
flag.addImage(flag_IMG);
flag.scale=0.3
flag.x=Math.round(random(10,690))
flag.velocityY=15
flagGroup.add(flag)
	}
}
