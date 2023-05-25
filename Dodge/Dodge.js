var player;
var projectiles = []; // track on-screen Squares
var objet;
var difficulty; // difficulty of the projectiles

function preload(){// précharge les sprites
    fondL = loadImage('imagesdodge/fondL.jpg');
    asteroL1 = loadImage('imagesdodge/AstL1.png');
    asteroL2 = loadImage('imagesdodge/AstL2.png');
    asteroL3 = loadImage('imagesdodge/AstL3.png');
    asteroL4 = loadImage('imagesdodge/AstL4.png');
    asteroL5 = loadImage('imagesdodge/AstL5.png');
    asteroL6 = loadImage('imagesdodge/AstL6.png');
    asteroL7 = loadImage('imagesdodge/AstL7.png');
    asteroL8 = loadImage('imagesdodge/AstL8.png');
    asteroL9 = loadImage('imagesdodge/AstL9.png');

    asteroM1 = loadImage('imagesdodge/AstM1.png');
    asteroM2 = loadImage('imagesdodge/AstM2.png');
    asteroM3 = loadImage('imagesdodge/AstM3.png');
    asteroM4 = loadImage('imagesdodge/AstM4.png');
    asteroM5 = loadImage('imagesdodge/AstM5.png');
    asteroM6 = loadImage('imagesdodge/AstM6.png');
    asteroM7 = loadImage('imagesdodge/AstM7.png');
    asteroM8 = loadImage('imagesdodge/AstM8.png');

    asteroMS1 = loadImage('imagesdodge/AstMS1.png');
    asteroMS2 = loadImage('imagesdodge/AstMS2.png');
    asteroMS3 = loadImage('imagesdodge/AstMS3.png');
    asteroMS4 = loadImage('imagesdodge/AstMS4.png');
    asteroMS5 = loadImage('imagesdodge/AstMS5.png');
    asteroMS6 = loadImage('imagesdodge/AstMS6.png');
    asteroMS7 = loadImage('imagesdodge/AstMS7.png');
    asteroMS8 = loadImage('imagesdodge/AstMS8.png');
    asteroMS9 = loadImage('imagesdodge/AstMS9.png');
    asteroMS10 = loadImage('imagesdodge/AstMS10.png');
    asteroMS11 = loadImage('imagesdodge/AstMS11.png');
    asteroMS12 = loadImage('imagesdodge/AstMS12.png');
    asteroMS13 = loadImage('imagesdodge/AstMS13.png');

    asteroS1 = loadImage('imagesdodge/AstS1.png');
    asteroS2 = loadImage('imagesdodge/AstS2.png');
    asteroS3 = loadImage('imagesdodge/AstS3.png');
    asteroS4 = loadImage('imagesdodge/AstS4.png');
    asteroS5 = loadImage('imagesdodge/AstS5.png');
    asteroS6 = loadImage('imagesdodge/AstS6.png');

    navette = loadImage('imagesdodge/Navette.png');
  }

function setup() {

  createCanvas(1530, 733);

	difficulty = 2;

	/* initialize player */
    objet = "Joueur";
  player = new Square(width / 2, height / 2,
		70, color("#FFFFFF"), null, difficulty * 0.8, objet);

	textAlign(CENTER);
  textSize(40);
}

function draw() {

  background(51);
    image(fondL, 0,0);

  handleProjectiles();
    handlePlayer();
    handleKeys();

    attemptNewProjectile(frameCount);

  drawScore();
}

/**
 * attempt to push a new projectile to the projectiles array
 */
function attemptNewProjectile(frame) {

	if (frame % 30 === 0) {
		// every 0.5 seconds

    if (random(difficulty) > 1.25) {
			// based upon difficulty

			projectiles.push(generateSquare());
		}

		// increase difficulty
    difficulty += 0.05;
  }
}

/**
 * handles user input
 */
function handleKeys() {

	// player is 80% slower than projectiles
	var speed = difficulty * 0.8;

  if (keyIsDown(UP_ARROW))
    player.move(0, -speed);

	if (keyIsDown(DOWN_ARROW))
    player.move(0, speed);

  if (keyIsDown(LEFT_ARROW))
    player.move(-speed, 0);

  if (keyIsDown(RIGHT_ARROW))
    player.move(speed, 0);

}

/**
 * draws the player's score
 */
function drawScore() {

	noStroke();
  text(frameCount, width / 2, 60);
}

