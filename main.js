const list = document.querySelector("#task-board")
const button = document.querySelector(".add-item");
const input = document.querySelector(".add-item-input");

const check = 'fa-check-square';
const checkColor = 'check-color'
const uncheck = 'fa-square';
const lineTrough = 'line-trough';
let id = 0;

function addTask(task, id, done, deleted) {
    if (deleted) { return }
    const DONE = done ? check : uncheck;
    const LINE = done ? lineTrough : '';

    const element = `
        <li class="task">
            <i class="checkbox fa-regular ${DONE}" data="done" id="${id}"></i>
            <p class="text ${LINE}">${task}</p>
            <i class="far fa-trash-alt delete-button" data="deleted" id="${id}"></i>
        </li>
    `

    list.insertAdjacentHTML("afterbegin", element);
}

function taskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.classList.toggle(checkColor)
    element.parentNode.querySelector('.text').classList.toggle(lineTrough);

}
function taskDeleted(element) {

    element.parentNode.parentNode.removeChild(element.parentNode)
}

button.addEventListener("click", () => {
    noData.classList.add("d-none");

    const task = input.value
    console.log(task)
    if (task) {
        addTask(task, id, false, false)
    }
    input.value = ''
    id++
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value

        if (task) {
            addTask(task, id, false, false)
        }
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


})