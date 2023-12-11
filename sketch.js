let pursuer1, pursuer2;
let target;
let obstacles = [];
let vehicules = [];

let state = true

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 10; i++) {
    vehicules.push(new Vehicle(random(width),random(height)))
  }

  sliderRadiusSeperation=createSlider(10,200,24,1)
  sliderSeperation=createSlider(0,1,0.9,0.01)

  // On cree un obstalce au milieu de l'écran
  // un cercle de rayon 100px
  // TODO
  obstacle = new Obstacle(-width / 2, -height / 2, 100);
  obstacles.push(obstacle);
}

function draw() {
  // changer le dernier param (< 100) pour effets de trainée
  background(0, 0, 0, 100);

  target = createVector(mouseX, mouseY);

  // Dessin de la cible qui suit la souris
  // Dessine un cercle de rayon 32px à la position de la souris
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 32);

  // dessin des obstacles
  // TODO
  obstacles.forEach(o => {
    o.show();
  });
  let targetMouse = createVector(mouseX, mouseY);
  if(state){
    console.log("State True");
    for( i=0; i < vehicules.length; i++) {
      if(i==0){
        vehicules[i].applyBehaviors(targetMouse, obstacles, vehicules);
        this.weightSeparation=0
      }else{
        let vehiculePrecedent = vehicules[i-1];
  
        //targetPrevious = createVector(vehiculePrecedent.pos.x, vehiculePrecedent.pos.y);
  
        // en fait on veut viser un point derriere le vehicule précédent
        // On prend la vitesse du précédent et on en fait une copie
        let pointDerriere = vehiculePrecedent.vel.copy();
        // on le normalise
        pointDerriere.normalize();
        // et on le multiplie par une distance derrière le vaisseau
        pointDerriere.mult(-50);
        // on l'ajoute à la position du vaisseau
        pointDerriere.add(vehiculePrecedent.pos);
  
        // on le dessine sous la forme d'un cercle pour debug
        fill(255, 0, 0)
        circle(pointDerriere.x, pointDerriere.y, 10);
  
        vehicules[i].applyBehaviors(pointDerriere, obstacles, vehicules);
        this.weightSeparation=0
  
       // si le vehicule est à moins de 5 pixels du point derriere, on le fait s'arreter
       // en mettant le poids de son comportement arrive à 0
       // et en lui donnant comme direction du vecteur vel la direction du vecteur
        // entre sa position et le vaisseau précédent
        if(vehicules[i].pos.dist(pointDerriere) < 20 && vehicules[i].vel.mag() <0.01) {
          vehicules[i].weightArrive = 0;
          vehicules[i].weightObstacle = 0;
          vehicules[i].vel.setHeading(p5.Vector.sub(vehiculePrecedent.pos, vehicules[i].pos).heading());
        } else {
          vehicules[i].weightArrive = 0.3;
          vehicules[i].weightObstacle = 0.9;
        }
  
      }
      vehicules[i].update();
      vehicules[i].show();
    }
  }else{
    console.log("State False");
    for( i=0; i < vehicules.length; i++) {
      if(i==0){
        vehicules[i].applyBehaviors(targetMouse, obstacles, vehicules);
        this.weightSeparation=0
      }else{
        let vehiculePrecedent = vehicules[0]
  
        //targetPrevious = createVector(vehiculePrecedent.pos.x, vehiculePrecedent.pos.y);
  
        // en fait on veut viser un point derriere le vehicule précédent
        // On prend la vitesse du précédent et on en fait une copie
        let pointDerriere = vehiculePrecedent.vel.copy();
        // on le normalise
        pointDerriere.normalize();
        // et on le multiplie par une distance derrière le vaisseau
        pointDerriere.mult(-100);
        // on l'ajoute à la position du vaisseau
        pointDerriere.add(vehiculePrecedent.pos);
  
        // on le dessine sous la forme d'un cercle pour debug
        fill(255, 0, 0)
        circle(pointDerriere.x, pointDerriere.y, 10);
  
        vehicules[i].applyBehaviors(pointDerriere, obstacles, vehicules);
        vehicules[i].weightSeparation=sliderSeperation.value()
        vehicules[i].perceptionRadius=sliderRadiusSeperation.value()

      }
      vehicules[i].update();
      vehicules[i].show();
    }
  }


  
}

// function mousePressed() {
//   obstacle = new Obstacle(mouseX, mouseY, random(5, 60));
//   obstacles.push(obstacle);
// }

function keyPressed() {
  if (key == "v") {
    vehicules.push(new Vehicle(random(width), random(height)));
  }
  if(key == "s"){
    state=!state
  }
  if (key == "d") {
    Vehicle.debug = !Vehicle.debug;
  }

  if (key == "f") {
    const nbMissiles = 10;

    // On tire des missiles !
    for(let i=0; i < nbMissiles; i++) {
      let x = 20+random(10);
      let y = random(height/2-5, random(height/2+5));

      let v = new Vehicle(x, y);
      vehicules.push(v);
    }
  }
}

