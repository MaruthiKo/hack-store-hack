document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("hackathonForm");
    const hackathonList = document.getElementById("hackathonList");

    let savedHackathons = JSON.parse(localStorage.getItem("hackathons")) || [];

    function saveDataToLocalStorage(hackathons) {
        localStorage.setItem("hackathons", JSON.stringify(hackathons));
    }

    function renderHackathonEntry(hackathon, index) {
        const hackathonEntry = document.createElement("div");
        hackathonEntry.classList.add("hackathon-entry");
        hackathonEntry.innerHTML = `
            <h3>${hackathon.name}</h3>
            <p><strong>Date:</strong> ${hackathon.date}</p>
            <p><strong>Project:</strong> ${hackathon.project}</p>
            <a href="${hackathon.link}" target="_blank">Visit Project</a><br>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;

        hackathonList.appendChild(hackathonEntry);
    }

    function clearHackathonList() {
        hackathonList.innerHTML = "";
    }

    function handleDeleteButtonClick(index) {
        savedHackathons.splice(index, 1);
        saveDataToLocalStorage(savedHackathons);
        clearHackathonList();
        savedHackathons.forEach((hackathon, index) => {
            renderHackathonEntry(hackathon, index);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const hackathonName = document.getElementById("hackathonName").value;
        const hackathonDate = document.getElementById("hackathonDate").value;
        const hackProject = document.getElementById("hackProject").value;
        const hackLink = document.getElementById("hackLink").value;

        const hackathon = {
            name: hackathonName,
            date: hackathonDate,
            project: hackProject,
            link: hackLink
        };

        renderHackathonEntry(hackathon, savedHackathons.length);
        savedHackathons.push(hackathon);
        saveDataToLocalStorage(savedHackathons);

        form.reset();
    }

    form.addEventListener("submit", handleSubmit);

    // Event delegation to handle Delete button
    hackathonList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("delete-button")) {
            const index = parseInt(target.dataset.index);
            handleDeleteButtonClick(index);
        }
    });

    // Render existing hackathons from local storage on page load
    savedHackathons.forEach((hackathon, index) => {
        renderHackathonEntry(hackathon, index);
    });
});
