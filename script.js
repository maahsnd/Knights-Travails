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
      for (let i = 0; i < 8; i++) {
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
/* 
const getCurrentPos = () => {
    let knightHost = document.getElementsByClassName('hasKnight');
    let coordinatesRaw = knightHost[0].id;
    let coordinates = coordinatesRaw.slice(3).split('col');
    //returns coordinates as array of [row, column]
    return coordinates;
} */

function rangeCheck(array) {
    if (array[0] < 8 && array[0] > -1) {
        if (array[1] < 8 && array[1] > -1){
            return array;
        }
        return null;
    }
    return null;
}

class Node {
    //coord is array of [row, column]
    constructor(coord){
        this.position = coord;
        this.row = coord[0];
        this.col = coord[1];
        this.one = rangeCheck([(row + 2), (col + 1)]);
        this.two = rangeCheck([(row + 1), (col + 2)]);
        this.three = rangeCheck([(row - 1), (col + 2)]);
        this.four = rangeCheck([(row - 2), (col + 1)]);
        this.five = rangeCheck([(row - 2), (col - 1)]);
        this.six = rangeCheck([(row - 1), (col - 2)]);
        this.seven = rangeCheck([(row + 1), (col - 2)]);
        this.eight = rangeCheck([(row + 2), (col - 1)]);
    }
}
  
chessBoard().setupBoard();
renderKnight().create(0, 0);