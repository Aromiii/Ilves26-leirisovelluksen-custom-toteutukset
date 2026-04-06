const subcampOptions = ["alaleiri 1", "alaleiri 2"]
const ageGroupOptions = ["sudenpentu", "seikkailija", "tarpoja", "samoaja", "vaeltaja", "aikuinen"]

const subcampSection = document.getElementById("subcamp");
const ageSection = document.getElementById("agegroup");
const timetableSection = document.getElementById("timetable");

const subcampButtons = document.querySelectorAll(".subcamp-button");
const ageButtons = document.querySelectorAll(".agegroup-button");
const backButton = document.querySelector(".back-button");

const workerLink = "https://ilves26-app-timetable.aaro-heroja.workers.dev/?url="
const links = {
    subcamps: {
        alaleiri1: "https://calendar.google.com/calendar/ical/6ffaef347a5705830ce3e8b5c3b98deb480edbe27f604181fb4e7e84373f87ac%40group.calendar.google.com/public/basic.ics",
        alaleiri2: "https://calendar.google.com/calendar/ical/06d1ab07bcd472b816d80fc78d51155a2e0edb17b02627cbbf2b5787e7f629b7%40group.calendar.google.com/public/basic.ics"
    },
    ageGroups: {
        sudenpentu: "https://calendar.google.com/calendar/ical/adf120eb4343ebc4e3100daa34aa4bf0249903fb325da38b81d515749860dfb4%40group.calendar.google.com/public/basic.ics",
        seikkailija: "https://calendar.google.com/calendar/ical/576c5bcd376ec982cfa4c5f00eed38c6db63e10e545a3d626848327bc48738ac%40group.calendar.google.com/public/basic.ics",
        tarpoja: "https://calendar.google.com/calendar/ical/9689dbc595c4af9df376162605f76c22ed8e87317e88e9697edf37329f34b7f3%40group.calendar.google.com/public/basic.ics"
    }
}

const formatTime = (jsDate) => {
    const hours = jsDate.getHours().toString().padStart(2, '0');
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    return `${hours}.${minutes}`;
}

const renderEvent = (event) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="time-ball">
            ${formatTime(event.startDate.toJSDate())}
        </div>
        <div class="information-box">
            <h4>${event.summary || ''}</h4>
            <p>${event.location || ''} ${event.description || ''}</p>
        </div>
    `;
    timetableSection.appendChild(li);
}

const sortEvents = () => {
    const items = Array.from(timetableSection.querySelectorAll('li'));
    items.sort((a, b) => {
        const timeA = a.querySelector('.time-ball').textContent.trim();
        const timeB = b.querySelector('.time-ball').textContent.trim();
        return timeA.localeCompare(timeB);
    });
    items.forEach(item => timetableSection.appendChild(item));
}

const getCalendar = async (calendarUrl) => {
    const response = await fetch(workerLink + encodeURIComponent(calendarUrl));
    const icsString = await response.text();

    const parsed = ICAL.parse(icsString);
    const comp = new ICAL.Component(parsed);

    const events = comp.getAllSubcomponents('vevent');
    events.forEach(vevent => {
        const event = new ICAL.Event(vevent);
        renderEvent(event);
    });
}

const loadCalendars = async (subcamp, ageGroup) => {
    timetableSection.innerHTML = '';

    if (subcamp === "alaleiri 1") {
        await getCalendar(links.subcamps.alaleiri1);
    }

    if (subcamp === "alaleiri 2") {
        await getCalendar(links.subcamps.alaleiri2);
    }

    if (ageGroup === "sudenpentu") {
        await getCalendar(links.ageGroups.sudenpentu);
    }

    if (ageGroup === "seikkailija") {
        await getCalendar(links.ageGroups.seikkailija);
    }

    if (ageGroup === "tarpoja") {
        await getCalendar(links.ageGroups.tarpoja);
    }

    sortEvents();
}

const showSection = async (section, subcamp, ageGroup) => {
    subcampSection.hidden = true
    ageSection.hidden = true
    timetableSection.hidden = true

    section.hidden = false

    if (section === timetableSection) {
        await loadCalendars(subcamp, ageGroup)
    }
}

gb.onappear = async () => {
    let subcamp = ""
    let ageGroup = ""

    gb.storage.getItem("subcamp", (subcampValue) => {
        if (!subcampOptions.includes(subcampValue)) {
            showSection(subcampSection)
            return
        }

        subcamp = subcampValue

        gb.storage.getItem("ageGroup", (ageGroupValue) => {
            console.log("Agegroup: " + ageGroupValue)
            if (!ageGroupOptions.includes(ageGroupValue)) {
                showSection(ageSection)
                return
            }

            ageGroup = ageGroupValue

            showSection(timetableSection, subcamp, ageGroup)
        })
    })
}

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

