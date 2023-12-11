/*class Obstacle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.color = color(0, 255, 0);
  }

  show() {
    push();
    fill(this.color);
    stroke(0);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    fill(0);
    ellipse(this.pos.x, this.pos.y, 10);
    pop();
  }
}*/
class Obstacle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.color = "grey";  // Couleur par défaut
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}
