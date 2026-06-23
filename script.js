let habits =
JSON.parse(localStorage.getItem("habits")) || [];

function save(){
localStorage.setItem(
"habits",
JSON.stringify(habits)
);
}

function addHabit(){

const input =
document.getElementById("habitInput");

if(!input.value.trim()) return;

habits.push({
name: input.value,
done: false,
streak: 0,
longest: 0
});

input.value="";

save();
render();
}

function toggleHabit(index){

habits[index].done =
!habits[index].done;

save();
render();
}

function deleteHabit(index){

habits.splice(index,1);

save();
render();
}

function render(){

const list =
document.getElementById("habitList");

list.innerHTML="";

habits.forEach((habit,index)=>{

list.innerHTML += `
<div class="habit">

<div>
    <strong>${habit.name}</strong>
    <br>
    🔥 ${habit.streak} day streak
</div>

<div>

<input
type="checkbox"
${habit.done ? "checked" : ""}
onchange="toggleHabit(${index})">

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

function updateStats(){

let completed =
habits.filter(h=>h.done).length;

let total =
habits.length;

let percent =
total===0
?0
:Math.round((completed/total)*100);

document.getElementById(
"progress-bar"
).style.width =
percent+"%";

document.getElementById(
"progress-text"
).innerText =
percent+"% Complete";

let xp = completed*10;

let level =
Math.floor(xp/100)+1;

document.getElementById(
"xp"
).innerText =
xp+" XP";

document.getElementById(
"level"
).innerText =
"Level "+level;

document.getElementById(
"streak"
).innerText =
completed===total && total>0
? "🔥 1 Day Streak"
: "🔥 0 Day Streak";
}

render();
