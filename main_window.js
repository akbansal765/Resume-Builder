const container = document.querySelector('.main_container');
const next = document.querySelectorAll('.next');
const back = document.querySelectorAll('.back');
const slides = document.querySelectorAll('.details');

const addExperienceBtn = document.querySelector('.add_experience');
const experienceElement = document.querySelector('.experience_2');
const addEducationBtn = document.querySelector('.add_education');
const educationElement = document.querySelector('.education_2');

const form = document.querySelector('form');
const previewBtn = document.querySelector('.preview_btn');

const welcomeMessage = document.querySelector('.welcomeMsg');

////////////////////  Displaying welcome message ///////////////////

//// getting full name of local storage

const fullName = localStorage.getItem('fullName').replaceAll('"', '');
console.log(fullName);

welcomeMessage.innerHTML = `Welcome, ${fullName}`;


/////////////////////  Implementing Next and Back page buttons feature  /////////////////////////
let curSlide = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Set the initial position of the slides
    slides.forEach(slide => {
        slide.style.bottom = '0px'; // Starting position
    });

    // Add event listeners for next buttons
    next.forEach(nextBtn => {
        nextBtn.addEventListener('click', function() {
            curSlide -= 100; // Move to the next slide
            updateSlidePositions();
        });
    });

    // Add event listeners for back buttons
    back.forEach(backBtn => {
        backBtn.addEventListener('click', function() {
            curSlide += 100; // Move to the previous slide
            updateSlidePositions();
        });
    });
});

// Function to update slide positions
function updateSlidePositions() {
    slides.forEach(slide => {
        // slide.style.bottom = `${curSlide}px`; // Update the slide positions
        slide.style.transform = `translateY(${curSlide}%)`; // Update the slide positions
    });
};

//////////// Getting Form Elements ///////////////////////

form.addEventListener('submit', function(e){
   e.preventDefault();

   const formDataArr = [...new FormData(this)];
   const dataObj = Object.fromEntries(formDataArr);
   console.log(dataObj);

   // storing the data in local storage
   localStorage.setItem('resumeData', JSON.stringify(dataObj));

});

//////////// Adding Event Listener to Preview button /////////////

previewBtn.addEventListener('click', function(){

    // deleting previewDataValue
    localStorage.removeItem('preview_value');

    // opening preview window after removing the preview value
    window.open('preview_window.html');

});

//////////////////////////////  Adding extra Experience input fields  //////////////////////////////

let experienceNum = 2;

addExperienceBtn.addEventListener('click', function(){
   
    experienceNum = experienceNum + 1;

    const markup = `
            <hr>
            <div class="col_type2">
                <div class="col_box">
                    <fieldset>
                        <legend>Institute/Organisation *</legend>
                        <input class="input_company" type="text" name="company${experienceNum}">
                    </fieldset>
                    <fieldset>
                        <legend>Position *</legend>
                        <input class="input_position" type="text" name="position${experienceNum}">
                    </fieldset>
                    <fieldset>
                        <legend>Duration</legend>
                        <input class="input_duration" type="text" name="tenure${experienceNum}">
                    </fieldset>
                </div>
                <textarea placeholder="Job Responsibilities :-" name="jobResponsibilities_${experienceNum}"></textarea>
            </div>
         `;

    experienceElement.insertAdjacentHTML('beforeend', markup);

    ///////  Adding Overflow scroll to experience container //////////////

    const experienceContainer = document.querySelector('.input_experienceDetails');
    experienceContainer.classList.add('overflow_x');
    
})
//////////////////////////////  Adding extra Education input fields  //////////////////////////////

let educationNum = 2;

addEducationBtn.addEventListener('click', function(){
   
    educationNum = educationNum + 1;

    const markup = `
                <hr>
                <div class="col_type2">
                    <div class="col_box">
                        <fieldset>
                            <legend>School/College/University *</legend>
                            <input class="input_company" type="text" name="school${educationNum}">
                        </fieldset>
                        <fieldset>
                            <legend>Class/Course *</legend>
                            <input class="input_position" type="text" name="course${educationNum}">
                        </fieldset>
                        <fieldset>
                            <legend>Duration Year *</legend>
                            <input class="input_duration" type="text" name="duration${educationNum}">
                        </fieldset>
                    </div>

                    <fieldset class="des_fieldset">
                        <legend class="des_legend">Description *</legend>
                        <input class="input_description" type="text" name="description${educationNum}">
                    </fieldset>
                </div>
         `;

    educationElement.insertAdjacentHTML('beforeend', markup);

    ///////  Adding Overflow scroll to experience container //////////////

    const educationContainer = document.querySelector('.input_educationDetails');
    educationContainer.classList.add('overflow_x');
    
});

/////////////////////////////////////////// Implementing Menu Slider /////////////////////////////////////////////////

const menuBtn = document.querySelector('.menu_btn');
const menuSlider = document.querySelector('.menu_slider');
const closeSliderBtn = document.querySelector('.slider_back_btn');

menuBtn.addEventListener('click', function(){
    menuSlider.classList.add('sliding_feature');
    // menuSlider.style.transform = 'translateX(0px)';
});

closeSliderBtn.addEventListener('click', function(){
    menuSlider.classList.remove('sliding_feature');
    // menuSlider.style.transform = 'translateX(-300px)';
});


///////////////////////  Displaying Saved Resume List in slider  //////////////////////////////////

const savedResumeContainer = document.querySelector('.saved_resume_list');

// getting resume list from local storage
const resumeArray = localStorage.getItem('resumeArray');
const resumeList = JSON.parse(resumeArray);
console.log(resumeList);

resumeList.forEach(resume => {

    const markup = `
         <div class="saved_resume_box">
          <li><button class="resume_list_btn" value="${resume}"><a href="preview_window.html" target="_blank">${resume}</a></button></li>
          <button class="del_resume" value="${resume}">
             <img src="/images/trash.png" alt="menu">
          </button>
         </div>
       `;

    savedResumeContainer.insertAdjacentHTML('beforeend', markup);
});

///// getting resume values after clicking them in slider

const resumeBtns = document.querySelectorAll('.resume_list_btn');

resumeBtns.forEach(btn => {
    btn.addEventListener('click', function(){
        console.log(this.value);

       //// storing this value to local storage so that we can import this in preview windwo
       localStorage.setItem('preview_value', this.value);
    });
});

///////// Deleting the saved resumes from DOM and local storage  ///////////////

const delBtns = document.querySelectorAll('.del_resume');

// const resumeDiv = document.closest('.saved_resume_box');

delBtns.forEach(btn => {
    btn.addEventListener('click', function(){

        // getting div element closest to given selected delete buttton
        const resumeDiv = btn.closest('.saved_resume_box');

        //removing from DOM
        resumeDiv.remove();

        //removing from local storage and above resume list we created before
        const delBtnValue = btn.value;
        console.log(delBtnValue);
        
        localStorage.removeItem(`${delBtnValue}`);
        

        const index = resumeList.findIndex(resume => delBtnValue === resume);
        console.log(index);

        resumeList.splice(index, 1);
        console.log(resumeList);

        // updating the resume array in local storage after removing the resume from resume list
        localStorage.setItem('resumeArray', JSON.stringify(resumeList));
        
    });
});