function openScores(event) {
    document.querySelectorAll(".btn-hs").forEach(element => {
        element.classList.remove("btn-selected")
    });
    document.getElementById(event.target.id).classList.add("btn-selected")
    level= event.target.id;
    var i;
    var x = document.getElementsByClassName("high-scores");
    highScoreBeg = JSON.parse(localStorage.getItem("high-scores-beg"));
    highScoreEasy = JSON.parse(localStorage.getItem("high-scores-easy"));
    highScoreInter = JSON.parse(localStorage.getItem("high-scores-inter"));
    highScoreExpert = JSON.parse(localStorage.getItem("high-scores-expert"));
    console.log($(`#${level}-list table tbody`));
    
    $(`#${level}-list table tbody`).empty();
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    document.getElementById(`${level}-list`).style.display = "block";
    if (level === "Beginner") {
        highScoreBeg["high-scores"].forEach((e) => {
            if (e.name != "") {
                $(`#${level}-list table tbody`).append(`<tr> <td>${e.name}</td><td>${e.time} s</td>`)
            }
        })
    } else if (level === "Easy") {
        highScoreEasy["high-scores"].forEach((e) => {
            if (e.name != "") {
                $(`#${level}-list table tbody`).append(`<tr> <td>${e.name}</td><td>${e.time} s</td>`)
            }
        })
    } else if (level === "Intermediate") {
        highScoreInter["high-scores"].forEach((e) => {
            if (e.name != "") {
                $(`#${level}-list table tbody`).append(`<tr> <td>${e.name}</td><td>${e.time} s</td>`)
            }
        })
    } else if (level === "Expert") {
        highScoreExpert["high-scores"].forEach((e) => {
            if (e.name != "") {
                $(`#${level}-list table tbody`).append(`<tr> <td>${e.name}</td><td>${e.time} s</td>`)
            }
        })
    }
}

const setHighScore = (time) => {
    highScoreBeg = JSON.parse(localStorage.getItem("high-scores-beg"));
    highScoreEasy = JSON.parse(localStorage.getItem("high-scores-easy"));
    highScoreInter = JSON.parse(localStorage.getItem("high-scores-inter"));
    highScoreExpert = JSON.parse(localStorage.getItem("high-scores-expert")); 
    let newhighScore = {"high-scores": []};
        if ($("#difficulty").val() == "beginner") {
            highScoreBeg["high-scores"].some(element => {
                if (element.time == "") {
                    element.time = time;
                    let newName = prompt("New Record!\n Insert your name: ");
                    element.name = newName == "" ? " " : newName;
                    localStorage.setItem("high-scores-beg", JSON.stringify(highScoreBeg));
                    return true;
                } 
                if (parseFloat(element.time) > time) {
                    let name = prompt("New Record!\n Insert your name: ");
                    newhighScore["high-scores"].push({"name": name, "time": time});
                    for (let i = newhighScore["high-scores"].length - 1; i < 5 - 1 ; i++) {
                        newhighScore["high-scores"].push({"name": highScoreBeg["high-scores"][i]["name"], "time": highScoreBeg["high-scores"][i]["time"]});
                    }
                    localStorage.setItem("high-scores-beg", JSON.stringify(newhighScore));
                    return true;
                }
                newhighScore["high-scores"].push({"name": element.name, "time": element.time});
            });
        } else if ($("#difficulty").val() == "easy") {
            highScoreEasy["high-scores"].some(element => {
                if (element.time == "") {
                    element.time = time;
                    element.name = prompt("New Record!\n Insert your name: ");
                    localStorage.setItem("high-scores-easy", JSON.stringify(highScoreEasy));
                    return true;
                } 
                if (parseFloat(element.time) > time) {
                    let name = prompt("New Record!\n Insert your name: ");
                    newhighScore["high-scores"].push({"name": name, "time": time});
                    for (let i = newhighScore["high-scores"].length - 1; i < 5 - 1 ; i++) {
                        newhighScore["high-scores"].push({"name": highScoreEasy["high-scores"][i]["name"], "time": highScoreEasy["high-scores"][i]["time"]});
                    }
                    localStorage.setItem("high-scores-easy", JSON.stringify(newhighScore));
                    return true;
                }
                newhighScore["high-scores"].push({"name": element.name, "time": element.time});
            });
        } else if ($("#difficulty").val() == "inter") {
            highScoreInter["high-scores"].some(element => {
                if (element.time == "") {
                    element.time = time;
                    element.name = prompt("New Record!\n Insert your name: ");
                    localStorage.setItem("high-scores-inter", JSON.stringify(highScoreInter));
                    return true;
                } 
                if (parseFloat(element.time) > time) {
                    let name = prompt("New Record!\n Insert your name: ");
                    newhighScore["high-scores"].push({"name": name, "time": time});
                    for (let i = newhighScore["high-scores"].length - 1; i < 5 - 1 ; i++) {
                        newhighScore["high-scores"].push({"name": highScoreInter["high-scores"][i]["name"], "time": highScoreInter["high-scores"][i]["time"]});
                    }
                    localStorage.setItem("high-scores-inter", JSON.stringify(newhighScore));
                    return true;
                }
                newhighScore["high-scores"].push({"name": element.name, "time": element.time});
            });
        } else if ($("#difficulty").val() == "expert") {
            highScoreExpert["high-scores"].some(element => {
                if (element.time == "") {
                    element.time = time;
                    element.name = prompt("New Record!\n Insert your name: ");
                    localStorage.setItem("high-scores-expert", JSON.stringify(highScoreExpert));
                    return true;
                } 
                if (parseFloat(element.time) > time) {
                    let name = prompt("New Record!\n Insert your name: ");
                    newhighScore["high-scores"].push({"name": name, "time": time});
                    for (let i = newhighScore["high-scores"].length - 1; i < 5 - 1 ; i++) {
                        newhighScore["high-scores"].push({"name": highScoreExpert["high-scores"][i]["name"], "time": highScoreExpert["high-scores"][i]["time"]});
                    }
                    localStorage.setItem("high-scores-expert", JSON.stringify(newhighScore));
                    return true;
                }
                newhighScore["high-scores"].push({"name": element.name, "time": element.time});
            });
        }
} 