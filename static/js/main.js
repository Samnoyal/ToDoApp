document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    let currentFilter = 'all';

    document.getElementById('themeToggle').addEventListener('change', function() {
    if (this.checked) {
        // Switch to dark mode
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.getElementById('themeLabel').innerText = 'Dark Mode';
    } else {
        // Switch to light mode
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.getElementById('themeLabel').innerText = 'Light Mode';
    }
});

// Optional: Set initial theme based on saved preference (if needed)
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    document.getElementById('themeToggle').checked = currentTheme === 'dark-mode';
    document.getElementById('themeLabel').innerText = currentTheme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Save the theme preference to local storage
document.getElementById('themeToggle').addEventListener('change', function() {
    localStorage.setItem('theme', this.checked ? 'dark-mode' : 'light-mode');
});


    // Fetch and display todos
    fetchTodos();

    // Event listener for adding a new todo
    addTodoBtn.addEventListener('click', () => {
        const title = todoInput.value.trim();
        if (title) {
            addTodo(title);
            todoInput.value = '';
        }
    });

    // Event listener for filter buttons
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            currentFilter = e.target.getAttribute('data-filter');
            fetchTodos();
        });
    });

    // Fetch all todos and render them based on filter
    function fetchTodos() {
        fetch('/todos')
            .then(response => response.json())
            .then(todos => {
                renderTodos(todos);
            });
    }

    // Render the todo items based on current filter
    function renderTodos(todos) {
        todoList.innerHTML = '';
    
        todos.filter(todo => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'favorite') return todo.favorite;
            if (currentFilter === 'pending') return todo.status === 'pending';
            if (currentFilter === 'completed') return todo.status === 'completed';
        }).forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.innerHTML = `
                <span class="${todo.status}">${todo.title} (${todo.status})</span>
                <button onclick="toggleStatus(${todo.id})">
                    Mark as ${todo.status === 'pending' ? 'Completed' : 'Pending'}
                </button>
                <button onclick="toggleFavorite(${todo.id})">
                    ${todo.favorite ? 'Unfavorite' : 'Favorite'}
                </button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(todoItem);
        });
    } 

    // Add a new todo to the list
    function addTodo(title) {
        fetch('/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        }).then(() => fetchTodos());
    }

    // Toggle todo status (pending/completed)
    window.toggleStatus = (id) => {
        // Fetch the current todo's status to toggle it
        fetch(`/todo/${id}`)
            .then(response => response.json())
            .then(todo => {
                const newStatus = todo.status === 'pending' ? 'completed' : 'pending';  // Toggle status
    
                // Send the updated status to the server
                fetch(`/todo/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                }).then(() => fetchTodos());  // Refresh the todo list after updating
            });
    };

    // Toggle todo as favorite/unfavorite
    window.toggleFavorite = (id) => {
        // Fetch the current todo's favorite status to toggle it
        fetch(`/todo/${id}`)
            .then(response => response.json())
            .then(todo => {
                const newFavoriteStatus = !todo.favorite;  // Toggle the favorite status
    
                // Send the updated favorite status to the server
                fetch(`/todo/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ favorite: newFavoriteStatus })
                }).then(() => fetchTodos());  // Refresh the todo list after updating
            });
    };
    // Delete a todo
    window.deleteTodo = (id) => {
        fetch(`/todo/${id}`, { method: 'DELETE' })
            .then(() => fetchTodos());
    };
});
