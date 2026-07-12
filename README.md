# Student Portfolio & Academic Management Website

**Course:** COS 106 — Introduction to Web Technologies
**Institution:** Miva Open University
**Author:** Emmanuel Adeitan

A responsive, multi-page personal portfolio and academic management site built with plain **HTML, CSS, and JavaScript**, no frameworks, no build tools, just the fundamentals applied with modern web design principles.

## Live site

🔗 [https://student-portfolio-chi-five.vercel.app]

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero section, short intro video, brief biography |
| About Me | `about.html` | Education timeline, career aspirations, technical skills, hobbies |
| Projects | `projects.html` | Three sample projects with descriptions, tags, and links |
| Academic Planner | `planner.html` | Interactive task manager, add, complete, delete, saved in the browser |
| Contact | `contact.html` | Contact form with full client-side validation |

## Folder structure

```
student-portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
└── assets/
    ├── images/
    └── media/
```

## Design & technical approach

- **HTML**: semantic elements throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), a real `<table>` for the skills summary, `<form>`s for the planner and contact page, and an embedded `<video>` on the homepage.
- **CSS**: a single external stylesheet built mobile-first, using CSS custom properties for consistent theming, Flexbox for one-dimensional layouts (nav, forms), CSS Grid for two-dimensional layouts (project cards), fluid typography with `clamp()`, and accessibility details like `:focus-visible` and `prefers-reduced-motion` support.
- **JavaScript**: split by responsibility rather than one giant file:
  - `js/main.js`: mobile nav toggle, footer year (shared across all pages)
  - `js/planner.js`: array-backed task management (add/complete/delete), persisted with `localStorage`
  - `js/contact.js`: form validation (empty-field checks, email format, digits-only phone)

## Running locally

No build step required. Either:
- Open `index.html` directly in a browser, or
- Use the **Live Server** extension in VS Code for auto-reload on save

## Note on the contact form

The form validates all input in the browser (per the assignment's JavaScript requirement) and displays a clear success or error message, but does not send data anywhere, actually delivering messages would require a backend or a third-party form service, which is outside the scope of this client-side exercise.
