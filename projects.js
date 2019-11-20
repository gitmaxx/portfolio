document.addEventListener("DOMContentLoaded", () => {
    let frame=document.querySelector(".frame");
    if (sessionStorage.getItem('project') === 'theyalow') {
        frame.setAttribute("width","1304px"); 
        frame.setAttribute("height","2000px"); 
    } else {
        frame.setAttribute("width","1440px"); 
        frame.setAttribute("height","10000px"); 
    }

    frame.setAttribute("src",sessionStorage.getItem("link"));
})

document.getElementById("back").addEventListener("click", () => {
 window.history.back();
})

document.getElementById("to_mobile").addEventListener("click", () => {
    let frame=document.querySelector(".frame");
    if (sessionStorage.getItem('project') === 'theyalow') {
        frame.setAttribute("width","640px"); 
    } else {
        frame.setAttribute("width","375px"); 
    }
    document.getElementById('to_mobile').classList.add('button-hidden');
    document.getElementById('to_desktop').classList.remove('button-hidden');
})
document.getElementById("to_desktop").addEventListener("click", () => {
    let frame=document.querySelector(".frame");
    if (sessionStorage.getItem('project') === 'theyalow') {
        frame.setAttribute("width","1300px"); 
    } else {
        frame.setAttribute("width","1440px"); 
    }
    document.getElementById('to_desktop').classList.add('button-hidden');
    document.getElementById('to_mobile').classList.remove('button-hidden');
})