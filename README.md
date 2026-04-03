<!--# Personal Portfolio

## Getting Started

To get started, simply copy the CSS, data, and images folder to your local machine. Create an `index.html` document at the root level on your machine. Once they're on your local system, you can see the results of your code by opening index.html in your browser. If you do this, remember that any changes you make won't appear on the page until you refresh your browser tab.

If you're using an editor like VSCode, you may want to install an extension for a live server. The [Live Server extension from Ritwick Dey](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) works well and also has live updates that will show any changes you make to your application without needing to refresh the page.

If you use a live server from within your editor, right-click on `index.html` and choose "Open with Live Server."

## Project Instructions

Every developer should have a portfolio page to highlight their skills and growth as a developer. At the end of this project, you'll have used your JavaScript skills to create a mock portfolio page.

In this project, you'll create a JavaScript file that will take external data and use it to populate a web page fully. The HTML framework is in place. The CSS for a responsive site is also in place. Your job will be to write JavaScript to add and manipulate the DOM and add in some additional code to do some client-side form validation.

Your JavaScript file will be in the `js` folder. Remember to add the script tag at the top of the HTML. 

There are two files that hold the JSON data in the data folder: aboutMeData.json and projectsData.json. While you can technically simply paste the data into your JavaScript file and access it directly, this is an opportunity to get used to fetching external data from an API and using it in your applications. Remember that even though you're fetching data from a JSON source, you still need to run the response object through the `.json()` method in order to return an object you can access. I'd suggest fetching each file and then storing the data as a global variable you can use throughout the JavaScript file.

### - Start with the About Me section

We'll start off slow by doing some simple DOM manipulation. Start by importing the data from the `aboutMeData.json` file. From that data, add the "about me" value as a paragraph element. Then you'll need to add the value of `headshot` as a src attribute of an image element and a container to hold that image.

When you're done, the div with the id of `aboutMe` will have two children: 1 paragraph and one div with a class name of `headshotContainer`.

```
<div id="aboutMe">
    <p></p>
    <div class="headshotContainer"></div>
</div>
```

### - Move on to the Projects Section

This section has several moving parts. 

The projects section contains two main elements: the project cards and the project spotlight. The project cards will act as teasers the user can click on. When users click on a project card, the spotlight section will change to that project. The CSS should already be in place. Your job is to use Javascript to populate and update the page.

As an additional challenge, CSS has removed the scrollbars. You'll need to add code so that the arrows on the page can be used to scroll through the project cards.

First, grab the data from the `projectsData.json` file. The objects in the array have these key-value pairs...

    "project_id" = the id you'll use to target mapped project cards to update the spotlight element
    "project_name" = the title of the project
    "short_description" = teaser text for the project cards
    "long_description" = longer description of the project to be used in the spotlight element
    "card_image" = relative url to the image for the background of the project cards
    "spotlight_image" = relative url to a larger image for the background of the spotlight element
    "url" = a mock url to be used for a link for more information

Using any combination of loops and methods you need, create cards with this basic structure...

``` 
    <div class="projectCard">
        <h4></h4>
        <p><p>
    </div>
```
**Remember to use the project_id on each card as a target for your JavaScript**

Each card should be clickable, and when clicked, it will update the spotlight element. You will need listeners throughout the project. In this case, keep the listeners in your JavaScript and out of your HTML. Specifically, don't use HTML attributes like onclick or on pointer down to listen for events. Set up your own listeners.

The project spotlight section should have this final structure...
```
<div id="projectSpotlight">
    <h3 id="spotlightTitles"></h3>
    <p></p>
    <a>Click here to see more...</a>
</div>
```

**Notice that some of the projects are missing values.**

This can happen a lot when using external APIs. You should be able to handle the missing data by providing some sort of fallback if some of the data is missing. You shouldn't see any part of the webpage as 'undefined.' You have two images in the images folder to handle missing image files: `card_placeholder_bg.webp` and `spotlight_placeholder_bg.webp`.

You'll also need to add listeners for the navigation buttons provided in the "projectNavArrows" div. Remember that the site is responsive, and the layout changes at different screen sizes. You'll need to have them scroll horizontally at mobile screen sizes and vertically at desktop screen sizes. (HINT: Use the .matchMedia() method)

### - Finish with form validation

The provided HTML purposely lacks some of the native attributes that can help with form validation, like `maxLength` in the textarea element or the `email` type in the input element. Your next step is to add validation for the form element when submitting. You don't need to actually submit the form; simply display an alert that the form validation passed.

Here are the things you should validate for...
```
    - Email isn't empty
    - Message isn't empty
    - Email is a valid email address
    - There are no special characters used in the email address
    - There are no special characters used in the message
    - The message is no longer than 300 characters
    - Also... show a live count of the number of characters in the text area
```

