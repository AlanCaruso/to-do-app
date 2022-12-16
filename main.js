const list = document.querySelector("#task-board")
const button = document.querySelector(".add-item");
const input = document.querySelector(".add-item-input");
const deleteAll = document.querySelector("#clear");
const dataReload = document.querySelectorAll("[data-reload]");

const check = 'fa-check-square';
const checkColor = 'check-color'
const uncheck = 'fa-square';
const lineTrough = 'line-trough';
let id;
let LIST;

const language = {
    eng: {
        title: "To Do List",
        taskBoardTitle: "Here are your tasks",
        clear: "Clear",
        input: "new task..."
    },
    es: {
        title: "Lista de tareas",
        taskBoardTitle: "Estas son tus tareas",
        clear: "Vaciar",
        input: "nueva tarea..."
    }
}

function addTask(task, id, done, deleted) {
    if (deleted) { return }
    const DONE = done ? check : uncheck;
    const LINE = done ? lineTrough : '';
    const COLOR = done ? checkColor : ''

    const element = `
        <li class="task">
            <i class="checkbox fa-regular ${DONE} ${COLOR}" data="done" id="${id}"></i>
            <p class="${LINE} task-text">${task}</p>
            <i class="far fa-trash-alt delete-button" data="deleted" id="${id}"></i>
        </li>
    `

    list.insertAdjacentHTML("afterbegin", element);
}

function taskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.classList.toggle(checkColor)
    element.parentNode.querySelector('.task-text').classList.toggle(lineTrough);
    LIST[element.id].done = LIST[element.id].done ? false : true

}
function taskDeleted(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
}

button.addEventListener("click", () => {
    const task = input.value

    if (task) {
        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            deleted: false,
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value

        if (task) {
            addTask(task, id, false, false)
            LIST.push({
                name: task,
                id: id,
                done: false,
                deleted: false,
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++
    }

})

list.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value
    if (elementData === "done") {
        taskDone(element);
    } else if (elementData === "deleted") {
        taskDeleted(element)
    }

    localStorage.setItem('TODO', JSON.stringify(LIST))
})


deleteAll.addEventListener('click', function () {
    LIST = []
    id = 0
    localStorage.setItem('TODO', JSON.stringify(LIST))

    list.innerHTML = ""

})


let data = localStorage.getItem('TODO')

if (data) {
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    loadList(LIST)

} else {
    LIST = []
    id = 0
    console.log(LIST)
}

function loadList(data) {
    data.forEach(function (i) {
        addTask(i.name, i.id, i.done, i.deleted)
    });
}


if (window.location.hash) {
    if (window.location.hash === "#es") {
        title.textContent = language.es.title
        board.textContent = language.es.taskBoardTitle
        clear.textContent = language.es.clear
        input.placeholder = language.es.input
    }

}

for (i = 0; i <= dataReload.length; i++) {

    dataReload[i].onclick = function () {
        setTimeout(function () {
            location.reload(true)
        }, 200)



    }

}

