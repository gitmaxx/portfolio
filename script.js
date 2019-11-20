let slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;
let isEnabled = true;
let isHideDescription = true;

function setCurrentSlide(n) {
    currentSlideIndex = (n + slides.length) % slides.length;
}

function previousSlide(n) {
    hideSlide('slide-to_right');
    setCurrentSlide(n-1);
    showSlide('slide-from_left');
}
    
function nextSlide(n) {
    hideSlide('slide-to_left');
    setCurrentSlide(n+1);
    showSlide('slide-from_right');
}

function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlideIndex].classList.add(direction);
    slides[currentSlideIndex].addEventListener('animationend', function () {
        this.classList.remove('slide-active', direction);
    })
}

function showSlide(direction) {
    slides[currentSlideIndex].classList.add(direction, 'slide-next');
    slides[currentSlideIndex].addEventListener('animationend', function () {
        this.classList.remove('slide-next', direction);
        this.classList.add('slide-active');
        isEnabled=true;
    })
}

document.querySelector('.control_panel-left').addEventListener('click', function () {
    if (isEnabled) {
        previousSlide(currentSlideIndex);
    }
});

document.querySelector('.control_panel-right').addEventListener('click', function () {
    if (isEnabled) {
        nextSlide(currentSlideIndex);
    }
});




const swipeDetect = (element) => {
    let surface = element;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let threshold =150;
    let startTime = 0;
    let elapsedTime = 0;
    let limitY = 100;
    let allowedTime = 500;
    let link="";
    let project="";

    surface.addEventListener('mousedown', function(e) {
    
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();

    }) ;  
    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) > threshold && Math.abs(distY) <= limitY) {
                if (distX > 0 ) {
                    if (isEnabled) {
                        previousSlide(currentSlideIndex);
                    }
                } else {
                    if (isEnabled) {
                        nextSlide(currentSlideIndex);
                    }
                }
            }
        }
        
        e.preventDefault();

    }) ;    


    surface.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('control_panel')) {
            if (e.target.classList.contains('control_panel-left')) {
                if (isEnabled) {
                    previousSlide(currentSlideIndex);
                }
            } else {
                if (isEnabled) {
                    nextSlide(currentSlideIndex);
                }
            }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();

    }) ;  

    surface.addEventListener('touchmove', function(e) {
       
        e.preventDefault();

    }) ;  

    surface.addEventListener('touchend', function(e) {
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) > threshold && Math.abs(distY) <= limitY) {
                if (distX > 0 ) {
                    if (isEnabled) {
                        previousSlide(currentSlideIndex);
                    }
                } else {
                    if (isEnabled) {
                        nextSlide(currentSlideIndex);
                    }
                }
            } else {
                if (isEnabled)  {
                    switch (document.querySelector(".slide-active").id) {
                        case "1":
                            link="projects/theyalow/index.html";
                            project = 'theyalow';
                            break;
                        case "2":
                            link="projects/repair-design-project/index.html";
                            project = 'repair';
                            break;  
                    }
                    sessionStorage.setItem("link", link );
                    sessionStorage.setItem('project', project);
                    document.location.href = "projects.html";
                }
            }
        }
        
        e.preventDefault();

    }) ;    


}



let element = document.querySelector('.slider');
swipeDetect (element);


const clickDetect = (element) => {
    let surface = element;
    let link="";
    let project="";
    surface.addEventListener('click', function(e) {
        if (isEnabled)  {
            switch (document.querySelector(".slide-active").id) {
                case "1":
                    link="projects/theyalow/index.html";
                    project = 'theyalow';
                    break;
                case "2":
                    link="projects/repair-design-project/index.html";
                    project = 'repair';
                    break;  
            }
            sessionStorage.setItem("link", link );
            sessionStorage.setItem('project', project);
            document.location.href = "projects.html";
        }

    })

}

let elementsforClick = document.querySelectorAll('.slide_image');
for (let el of elementsforClick) {
    clickDetect (el);
}

document.querySelector('.description_control--image').addEventListener('touchstart', (event)=>{
    event.preventDefault();
    if (isHideDescription) {
        isHideDescription = false;
        document.querySelector('.description_control--text').textContent="Hide description";
        document.querySelectorAll('.slide_description').forEach(element => element.classList.add('slide_description-active'));
        //document.querySelectorAll('.image--mobile').forEach(element => element.classList.remove('image--mobile-active'));
    } else {
        isHideDescription = true;
        document.querySelector('.description_control--text').textContent="Show description";
        document.querySelectorAll('.slide_description').forEach(element => element.classList.remove('slide_description-active'));
        //document.querySelectorAll('.image--mobile').forEach(element => element.classList.add('image--mobile-active'));
    }

})