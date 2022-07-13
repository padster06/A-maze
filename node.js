class Node {
  constructor(i, j, scale) {
    this.scale = scale;
    this.i = i;
    this.j = j;
    this.x = i * this.scale;
    this.y = j * this.scale;
    this.properties = {
      walls: [
        // top, bottom, left, right
        true, //top
        true, //bottom
        true, //left
        true, //right
      ],
      open: false,
      closed: false,
      walked: false,
      start: false,
      end: false,
      path: false,
      visisted: false,
    };
    // this.walls = {
    //     left: false,
    //     right: false,
    //     top: false,
    //     bottom: true,
    // };
    // this.properties.walls[Math.floor(Math.random() * 3)] = true;
    this.parentNode = null;
    this.dist = Number.MAX_SAFE_INTEGER / 2;
    this.heu = Number.MAX_SAFE_INTEGER / 2;
  }
  draw(display, pathFound) {
    display.beginPath();
    display.fillStyle = "#fff";
    display.globalAlpha = 1;
    if (this.properties.open) {
      display.fillStyle = "#55f";
    }
    if (this.properties.closed) {
      display.fillStyle = "#f55";
    }
    // if (this.properties.path) {
    //     display.fillStyle = "#858";
    // }
    if (this.properties.start || this.properties.end) {
      display.fillStyle = "#0f0";
    }
    if (pathFound && !this.properties.path) {
      display.globalAlpha = 0.4;
      display.strokeStyle = "rgba(0, 0, 0, 0)";
    }
    if (pathFound && this.properties.path) {
      display.fillStyle = "#444";
    }
    if (!this.properties.visisted) {
      display.fillStyle = "#000000";
    }
    if (this.properties.current) {
      display.fillStyle = "#00ff00";
    }
    display.strokeStyle = "#000";
    display.lineWidth = 2;
    display.rect(this.x, this.y, this.scale, this.scale);
    display.fill();
    if (this.properties.walls[0]) {
      display.beginPath();
      display.moveTo(this.x, this.y);
      display.lineTo(this.x, this.y + this.scale);
      display.stroke();
    }
    if (this.properties.walls[1]) {
      display.beginPath();
      display.moveTo(this.x + this.scale, this.y);
      display.lineTo(this.x + this.scale, this.y + this.scale);
      display.stroke();
    }
    if (this.properties.walls[2]) {
      display.beginPath();
      display.moveTo(this.x, this.y);
      display.lineTo(this.x + this.scale, this.y);
      display.stroke();
    }
    if (this.properties.walls[3]) {
      display.beginPath();
      display.moveTo(this.x, this.y + this.scale);
      display.lineTo(this.x + this.scale, this.y + this.scale);
      display.stroke();
    }
    // console.log("drawing");
  }
  setPath() {
    this.properties.path = true;
    if (this.parentNode) {
      this.parentNode.setPath();
    }
  }
  calc(node) {
    var xDiff = this.x - node.x;
    var yDiff = this.y - node.y;
    this.heu = Math.hypot(node.x - this.x, node.y - this.y);
  }

  checkNeighbours(nodes) {
    let neighbours = [];
    let top, bottom, right, left;
    if (this.i > 0) {
      top = nodes[this.i - 1][this.j];
    }
    if (this.i < nodes.length) {
      bottom = nodes[this.i + 1][this.j];
    }
    if (this.j < nodes[this.i].length) {
      right = nodes[this.i][this.j + 1];
    }
    if (this.j > 0) {
      left = nodes[this.i][this.j - 1];
    }

    if (top && !top.properties.visisted) {
      neighbours.push(top);
    }
    if (right && !right.properties.visisted) {
      neighbours.push(right);
    }
    if (left && !left.properties.visisted) {
      neighbours.push(left);
    }
    if (bottom && !bottom.properties.visisted) {
      neighbours.push(bottom);
    }

    if (neighbours.length > 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }
}
