const createGame = (HEIGHT, WIDTH, MINES_NUMBER, intRowNumber, intColumnNumber) => {

    let minesNumber = MINES_NUMBER;

    let minesList = [];
    let minesRow = [];
    let number = 0;
    let x;
    let y;

    // Creating the array as a template full of zeros.
    for (let i = 0; i < HEIGHT + 2; i++) {
        for (let j = 0; j < WIDTH + 2; j++) {
            minesRow[j] = number;
        }
        minesList[i] = [...minesRow]; // Passing the array by reference.
    }
    intRowNumber = parseInt(intRowNumber);
    intColumnNumber = parseInt(intColumnNumber);
    // Choosing randomly where the mines are.
    while (minesNumber > 0) {
        x = Math.round(Math.random()*(HEIGHT - 1)) + 1;
        y = Math.round(Math.random()*(WIDTH - 1)) + 1;
        surrondings =   !( x == intRowNumber - 1 && y == intColumnNumber - 1) && 
                    !( x == intRowNumber - 1 && y == intColumnNumber) && 
                    !( x == intRowNumber - 1 && y == intColumnNumber + 1) && 
                    !( x == intRowNumber && y == intColumnNumber - 1) && 
                    !( x == intRowNumber && y == intColumnNumber + 1) &&
                    !( x == intRowNumber + 1 && y == intColumnNumber - 1) &&
                    !( x == intRowNumber + 1 && y == intColumnNumber) &&
                    !( x == intRowNumber + 1 && y == intColumnNumber + 1); // Make sure neither the first clicked nor its surrondings are a bomb.
        if (minesList[x][y] != -1 && !( x == intRowNumber && y == intColumnNumber) && surrondings) {
            minesList[x][y] = -1;
            minesNumber--;
        }
    }

    // Counting how many mines a square have around.
    for (let i = 1; i <= HEIGHT; i++) {
        for (let j = 1; j <= WIDTH; j++) {
            let countMines = 0;
            if (minesList[i][j] == 0) {
                for (k = i-1; k <= i+1; k++) {
                    for(l = j - 1; l <= j + 1; l++){
                        if (!(k == i && l == j)) {
                            if (minesList[k][l] == -1) {
                                countMines++;
                            }
                        }
                    }
                }
                minesList[i][j] = countMines;
            }
        }
    }
    return minesList;
}
