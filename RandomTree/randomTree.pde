pathfinder[] paths;

void setup() {

  size(800, 600);
  background(0);
  ellipseMode(CENTER);
  fill(255);
  noStroke();
  paths = new pathfinder[1];
  paths[0] = new pathfinder();
}

void draw() {
  
  for (int i=0; i < paths.length; i++) {
  
    PVector location = paths[i].location;
    ellipse(location.x, location.y, paths[i].diameter, paths[i].diameter);
    
    //// add colors to tree limbs
    //if (diam > 2){
    //  fill(139, 69, 19); // brown
    //}
    //if (diam < 2 && diam > 1.5){
    // fill(0, 128, 0); // dark green
    //}
    //if (diam < 1.5 && diam > 1){
    // fill(0, 150 ,20); // light green 
    //}
    
    paths[i].update();
  }
}

// redraw on mouse press
void mousePressed() {

  background(0);
  paths = new pathfinder[1];
  paths[0] = new pathfinder();
}
