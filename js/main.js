const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
let tasks = []



if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(function (task) {
   renderTask(task)
})
checkEmptyList()


form.addEventListener('submit', addTask)//Добавление задачи

function addTask(event) {
   event.preventDefault() //отменяем отправку формы
   const taskText = taskInput.value

   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
   }

   tasks.push(newTask)
   saveToLocalStorage()
   renderTask(newTask)//рендерим задачу на стр

   //Очищаем поле ввода и возвращаем на него фокус
   taskInput.value = ''
   taskInput.focus()

   checkEmptyList()
}

tasksList.addEventListener('click', deleteTask)//Удаление задачи

function deleteTask(event) {
   if (event.target.dataset.action !== 'delete') return;
   const parenNode = event.target.closest('.list-group-item')

   const id = Number(parenNode.id)

   //Находим индекс задачи в массиве
   const index = tasks.findIndex(function (task) {
      if (task.id === id) {
         return true
      }
   })

   tasks.splice(index, 1)//удаляем задачу из массива
   saveToLocalStorage()
   parenNode.remove()
   checkEmptyList()
}



tasksList.addEventListener('click', doneTask)//Отмечаем задачу завершенной

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;
   const parentNode = event.target.closest('.list-group-item')

   const id = Number(parentNode.id)
   const task = tasks.find(function (task) {
      if (task.id === id) {
         return true
      }
   })
   task.done = !task.done
   saveToLocalStorage()

   const taskTitle = parentNode.querySelector('.task-title')
   taskTitle.classList.toggle('task-title--done')
}



function checkEmptyList() {
   if (tasks.length === 0) {
      const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Список дел пуст</div>
   </li>`
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
   }
   if (tasks.length > 0) {
      const emptyListEl = document.querySelector('#emptyList')
      emptyListEl ? emptyListEl.remove() : null
   }
}

function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
   const cssClass = task.done ? "task-title task-title--done" : "task-title"
   const taskHTML = `<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
   <span class="${cssClass}">${task.text}</span>
   <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
         <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
         <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
   </div>
</li>`
   tasksList.insertAdjacentHTML('beforeend', taskHTML)
}



















