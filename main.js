const list = document.querySelector("#task-board")
const button = document.querySelector(".add-item");
const input = document.querySelector(".add-item-input");
const noData = document.querySelector(".no-data")

function addTask(task, done, id) {
    const element = `
        <li class="task">
            <input type="checkbox" />
            <p>${task}</p>
            <span class="delete-button disabled"><i class="far fa-trash-alt"></i></span>
        </li>
    `
    list.insertAdjacentHTML("afterbegin", element);
}

button.addEventListener("click", () => {
    noData.classList.add("d-none");
    const task = input.value
    console.log(task)
    if (task) {
        addTask(task)
    }
    input.value = ''
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        noData.classList.add("d-none");
        const task = input.value

        if (task) {
            addTask(task)
        }
        input.value = ''
    }
})