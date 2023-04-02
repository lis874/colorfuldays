let font;
let colorParticles = [];
let colorSetOne = ['rgba(255, 72, 176, 0.8)', 'rgba(0, 218, 255, 0.8)', 'rgba(255, 240, 50, 1)'];
let colorSetTwo = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(255, 255, 0, 1)'];

let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let currentHour;
let currentColorSet;
let currentSampleFactor;


function preload(){
  font = loadFont("Cirka-Bold.otf");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  currentHour = hour();
  let currentMinute = minute();
  let currentSecond = second();
  
  
  currentColorSet = getColorSet();
  currentSampleFactor = getSampleFactor();

  newParticles = createNewParticles(currentSampleFactor, currentColorSet);
}


function draw(){
  blendMode(BLEND);
  background('rgb(252, 250, 244)');
  blendMode(MULTIPLY);
  noStroke()

  // translate(width / 2, height / 2);
  drawParticles(colorParticles);
  tryUpdate(currentHour, currentColorSet, currentSampleFactor);

}


function drawParticles(colorParticles) {
  
  for (let i = 0; i < colorParticles.length; i = i + 1) {
    
    let particle, particleColor1, particleColor2, particleColor3, randomShape;
    [particle, particleColor1, particleColor2, particleColor3, randomShape] = colorParticles[i];
    
    let target;
    let vec = createVector(
      particle.originalX - mouseX,
      particle.originalY - mouseY
    );
    let d = vec.mag();

    if (d > 120) {
      targetX = particle.originalX;
      targetY = particle.originalY;
    } else {
      vec.setMag(130);
      targetX = particle.originalX + vec.x;
      targetY = particle.originalY + vec.y;
    }
    let changeX = targetX - particle.x;
    let changeY = targetY - particle.y;
    particle.x = particle.x + 0.02 * changeX;
    particle.y = particle.y + 0.02 * changeY;
    
    if (randomShape === 'shapeOne'){
      drawShapeOne(particle.x, particle.y, particleColor1, particleColor2, particleColor3)
    } else if (randomShape === 'shapeTwo'){
      drawShapeTwo(particle.x, particle.y, particleColor1, particleColor2, particleColor3)
    } else {
      drawShapeThree(particle.x, particle.y, particleColor1, particleColor2, particleColor3)
    }
    
  }
}


function tryUpdate(currentHour, currentColorSet, currentSampleFactor){
  let newHour = hour();
  if (newHour === currentHour){
    return;
  }
  let newColorSet = getColorSet();
  let newSampleFactor = getSampleFactor();
  if (newColorSet !== currentColorSet || newSampleFactor !== currentSampleFactor){
    newParticles = createNewParticles(newSampleFactor, newColorSet);
    currentHour = newHour;
    currentSampleFactor = newSampleFactor;
    currentColorSet = newColorSet;
  }
}


function createNewParticles(sampleFactor, colorSet){
  let options = {
    sampleFactor: sampleFactor
  };
  let newParticles = [];
  let currentMonth = month();
  let currentDay = day();
  let currentDate =  monthNames[currentMonth - 1] + '•' + currentDay;

  // points = font.textToPoints(currentDate, 0, 0, 400, options);
  // bounds = font.textBounds(currentDate, 0, 0, 400, options);
  
  points = font.textToPoints(currentDate, width / 2, height / 2, 400, options);
  bounds = font.textBounds(currentDate, width / 5, height / 10, 400, options);

  for (let i = 0; i < points.length; i = i + 1) {
    let pt = points[i];
    // pt.x = pt.x - bounds.x - bounds.w + windowWidth / 1.25;
    // pt.y = pt.y - bounds.y - bounds.h + windowHeight / 1.25;
    pt.x = pt.x - bounds.x - bounds.w/4;
    pt.y = pt.y - bounds.y - bounds.h/4;
    
    
    let particle = {
      x: pt.x,
      y: pt.y,
    };
    
    particle.originalX = particle.x;
    particle.originalY = particle.y;
    colorParticles.push([particle, color(random(colorSet)), color(random(colorSet)), color(random(colorSet)), random(['shapeOne', 'shapeTwo', 'shapeThree'])]); 
  }  
  return newParticles;
}


function getColorSet(){
  let currentHour = hour();
  
  if (currentHour < 6){
      return colorSetTwo; 
    } else if (currentHour < 18) {
      return colorSetOne; 
    } else {
      return colorSetTwo;
  }
}


function getSampleFactor(){
  let currentHour = hour();
  console.log(currentHour);
  
  if (currentHour < 3){
    return 0.01; 
  } else if (currentHour < 6){
    return 0.02;
  } else if (currentHour < 9){
    return 0.04;
  } else if (currentHour < 15){
    return 0.06;
  } else if (currentHour < 19){
    return 0.04;
  } else if (currentHour < 23){
    return 0.02;
  } else {
    return 0.01;
  }
}


function drawShapeOne(x, y, firstColor, secondColor, thirdColor){
  
  push();
  translate(x, y);
  
  push();
  let sides = 4;
  rotate(0.8);
  for (let i = 0; i < sides; i++) {
    fill(firstColor);
    rect(3, 3, 5, 5);
    rotate(PI/2);
  }
  noFill();
  stroke(secondColor);
  strokeWeight(5);
  ellipse(0, 0, 5, 5);
  pop();
  
  push();
  noStroke();
  for (let i = 0; i < sides; i++) {
    fill(thirdColor);
    ellipse(5, 5, 5, 5);
    rotate(PI/2);
  }
  pop();
  
  pop();
}


function drawShapeTwo(x, y, firstColor, secondColor, thirdColor){
  push();
  translate(x, y);
  
  push();
  let sides = 2;
  noStroke();
  for (let i = 0; i < sides; i++) {
    fill(firstColor)
    ellipse(0, 0, 8, 25);
    rotate(PI/2);
    fill(thirdColor)
    ellipse(0, 0, 5, 5);
  }
  pop();
  
  push();
  rotate(0.8);
  noStroke();
  for (let i = 0; i < sides; i++) {
    fill(secondColor)
    ellipse(0, 0, 8, 25);
    rotate(PI/2);
  }
  noFill();
  stroke(thirdColor);
  strokeWeight(2);
  ellipse(0, 0, 25, 25);
  pop();
  pop();
}


function drawShapeThree(x, y, firstColor, secondColor, thirdColor){
  push();
  translate(x, y);
  
  push();
  let sides = 4;
  rotate(0.8);
  noStroke();
  for (let i = 0; i < sides; i++) {
    fill(firstColor)
    rect(4, 4, 3, 3);
    rotate(PI/2);
  }
  pop();
  
  push();
  rotate(0.8);
  noStroke();
  for (let i = 0; i < sides; i++) {
    fill(secondColor)
    ellipse(0, 0, 3, 15);
    rotate(PI/2);
  }
  pop();
  pop();
}







