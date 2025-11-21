
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

    for (var i=0; i<this.parent.components.length; i++) {
      if (this.parent.components[i].type != "obstacle") {
        continue;
      }

      console.log(this.crashWith(this.parent.components[i]));

      if (this.crashWith(this.parent.components[i])) {
        this.speedX = 0;
        this.speedY = 0;
        this.lastCollusionFrame = frame;
      }
    }

    var hitBound = this.checkHitBound();

    switch (hitBound) {
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

    if (hitBound != Bound.No) {
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

class Obstacle extends Cube {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);

    this.type = "obstacle";
  }
}


function onImageGameStart() {
  const count = 3;
  for (var i=0; i<count; i++) {
    imageGame.components.push(
      new MovingSmile(30, 30, 30,30));
  }

  imageGame.components.push(new Obstacle(260, 260, 100, 20, "red"));
}

var imageGame = new GameController("canvas", 10, [], onImageGameStart)