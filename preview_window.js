const pdfBtn = document.querySelector('.generate-pdf');
const divContainer = document.querySelector('.content');



pdfBtn.addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    html2canvas(divContainer, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('akash.pdf');
    });
});

///////////  Getting Resume Data from Local Storage  ////////////////

const resume = JSON.parse(localStorage.getItem('resumeData'));
console.log(resume);


/////////// Getting preview value from local stoarge  ////////////////////

const previewValue = localStorage.getItem('preview_value');
console.log(previewValue);

//Getting resume data from preview value

const previewValueData = JSON.parse(localStorage.getItem(`${previewValue}`));
console.log(previewValueData);

/////////////////// Displaying Preview Window Data ////////////////////////

const previewFunction = function(resume){


    const markup = `
            <div class="personal_details_box">
                <div class="box_1">
                    <p class="fullName">${resume.firstName} <b>${resume.lastName}</b></p>
                    <p class="position">${resume.position1}</p>
                </div>
                <div class="box_2">
                    <div class="linkedin">${resume.linkedinLink}</div>
                    <div class="phoneNumber">
                        <p>${resume.phoneNumber}</p>
                        <img src="/images/phone-call.png" alt="phoneNumber">
                    </div>
                    <div class="email">
                        <p>${resume.email}</p>
                        <img src="/images/email.png" alt="email">
                    </div>
                    <div class="address">
                        <p>${resume.address}</p>
                        <img src="/images/location.png" alt="">
                    </div>
                </div>
            </div>

            <div class="main_content_box">
            <div class="main_content_innerBox">
            <div class="summary_title">
                <div class="summary_title_innerBox"><p>SUMMARY</p></div>
            </div>
            
            <div class="summary"><p>${resume.profileSummary}</p></div>

            <div class="content_box">
                <div class="coloumn_box_1">
                    <div class="education">
                        <div class="title_box"><p>EDUCATION</p></div>
                        <div class="education_content">
                            <div class="school_1 school_box">
                                <div class="school_name"><p><b>${resume.school1}</b></p></div>
                                <div class="course_name"><p>${resume.course1}</p></div>
                                <div class="duration"><p>${resume.duration1}</p></div>
                            </div>
                            <div class="school_2 school_box">
                                <div class="school_name"><p><b>${resume.school2}</b></p></div>
                                <div class="course_name"><p>${resume.course2}</p></div>
                                <div class="duration"><p>${resume.duration2}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="skills">
                        <div class="title_box"><p>SKILLS</p></div>
                        <div class="skills_content">
                            <div class="bullets_box"><span>•</span><div class="skill_1 skill_name"><p>${resume.skill_1}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="skill_2 skill_name"><p>${resume.skill_2}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="skill_3 skill_name"><p>${resume.skill_3}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="skill_4 skill_name"><p>${resume.skill_4}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="skill_5 skill_name"><p>${resume.skill_5}</p></div></div>
                        </div>
                    </div>
                    <div class="interests">
                        <div class="title_box"><p>INTERESTS</p></div>
                        <div class="interests_content">
                            <div class="bullets_box"><span>•</span><div class="interest_1 interest_name"><p>${resume.interest_1}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="interest_2 interest_name"><p>${resume.interest_2}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="interest_3 interest_name"><p>${resume.interest_3}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="interest_4 interest_name"><p>${resume.interest_4}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="interest_5 interest_name"><p>${resume.interest_5}</p></div></div>
                            <div class="bullets_box"><span>•</span><div class="interest_5 interest_name"><p>${resume.interest_6}</p></div></div>
                        </div>
                    </div>
                </div>
                <div class="coloumn_box_2">
                    <div class="experience_title"><p>PROFESSIONAL EXPERIENCE</p></div>
                    <div class="experience_box">
                        <div class="position_name"><p><b>${resume.position1}</b></p></div>
                        <div class="company_name_box">
                            <div class="company_title"><p>${resume.company1}</p></div>
                            <div class="tenure"><p>${resume.tenure1}</p></div>
                        </div>
                        <div class="job_responsibility"></div>
                    </div>
                    <div class="experience_box experience_box_2">
                        <div class="position_name"><p><b>${resume.position2}</b></p></div>
                        <div class="company_name_box">
                            <div class="company_title"><p>${resume.company2}</p></div>
                            <div class="tenure"><p>${resume.tenure2}</p></div>
                        </div>
                        <div class="job_responsibility"></div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        `;

        divContainer.innerHTML = markup;

        
    //////////////////////////////////////////  Adding new experiences boxes  ////////////////////////////////////////////////
    const experienceBox = document.querySelector('.coloumn_box_2');
    console.log(experienceBox);

    for(let i = 3; i <= 12; i++){  // here 12 is the maximum no of experience we can put in experience container

        // if(resume.company3 === '3'){
        if(!(resume[`company${i}`]) == ''){  // if the name of company exists then only display the experience box
            
            const markup = `
                <div class="experience_box">
                    <div class="position_name"><p><b>${resume[`position${i}`]}</b></p></div>
                    <div class="company_name_box">
                    <div class="company_title"><p>${resume[`company${i}`]}</p></div>
                        <div class="tenure"><p>${resume[`tenure${i}`]}</p></div>
                        </div>
                    <div class="job_responsibility"></div>
                </div>
            `;
        
        experienceBox.insertAdjacentHTML('beforeend', markup);
    };
    };

    ////////////////////////////////  Adding new Education boxes  ////////////////////////////////////////

    const educationBox = document.querySelector('.education_content');
    console.log(educationBox);

    for(let i = 3; i <= 10; i++){  // here 12 is the maximum no of experience we can put in experience container

        // if(resume.company3 === '3'){
        if(!(resume[`school${i}`]) == ''){  // if the name of company exists then only display the experience box
            
            const markup = `
                    <div class="school_2 school_box">
                        <div class="school_name"><p><b>${resume[`school${i}`]}</b></p></div>
                        <div class="course_name"><p>${resume[`course${i}`]}</p></div>
                        <div class="duration"><p>${resume[`duration${i}`]}</p></div>
                    </div>
            `;
        
        educationBox.insertAdjacentHTML('beforeend', markup);
    };
    };
            
    /////////////////////////  Displaying Job Responsibilities  ////////////////////////////////////////////////////////
    const jobContainer = document.querySelectorAll('.job_responsibility');
    console.log(jobContainer);

    jobContainer.forEach((container, i) => {

            ////// Converting Job responsibilities for the text area to an array ///////////////////
            // const job = resume.jobResponsibilities_1;
            const job = resume[`jobResponsibilities_${i + 1}`];
            console.log(job);
            const job2 = JSON.stringify(job)
            console.log(job2);

            const job3 = job2.replaceAll('\\n', ',').replaceAll('"', "")
            console.log(job3);

            const jobArray = job3.split(',');
            console.log(jobArray);

            ///// Display Jobs to job responsibility container ////

            jobArray.forEach(job => {
                const markup = `
                    <div class="job_box"><span>•</span><div class="job_name"><p>${job}</p></div></div>
                `;
                container.insertAdjacentHTML('beforeend', markup);
            });

    });


};

