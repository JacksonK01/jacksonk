document.getElementById('get-started-btn').addEventListener("click", () => {
    document.getElementById("jk-about-me").scrollIntoView({ behavior: 'smooth'})
})

document.getElementById('bridgeasaurus').addEventListener("click", () => {
    window.open('./projects/bridgeasaurus/bridgeasaurus.html', '_blank');
})

document.getElementById('jeopardy').addEventListener("click", () => {
    window.open('./projects/jeopardy/jeopardy.html', '_blank');
})

document.getElementById('punchout').addEventListener("click", () => {
    window.open('./projects/punchout/punchout.html', '_blank');
})