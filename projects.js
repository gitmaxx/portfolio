document.addEventListener("DOMContentLoaded", () => {
    let frame=document.querySelector(".frame");
    frame.setAttribute("src",sessionStorage.getItem("link"));
})

document.getElementById("back").addEventListener("click", () => {
 window.history.back();
})

document.getElementById("to_mobile").addEventListener("click", () => {
    let frame=document.querySelector(".frame");
    frame.setAttribute("width","375px"); 
})
document.getElementById("to_desktop").addEventListener("click", () => {
    let frame=document.querySelector(".frame");
    frame.setAttribute("width","1440px"); 
})