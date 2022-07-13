var canvas, display;
var stack = [];
var nodes = [[]];
let findingStarted = false;
var pathFound = 20;
var scale = 15;
var currNode,
  currNodeIndex = { i: 0, j: 0 };
var clicked = false;
var mouse = {
  x: 0,
  y: 0,
};

let selectedAlgoritms = {
  maze: {
    recBack: true,
  },
  path: {
    a: true,
    dijkstra: false,
  },
};

function getIndexOfK(arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

function selecPathFinding(algo) {
  if (findingStarted) return;
  if (algo == "a") {
    selectedAlgoritms.path.dijkstra = false;
    selectedAlgoritms.path.a = true;
  }

  if (algo == "dij") {
    selectedAlgoritms.path.dijkstra = true;
    selectedAlgoritms.path.a = false;
  }
  if (selectedAlgoritms.maze.recBack) {
    document.getElementById("recBack").style.backgroundColor = "#aaa";
  }
  if (selectedAlgoritms.path.a) {
    document.getElementById("a*").style.backgroundColor = "#aaa";
  } else {
    document.getElementById("a*").style.backgroundColor = null;
  }
  if (selectedAlgoritms.path.dijkstra) {
    document.getElementById("dijkstra").style.backgroundColor = "#aaa";
  } else {
    document.getElementById("dijkstra").style.backgroundColor = null;
  }
}

function aStarNextNode(arr) {
  var smallest = Number.MAX_SAFE_INTEGER - 1;
  var curri, currj;

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (
        arr[i][j].dist + arr[i][j].heu < smallest &&
        arr[i][j].properties.closed == false
      ) {
        smallest = arr[i][j].dist + arr[i][j].heu;
        curri = i;
        currj = j;
      } else {
        // console.log(arr[i][j].dist, arr[i][j].closed);
      }
    }
  }
  return arr[curri][currj];
}

function dijkstrasNextNode(arr) {
  console.log("dij");
  var smallest = Number.MAX_SAFE_INTEGER - 1;
  var curri, currj;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j].dist < smallest && arr[i][j].properties.closed == false) {
        smallest = arr[i][j].dist;
        curri = i;
        currj = j;
      }
    }
  }
  console.log(curri, currj, arr[curri], [currj]);
  return arr[curri][currj];
}

function getNextNode(arr) {
  var smallest = Number.MAX_SAFE_INTEGER - 1;
  var curri, currj;
  if (selectedAlgoritms.path.a) {
    return aStarNextNode(arr);
  } else {
    return dijkstrasNextNode(arr);
  }

  // var smallest = Number.MAX_SAFE_INTEGER - 1;
  // var curri, currj;
  // for (var i = 0; i < arr.length; i++) {
  //     for (var j = 0; j < arr[i].length; j++) {
  //         if (
  //             arr[i][j].dist < smallest &&
  //             arr[i][j].properties.closed == false
  //         ) {
  //             smallest = arr[i][j].dist;
  //             curri = i;
  //             currj = j;
  //         } else {
  //             // console.log(arr[i][j].dist, arr[i][j].closed);
  //         }
  //     }
  // }
  // return arr[curri][currj];
}

function init() {
  if (selectedAlgoritms.maze.recBack) {
    document.getElementById("recBack").style.backgroundColor = "#aaa";
  }
  if (selectedAlgoritms.path.a) {
    document.getElementById("a*").style.backgroundColor = "#aaa";
  } else if (selectedAlgoritms.path.dijkstra) {
    document.getElementById("dijkstra").style.backgroundColor = "#aaa";
  }
  canvas = document.getElementById("canvas");
  canvas.width = Math.floor(window.innerWidth / scale) * scale;
  canvas.height = Math.floor((window.innerHeight - 170) / scale) * scale;
  // canvas.height = scale * 20;
  display = canvas.getContext("2d");
  display.fillStyle = "#fff";
  display.fillRect(0, 0, canvas.width, canvas.height);
  canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    // console.log(mouse.x);
    mouse.y = e.y;
    // mouse.sx = e.screenX;
    // mouse
    // console.log(mouse);
  });
  begin();
}

function preset() {
  var i = Math.floor(Math.random() * (nodes.length - 1));
  var j = Math.floor(Math.random() * (nodes[0].length - 1));
  startNode = nodes[i][j];
  endNode =
    nodes[Math.floor(Math.random() * nodes.length)][
      Math.floor(Math.random() * nodes[0].length)
    ];
  // for (var i = 0; i < 20; i++) {
  //     nodes[i][nodes[0].length / 2].properties.wall = true;
  // }
  for (var i = 0; i < 50; i++) {
    var tempi = Math.floor(Math.random() * (nodes.length - 5));
    var tempj = Math.floor(Math.random() * (nodes[0].length - 5));
    nodes[tempi][tempj].properties.wall = true;
  }
}

function begin() {
  var setStart = (setEnd = false);
  console.log(canvas.width / scale);
  for (var i = 0; i < canvas.width / scale; i++) {
    nodes.push(new Array());
    for (var j = 0; j < canvas.height / scale; j++) {
      nodes[i].push(new Node(i, j, scale));
    }
  }

  console.log(nodes, nodes.length);

  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes[i].length; j++) {
      nodes[i][j].draw(display, pathFound);
    }
  }
  startNode = nodes[0][0];
  maze(nodes[0][0], 1);
  // console.log(endNode);

  // document.getElementById("go").addEventListener("click", (e) => {
  //     if (!clicked) {
  //         clicked = true;

  //     }
  // });
}
