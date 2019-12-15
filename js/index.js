document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let username = "RikilG";
let repoLink = "https://api.github.com/users/"+username+"/repos";
let repoList = document.getElementById("repo-list");

var fetchedRepos = [];

fetch(repoLink).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    fetchedRepos = data;
    for (let repo = 0; repo < fetchedRepos.length; repo++) {
        const element = fetchedRepos[repo];
        let newFlexItem = document.createElement("div");
        newFlexItem.classList.add("flex-div-item");
        newFlexItem.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(element.html_url, '_blank');
        });
        let repoName = document.createElement("div");
        repoName.style.fontWeight = "600";
        repoName.innerHTML = element.name;
        newFlexItem.append(repoName);
        let repoDesc = document.createElement("div");
        repoDesc.innerHTML = element.description
        newFlexItem.append(repoDesc);
        repoList.append(newFlexItem);
    }
}).catch(function() {
    console.log("Unable to fetch repository information. Are you offline?");
    let newFlexItem = document.createElement("div");
    newFlexItem.classList.add("flex-div-item");
    newFlexItem.innerHTML = "Unable to Connect to api.github.com, Are you offline?";
    repoList.append(newFlexItem);
});