var player;
var projectiles = []; // track on-screen Squares
var objet;
var difficulty; // difficulty of the projectiles

function preload(){// précharge les sprites
    fondL = loadImage('imagesdodge/fondL.jpg');
    asteroL = loadImage('imagesdodge/AstL1.png');
    asteroM = loadImage('imagesdodge/AstM1.png');
    asteroMS = loadImage('imagesdodge/AstMS1.png');
    asteroS = loadImage('imagesdodge/AstS1.png');
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

  var randsize = (random() > 4);
  if (randsize == 0){
    astero = asteroS;
    return new Square(x, y, 54, player.position, difficulty, objet, astero);
  }else if (randsize == 1){
    astero = asteroMS;
    return new Square(x, y, 73, player.position, difficulty, objet, astero);
  }else if (randsize == 2){
    astero = asteroM;
    return new Square(x, y, 110, player.position, difficulty, objet, astero);
  }else if (randsize == 3){
    astero = asteroL;
    return new Square(x, y, 176, player.position, difficulty, objet, astero);
  }
}
