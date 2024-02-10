document.getElementById('add-todo').addEventListener('click', function() {
    const todoText = document.getElementById('new-todo').value;
    addTodo(todoText);
    document.getElementById('new-todo').value = '';
});

function addTodo(text) {
    const todo = {
        title: text,
        description: '',
        completed: false
    };

    fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(data => {
        displayTodo(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayTodo(todo) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    document.getElementById('todo-list').appendChild(li);
}

window.onload = function() {
    fetch('http://127.0.0.1:8000/api/todos/')
    .then(response => response.json())
    .then(data => {
        data.forEach(todo => displayTodo(todo));
    })
    .catch(error => console.error('Error:', error));
};