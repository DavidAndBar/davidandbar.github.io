const convert = () => {
    let initial = document.getElementById("initialSeparator").value;
    let target = document.getElementById("newSeparator").value;
    
    initial = initial === "custom" ? document.querySelector("input#initialSeparator").value : initial;
    target = target === "custom" ? document.querySelector("input#newSeparator").value : target;    
    console.log("target: " + target);
    if (!!!initial || !!!target) {
        document.getElementById("result").innerHTML = `<div class="card text-bg-danger"><p id="p-result">You must add both initial and new separators.</p></div>`;
    } else {
        let initialSpace = document.getElementById("spaceInitial").checked ? " " : "";
        let targetSpace = document.getElementById("spaceTarget").checked ? " " : "";
        const text = document.getElementById("textArea").value;
        if (!!text) {
            let newText = "";
            for (let index = 0; index < text.length; index++) {
                console.log("text:", text[index] + text[index+1]);
                console.log("comp:",(initial + initialSpace));
                let comp = !!!initialSpace ? text[index] : text[index] + text[index+1];
                if (comp == (initial + initialSpace)) {
                    newText += target + targetSpace;
                    index = !!initialSpace && !!!targetSpace ? index + 1: index; 
                } else {
                    newText += text[index];
                }
            }
            document.getElementById("result").innerHTML = `<div class="card text-bg-success mb-3"><pre id="p-result">Transformed data: ${newText}</pre></div>`;    
        } else {
            document.getElementById("result").innerHTML = `<div class="card text-bg-warning"><p id="p-result">Please insert some data.</p></div>`;
        }
    }
}

const myfunc = () => {
    console.log("this");   
}

const sel = document.querySelectorAll("select");
sel.forEach(element => {
    element.addEventListener("click", (event)=>{
        this.oldvalue = event.target.value;
    })

    element.addEventListener("change", (event)=>{
        if (event.target.value === "custom"){
            document.querySelector(`input#${event.target.id}`).disabled = false;
            event.target.nextElementSibling.children[0].disabled = true
            event.target.nextElementSibling.children[0].checked = false
        } else if (this.oldvalue === "custom") {
            document.querySelector(`input#${event.target.id}`).disabled = true;
            document.querySelector(`input#${event.target.id}`).value = "";
            event.target.nextElementSibling.children[0].disabled = false
            event.target.nextElementSibling.children[0].checked = true
        }
    })});

/*for (document.getElementsByClassName("selectors")){
    console.log(sel);
    
}*/
