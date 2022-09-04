
// Background
var bg_image, bg

//Player
var player
var player_img1, player_img2, player_img3

//Zombie
var Zombie
var Zombie_img
var zombieGroup


//Hearts
var heart1, heart2, heart3
var Hearts_img1, Hearts_img2, Hearts_img3


//Bullets
var bullet_sprite
var bulletGroup


//Main Components
var Life = 3
var score = 0
var bullets = 100


//gamestates
var gamestate = "play"

//Sounds
var KilledLifeSoundNotExplosion
var loseLife
var winSound



function preload(){

    //loading Images
    bg_image = loadImage("./assets/bg.jpeg")
    
    player_img1 = loadImage("./assets/shooter_1.png")
    player_img2 = loadImage("./assets/shooter_2.png")
    player_img3 = loadImage("./assets/shooter_3.png")

    Zombie_img = loadImage("./assets/zombie.png")

    Hearts_img1 = loadImage("./assets/heart_1.png")
    Hearts_img2 = loadImage("./assets/heart_2.png")
    Hearts_img3 = loadImage("./assets/heart_3.png")

    loseLifeSoundNotExplosion = loadSound("./assets/explosion.mp3")
    loseLife = loadSound("./assets/loseLife.mp3")
    winSound = loadSound("./assets/win.mp3")
}


function setup(){
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(displayWidth/2, displayHeight/2 - 80)
    bg.addImage(bg_image)
    bg.scale = 1.5

    player = createSprite(width/2 - 500, height/2)
    player.addImage(player_img1)
    player.scale = 0.3

    heart1 = createSprite(displayWidth - 200, 50)
    heart1.addImage(Hearts_img3)
    heart1.scale = 0.5
    heart1.visible = true

    heart2 = createSprite(displayWidth - 150, 50)
    heart2.addImage(Hearts_img2)
    heart2.scale = 0.5
    heart2.visible = false  

    heart3 = createSprite(displayWidth - 100, 50)
    heart3.addImage(Hearts_img1)
    heart3.scale = 0.5
    heart3.visible = false

    bulletGroup = new Group()
    zombieGroup = new Group()
}



function draw(){

    if(gamestate == "play"){

    //Move Player
    if(keyDown("UP_ARROW") || keyDown("W")){
        player.y -= 20
    }

    if(keyDown("DOWN_ARROW") || keyDown("S")){
        player.y += 20
    }

    /*if(keyDown("LEFT_ARROW") || keyDown("A")){
        player.x -= 20
    }*/

    /*if(keyDown("RIGHT_ARROW") || keyDown("D")){
        player.x += 20
    }*/

    //Shoot
    if(keyWentDown("space")){
        player.addImage(player_img3)
        bullet_sprite = createSprite(player.x + 45, player.y - 25, 20, 10)
        bullet_sprite.velocityX = 25
        bullets = bullets - 1


        bulletGroup.add(bullet_sprite)

    }
    
    if(keyWentUp("space")){
        player.addImage(player_img2)

    }

    enemy()

    if(Life == 0 || bullets == 0){
        gamestate = "Lost"
    }

    if(score == 150){
        gamestate = "Won"
    }

    if(Life == 3){
        heart1.visible = true
        heart2.visible = false
        heart3.visible = false
    }

    if(Life == 2){
        heart1.visible = false
        heart2.visible = true
        heart3.visible = false
    }

    if(Life == 1){
        heart1.visible = false
        heart2.visible = false
        heart3.visible = true
    }

    if(Life == 0){
        heart1.visible = false
        heart2.visible = false
        heart3.visible = false
    }


    if(zombieGroup.isTouching(player)){
        loseLife.play()
        for(i=0; i < zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(player)){
                zombieGroup[i].destroy()
                Life = Life-1
              
            }
        }

    }


    if(zombieGroup.isTouching(bulletGroup)){
        for(i=0; i < zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(bulletGroup)){
                zombieGroup[i].destroy()
                bulletGroup.destroyEach()
                score = score + 10
                loseLifeSoundNotExplosion.play()
            }
        }
    }

    if(score == 100){
        gamestate = "Won"
        winSound.play()
    }

    }



    drawSprites()


    textSize(30)
    fill("white")
    stroke("black")
    text("Bullets: "+ bullets, 30, 50)
    text("Score: "+score, 30, 90)
    text("Lives: "+Life, 30, 130)


    
    if(gamestate == "Lost"){
        console.log("Hi Im gamestate Lost")
        textSize(25)
        fill("red")
        stroke("black")
        text("YOU LOST 😲! TRY AGAIN. Dont worry, a fail is a stepping stone to sucess :)", displayWidth/4, displayHeight/2 - 50)
        
    }

    if(gamestate == "Won"){
        zombieGroup.destroyEach()
        fill("red")
        stroke("black")
        text("LETS GO! YOU'VE SAVED YOUR TOWN!", displayWidth/3, displayHeight/2 - 50)

    }


}



function enemy(){
    if(frameCount%60 == 0){
        Zombie = createSprite(random(1000, 2000), random(150, 600))
        Zombie.addImage(Zombie_img)
        Zombie.scale = 0.2
        Zombie.velocityX = -5
        Zombie.setCollider("rectangle", 0,0,400,800)

        zombieGroup.add(Zombie)
        //Zombie.debug = true
    }

}