// call the function if previewDataValue exists otherwise resume data would be displayed, we have to delete the preview Value after pressing the preview button in main window
previewFunction(previewValueData ? previewValueData : resume);


////////////////////////////////////  Saving resume to local storage with the user given name ///////////////////////////////

let resumeArray = [];

const saveBtn = document.querySelector('.save_resume_btn');
const resumeName = document.querySelector('.resume_save_name');


//adding CSS styles and applying hover effect on save button, for some reason we cant apply directly in css file
saveBtn.addEventListener('mouseover', function(){
    saveBtn.style.backgroundColor = 'rgb(138, 137, 137)';
    saveBtn.style.cursor = 'pointer';
})
saveBtn.addEventListener('mouseout', function(){
    saveBtn.style.backgroundColor = '';
})

//// storting the resume to local storage
saveBtn.addEventListener('click', function(){

    const userResume = resumeName.value;
    console.log(userResume);
     
    // if the resume saving input field is empty aler the user
    if(userResume === '') alert('Please enter the resume name!');
 
    // save the resume only if input the field is not empty
    if(userResume === '') return;

    localStorage.setItem(`${userResume}`, JSON.stringify(resume));
    
    resumeArray.push(userResume);

    localStorage.setItem('resumeArray', JSON.stringify(resumeArray));

    // clearing the input field after saving the resume
    resumeName.value = '';

});

// after reloading the page the resume array becomes empty and when we save new resume it starts from zero and the old saved resumes vanished, that is why we write below code so that when we reolad the page first it gets all the resume elments from storage and again store it to resume array
const storageArrayElements = localStorage.getItem('resumeArray');
const storageEl = JSON.parse(storageArrayElements);
console.log(storageEl);

storageEl.forEach(el => resumeArray.push(el));
console.log(resumeArray);

