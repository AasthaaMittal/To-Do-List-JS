//Define Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clrbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//EventListener function
function eventListener() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clrbtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        //create delete element
        const link = document.createElement('a');
        link.className = 'delete-item   secondary-content';
        //add icon to link
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to list item
        li.appendChild(link);
        //append the list item to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === '')
        alert('Add a Task!');
	
    else{
		if(taskList.forEach(function(task){
			if(taskInput.value === task.textContent)
				return true;
		}))
		
        {//create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        //create delete element
        const link = document.createElement('a');
        link.className = 'delete-item   secondary-content';
        //add icon to link
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to list item
        li.appendChild(link);
        //append the list item to ul
        taskList.appendChild(li);

        //store in local storage
        storeInLS(taskInput.value);
		}
    }
        taskInput.value = '';
        e.preventDefault();

}

function storeInLS(item){
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(item);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from Local storage
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
}

function removeFromLS(item){
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(item.textContent === task)
            tasks.splice(index, 1);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    //one step method
    // taskList.innerHTML = '';
    //one by one(faster)
    if(confirm('Are you sure?'))
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear Tasks from Local Storage
    clearFromLS();
}

function clearFromLS(){
    localStorage.clear();
}

function filterTasks(e){
    //console.log('filter func start');
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        //console.log('Filter func mid');
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else
            task.style.display = 'none';
    });
    //console.log('filter func end');


}

eventListener();
