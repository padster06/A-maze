function loop() {
    display.globalAlpha = 1;
    display.fillStyle = "#fff";
    display.fillRect(0, 0, canvas.width, canvas.height);

    if (currNode == endNode) {
        currNode.setPath();
        pathFound = true;
    } else {
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                index = getIndexOfK(nodes, currNode);
                var tempi = index[0] + i;
                var tempj = index[1] + j;
                if (
                    tempi <= -1 ||
                    tempj <= -1 ||
                    tempi >= canvas.width / scale ||
                    tempj >= canvas.width / scale ||
                    nodes[tempi][tempj].properties.wall
                ) {
                    continue;
                }
                if (i == 0 && j == -1) {
                    if (
                        currNode.properties.walls[2] ||
                        nodes[tempi][tempj].properties.walls[3]
                    ) {
                        continue;
                    }
                }
                if (i == 0 && j == 1) {
                    if (
                        currNode.properties.walls[3] ||
                        nodes[tempi][tempj].properties.walls[2]
                    ) {
                        continue;
                    }
                }
                if (i == 1 && j == 0) {
                    if (
                        currNode.properties.walls[1] ||
                        nodes[tempi][tempj].properties.walls[0]
                    ) {
                        continue;
                    }
                }
                if (i == -1 && j == 0) {
                    if (
                        currNode.properties.walls[0] ||
                        nodes[tempi][tempj].properties.walls[1]
                    ) {
                        continue;
                    }
                }
                if (
                    (i == -1 && j == -1) ||
                    (i == 1 && j == -1) ||
                    (i == -1 && j == 1) ||
                    (i == 1 && j == 1)
                ) {
                    // console.log(index);
                    // nodes[tempi][tempj].properties.open = true;
                    // dist = currNode.dist + 14;
                    // if (nodes[tempi][tempj].dist > dist) {
                    //     nodes[tempi][tempj].dist = dist;
                    //     nodes[tempi][tempj].parentNode = currNode;
                    //     nodes[tempi][tempj].calc(endNode);
                    //     // console.log(nodes[tempi][tempj].dist);
                    // }
                    continue;
                } else {
                    nodes[tempi][tempj].properties.open = true;
                    dist = currNode.dist + 10;
                    if (nodes[tempi][tempj].dist > dist) {
                        nodes[tempi][tempj].dist = dist;
                        nodes[tempi][tempj].parentNode = currNode;
                        nodes[tempi][tempj].calc(endNode);
                        // console.log(nodes[tempi][tempj].dist);
                    }
                }
            }
        }

        currNode.properties.closed = true;
        currNode = getNextNode(nodes);
        // console.log(nodes[currNodeIndex.i][currNodeIndex.j]);
    }

    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].length; j++) {
            nodes[i][j].draw(display, pathFound);
        }
    }
}
