
class MovingSmile extends Component {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.smile = new Image();
    this.smile.src = 'https://www.w3schools.com/graphics/smiley.gif';

    this.angry = new Image();
    this.angry.src = 'https://www.w3schools.com/graphics/angry.gif';

    this.crash = new Image();
    this.crash.src = 'https://m.media-amazon.com/images/I/715vwvP5ZEL.png';
    
    this.lastCollusionFrame = -1000;
  }

  start() {
    this.speedX = 1 + 3 * Math.random();
    this.speedY = 1 + 3 * Math.random();
  }

  draw() {
    var ctx = this.parent.canvas.getContext("2d");
    var frame = this.parent.frameNo;

    var image;
    
    var collusion = this.checkHitBound();

    switch (collusion) {
      case Bound.Top:
        this.speedY = Math.abs(this.speedY);
        break;
      case Bound.Bottom:
        this.speedY = -Math.abs(this.speedY);
        break;

      case Bound.Left:
        this.speedX = Math.abs(this.speedX);
        break;
      case Bound.Right:
        this.speedX = -Math.abs(this.speedX);
        break;
    }

    if (collusion != Bound.No) {
      this.lastCollusionFrame = frame;
      return;
    }

    if (frame - this.lastCollusionFrame < 25) {
      image = this.crash;
    } else if ( Math.round(frame / 25) % 2 == 0 ) {
      image = this.smile;
    } else {
      image = this.angry;
    }

    ctx.drawImage(
      image, 
      this.x, 
      this.y,
      this.width, 
      this.height
    );
  }
}

function onHandGameStart() {
  var types = ["paper", "scissors", "stone"];

  const count = 30;

  var root = Math.round( Math.sqrt(30) );
  
  var partWidth = 480 / root;
  var partHeight = 480 / root;

  var placeX = 0; 
  var placeY = 0;

  for (var i=0; i<count; i++) {
    var randX = placeX + Math.random() * partWidth;
    var randY = placeY + Math.random() * partHeight;

    handGame.components.push(new HandGame(randX,randY,30,30, types[i%3]));

    // console.log("X= " + placeX + ", Y= ", placeY);
    
    if (i % root == 0) {
      placeX = 0;
      placeY += partHeight;
    } else {
      placeX += partWidth;
    }

    placeY = (placeY > 450) ? 0 : placeY;
    placeX = (placeX > 450) ? 0 : placeX;
  }
}

function onImageGameStart() {
  const count = 3;
  for (var i=0; i<count; i++) {
    imageGame.components.push(
      new MovingSmile(30, 30, 30,30));
  }
}

var handGame = new GameController("canvas", 10, [], onHandGameStart);
var imageGame = new GameController("canvas", 10, [], onImageGameStart)