You can use regular expressions for your validation rules. Since regular expressions aren't a part of this course, feel free to use these regex...
```
illegal characters  = /[^a-zA-Z0-9@._-]/
Ends Here!!
-->

# 🗂️ Personal Portfolio — Vanilla JS, HTML & CSS

A fully responsive, data-driven personal portfolio website built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks or libraries required. Content is dynamically rendered from JSON data files, making it easy to update without touching the HTML.

---

## 📌 Project Overview

This portfolio site features three main sections: an **About Me** bio, a scrollable **Projects showcase** with an interactive spotlight panel, and a **Contact form** with client-side validation. All project cards and bio content are fetched asynchronously from local JSON files and injected into the DOM at runtime.

---

## 📁 Project Structure

```
├── index.html                  # Main HTML shell (minimal markup, JS-populated)
├── css/
│   ├── styles.css              # Custom styles with CSS variables & mobile-first layout
│   └── normalize.css           # Cross-browser CSS reset
├── js/
│   └── draft.js                # All JS logic: data fetching, DOM rendering, validation
├── data/
│   ├── aboutMeData.json        # Bio text and headshot path
│   └── projectsData.json       # Array of 10 project entries
├── images/
│   └── *.webp                  # Card and spotlight images for each project
└── README.md
```

---

## ✨ Features

### 🙋 About Me Section
- Bio text and headshot are fetched from `aboutMeData.json` via the Fetch API
- DOM elements are created and injected dynamically — no hardcoded content in HTML

### 🗃️ Projects Showcase
- 10 project cards rendered dynamically from `projectsData.json`
- Each card shows a **cover image**, project name, and short description
- Clicking a card updates the **Spotlight panel** with the full description and an external link
- First project is auto-selected on page load
- Scrollable card list with **left/right arrow navigation** (smooth scroll)
- **Responsive layout**: arrows scroll horizontally on mobile, vertically on desktop

### 📬 Contact Form
- Client-side validation with clear inline error messages
- Email validated against regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Special characters blocked in both email and message fields
- Live **character counter** (0/300) with red highlight on overflow
- Message capped at 500 characters
- Form clears error state on each new submission attempt

### 🎨 Styling
- CSS custom properties (variables) for consistent theming across light/dark states
- Mobile-first responsive design using media queries
- Smooth scroll navigation via anchor links
- Hover transitions on buttons and nav items
- Scrollbars hidden on project list (navigation handled by arrow buttons)

---

## 🗂️ Data Format

### `aboutMeData.json`
```json
{
  "aboutMe": "Your bio text here...",
  "headshot": "./images/your-photo.webp"
}
```

### `projectsData.json`
```json
[
  {
    "project_id": "project_todo",
    "project_name": "To-Do List App",
    "short_description": "Organize your tasks efficiently.",
    "long_description": "Full description shown in the spotlight panel...",
    "card_image": "../images/todo_card.webp",
    "spotlight_image": "../images/todo_spotlight.webp",
    "url": "https://your-live-link.com"
  }
]
```

All fields are optional with graceful fallbacks — missing images default to `blog_card.webp` / `blog_spotlight.webp`.

---

## 🚀 How to Run

No build step or dependencies needed. Just open the project in a local server (required for the Fetch API to load JSON files):

**Option 1 — VS Code Live Server:**
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html` → *Open with Live Server*.

**Option 2 — Python:**
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

**Option 3 — Node.js:**
```bash
npx serve .
```

> ⚠️ Opening `index.html` directly as a `file://` URL will block the Fetch API calls due to CORS restrictions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom properties, Flexbox, responsive layout |
| Vanilla JavaScript (ES6+) | Async data fetching, DOM manipulation, event handling |
| Fetch API | Load JSON data asynchronously |
| CSS normalize.css | Cross-browser style consistency |

---

## ✏️ Customization Guide

| What to change | Where |
|---|---|
| Bio text & headshot | `data/aboutMeData.json` |
| Add / edit projects | `data/projectsData.json` |
| Project images | `images/` folder (use `.webp` for best performance) |
| Color theme | CSS variables in `:root` block in `styles.css` |
| Nav links & page title | `index.html` |

---

## 📝 Notes & Limitations

- The site uses the native **Fetch API**, so it requires a local server to run (see above)
- No backend is connected — the contact form displays a success alert on valid submission but does not send emails
- Navigation arrows detect mobile/desktop breakpoint at load time (`max-width: 1024px`); resizing the window mid-session won't update scroll direction without a page refresh
- All images use the `.webp` format for optimized file sizes

---

## 👤 Author

Built as part of the **Udacity Front-End Web Developer** curriculum — DOM Manipulation & Vanilla JS module.
