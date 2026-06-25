// =====================
// HABIT TRACKER V2
// =====================

let data = JSON.parse(
    localStorage.getItem("habitData")
) || {
    habits: [],
    accountStreak: 0,
    longestAccountStreak: 0,
    totalXP: 0
};

function save() {
    localStorage.setItem(
        "habitData",
        JSON.stringify(data)
    );
}

function addHabit() {

    const input =
        document.getElementById("habitInput");

    const name = input.value.trim();

    if (!name) return;

    data.habits.push({
        name: name,
        done: false,
        streak: 0,
        longest: 0,
        completions: 0
    });

    input.value = "";

    save();
    render();
}

function toggleHabit(index) {

    const habit =
        data.habits[index];

    habit.done = !habit.done;

    if (habit.done) {

        habit.completions++;

        habit.streak++;

        if (
            habit.streak >
            habit.longest
        ) {
            habit.longest =
                habit.streak;
        }

        data.totalXP += 10;

    } else {

        if (habit.streak > 0) {
            habit.streak--;
        }

        data.totalXP -= 10;

        if (data.totalXP < 0) {
            data.totalXP = 0;
        }
    }

    checkAccountStreak();

    save();
    render();
}

function deleteHabit(index) {

    data.habits.splice(index, 1);

    save();
    render();
}

function checkAccountStreak() {

    if (data.habits.length === 0) {
        return;
    }

    const allComplete =
        data.habits.every(
            habit => habit.done
        );

    if (allComplete) {

        data.accountStreak++;

        if (
            data.accountStreak >
            data.longestAccountStreak
        ) {
            data.longestAccountStreak =
                data.accountStreak;
        }

    }
}

function render() {

    const list =
        document.getElementById("habitList");

    list.innerHTML = "";

    data.habits.forEach(
        (habit, index) => {

        list.innerHTML += `
        <div class="habit">

            <div>

                <strong>${habit.emoji || "✅"} ${habit.name}</strong>

                <br>

                🔥 ${habit.streak} day streak

                <br>

                🏆 Best: ${habit.longest}

            </div>

            <div>

                <input
                    type="checkbox"
                    ${habit.done ? "checked" : ""}
                    onchange="toggleHabit(${index})"
                >

                <button
                    onclick="deleteHabit(${index})">
                    ❌
                </button>

            </div>

        </div>
        `;
    });

    updateStats();
}

function updateStats() {

    const completed =
        data.habits.filter(
            h => h.done
        ).length;

    const total =
        data.habits.length;

    const percent =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );

    document.getElementById(
        "progress-bar"
    ).style.width =
        percent + "%";

    document.getElementById(
        "progress-text"
    ).innerText =
        percent + "% Complete";

    const level =
        Math.floor(
            data.totalXP / 100
        ) + 1;

    document.getElementById(
        "xp"
    ).innerText =
        data.totalXP + " XP";

    document.getElementById(
        "level"
    ).innerText =
        "Level " + level;

    document.getElementById(
        "streak"
    ).innerText =
        "🔥 " +
        data.accountStreak +
        " Day Streak";

    const longestElement =
        document.getElementById(
            "longestStreak"
        );

    if (longestElement) {

        longestElement.innerText =
            "🏆 Longest: " +
            data.longestAccountStreak +
            " Days";
    }
}

render();
