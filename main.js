document.querySelectorAll('.jk-header-button').forEach(button => {
    button.addEventListener("click", (e) => {
        const text = e.target.textContent.toLowerCase();
        if (text.includes("home")) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (text.includes("projects")) {
            document.getElementById("jk-projects").scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes("skills")) {
            document.getElementById("jk-skills").scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes("about")) {
            document.getElementById("jk-about-me").scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes("contact")) {
            document.getElementById("jk-contact-me").scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Get Started Button
document.getElementById('get-started-btn').addEventListener("click", () => {
    document.getElementById("jk-about-me").scrollIntoView({ behavior: 'smooth' });
});

// Project Buttons
document.getElementById('bridgeasaurus').addEventListener("click", () => {
    window.open('./projects/bridgeasaurus/bridgeasaurus.html', '_blank');
});

document.getElementById('jeopardy').addEventListener("click", () => {
    window.open('./projects/jeopardy/jeopardy.html', '_blank');
});

document.getElementById('punchout').addEventListener("click", () => {
    window.open('./projects/punchout/punchout.html', '_blank');
});

document.querySelectorAll('.jk-contact-me-button').forEach(button => {
    button.addEventListener("click", (e) => {
        const text = e.target.textContent.toLowerCase();
        if (text.includes("resume")) {
            window.open('./assets/Resume.docx', '_blank');
        } else if (text.includes("linkedin")) {
            window.open('https://www.linkedin.com/in/jackson-kirchner/', '_blank');
        } else if (text.includes("github")) {
            window.open('https://github.com/JacksonK01', '_blank');
        }
    });
});
