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

// global variables
var paths = []; // array of pathfinder objects
var reps = 0;
var finalNumberOfLoops = 0;
var previousFinalNumberOfLoops = 0;

// tree control variables
var branchMultiplier = 2; // number of branches, where 1.5 < x < 2.5
var branchThickness = 2;  // thickness of branches, where 1.5 < x < 2.5
var branchBump = 0.088;    // "curlyness" of branches, where 0.05 < x < 1
var sizeOfTree = 0.02;    // overall tree size, where 0.01 < x < 0.05

function setup() {

  createCanvas(window.innerWidth, 800);
  background(0);
  fill(255);
  noStroke();
  paths[0] = new pathfinder();
}

function draw() {

  for (var i = 0; i < paths.length; i++) {
    // drawing the branches of the tree as an ellipse
    var location = paths[i].location;
    ellipse(location.x, location.y, paths[i].diameter, paths[i].diameter);
    paths[i].update();
    finalNumberOfLoops = i;
  }

 // checking if the loop is repeating (animation is finished)
  if (finalNumberOfLoops === previousFinalNumberOfLoops){
    reps++;
  }
  else{
    previousFinalNumberOfLoops = finalNumberOfLoops;
    reps = 0;
  }
  if(reps > 150){
    windowResized();
  }
}

// function to clear the animation and restart
function windowResized() {
  clear();
  paths = [];
  setup();
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
    this.velocity = new p5.Vector(0, -0.5);
    this.diameter = width / 60;
  }
  else if (parent instanceof pathfinder) {
    // if a pathfinder object is passed, make a new object based on
    // the parent's vectors and properties
    this.location = parent.location.copy();
    this.velocity = parent.velocity.copy();
    var area = PI * sq(parent.diameter / 2);
    var newDiam = sqrt(area / branchMultiplier / PI) * branchThickness;
    this.diameter = newDiam;
    parent.diameter = newDiam;
  }

  this.update = function() {
    // on update, change the direction od the path

    if (this.diameter > 0.75) {
      var bump = new p5.Vector(random(-1, 1), random(-1, 1));
      bump.mult(branchBump);
      this.velocity.add(bump);
      this.velocity.normalize();
      this.location.add(this.velocity);

      if (random(0, 1) < sizeOfTree) {
        // if the random value is within a range, make a new
        // pathfinder object and add it to the array
        append(paths, new pathfinder(this));
      }
    }
  }
}
