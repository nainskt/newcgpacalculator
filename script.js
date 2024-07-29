'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
function gradeCalc(grade, unit) {
  if (grade === "A+") {
    return 4 * unit;
  } 
  else if (grade === "A") {
    return 3.66 * unit;
  } 
  else if (grade === "B+") {
    return 3.33 * unit;
  } 
  else if (grade === "B") {
    return 3.00 * unit;
  } 
  else if (grade === "B-") {
    return 2.66 * unit;
  }
  else if (grade === "C+") {
    return 2.33 * unit;
  }
  else if (grade === "C") {
    return 2.00 * unit;
  }
  else if (grade === "C-") {
    return 1.66 * unit;
  }
  else if (grade === "D+") {
    return 1.33 * unit;
  }
  else if (grade === "D") {
    return 1.00 * unit;
  }
  else if (grade === "F") {
    return 0.00* unit;
  }
}

let counter = 1;

function addCourse() {
  let addNew = document.createElement("form");
  addNew.classList.add("add_new", `key-${counter}`);
  const course_name = `
  <form class="add_new key-${counter}">
    <input type="text" placeholder="Course Code" class="courses key-${counter}" required>
        <input type="number" placeholder="Credit Unit" class="credit-units key-${counter}" required>
        <select class="grade key-${counter}" required>
    <option class="grade" value="select">Select</option>
            <option class="grade" value="4">A+</option>
            <option class="grade" value="3.66">A</option>
            <option class="grade" value="3.33">B+</option>
            <option class="grade" value="3.00">B</option>
            <option class="grade" value="2.66">B-</option>
            <option class="grade" value="2.33">C+</option>
            <option class="grade" value="2.00">C</option>
            <option class="grade" value="1.66">C-</option>
            <option class="grade" value="1.33">D+</option>
            <option class="grade" value="1.00">D</option>
            <option class="grade" value="0.00">F</option>
    </select>  
  </form>
  `;
  addNew.innerHTML = course_name;
  document.getElementById("course-wrapper").appendChild(addNew);
  counter++;
}

function removeCourse() {
  let mainForm = document.querySelector("form.add_new");
  mainForm?.remove();
}

const reports = [];

/**
 * @description calculates cgpa
 */
function calcCgpa() {
  const CGPAPARAGRAPH = document.getElementById("cgpa-calc");
  const GRADESSELECT = document.querySelectorAll("select.grade");
  const UNIT = document.querySelectorAll("input.credit-units");

  const courseReport = {};

  const listOfGrades = [];
  const listOfUnits = [];
  let totalUnits = 0;

  GRADESSELECT.forEach((e) => {
    let GRADES = e.options;
    const selectedIndex = e.selectedIndex;
    const selectedGrade = GRADES[selectedIndex];
    const gradeValue = selectedGrade.text.toUpperCase();
    listOfGrades.push(gradeValue);
  });
  console.log(listOfGrades);

  UNIT.forEach((e) => {
    const unitValue = parseInt(e.value);
    totalUnits += unitValue;
    listOfUnits.push(unitValue);
  });
  console.log(listOfUnits);

  let totalEarnedUnits = 0;

  for (let i = 0; i < listOfUnits.length; i++) {
    totalEarnedUnits += gradeCalc(listOfGrades[i], listOfUnits[i]);
  }
  const gpa = totalEarnedUnits / totalUnits;
  
  if (gpa >= 0){
    CGPAPARAGRAPH.textContent = "Your CGPA is " + gpa.toFixed(2);   
  } else {
    CGPAPARAGRAPH.textContent = "Please enter a valid grade and credit units";    
  }
  
}

/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

