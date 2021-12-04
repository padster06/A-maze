function removeWalls(current, next) {
   if (next.i > current.i) {
      current.properties.walls[1] = false;
      next.properties.walls[0] = false;
   }
   if (next.i < current.i) {
      current.properties.walls[0] = false;
      next.properties.walls[1] = false;
   }
   if (next.j > current.j) {
      current.properties.walls[3] = false;
      next.properties.walls[2] = false;
   }
   if (next.j < current.j) {
      current.properties.walls[2] = false;
      next.properties.walls[3] = false;
   }
}

function maze(current, total) {
   // let current = nodes[0][0];

   current.properties.visisted = true;

   document.getElementById('fract').innerHTML = `${total}/${
      (canvas.width / scale) ** 2
   }`;

   document.getElementById('perc').innerHTML = `${
      Math.floor((total / (canvas.width / scale) ** 2) * 100 * 100) / 100
   }%`;

   let next = current.checkNeighbours(nodes);
   // console.log(next);
   current.properties.current = false;

   if (next) {
      next.properties.visisted = true;
      total++;
      stack.push(current);

      removeWalls(current, next);
      current = next;
   } else if (stack.length > 0) {
      var node = stack.pop();
      current = node;
   } else {
      endNode = nodes[nodes.length - 2][nodes[0].length - 1];

      currNode = startNode;
      currNodeIndex.i = i;
      currNodeIndex.j = j;
      startNode.dist = 0;
      startNode.properties.start = true;
      endNode.properties.end = true;
      // console.log(nodes);
      setInterval(loop, 30 / 1000);
      return;
   }
   current.properties.current = true;

   display.fillStyle = '#fff';
   display.fillRect(0, 0, canvas.width, canvas.height);
   let finished = true;
   for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < nodes[i].length; j++) {
         nodes[i][j].draw(display, pathFound);
      }
   }

   setTimeout(() => {
      maze(current, total);
   }, 0);
}
