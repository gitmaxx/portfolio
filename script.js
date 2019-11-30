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
  let threshold = 150;
  let startTime = 0;
  let elapsedTime = 0;
  let limitY = 100;
  let allowedTime = 500;
  let linkToProject = '';
  let projectName = '';
  surface.addEventListener('mousedown', function(e) {
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    });  
    surface.addEventListener('mouseup', function(e) {
      e.preventDefault();
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
    });    

  surface.addEventListener('touchstart', function(e) {
    e.preventDefault();
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
  });  

  surface.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }) ;  

  surface.addEventListener('touchend', function(e) {
    e.preventDefault();
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
            switch (document.querySelector('.slide-active').id) {
              case '1':
                linkToProject = 'projects/theyalow/index.html';
                projectName = 'theyalow';
              break;
              case '2':
                linkToProject = 'projects/repair-design-project/index.html';
                projectName = 'repair';
              break;  
            }
            sessionStorage.setItem('link', linkToProject );
            sessionStorage.setItem('project', projectName);
            document.location.href = 'projects.html';
          }
      }
    }
  })    
}

let element = document.querySelector('.slider');
swipeDetect (element);
const clickDetect = (element) => {
  let surface = element;
  let linkToProject = '';
  let projectName = '';
  surface.addEventListener('click', function(e) {
    if (isEnabled)  {
      switch (document.querySelector(".slide-active").id) {
        case '1':
          linkToProject = 'projects/theyalow/index.html';
          projectName = 'theyalow';
        break;
        case '2':
          linkToProject = 'projects/repair-design-project/index.html';
          projectName = 'repair';
        break;  
      }
      sessionStorage.setItem('link', linkToProject );
      sessionStorage.setItem('project', projectName);
      document.location.href = 'projects.html';
    }
  })
}

let elementsforClick = document.querySelectorAll('.slide_image');
for (let el of elementsforClick) {
  clickDetect (el);
}

document.querySelector('.description_control--image').addEventListener('touchstart', (event) => {
  event.preventDefault();
  if (isHideDescription) {
    isHideDescription = false;
    document.querySelector('.description_control--text').textContent = 'Hide description';
    document.querySelectorAll('.slide_description').forEach(element => element.classList.add('slide_description-active'));
  } else {
      isHideDescription = true;
      document.querySelector('.description_control--text').textContent = 'Show description';
      document.querySelectorAll('.slide_description').forEach(element => element.classList.remove('slide_description-active'));
  }
})
