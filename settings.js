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

function renderHabits() {

    const list =
        document.getElementById(
            "settingsHabitList"
        );

    list.innerHTML = "";

    data.habits.forEach(
        (habit, index) => {

        list.innerHTML += `

        <div class="habit">

            <div>

                <strong>${habit.emoji || "✅"} ${habit.name}</strong>

                <br>

                XP: ${habit.xp || 10}

            </div>

            <div>

                <button
                onclick="editHabit(${index})">
                ✏️
                </button>

                <button
                onclick="deleteHabit(${index})">
                🗑️
                </button>

            </div>

        </div>

        `;
    });

}

function addHabitFromSettings() {

    const emoji =
        document.getElementById("newEmoji").value || "✅";

    const name =
        document.getElementById("newHabit").value.trim();

    const xp =
        parseInt(
            document.getElementById("newXP").value
        ) || 10;

    if (!name) return;

    data.habits.push({

        emoji,

        name,

        xp,

        done:false,

        streak:0,

        longest:0,

        completions:0

    });

    save();

    document.getElementById("newEmoji").value="";
    document.getElementById("newHabit").value="";
    document.getElementById("newXP").value="";

    renderHabits();

}

function deleteHabit(index){

    if(
        confirm(
        "Delete this habit?"
        )
    ){

        data.habits.splice(index,1);

        save();

        renderHabits();

    }

}

function editHabit(index){

    const habit =
        data.habits[index];

    const newName =
        prompt(
            "Habit name",
            habit.name
        );

    if(newName===null) return;

    const newEmoji =
        prompt(
            "Emoji",
            habit.emoji
        );

    if(newEmoji===null) return;

    const newXP =
        prompt(
            "XP Reward",
            habit.xp
        );

    habit.name=newName;
    habit.emoji=newEmoji;
    habit.xp=parseInt(newXP)||10;

    save();

    renderHabits();

}

renderHabits();
