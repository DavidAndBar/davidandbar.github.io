const clickMine = (event, HEIGHT, WIDTH, MINES_NUMBER) => {
    let rowNumber = event.target.parentElement.id;
    let columnNumber = event.target.id;
    console.log(INVERTCLICK);
    console.log("event: ", event.which);
    
    let primaryBtn = !!!INVERTCLICK ? event.which == 1 :  event.which == 3;
    let secBtn = !!!INVERTCLICK ?  event.which == 3: event.which == 1 ;
    if (primaryBtn && $(`#${rowNumber} #${columnNumber}`).val() != "X") {
        leftClick(rowNumber, columnNumber);
    } else if (secBtn) {
        flagMine(rowNumber, columnNumber);
    }
}

const leftClick = (rowNumber, columnNumber) => {
    checkCell(rowNumber, columnNumber, HEIGHT, WIDTH, MINES_NUMBER);
    setTimeout(checkWin, 0, HEIGHT, WIDTH, MINES_NUMBER);
}

const checkCell = (rowNumber, columnNumber, HEIGHT, WIDTH, MINES_NUMBER,) => {
    let intRowNumber = rowNumber.slice(1);
    let intColumnNumber = columnNumber.slice(1);
    if (!minesGame) {
        minesGame = createGame(HEIGHT, WIDTH, MINES_NUMBER, intRowNumber, intColumnNumber);
        timerOn = setInterval(updateDisplay, 10);
    }
    let number = minesGame[intRowNumber][intColumnNumber];
    if (number == -1) {
        clearInterval(timerOn);
        $(`#r${intRowNumber} #c${intColumnNumber}`).css({
            backgroundColor: "red"
        });
        showWindow(0, false, false);
    } else if (number == 0) {
        $(`#${rowNumber} #${columnNumber}`).val(number).addClass("mine-opened");
        
        openSurrondings(rowNumber, columnNumber, HEIGHT, WIDTH); // here the logic to check cells around.
    } else {
        $(`#${rowNumber} #${columnNumber}`).text(number).val(number).addClass("mine-opened");
        if (number == 1) {
            $(`#${rowNumber} #${columnNumber}`).css({
                color: 'green',
            });
        } else if (number == 2) {
            $(`#${rowNumber} #${columnNumber}`).css({
                color: 'blue',
            });
        } else if (number == 3) {
            $(`#${rowNumber} #${columnNumber}`).css({
                color: 'red',
            });
        } else if (number == 4) {
            $(`#${rowNumber} #${columnNumber}`).css({
                color: 'purple',
            });
        } else if (number == 5) {
            $(`#${rowNumber} #${columnNumber}`).css({
                color: 'darkblue',
            });
        } 
    }
}

const openSurrondings = (rowNumber, columnNumber, HEIGHT, WIDTH) => {
    let rn = parseInt(rowNumber.slice(1)); // i height, j width
    let cn = parseInt(columnNumber.slice(1));
    if (rowNumber != `r-1` && columnNumber != `c-1`) {
        for (let i = rn - 1; i <= rn + 1; i++) {
            for(let k = cn - 1; k <= cn + 1; k++){
                if (!(k == cn && i == rn) && !(k==0 || i == 0) && !(i > HEIGHT || k > WIDTH)) { 
                    if ($(`#r${i} #c${k}`).val().length == 0) {
                        checkCell(`r${i}`, `c${k}`, HEIGHT, WIDTH);
                    }
                }
            }
        }
    }
}

const checkWin = (HEIGHT, WIDTH, MINES_NUMBER) => {
    let numberDiscovered = 0;
    for (let i = 1; i <= HEIGHT ; i++) {
        for (let j = 1 ; j <= WIDTH; j++) {
            if ($(`#r${i} #c${j}`).val() != "X" && (!!$(`#r${i} #c${j}`).val() || $(`#r${i} #c${j}`).val() == '0' )) {
                numberDiscovered++;
            }
        }
    }
    if (numberDiscovered == WIDTH * HEIGHT - MINES_NUMBER) {
        clearInterval(timerOn);
        let time = (parseFloat($('#timer').find('.value').text())).toFixed(2);
        showWindow(time, true, false);
        setTimeout(setHighScore, 50, time);
    }
}

const flagMine = (rowNumber, columnNumber) => {
    
    let minesDiscovered = parseInt($('#div-mines-discovered').text());
    if (!$(`#${rowNumber} #${columnNumber}`).val()) {
        $(`#${rowNumber} #${columnNumber}`).val("X");
        $(`#${rowNumber} #${columnNumber}`).css({
            backgroundImage: "url('./icons/skull-flag.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        });
        minesDiscovered--;
        $('#div-mines-discovered').text(minesDiscovered);
    } else if ($(`#${rowNumber} #${columnNumber}`).val() == "X") {
        $(`#${rowNumber} #${columnNumber}`).val("");
        $(`#${rowNumber} #${columnNumber}`).css({
            backgroundImage: "none"
        });
        minesDiscovered++;
        $('#div-mines-discovered').text(minesDiscovered);
    }
    
}
