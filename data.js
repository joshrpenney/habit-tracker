
// Habit Tracker Data

let appData = {

    stats: {
        xp: 0,
        level: 1,
        streak: 0,
        longest: 0
    },

    habits: [

    ],

    tasks: [

    ],

    weeklyGoals: [

    ]

};

function loadData(){

    const saved =
        localStorage.getItem("habitTracker");

    if(saved){

        appData =
            JSON.parse(saved);

    }

}

function saveData(){

    localStorage.setItem(
        "habitTracker",
        JSON.stringify(appData)
    );

}

loadData();
