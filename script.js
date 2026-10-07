const input = document.querySelector("input");
const button = document.querySelector("button");
const taskList = document.querySelector("#taskList");

button.addEventListener("click", function () {

    const task = input.value.trim();

if (task === "") {
    return;
}

   const listItem = document.createElement("li");

const taskText = document.createElement("span");
taskText.textContent = task;

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";

taskText.addEventListener("click", function () {
    if (taskText.style.textDecoration === "line-through") {
    taskText.style.textDecoration = "none";
    listItem.style.borderLeftColor = "#00b4d8";
} else {
    taskText.style.textDecoration = "line-through";
    listItem.style.borderLeftColor = "#2ecc71";
}
    updateProgress();
    saveTasks();
});

deleteButton.addEventListener("click", function () {
    listItem.remove();
    updateProgress();
    saveTasks();
});

listItem.appendChild(taskText);
listItem.appendChild(deleteButton);

taskList.appendChild(listItem);
updateProgress();
saveTasks();

    input.value = "";
});

function updateProgress() {
    const total = taskList.children.length;

    let completed = 0;

    for (let task of taskList.children) {
        const taskText = task.querySelector("span");

        if (taskText.style.textDecoration === "line-through") {
            completed++;
        }
    }

    const remaining = total - completed;
    let percentage = 0;

if (total > 0) {
    percentage = Math.round((completed / total) * 100);
}

document.querySelector("#progressFill").style.width = percentage + "%";
document.querySelector("#progressPercent").textContent = percentage + "% Complete";


let rank = "ROOKIE";
let rankClass = "rank-rookie";

if (percentage >= 100) {
    rank = "TOP HERO";
    rankClass = "rank-top";
} else if (percentage >= 75) {
    rank = "ELITE HERO";
    rankClass = "rank-elite";
} else if (percentage >= 50) {
    rank = "PRO HERO";
    rankClass = "rank-pro";
} else if (percentage >= 25) {
    rank = "SIDEKICK";
    rankClass = "rank-sidekick";
}

const heroRank = document.querySelector("#heroRank");

heroRank.textContent = "HERO RANK: " + rank;

heroRank.className = rankClass;

document.querySelector("#heroRank").textContent = "HERO RANK: " + rank;
    document.querySelector("#totalTasks").textContent = total;
    document.querySelector("#completedTasks").textContent = completed;
    document.querySelector("#remainingTasks").textContent = remaining;
}
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        button.click();
    }
});
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");

allBtn.addEventListener("click", function () {
    for (let task of taskList.children) {
        task.style.display = "flex";
    }
});

activeBtn.addEventListener("click", function () {
    for (let task of taskList.children) {
        const taskText = task.querySelector("span");

        if (taskText.style.textDecoration === "line-through") {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    }
});

completedBtn.addEventListener("click", function () {
    for (let task of taskList.children) {
        const taskText = task.querySelector("span");

        if (taskText.style.textDecoration === "line-through") {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    }
});

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        taskList.innerHTML = savedTasks;

        for (let task of taskList.children) {
            const taskText = task.querySelector("span");
            const deleteButton = task.querySelector("button");

            taskText.addEventListener("click", function () {
                if (taskText.style.textDecoration === "line-through") {
                    taskText.style.textDecoration = "none";
                    task.style.borderLeftColor = "#00b4d8";
                } else {
                    taskText.style.textDecoration = "line-through";
                    task.style.borderLeftColor = "#2ecc71";
                }

                updateProgress();
                saveTasks();
            });

            deleteButton.addEventListener("click", function () {
                task.remove();
                updateProgress();
                saveTasks();
            });
        }
    }

    updateProgress();
}

loadTasks();

