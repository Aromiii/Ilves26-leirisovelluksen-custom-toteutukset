// Grab sections
const subcampSection = document.getElementById("subcamp");
const ageSection = document.getElementById("agegroup");
const timetableSection = document.getElementById("timetable");

// Buttons
const subcampButtons = document.querySelectorAll(".subcamp-button");
const ageButtons = document.querySelectorAll(".agegroup-button");
const backButton = document.querySelector(".back-button");


// Utility: show one section
function showSection(section) {
    subcampSection.hidden = true
    ageSection.hidden = true
    timetableSection.hidden = true

    section.hidden = false
}

subcampButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showSection(ageSection);
    });
});

ageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showSection(timetableSection);
    });
});

backButton.addEventListener("click", () => {
    showSection(subcampSection);
});

