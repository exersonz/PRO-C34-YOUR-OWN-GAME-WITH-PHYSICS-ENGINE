const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ball, ballImg;
var ball_con, ball_con2;

var blowSound;
var cutSound;

var rope;
var ground, ground2, ground3, ground4;

var star, starImg;
var star2;
var starDisplay, emptyStar, oneStar, twoStar;

var button,button2;

var blower_up, blower_left, blower_right;

var START = 1;
var END = 2;
var gameState = START;

function preload()
{
  ballImg = loadImage("pin ball.webp");
  starImg = loadImage("star.png");
  emptyStar = loadAnimation("empty.png");
  oneStar = loadAnimation("one_star.png");
  twoStar = loadAnimation("stars.png");

  cutSound = loadSound("rope_cut.mp3");
  blowSound = loadSound("air.wav");
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   //blower button
   blower_up = createImg("baloon2.png");
   blower_up.position(390,550);
   blower_up.size(100,120);
   blower_up.mouseClicked(upBlow);

   //blower button
   blower_right = createImg("balloon.png");
   blower_right.position(470,570);
   blower_right.size(120,100);
   blower_right.mouseClicked(rightBlow);

   //blower button
   blower_left = createImg("left_balloon.png");
   blower_left.position(290,570);
   blower_left.size(120,100);
   blower_left.mouseClicked(leftBlow);   
 
   rope = new Rope(5,{x:200,y:90});
   rope2 = new Rope(5,{x:490,y:90});

   ground = new Ground(300,height-10,width,20);
   ground2 = new Ground(590,350,20,height);
   ground3 = new Ground(300,10,width,20);
   ground4 = new Ground(10,350,20,height);

   star = createSprite(330,50,20,20);
   star.addImage(starImg);
   star.scale = 0.02;

   star2 = createSprite(80,340,20,20);
   star2.addImage(starImg);
   star2.scale = 0.02;

   starDisplay = createSprite(80, 50,30,30);
   starDisplay.addAnimation("empty",emptyStar);
   starDisplay.addAnimation("one", oneStar);
   starDisplay.addAnimation("two", twoStar);
   starDisplay.scale = 0.2;

   starDisplay.changeAnimation("empty");

  
   ball = Bodies.circle(300,300,20);
   ball.restituion = 1;
   Matter.Composite.add(rope.body,ball);

   ball_con = new Link(rope,ball);
   ball_con2 = new Link(rope2,ball);

   rectMode(CENTER);
   ellipseMode(RADIUS);
   textSize(50)
}

function draw() 
{
  background(51);

  push();
  imageMode(CENTER);
  if(ball!=null){
    image(ballImg,ball.position.x,ball.position.y,70,70);
  }
  pop();

  textSize(20);
  text("Collect Stars to Win", 40,590);

  textSize(20);
  text("Use the Ballons to Control Ball", 40,610);

  rope.show();
  rope2.show();

  ground.show();
  ground2.show();
  ground3.show();
  ground4.show();
  
  Engine.update(engine);
  

  drawSprites();

  if(collide2(ball, star, 20)==true)
  {
    star.visible = false;
    starDisplay.changeAnimation("one");
  }

  if(collide2(ball, star2, 20) == true)
  {
    star2.visible = false;
    starDisplay.changeAnimation("two");
    gameState = END;
  }

  if(gameState === END)
  {
    textSize(40);
    text("You Win!",200,305);
  }

  
}

function drop()
{
  cutSound.play();
  rope.break();
  ball_con.dettach();
  ball_con = null; 
}

function drop2()
{
  cutSound.play();
  rope2.break();
  ball_con2.dettach();
  ball_con2 = null;
}

function upBlow()
{
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:0, y:-0.05});
  blowSound.play();
}

function leftBlow()
{
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:-0.05, y:0});
  blowSound.play();
}

function rightBlow()
{
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:0.05, y:0});
  blowSound.play();
}

function collide2(body, sprite, x)
{
  if(body!=null)
  {
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(distance <= x)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}

