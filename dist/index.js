document.getElementById("work-projects").addEventListener("touchstart", function() {}, true);

//document.querySelectorAll('[id*="work"]').forEach(element => element.style.display = "none");

let sections = document.querySelectorAll('section');
let header = document.getElementsByTagName("header")[0];

let navigation = document.querySelectorAll("[class=navigation]");
navigation.forEach(element => element.onclick = e => {
    toggleCurrentClass(e);
    let selector =  e.target.innerHTML.toLowerCase();
    navigate(selector, e);
});

let toWorkButton = document.getElementById("to-projects");
toWorkButton.onclick = (e) => {toggleCurrentClass();
    navigate("work", e)}

function navigate(selector, e) {
    sections.forEach(element => element.style.display = "none");
    document.querySelectorAll(`[id*=${selector}]`).forEach(element => element.style.display = "block");
    if(selector === 'home') {
        header.classList.remove("inner");
    }
    else {
        
        header.classList.add("inner");
    }
}

function toggleCurrentClass(e) {
    navigation.forEach(element => element.classList.remove("current"));
    if(e) {e.target.classList.add("current");}
    else {
        navigation[2].classList.add("current");
    }
    
}

