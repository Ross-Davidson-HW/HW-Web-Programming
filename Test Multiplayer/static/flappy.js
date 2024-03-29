var myGamePiece;
var myObstacles = [];
var myScore;
var mySound;
var myMusic;
document.cookie = 'user = user; path=/'



function startGame(){	
//get current nickname from cookies
/*
var nickName = cookie.get('user');
if(!nickName) {
	//ask for nickname if there is none
	nickName = prompt ('Type in a nickname: ');
	if(!nickName){
		alert('We cannot work with you like that!');
	}
	else{
		//store in cookies for future use
		cookie.set('Nickname', nickName);
	}
}
*/
    myGamePiece = new component(30, 30, "red", 10, 120);
	myScore = new component("30px", "Consolas", "black", 280, 40, "text");
	myObstacle = new component(10, 200, "green", 300, 120);	
	myGameArea.start();
}


var myGameArea = {
    canvas : document.createElement("canvas"),
	
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0; 
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
     clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }	
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
function component(width, height, color, x, y, type) {
    this.gamearea = myGameArea;
	this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
	this.gravity = 2.5;
	this.gravitySpeed = 0;
	this.bounce = 0.6;
    this.x = x;
    this.y = y;    
    this.update = function() {
    ctx = myGameArea.context;
		if (this.type == "text") 
		{
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}
		else {	
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
    }
	
    this.newPos = function() {
	    this.gravitySpeed = this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
		this.hitTop();
		this.hitLeft();
		this.hitRight();
    }    
	//collision for top
	this.hitTop = function() {
		var top = 0;
		if ( this.y < top ) {
			this.y = top;
		}
	}
	//collision for left
	this.hitLeft = function() { 
		var left = 0;
		if (this.x < left ) {
			this.x = left;
		}
	}
	//collision for right
	this.hitRight = function() {
		var right = myGameArea.canvas.width -this.width;
		if (this.x > right) {
			this.x=right;
		}
	}
	//collision for bottom
	this.hitBottom = function() {
		var rockbottom = myGameArea.canvas.height - this.height;
		if (this.y > rockbottom) {
		  this.y = rockbottom;
		  this.gravitySpeed = -((this.gravitySpeed*10) * this.bounce);
		}
	}
	
	this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
function updateGameArea() {
	
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
		//make button for restart
	  var button = document.createElement("button");
	  button.innerHTML = "Restart" ;
	  //append to html
	  var body = document.getElementByTagName("body")[0];
	  body.appendChild(button);
	  //event handler
	  button.addEventListener("click",function(){
	  startgame.call(myGameArea);
	  });
	  mySound.play();
      myGameArea.stop();
      return;
    }
  }
			
    myGameArea.clear();
	myGameArea.frameNo += 1;
	
	
	if (myGameArea.frameNo == 1 || everyinterval(100)) {
		x = myGameArea.canvas.width;
		minHeight = 100;
		maxHeight = 620;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 100;
		maxGap = 300;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		myObstacles.push(new component(10, height, "green", x, 0));
		myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
	
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += -1;
		myObstacles[i].update();
	}
	
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
	
	
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;  
	

	//left 
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -3; }
	//right
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }
	//up
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -5; }
	//down
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
   	
	
	
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function accelerate(n) {
  myGamePiece.gravity = n;
}