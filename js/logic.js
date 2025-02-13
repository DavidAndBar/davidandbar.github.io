const CARDS_WIDTH = `${document.getElementById("cards").getBoundingClientRect().width}px`
const CARDS_MARGIN = "15px"
var intervalId;

const addProjectSubtitles = (subtitles) => {
    let subs = "";
    Object.entries(subtitles).forEach(([k, v]) => {
        let item = `<h3>${k}</h3>`
        if (!!v.list){
            item += "<ul>";
            v.list.forEach( i => {
                item += `<li>${i}</li>`
            })
            item += "</ul>";
        }
        if (!!v.text) {
            item += `<p>${v.text}</p>`;
        }
        subs += item;
    })
    return subs;
}

const movePanel = (e) =>{
    if (!!!e.autorun){
        clearInterval(intervalId);
    }
    let scrolled = document.getElementById("cards").scrollLeft
    if (scrolled > (document.getElementById("cards").scrollWidth - parseInt(CARDS_WIDTH) - parseInt(CARDS_MARGIN) - 100) && e.id === "right"){
        document.getElementById("cards").scrollBy({
            top: 0,
            left: -99999999999,
            behavior: "smooth"
        })
    } else {
        let overset = 0 //e.id === "right" ? 15 : scrolled > 115 ? -15 : 0;
        let move = e.id === "right" ? 230 : -230 ;
        document.getElementById("cards").scrollBy({
            top: 0,
            left: move + overset,
            behavior: "smooth"
        })

        /*setTimeout(() => {
            document.getElementById("cards").scrollBy({
                top: 0,
                left: -overset,
                behavior: "smooth"
            })
        }, 400)*/
    }
}


Object.entries(projects).forEach(([key, value]) => {
    const mainTitle = `<article id="project-${value.id}" class="project-info"><h1><a href="${links[value.id]}">${key}</a></h1>`;
    const subtitles = addProjectSubtitles(value.subtitles);
    
    const bottomLine = !!value.bottom ? `<p>${value.bottom.text}</p></article>` : "</article>";
    const projectToAdd = mainTitle + subtitles + bottomLine;

    document.getElementById("list-web-projects").innerHTML += `<div id="div-sel-${value.id}" class="project-selector"><p id="${value.id}" onmouseover=showProject(this.id) onClick=showProject(this.id)>${key}</p></div>`
    document.getElementById("project-section").innerHTML += projectToAdd;
})

const showProject = (id)=>{    
    document.querySelectorAll(".project-info").forEach((el) => {
        el.style.display = "none";
    })
    document.querySelectorAll(".project-selector p").forEach((el) => {
        el.style.fontWeight = "normal";
        el.style.backgroundColor = "transparent";
    })


    document.getElementById(`project-${id}`).style.display = "block";
    document.getElementById(`${id}`).style.fontWeight = "bold";
    document.getElementById(`${id}`).style.backgroundColor = "#0c2418";

}

workExperience.forEach( (element) => {
    let descriptions = ""
    element.description.forEach( (desc) => {
        descriptions += `<li>${desc}</li>`
    })

    document.getElementById("experience").innerHTML += 
                `<article class="work">
                    <div class="work-header">
                        <div class="position-name-place">
                            <p>${element.title}</p>
                            <p>${element.company}</p>
                        </div>
                    </div>
                    <div class="work-date">
                        <p>${element.date}</p>
                    </div>
                    <div class="work-description">
                        <ul>${descriptions}</ul>
                    </div>
                </article>`;
})


/* Carousel of tech skills */

Object.entries(technologies).forEach(([key, value]) => {

    document.getElementById("cards").innerHTML += `
        <article class="card">
            <div class="tech-img">
                <img src="${value}" title="Icon taken from https://worldvectorlogo.com/">
            </div>
            <h3>${key}</h3>
        </article>
    `
})

/* Styles of tech skills*/
document.querySelectorAll(".card").forEach((el) => {
    el.style.marginRight = CARDS_MARGIN;
})

/* Movement */
window.onload = () => {
    intervalId = setInterval(() => {
        movePanel({id: "right", autorun: true})}, 4000)

    showProject("minesweeper");
}
