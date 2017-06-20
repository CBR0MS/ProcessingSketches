/*
  ___ ____
 / __|    |
/ /  |___ /
\ \__|    \
 \___|____|

code by CB -> www.christianbroms.com

File: sketh.js
Desc: animation of tree growing on landing page using p5.js
Created on: 06/19/17
Requires: main.html (for CDNs)
Dependants: main.html
CDN: None
Links to: None

*/
// TODO: issue with entering update()

var paths = []; // array of pathfinder objects

function setup() {

  createCanvas(1000, 800); // size of rendering
  background(0);
  ellipseMode(CENTER);
  fill(255);
  noStroke();
  paths[0] = new pathfinder(); // initialize the array
}

function draw() {

  print(paths.length);

  if (paths.length > 2042){
    // stop the draw loop when the animation is finished
    noLoop();
  }

  for (var i = 0; i < paths.length; i++) {
   var location = paths[i].location;
   ellipse(location.x, location.y, paths[i].diameter, paths[i].diameter);
   paths[i].update();
 }
}

// pathfinder class
function pathfinder(parent) {

  var location;
  var velocity;
  var diameter;

  if (parent == undefined) {
    // if nothing is passed, create a new object and vectors
    // this is the starting "trunk" of the tree
    this.location = new p5.Vector(width / 2, height);
    this.velocity = new p5.Vector(0, -1);
    this.diameter = 32;
  }
  else if (parent instanceof pathfinder) {
    // if a pathfinder object is passed, make a new object based on
    // the parent's vectors and properties
    this.location = parent.location.copy();
    this.velocity = parent.velocity.copy();
    var area = PI * sq(parent.diameter / 2);
    var newDiam = sqrt(area / 2 / PI) * 2;
    this.diameter = newDiam;
    parent.diameter = newDiam;
  }

  this.update = function() {
    // on update, change the direction od the path

    if (this.diameter > 0.75) {
      var bump = new p5.Vector(random(-1, 1), random(-1, 1));
      bump.mult(0.1);
      this.velocity.add(bump);
      this.velocity.normalize();
      this.location.add(this.velocity);

      if (random(0, 1) < 0.02) {
        // if the random value is within a range, make a new
        // pathfinder object and add it to the array
        append(paths, new pathfinder(this));
      }
    }
  }
}
