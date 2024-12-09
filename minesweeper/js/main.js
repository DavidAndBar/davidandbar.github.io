let minesGame;
let minesDiscovered = 0;
let timer;
var HEIGHT; // Beg: 10 Easy: 14 Inter: 20 Exp: 26
var WIDTH; // Beg: 8 Easy: 9 Inter: 15 Exp: 19
var MINES_NUMBER; // Beg: 7 Easy: 15 Inter: 40 Exp: 99
var mineFontSize;
var startTime;
var timerOn;
var highScoreBeg = {"high-scores": [ {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}]};
var highScoreEasy = {"high-scores": [ {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}]};
var highScoreInter = {"high-scores": [ {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}]};
var highScoreExpert = {"high-scores": [ {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}, {"name": "", "time": ""}]};

const newGame = (difficulty) => {
    let sizeMine = 35;
    switch (difficulty) {
        case "beginner":
            HEIGHT = 10; // Beg: 10 Easy: 14 Inter: 20 Exp: 26
            WIDTH = 8; // Beg: 8 Easy: 9 Inter: 15 Exp: 19
            MINES_NUMBER = 7; // Beg: 7 Easy: 15 Inter: 40 Exp: 99
            mineFontSize = "1.5em";
            break;
        case "easy":
            HEIGHT = 14; // Beg: 10 Easy: 14 Inter: 20 Exp: 26
            WIDTH = 9; // Beg: 8 Easy: 9 Inter: 15 Exp: 19q
            MINES_NUMBER = 15; // Beg: 7 Easy: 15 Inter: 40 Exp: 99
            mineFontSize = "1.3em";
            break;
        case "inter":
            HEIGHT = 20; // Beg: 10 Easy: 14 Inter: 20 Exp: 26
            WIDTH = 15; // Beg: 8 Easy: 9 Inter: 15 Exp: 19
            MINES_NUMBER = 40; // Beg: 7 Easy: 15 Inter: 40 Exp: 99
            mineFontSize = "1em";
            break;
        case "expert":
            HEIGHT = 26; // Beg: 10 Easy: 14 Inter: 20 Exp: 26
            WIDTH = 19; // Beg: 8 Easy: 9 Inter: 15 Exp: 19
            MINES_NUMBER = 99; // Beg: 7 Easy: 15 Inter: 40 Exp: 99
            mineFontSize = "0.8em";
            break;
        default:
            break;
    }

    $('#div-mines-discovered').text(MINES_NUMBER);
    let cssRows = "";
    let cssColumns = "";
    for (let i = 1; i <= HEIGHT; i++) {
        cssColumns = "";
        $("#mines-grid").append(`<div id="r${i}" class="rows"></div>`);
        for (let j = 1; j <= WIDTH; j++){
            $(`#r${i}`).append(`<div id="c${j}" class="mine" ></div>`);
            cssColumns += `${sizeMine}px `;
        }
        cssRows += `${sizeMine}px `;
    }

    $('.mine').bind("mousedown", (event) => {
        clickMine(event, HEIGHT, WIDTH, MINES_NUMBER);
    })
    
    $('.mine').on("taphold",(event) => {
        if(window.screen.width < 798){
            let rowNumber = event.target.parentElement.id;
            let columnNumber = event.target.id;
            flagMine(rowNumber, columnNumber);
        }
    });

    $('.mine').css({
        fontSize: mineFontSize,
    })

    $("#mines-grid").css({
        //gridTemplateColumns: `1fr`,
        gridTemplateRows: cssRows
    });

    $(".rows").css({
        gridTemplateColumns: cssColumns,
        //gridTemplateRows: `1fr`
    });
    $("#mines-grid").css({"opacity": "1"})

    $("#board").css({"width": `${sizeMine*WIDTH*1.30}px`})
}

const deleteGame = () => {
    $("#mines-grid").empty();
    $("#game-over-div").remove();
    minesGame = undefined;
}

const startover = () => {
    deleteGame();
    newGame($("#difficulty").val());
    clearInterval(timerOn);
    $('#timer').find('.value').text(0);
    $(".ui-selectmenu-button-text").remove();
    $("#reset-icon img").attr("src", "./icons/smile-face.svg");
}

function updateDisplay() {
    var value = parseFloat($('#timer').find('.value').text());
    value = value + 0.01;
    $('#timer').find('.value').text(value.toFixed(2));
};

