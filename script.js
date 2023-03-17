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
    constructor(coord, parent = null, one = null, two = null, three= null, four= null, five= null, six= null, seven= null, eight= null){
        this.parent = parent;
        this.position = coord;
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
    constructor( coord ) {
        this.coord = coord;
        this.root = buildTree(coord);
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
let movesArr = [];

//coord is array of [row, column]
function buildTree(coord){
    if (!rangeCheck(coord)) return null; 
    let nodeRef = parseInt(`${coord[0]}`+ `${coord[1]}`);
    if (checkArray(movesArr, nodeRef)) return null;
    movesArr.push(nodeRef);
    let newNode = new Node(coord);
    newNode.one = buildTree([(coord[0] + 2), (coord[1] + 1)]);
    newNode.two = buildTree([(coord[0] + 1), (coord[1] + 2)]);
    newNode.three = buildTree([(coord[0] - 1), (coord[1] + 2)]);
    newNode.four = buildTree([(coord[0] - 2), (coord[1] + 1)]);
    newNode.five = buildTree([(coord[0] - 2), (coord[1] - 1)]);
    newNode.six = buildTree([(coord[0] - 1), (coord[1] - 2)]);
    newNode.seven = buildTree([(coord[0] + 1), (coord[1] - 2)]);
    newNode.eight = buildTree([(coord[0] + 2), (coord[1] - 1)]); 
    return newNode;
}

function doIt() {
    movesArr = [];
    chessBoard().setupBoard();
    renderKnight().create(0, 0);
    let tree = new Tree([0,0]);
    return tree;
}
