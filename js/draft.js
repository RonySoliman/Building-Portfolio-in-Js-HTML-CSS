const formEl = document.querySelector('#formSection')
const textAreaEl = document.querySelector('#contactMessage')
const emailErrorEl = document.querySelector('#emailError')
const textAreaCharsEl = document.querySelector('#charactersLeft')
const textAreaErrorEl = document.querySelector('#messageError')
const messageCharsLimit = 300

const AboutMeData = async () => {
    try {
        const response = await fetch('./data/aboutMeData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { aboutMe, headshot } = data || {};
        
        if (aboutMe && headshot) {
            const aboutMeContainer = document.querySelector('#aboutMe');
            const headshotContainer = document.createElement("div");
            headshotContainer.className = 'headshotContainer';
            const BioImage = document.createElement("img");
            BioImage.src = "./images/jojo.webp"; 
            BioImage.alt = 'headshot image';
            const aboutMeText = document.createElement("p");
            aboutMeText.textContent = aboutMe;
            aboutMeContainer.appendChild(headshotContainer);
            headshotContainer.appendChild(BioImage);
            aboutMeContainer.appendChild(aboutMeText);
        } else {
            console.warn("Something Incorrect Regarding aboutMe or headshot Data!");
        }
    } catch (error) {
        console.error("Error fetching or rendering About Me data:", error);
    }
};


const ProjectData = async () => {
    try {
        const response = await fetch('./data/projectsData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const projects = await response.json();
        if ((projects || []).length > 0) {
            const projectsContainer = document.querySelector('#projectList');
            const spotlightContainer = document.querySelector('#projectSpotlight');
            const projectSpotlightContainer = document.querySelector('#spotlightTitles');
            const spotlightTitle = createSpotlightElement('h3', '');
            const spotlightDescription = createSpotlightElement('p', '');
            const spotlightLink = createSpotlightElement('a', 'Click here to see more...');

            const projectsMarkup = projects.map((project, index) => createProjectCard(project, index, {
                spotlightTitle,
                spotlightDescription,
                spotlightLink,
                spotlightContainer
            }));
            projectsContainer.append(...projectsMarkup);
            projectSpotlightContainer.append(spotlightTitle, spotlightDescription, spotlightLink);
            handleNavigation();
        } else {
            console.warn("No projects found in the data.");
        }
    } catch (error) {
        console.error("Error fetching or rendering Project Data:", error);
    }
};

const createSpotlightElement = (tag, textContent) => {
    const element = document.createElement(tag);
    if (textContent) element.textContent = textContent;
    return element;
};

const createProjectCard = (project, index, { spotlightTitle, spotlightDescription, spotlightLink, spotlightContainer }) => {
    const {
        project_id,
        project_name,
        short_description,
        long_description,
        card_image,
        spotlight_image,
        url
    } = project || {};

    const MainInterface = document.createElement('div');
    MainInterface.className = 'projectCard';
    MainInterface.id = project_id;
    applyBackgroundStyles(MainInterface, card_image || "./images/blog_card.webp");

    const projectTitle = document.createElement('h4');
    projectTitle.textContent = project_name;
    const projectDescription = document.createElement('p');
    projectDescription.textContent = short_description;

    MainInterface.appendChild(projectTitle);
    MainInterface.appendChild(projectDescription);

    MainInterface.addEventListener('click', () => {
        spotlightTitle.textContent = project_name || '';
        spotlightDescription.textContent = long_description || '';
        spotlightLink.href = url || '';
        spotlightLink.target = '_blank';
        applyBackgroundStyles(spotlightContainer, spotlight_image || "./images/blog_spotlight.webp");
    });

    if (index === 0) MainInterface.click();

    return MainInterface;
};

const applyBackgroundStyles = (element, imageUrl) => {
    element.style.background = `url(${imageUrl.replace('..', '.')})`;
    element.style.backgroundPosition = 'center center';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = 'cover';
};



const handleNavigation = () => {
    const projectDimension = 200;
    const spacing = 20;
    const projectList = document.querySelector('#projectList');
    const arrows = [
        { element: document.querySelector('.arrow-left'), direction: -1 },
        { element: document.querySelector('.arrow-right'), direction: 1 },
    ];

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    arrows.forEach(({ element, direction }) => {
        element.addEventListener('click', () => {
            const scrollAxis = isMobile ? 'scrollLeft' : 'scrollTop';
            const currentScroll = projectList[scrollAxis];
            const itemSize = projectDimension + spacing;
            const projectIndexInView = Math.round(currentScroll / itemSize) || 0;

            let newScrollPosition;
            if (direction === -1 && projectIndexInView === 0) {
                newScrollPosition = 0;
            } else {
                newScrollPosition = (projectIndexInView + direction) * itemSize;
            }

            projectList.scroll({
                [isMobile ? 'left' : 'top']: newScrollPosition,
                behavior: 'smooth',
            });
        });
    });
};


const handleFormValidate = (form) => {
    if (!form) return false;

    const { contactEmail = '', contactMessage = '' } = form;
    const specialCharsRegex = /[^a-zA-Z0-9@._-]/;
    const messageCharsLimit = 500; 
    const errors = {
        emailError: '',
        messageError: ''
    };

    // Validation logic
    if (!contactEmail.trim()) {
        errors.emailError = 'Please provide an email!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
        errors.emailError = 'Please provide a valid email!';
    } else if (specialCharsRegex.test(contactEmail)) {
        errors.emailError = 'No special characters are allowed in the email!';
    }

    if (!contactMessage.trim()) {
        errors.messageError = 'Description box is empty!!';
    } else if (specialCharsRegex.test(contactMessage)) {
        errors.messageError = 'No special characters are allowed!';
    } else if (contactMessage.trim().length > messageCharsLimit) {
        errors.messageError = `You have excceeded the maximum characters: ${messageCharsLimit}`;
    }

    const isValid = !errors.emailError && !errors.messageError;

    if (!isValid) {
        // Display errors
        if (errors.messageError) textAreaErrorEl.textContent = errors.messageError;
        if (errors.emailError) emailErrorEl.textContent = errors.emailError;
    }

    return isValid;
};



const handleFormSubmit = (e) => {
    e.preventDefault();
    [textAreaErrorEl, emailErrorEl].forEach(el => el.textContent = '');
    const form = Object.fromEntries(new FormData(e.target));
    if (handleFormValidate(form)) {
        alert('Ola! Submission is Successful!');
    }
};

const handleTextAreaInput = (e) => {
    const newChars = (e.target.value || '').trim().length;
    textAreaCharsEl.textContent = `Characters: ${newChars}/${messageCharsLimit}`;
    textAreaCharsEl.style.color = newChars > messageCharsLimit ? 'red' : '#201b13';
};

// Add event listeners
formEl.addEventListener('submit', handleFormSubmit);
textAreaEl.addEventListener('input', handleTextAreaInput);

AboutMeData()
ProjectData()