
const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTaks = document.querySelector('.input-task')

const fetchTasks = async () => {
    
        const response = await fetch('http://localhost:3333/tasks');
        const tasks = await response.json();
        return tasks;
   
};


const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTaks.value };

    try {
        await fetch('http://localhost:3333/tasks', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        // A adição de tarefa foi bem-sucedida, agora carregamos as tarefas novamente.
        await loadTasks();

        // Limpar o valor do input após a adição da tarefa.
        inputTaks.value = '';
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        // Trate o erro de adição de tarefa, se necessário.
    }
};

const deleteTask = async (id) => {
   await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'DELETE'
});

   loadTasks();
}

const formateDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
};

const updateTask = async ( {id, title, status} ) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({title, status}),

});

loadTasks();
}

const createElement = (tag ,innerText = '' , innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText){
        element.innerText = innerText;
    }
    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    
    return element;
};

const createSelect = (value) => {



    const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="concluída">Concluída</option>
`;
 

    const select = createElement('select','', options);

   select.value = value;
    
    return select;
    
}

// const task = {
//     id:1,
//     title: 'Deixar essa parada pronta',
//     created_at: '00 janeiro de 2024 00:23',
//     status: 'pendente'
// }

const createRow = (task) => {
    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formateDate(created_at));
    const tdStatus = createElement('td') 
    const tdActions = createElement('td')

    const select = createSelect(status);
    select.addEventListener('change', ({target}) => updateTask({ ...task, status:target.value}))

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">Edit</span>'); 
    const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');
    
    const ediForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    ediForm.appendChild(editInput)

    ediForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        updateTask({id,title: editInput.value, status});
        
    })
    editButton.addEventListener('click', () =>{

        tdTitle.innerText = '';
        tdTitle.appendChild(ediForm)
    });
    
    
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');
     
    deleteButton.addEventListener('click', () => deleteTask(id));
    

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tdStatus.appendChild(select);
    
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;

}

const loadTasks = async () => {
    const tasks = await fetchTasks(); // Corrigir para 'tasks' em vez de 'task'
    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();