var r = document.querySelector(':root');

let body = document.querySelector("body");
r.style.setProperty('--ivw', (body.clientWidth / 100) + 'px');
if ((window.innerHeight / window.innerWidth) > 1) {
    r.style.setProperty('--avw', ((body.clientWidth * 2) / 100) + 'px');
} else {
    r.style.setProperty('--avw', (body.clientWidth / 100) + 'px');
}

/*body.addEventListener("click", (e) => {
    console.log(e);
})*/

startScroll = [0, 0, 0, 0]
startElement = null;
endElement = null;
let selectedLevel = null;

function show_menu() {
    document.querySelector('#menu').style.visibility = "";
    document.querySelector('#levelListButton').style.visibility = "hidden";
}

function hide_menu() {
    document.querySelector('#menu').style.visibility = "hidden";
    document.querySelector('#levelListButton').style.visibility = "";
}

function select_level(element) {
    for(let i = 0; i < detailsPanes.length; i++) {
        detailsPanes[i].style.visibility = "hidden";
        lvImgs[i].classList.remove("selected");
        if (lvImgs[i].classList.contains("lvImgStill")) {
            if (lvImgs[i].src.indexOf("G.png") > 0) {
                lvImgs[i].src = lvImgs[i].src.slice(0, lvImgs[i].src.length - 5) + ".png";
            }
        }
    }
    if (element !== null) {
        for(let i = 0; i < detailsPanes.length; i++) {
            if(lvImgs[i].id === element.id) {
                detailsPanes[i].style.visibility = "";
                lvImgs[i].classList.add("selected");
                selectedLevel = element;
                if (lvImgs[i].classList.contains("lvImgStill")) {
                    if (lvImgs[i].src.indexOf("G.png") < 0) {
                        console.log("check");
                        lvImgs[i].src = lvImgs[i].src.slice(0, lvImgs[i].src.length - 4) + "G.png";
                    }
                }
            }
        }
    }
}

function start_input(e) {
    startElement = e.target;
    startScroll = [window.scrollX, window.scrollY, menu.scrollTop, menu.scrollLeft];
}

function end_input(e) {
    endElement = e.target;
    if ((endElement !== null && startElement !== null) && ((startScroll[0] === window.scrollX) && (startScroll[1] === window.scrollY))) {
        if (endElement.classList.contains("lvImg")) {
            if (endElement.id === startElement.id) {
                select_level(endElement);
            }
        } else if (endElement.classList.contains("close")) {
            if (endElement.id === startElement.id) {
                select_level(null);
                hide_menu();
            }
        } else if(endElement.id === "merryMakerLogo" || endElement.id === "merryMaker1" || endElement.id === "worlds") {
            select_level(null);
        } else if (endElement.id === "levelListButton") {
            if (endElement.id === startElement.id) {
                select_level(null);
                show_menu();
            }
        } else if (endElement.classList.contains("lvLink") || endElement.classList.contains("lvLinkName")) {
            if ((endElement.id === startElement.id) && ((menu.scrollTop === startScroll[2]) && (menu.scrollLeft === startScroll[3]))) {
                hide_menu();
                for (let i = 0; i < lvLinks.length; i++) {
                    if ((lvLinks[i].id === endElement.id) || (lvLinks[i].id === endElement.parentElement.id)) {
                        detailsPanes[i].style.visibility = "";
                        lvImgs[i].classList.add("selected");
                        (endElement.id === startElement.id) ? (selectedLevel = endElement) : (selectedLevel = endElement.parentElement);
                        scrollYPos = body.getBoundingClientRect().height * ((Math.floor(i / 4) / 3) * 1.03);
                        if (scrollYPos > body.getBoundingClientRect().height - window.innerHeight) {
                            scrollYPos = body.getBoundingClientRect().height - window.innerHeight
                        }
                        window.scroll(window.scrollX, scrollYPos)
                    }
                }
            }
        }
    }
}

body.addEventListener("touchstart", (e) => {
    start_input(e);
});
body.addEventListener("mousedown", (e) => {
    start_input(e);
});

body.addEventListener("touchend", (e) => {
    e.preventDefault();
    end_input(e);
});
body.addEventListener("mouseup", (e) => {
    end_input(e);
});
body.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        start_input(e);
        end_input(e);
    }
});

body.addEventListener("touchmove", (e) => {
    startElement = null;
    endElement = null;
});

screen.orientation.addEventListener("change", (e) => {
  r.style.setProperty('--ivw', (body.clientWidth / 100) + 'px');
    if ((window.innerHeight / window.innerWidth) > 1) {
        r.style.setProperty('--avw', ((body.clientWidth * 2) / 100) + 'px');
    } else {
        r.style.setProperty('--avw', (body.clientWidth / 100) + 'px');
    }
});