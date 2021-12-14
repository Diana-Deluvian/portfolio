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
toWorkButton.onclick = (e) => {
    toggleCurrentClass();
    navigate("work", e)
}

let toHome = document.getElementById("logo");
toHome.onclick = (e) => {
    navigation.forEach(element => element.classList.remove("current"));
    navigation[0].classList.add("current");
    navigate("home", e)
}

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

window.onload = () => {
    navigation[0].classList.add("current");
    navigate("home");
}


const formSubmitButton = document.getElementById("form-submit-button");
const formStatus = document.querySelector('#form-status');
formSubmitButton.onclick = async e => {
    e.preventDefault();
    formSubmitButton.textContent = "Submitting...";
    formSubmitButton.disabled = true;
    const data = Array.from(document.getElementsByTagName('input')).reduce((acc, input) => ({
        ...acc, [input.id]: input.value}), {});
    data.message = document.getElementsByTagName('textarea')[0].value;
    try {
    const res = await fetch('https://dianas-portfolio-api.herokuapp.com/sendMail', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data),
    });
    
    if(res.status === 200) {
        document.querySelector('form').reset();
        formStatus.textContent = "Message sent. I will get back to you as soon as possible."
        formStatus.classList.remove("form-status-error");
        formSubmitButton.textContent = "Submit";
    formSubmitButton.disabled = false;
    }
    else {
        formStatus.textContent = "You done messed up ey-ey-run";
        formStatus.classList.add("form-status-error");
        formSubmitButton.textContent = "Submit";
    formSubmitButton.disabled = false;
    }
}
catch {
    formStatus.textContent = "There appears to be an error with the server. Please try again later or send your message the old fashioned way to diana.deluvian@gmail.com";
    formStatus.classList.add("form-status-error");
    formSubmitButton.textContent = "Submit";
    formSubmitButton.disabled = false;
}

  }
