const subcampOptions = ["alaleiri 1", "alaleiri 2"]
const ageGroupOptions = ["sudenpentu", "seikkailija", "tarpoja", "samoaja", "vaeltaja", "aikuinen"]

const subcampSection = document.getElementById("subcamp");
const ageSection = document.getElementById("agegroup");
const timetableSection = document.getElementById("timetable");

const subcampButtons = document.querySelectorAll(".subcamp-button");
const ageButtons = document.querySelectorAll(".agegroup-button");
const backButton = document.querySelector(".back-button");

// Utils
function showSection(section) {
    subcampSection.hidden = true
    ageSection.hidden = true
    timetableSection.hidden = true

    section.hidden = false
}

// Calendar loading functionality
gb.onappear = async () => {
    gb.storage.getItem("subcamp", (subcampValue) => {
        if (!subcampOptions.includes(subcampValue)) {
            showSection(subcampSection)
            return
        }

        gb.storage.getItem("ageGroup", (ageGroupValue) => {
            if (!ageGroupOptions.includes(ageGroupValue)) {
                showSection(ageSection)
                return
            }

            showSection(timetableSection)
        })
    })
}

// Button functionality
subcampButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showSection(ageSection);
        gb.storage.setItem("subcamp", btn.value)
    });
});

ageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        showSection(timetableSection);
        gb.storage.setItem("ageGroup", btn.value)
    });
});

backButton.addEventListener("click", () => {
    showSection(subcampSection);
});

