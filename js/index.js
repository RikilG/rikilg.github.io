// ----------------- Add random quote on home page --------------------

var fetchedRepos = [];
let quotesList = [
    "The ones who accomplish something, are the fools who keep pressing forward. The ones who accomplish nothing, are the wise who cease advancing.",
    "Ideas don't work unless you do.",
    "The greatest education in the world is watching the masters at work. -Michael Jackson.",
    "When you really pay attention, everything is your teacher.",
    "A smooth sea never makes a skilled sailor.",
    "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution. -Albert Einstein",
    "Stop complaining. Start creating. -Dale Patridge",
]
let quoteIndex = Math.floor(Math.random()*quotesList.length)
let quote = quotesList[quoteIndex].split('-')
if (quote.length == 2) {
    let temp = document.querySelector('.titleAuthor')
    temp.innerHTML = "- "+quote[1]
}

function typewriter(container, text, typespeed) {
    container.innerHTML = "";
    container.style.borderRight = "2px solid lime";
    var i = 0;

    function type() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, typespeed);
        }
        if (i >= text.length) {
            setTimeout(() => container.style.borderRight = "", 1000);
        }
    }
    type();
}

typewriter(document.getElementById('quoteMain'), quote[0], 50);

// -------------------- Fetch github repo list --------------------

let username = "RikilG";
let repoLink = "https://api.github.com/users/"+username+"/repos";
let repoList = document.getElementById("repo-list");

// fetch(repoLink).then(function(response) {
//     return response.json();
// }).then(function(data) {
//     console.log(data);
//     fetchedRepos = data;
//     for (let repo = 0; repo < fetchedRepos.length; repo++) {
//         const element = fetchedRepos[repo];
//         let newFlexItem = document.createElement("div");
//         newFlexItem.classList.add("flex-div-item");
//         newFlexItem.addEventListener('click', (e) => {
//             e.preventDefault();
//             window.open(element.html_url, '_blank');
//         });
//         let repoName = document.createElement("div");
//         repoName.style.fontWeight = "600";
//         repoName.innerHTML = element.name;
//         newFlexItem.append(repoName);
//         let repoDesc = document.createElement("div");
//         repoDesc.classList.add("repoDesc")
//         repoDesc.innerHTML = element.description
//         newFlexItem.append(repoDesc);
//         repoList.append(newFlexItem);
//     }
// }).catch(function() {
//     console.log("Unable to fetch repository information. Are you offline?");
//     let newFlexItem = document.createElement("div");
//     newFlexItem.classList.add("flex-div-item");
//     newFlexItem.innerHTML = "Unable to Connect to api.github.com, Are you offline?";
//     repoList.append(newFlexItem);
// });

// -------------------- Other --------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// update time to top right corner
(function showTime() {
    let now = new Date();
    let sep = document.getElementById('navClk')
    let hr = document.getElementById('navHr')
    let min = document.getElementById('navMin')
    
    if (sep.style.visibility == "hidden")
        sep.style.visibility = "visible"
    else sep.style.visibility = "hidden"

    if (now.getHours() < 10) hr.innerHTML = `0${now.getHours()}`
    else hr.innerHTML = now.getHours()

    if (now.getMinutes() < 10) min.innerHTML = `0${now.getMinutes()}`
    else min.innerHTML = now.getMinutes()

    setTimeout(showTime, 1000)
})()

// -------------------- Canvas --------------------

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    // save mouse coords whenever mouse moves.
    mouse.x = event.x;
    mouse.y = event.y;
})

class CanvasFrame {
    constructor(canvasElement, coverWindow, width, height) {
        this.canvas = canvasElement;
        this.canvas.width = width;
        this.canvas.height = height;
        this.c = canvasElement.getContext('2d');
        this.cObjects = [];
        // resize canvas on window resize
        if (coverWindow) { // if true, canvas covers complete windows and resizes with it
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            window.addEventListener('resize', () => {
                this.canvas.width = window.innerWidth
                this.canvas.height = window.innerHeight
                this.c.clearRect(0, 0, innerWidth, innerHeight); // draws rectangle effectively clearing the screen so that we can redraw again
                this.cObjects = []
                this.init();
            })
        }
        // canvas.style.backgroundColor = "rgba(0,0,0,0)";
        // wave properties will be set in init
    }

    // initialize all objects here
    init() {
        // wave props
        this.y = canvas.height/2;
        this.resizer = 0.01;
        this.amplitude = 120;
        this.frequency = 0.01;
        this.color = 'hsl(15, 80%, 50%)';
        // anim props
        this.increment = this.frequency;
    }

    // all object's update methods are called here
    animate() {
        let c = this.c;
        let canvas = this.canvas;

        c.fillStyle = '#2a2a2a';
        c.fillRect(0, 0, canvas.width, canvas.height);

        this.increment += this.frequency;
        c.beginPath()
        // c.moveTo(0, canvas.height/2);
        for (let i=0;i<canvas.width;i++) { // for every pixel on width
            c.lineTo(i, i/2.5 + Math.sin(i * this.resizer + this.increment) * this.amplitude * Math.sin(this.increment));
        }
        c.strokeStyle = this.color;
        c.lineWidth = 3;
        c.stroke();

        requestAnimationFrame(() => this.animate());
    }
}

let canvas = document.getElementById('mainCanvas');
let canvasFrame = new CanvasFrame(canvas, true);
canvasFrame.init();
canvasFrame.animate();

console.log("Canvas setup done!")
