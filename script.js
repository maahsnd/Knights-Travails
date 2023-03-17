/* create cell. Take color and row number as arguments.
create div with id rownumberCellnumber */
function createSquare(color, rowNumber, colNumber){
    let square = document.createElement('div');
    square.id = `row${rowNumber}column${colNumber}`;
    square.classList.add(`${color}`)
    return square;
}

/* create row. Take riw number as argument. Call createcell in a loop 8 times, 
each time passing in i as the cellnumber and black or white based on i being even or odd
create separate if logics row even/odd status of row number (starting white or black)   */
function createRow(rowNumber){
    let gameboard = document.getElementById('gameboard');
    let row = document.createElement('div');
    row.id = `${rowNumber}`;
    row.classList.add('row');
    let square;
    if (rowNumber % 2 === 0) {
        //row starts with white
        for (let i = 0; i < 8; i++){
            //alternate cells 
            if (i % 2 === 0) {
                square = createSquare(white, rowNumber, i);
            }
            else {
                square = createSquare(black, rowNumber, i)
            }
            row.append(square);
        }
    } else {
        //row starts with black
        for (let j = 0; j < 8; j++){
            //alternate cells 
            if (j % 2 === 0) {
                square = createSquare(black, rowNumber, j);
            }
            else {
                square = createSquare(white, rowNumber, j)
            }
            row.append(square);
        }
    }
    gameboard.append(row);
}

/* create board. Call create row in a loop 8 times, passing in 
i as row number
*/
function createBoard(){
    for (let i = 0; i < 8; i++) {
        createRow(i);
    }
}

createBoard();