const showWindow = (time, win, checkScore) => {    
    clearInterval(timerOn);
    if ($("#game-over-div").length === 0 || (document.getElementById("game-over-div").className == "gameover")) {
        if (checkScore) {
            $(".gameover").remove();
            highScoreBeg = JSON.parse(localStorage.getItem("high-scores-beg"));
            let hsHTML = `
            <div id="game-over-div" class="scores">
                <div style="height:100%; width:100%;">
                    <h3>High Scores: </h3>
                    <div class="w3-bar w3-black" style="display: flex; justify-content: center">
                        <button id="Beginner" class="w3-bar-item w3-button btn-hs btn-selected" onclick="openScores(event)">Beginner</button>
                        <button id="Easy" class="w3-bar-item w3-button btn-hs" onclick="openScores(event)">Easy</button>
                        <button id="Intermediate" class="w3-bar-item w3-button btn-hs" onclick="openScores(event)">Intermediate</button>
                        <button id="Expert" class="w3-bar-item w3-button btn-hs" onclick="openScores(event)">Expert</button>
                    </div>
                    <div id="Beginner-list" class="high-scores">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div id="Easy-list" class="high-scores" style="display:none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div id="Intermediate-list" class="high-scores" style="display:none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div id="Expert-list" class="high-scores" style="display:none">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>`
            $("body").append(hsHTML);
            highScoreBeg["high-scores"].forEach((e) => {
                if (e.name != "") {
                    $("#Beginner-list table tbody").append(`<tr> <td>${e.name}</td><td>${e.time} s</td>`)
                }
            })
            $("#mines-grid").css({"opacity": "0.4"});
        } else {
            if (!win){
                for (let i = 0; i < minesGame.length; i++) {
                    for (let j = 0; j < minesGame[i].length; j++) {
                        if(minesGame[i][j] === -1){
                            $(`#r${i} #c${j}`).css({
                                backgroundImage: "url('./icons/explosion.svg')",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            });
                        }
                    }
                }
            }
            $("body").append(`<div id="game-over-div" class="gameover">${win ? `<p>You won!</p>  <p>Time: ${time} s</p> </div>` : "</div>"}`);
            $("#reset-icon img").attr("src", `./icons/${win ? "winner-icon" : "dead-face"}.svg`);
        }
        let leftPos = ($("#mines-grid").position().left)*1.0110605075 + parseFloat($("#mines-grid").css("border-width"));
        $("#game-over-div").css({
            top: $("#mines-grid").position().top,
            left: leftPos,
            width: parseFloat($("#mines-grid").css("width")) - parseFloat($("#mines-grid").css("border-width"))*2,
            height: parseFloat($("#mines-grid").css("height"))
        });
    } else {
        $(".scores").remove();
        $("#mines-grid").css({"opacity": "1"});
        startover()
    }
};

$(document).ready(() => {
    window.addEventListener("contextmenu", e => e.preventDefault()); // Disable right click feature

    if (!!!localStorage.getItem("high-scores-beg") || !!!localStorage.getItem("high-scores-easy") || !!!localStorage.getItem("high-scores-inter") || !!!localStorage.getItem("high-scores-expert")) {
        localStorage.setItem("high-scores-beg", JSON.stringify(highScoreBeg));
        localStorage.setItem("high-scores-easy", JSON.stringify(highScoreEasy));
        localStorage.setItem("high-scores-inter", JSON.stringify(highScoreInter));
        localStorage.setItem("high-scores-expert", JSON.stringify(highScoreExpert));
    } else {
        highScoreBeg = JSON.parse(localStorage.getItem("high-scores-beg"));
        highScoreEasy = JSON.parse(localStorage.getItem("high-scores-easy"));
        highScoreInter = JSON.parse(localStorage.getItem("high-scores-inter"));
        highScoreExpert = JSON.parse(localStorage.getItem("high-scores-expert")); 
    }

    newGame("easy");
    $("#difficulty").on("change", () => {
        startover();
    } );
    $(".ui-body-a").remove();
    $(".ui-selectmenu-button-text").remove();
    $(".ui-page, .ui-page-theme-a, .ui-page-active").css("min-height", "auto");

    $(window).resize(() => {
        let leftPos = ($("#mines-grid").position().left);
        
        $("#game-over-div").css({
            top: $("#mines-grid").position().top,
            left: leftPos,
            width: parseFloat($("#mines-grid").css("width")) - parseFloat($("#mines-grid").css("border-width"))*2,
            height: parseFloat($("#mines-grid").css("height"))
        });
    });

    $("#mines-grid").css({
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none"
    });
    $(".rows").css({
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none"
    });
    $(".mine").css({
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none"
    });

})
