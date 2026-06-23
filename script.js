let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {

    const input = document.getElementById("habit-input");

    if (input.value.trim() === "") return;

    habits.push({
        name: input.value,
        completed: false
    });

    input.value = "";

    saveHabits();
    renderHabits();
}

function toggleHabit(index) {

    habits[index].completed =
        !habits[index].completed;

    saveHabits();
    renderHabits();
}

function renderHabits() {

    const list =
        document.getElementById("habit-list");

    list.innerHTML = "";

    habits.forEach((habit, index) => {

        const div = document.createElement("div");

        div.className = "habit";

        div.innerHTML = `
            <span>${habit.name}</span>

            <input
                type="checkbox"
                ${habit.completed ? "checked" : ""}
                onchange="toggleHabit(${index})"
            >
        `;

        list.appendChild(div);
    });

    updateStats();
}

function updateStats() {

    let completed =
        habits.filter(h => h.completed).length;

    let total = habits.length;

    let percent =
        total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById(
        "progress-fill"
    ).style.width = percent + "%";

    document.getElementById(
        "progress-text"
    ).innerText = percent + "%";

    let xp = completed * 10;

    document.getElementById(
        "xp"
    ).innerText = xp + " XP";

    document.getElementById(
        "level"
    ).innerText =
        Math.floor(xp / 100) + 1;

    document.getElementById(
        "streak"
    ).innerText =
        completed === total && total > 0
        ? "🔥 1 Day"
        : "0 Days";
}

renderHabits();
