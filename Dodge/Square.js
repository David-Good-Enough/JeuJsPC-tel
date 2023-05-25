function Square(x, y, size, player, speed, classe, asteroid) {

    this.classe = classe;

    this.position = createVector(x, y);
  
      this.speed = speed;
  
    this.velocity = this.setVelocity(this.position, player);
  
    this.size = size; // dimensions

    this.asteroid = asteroid;
  }
  
  /**
   * changes position based upon velocity
   * adds friction if specific is true
   */
  Square.prototype.update = function(specific) {
  
    this.position.add(this.velocity);
  
    if (specific) {
          // only the player gets friction
  
      this.velocity.x *= 0.5;
      this.velocity.y *= 0.5;
    }
  };
  
  /**
   * draws the Square to the screen
   */
  Square.prototype.draw = function() {
    if (this.classe == "Asteroide"){

        stroke(255);
        
        image(this.asteroid, this.position.x, this.position.y);
        noFill();
        rect(this.position.x, this.position.y, this.size, this.size);
        /**/
    }else{
      image(navette, this.position.x, this.position.y);
      noFill();
      rect(this.position.x, this.position.y, this.size, this.size);
      /* */
    }
  };
  
  /**
   * updates whether the Square is offscreen or not
   */
  Square.prototype.isOffscreen = function() {
  
    return (this.position.x < 0 || this.position.x + this.size > width ||
        this.position.y < 0 || this.position.y + this.size > height);
  }
  
  /**
   * returns whether this square collides with passed Square
   */
  Square.prototype.collidesWith = function(square) {
  
      if (square.position.x + square.size> this.position.x && 
        square.position.x< this.position.x + this.size-20 && 
        square.position.y + square.size > this.position.y && 
        square.position.y < this.position.y + this.size-20) {
  
          return true;
      }
    return false; 
  };
  
  /**
   * adds passed acceleration to velocity
   */
  Square.prototype.move = function(xAcceleration, yAcceleration) {
  
    this.velocity.add(createVector((xAcceleration), yAcceleration));
  };
  
  /**
   * returns a vector pointing from vel1 to vel2
   */
  Square.prototype.setVelocity = function(vel1, vel2) {
  
      if (vel1 != null && vel2 != null) {
          // both vectors exist
  
          // point vel1 toward vel2
          var velocity = createVector(vel2.x - vel1.x, vel2.y - vel1.y);
          velocity.setMag(this.speed); // limit the speed
  
          return velocity;
      }
  
      return createVector(1, 0);
  }