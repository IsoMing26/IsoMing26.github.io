var x = 0;
var speedx = 6;
var y = 0;
var speedy = 7;
var newball = [];
var bgcolor;
var ballcolor;
var newballcolor;
var size;


function setup(){
	createCanvas(windowWidth, windowHeight);
	bgcolor = color(random(0, 256), random(0, 256), random(0, 256));
	ballcolor = color(random(0, 256), random(0, 256), random(0, 256));
	newballcolor = color(random(0, 256), random(0, 256), random(0, 256));
	size = random(0.1, 0.5)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw(){
	
	var diameter = min(width, height) * size;
	
	background(bgcolor);
	fill(ballcolor);  
	circle(x, y, diameter);

	if (x > width) {
		speedx = -6;
	} else if ( x < 0 ) {
		speedx = 6;
	}

    if (y > height) {
		speedy = -7;
	} else if ( y < 0 ) {
		speedy = 7;
	}
   
	x = x + speedx;
    y = y + speedy;

	for (var i = 0; i < newball.length; i++){
		var ball = newball [i];
		fill(newballcolor);
		circle(ball.x, ball.y, diameter)

		ball.x = ball.x + ball.speedX;
		ball.y = ball.y + ball.speedY;

		if(ball.x > width) {
		ball.speedX = ball.speedX * -1;
	} else if (ball.x < 0) {
		ball.speedX = ball.speedX;
	}

	if(ball.y > height) {
		ball.speedY = ball.speedY * -1;
	} else if (ball.y < 0) {
		ball.speedY = ball.speedY;
	}
	}
}

function mousePressed() {
	newball.push({
		x: mouseX,
		y: mouseY,
		speedX: random(-10, 10),
		speedY: random(-10, 10),
	})
}