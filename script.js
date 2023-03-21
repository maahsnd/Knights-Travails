const chessBoard = () => {
    /* create cell. Take color and row number as arguments.
      create div with id rownumberCellnumber */
    const createSquare = (color, rowNumber, colNumber) => {
      let square = document.createElement("div");
      square.id = `row${rowNumber}col${colNumber}`;
      square.classList.add(color);
      return square;
    };
    /* create row. Take riw number as argument. Call createcell in a loop 8 times, 
      each time passing in i as the cellnumber and black or white based on i being even or odd
      create separate if logics row even/odd status of row number (starting white or black)   */
    const createRow = (rowNumber) => {
      let gameboard = document.getElementById("gameboard");
      let row = document.createElement("div");
      row.id = `${rowNumber}`;
      row.classList.add("row");
      let square;
      if (rowNumber % 2 === 0) {
        //row starts with white
        for (let i = 0; i < 8; i++) {
          //alternate cells
          if (i % 2 === 0) {
            square = createSquare("white", rowNumber, i);
          } else {
            square = createSquare("black", rowNumber, i);
          }
          row.append(square);
        }
      } else {
        //row starts with black
        for (let j = 0; j < 8; j++) {
          //alternate cells
          if (j % 2 === 0) {
            square = createSquare("black", rowNumber, j);
          } else {
            square = createSquare("white", rowNumber, j);
          }
          row.append(square);
        }
      }
      gameboard.append(row);
    };
    /* create board. Call create row in a loop 8 times, passing in 
      i as row number */
    const setupBoard = () => {
      for (let i = 7; i > -1; i--) {
        createRow(i);
      }
    };
    return { setupBoard };
  };

const renderKnight = () => {
    const create = (row, col) => {
        let location = document.getElementById(`row${row}col${col}`);
        let image = document.createElement('img');
        image.src = 'horse.svg';
        image.classList.add('knight');
        location.classList.add('hasKnight');
        location.appendChild(image);
    }
    const remove = () => {
        //check if knight is placed. If true, remove knight. Else, nothing.
        let knightHost = document.querySelector('.hasKnight')
        if (!knightHost) { 
            console.log('error: Knight not found');
            return;
        }
        let knight;
        knight = knightHost.removeChild(document.querySelector('.knight'));
        knightHost.classList.remove('hasKnight');
        return knight;
    }
    const move = (row, col) => {
        let knight = remove();
        let newHost = document.getElementById(`row${row}col${col}`);
        newHost.classList.add('hasKnight');
        newHost.appendChild(knight);
    }
    return { create, move };
}

class Node {
    //coord is array of [row, column], numbers indicate available moves
    constructor(parent =null, coord, distance = 0, one = null, two = null, three= null, four= null, five= null, six= null, seven= null, eight= null){
        this.parent = parent;
        this.position = coord;
        this.distance = distance;
        this.row = coord[0];
        this.col = coord[1];
        this.one = one;
        this.two = two;
        this.three = three;
        this.four = four;
        this.five = five;
        this.six = six;
        this.seven = seven;
        this.eight = eight;
    }
}

class Tree {
    constructor( coord, destination ) {
        this.coord = coord;
        this.root = buildTree().build(coord, destination);
    }
}

function rangeCheck(array) {
    if (array[0] < 8 && array[0] > -1) {
        if (array[1] < 8 && array[1] > -1){
            return true;
        }
        return null;
    }
    return null;
}

function checkArray(array, value) {
    return array.some((element) => value === element);
}

function checkAll(cacheArray, moveRef, moveCoordinates) {
  let inRange = rangeCheck(moveCoordinates);
  if (inRange === null) return false;
  let alreadyVisited = checkArray(cacheArray, moveRef);
  if (alreadyVisited === true) return false;
  return true;
}

function toInt(moveCoordinates, parent) {
  let destination = parseInt(`${moveCoordinates[0]}`+ `${moveCoordinates[1]}`);
  let origin = parseInt(`${parent.position[0]}`+ `${parent.position[1]}`);
  let move = parseInt(`${origin}`+`${destination}`);
  return move
}

 const moves = () => {
  const one = (coord) => [(coord[0] + 2), (coord[1] + 1)];
  const two = (coord) => [(coord[0] + 1), (coord[1] + 2)];
  const three = (coord) => [(coord[0] - 1), (coord[1] + 2)];
  const four = (coord) => [(coord[0] - 2), (coord[1] + 1)];
  const five = (coord) => [(coord[0] - 2), (coord[1] - 1)];
  const six = (coord) => [(coord[0] - 1), (coord[1] - 2)];
  const seven = (coord) => [(coord[0] + 1), (coord[1] - 2)];
  const eight = (coord) => [(coord[0] + 2), (coord[1] - 1)]
  return { one, two, three, four, five, six, seven, eight }
}

const buildTree = () => {
  let queue = [];
  let movesArr = [];
  const build = (rootCoord, destination) => {
    if (!rootCoord) return false;
    if (!rangeCheck(rootCoord)) return false;
    let root = new Node(null, rootCoord);
    queue.push(root);
    while (queue.length){
      let node = queue.shift();
      if (node.position[0] === destination[0] &&
         node.position[1] === destination[1]) { break }
      node.one = handleMove(moves().one(node.position), node);
      node.two = handleMove(moves().two(node.position), node);
      node.three = handleMove(moves().three(node.position), node);
      node.four = handleMove(moves().four(node.position), node);
      node.five = handleMove(moves().five(node.position), node);
      node.six = handleMove(moves().six(node.position), node);
      node.seven = handleMove(moves().seven(node.position), node);
      node.eight = handleMove(moves().eight(node.position), node);
    }
    return root;
  }
  const handleMove = (moveCoordinates, parent) => {
    let move = toInt(moveCoordinates, parent)
    let test = checkAll(movesArr,move, moveCoordinates);
    if (test) {
      let node = new Node(parent, moveCoordinates);
      movesArr.push(move);
      queue.push(node);
      return node
    }
    if (!test) {
      let node = null;
      return node;
    }
  }
  return { build }
}

function doIt() {
    movesArr = [];
    chessBoard().setupBoard();
    renderKnight().create(0, 0);
    let tree = new Tree([0,0], [2,1]);
    return tree;
}

let tree = doIt();