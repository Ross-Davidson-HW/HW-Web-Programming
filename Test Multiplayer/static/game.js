var socket = io();
/*
//get current nickname from cookies
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

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
	  
	case 37: // Left-Arrow
		movement.left = true;
		break;
	case 38: // Up-Arrow
		movement.up = true;
		break;
	case 39: // Right-Arrow
		movement.right = true;
		break;
	case 40: // Down-Arrow
		movement.down = true;
		break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
	case 37: // Left-Arrow
		movement.left = false;
		break;
	case 38: // Up-Arrow
		movement.up = false;
		break;
	case 39: // Right-Arrow
		movement.right = false;
		break;
	case 40: // Down-Arrow
		movement.down = false;
		break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});