/**
 * updates, draws, checks collision for Squares
 * manages projectiles array
 */
function handleProjectiles() {

	for (var i = projectiles.length - 1; i >= 0; i--) {

		/* update & draw */
    projectiles[i].update(false); // false = not-the-player
    projectiles[i].draw();

    if (projectiles[i].collidesWith(player))
			// check for game over
      endGame();

    if (projectiles[i].isOffscreen())
			// delete from array
      projectiles.splice(i, 1);

  }
}

/**
 * updates, draws, and constrains the player
 */
function handlePlayer() {

	/* update & draw */
	player.update(true);
  player.draw();

	/* constrain the player */
  if (player.isOffscreen()) {
    endGame();
  }
}

/**
 * stops the loop, draws game over message
 */
function endGame() {

  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

/**
 * returns a randomly generated Square
 */
function generateSquare() {

  /* create square */
  var plane = (random() > 0.5);
	// true = randomize x-axis & keep y-axis constant
	// false = randomize y-axis & keep x-axis constant

	/* only allow squares to spawn at edges */
  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);
    objet = "Asteroide";

  var randsize = Math.floor(Math.random() * 4);
  if (randsize == 0){

    switch(Math.floor(Math.random() * 6)+1){
      case 1:
        astero = asteroS1;
        size = 54;
      break;
      case 2:
        astero = asteroS2;
        size = 49;
      break;
      case 3:
        astero = asteroS3;
        size = 22;
      break;
      case 4:
        astero = asteroS4;
        size = 40;
      break;
      case 5:
        astero = asteroS5;
        size = 39;
      break;
      case 6:
        astero = asteroS6;
        size = 59;
      break;
    }
    return new Square(x, y, size, player.position, difficulty, objet, astero);
  }else if (randsize == 1){
  
    switch(Math.floor(Math.random() * 13)+1){
      case 1:
        astero = asteroMS1;
        size = 73;
      break;
      case 2:
        astero = asteroMS2;
        size = 90;
      break;
      case 3:
        astero = asteroMS3;
        size = 87;
      break;
      case 4:
        astero = asteroMS4;
        size = 97;
      break;
      case 5:
        astero = asteroMS5;
        size = 91;
      break;
      case 6:
        astero = asteroMS6;
        size = 85;
      break;
      case 7:
        astero = asteroMS7;
        size = 79;
      break;
      case 8:
        astero = asteroMS8;
        size = 93;
      break;
      case 9:
        astero = asteroMS9;
        size = 80;
      break;
      case 10:
        astero = asteroMS10;
        size = 80;
      break;
      case 11:
        astero = asteroMS11;
        size = 71;
      break;
      case 12:
        astero = asteroMS12;
        size = 88;
      break;
      case 13:
        astero = asteroMS13;
        size = 88;
      break;
    }
    
    return new Square(x, y, size, player.position, difficulty, objet, astero);
  }else if (randsize == 2){

    switch(Math.floor(Math.random() * 8)+1){
      case 1:
        astero = asteroM1;
        size = 110;
      break;
      case 2:
        astero = asteroM2;
        size = 130;
      break;
      case 3:
        astero = asteroM3;
        size = 135;
      break;
      case 4:
        astero = asteroM4;
        size = 118;
      break;
      case 5:
        astero = asteroM5;
        size = 117;
      break;
      case 6:
        astero = asteroM6;
        size = 138;
      break;
      case 7:
        astero = asteroM7;
        size = 98;
      break;
      case 8:
        astero = asteroM8;
        size = 110;
      break;
    }

    return new Square(x, y, size, player.position, difficulty, objet, astero);
  }else if (randsize == 3){
    
    switch(Math.floor(Math.random() * 9)+1){
      case 1:
        astero = asteroL1;
        size = 176;
      break;
      case 2:
        astero = asteroL2;
        size = 147;
      break;
      case 3:
        astero = asteroL3;
        size = 149;
      break;
      case 4:
        astero = asteroL4;
        size = 175;
      break;
      case 5:
        astero = asteroL5;
        size = 150;
      break;
      case 6:
        astero = asteroL6;
        size = 140;
      break;
      case 7:
        astero = asteroL7;
        size = 140;
      break;
      case 8:
        astero = asteroL8;
        size = 134;
      break;
      case 9:
        astero = asteroL9;
        size = 135;
      break;
    }
    return new Square(x, y, size, player.position, difficulty, objet, astero);
  }
}
