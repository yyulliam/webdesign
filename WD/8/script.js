// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterAllBtn = document.getElementById('filterAll');
const filterCompletedBtn = document.getElementById('filterCompleted');
const filterUncompletedBtn = document.getElementById('filterUncompleted');

// Массив задач (загружаем из localStorage или создаём пустой)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // all, completed, uncompleted

// Функция сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция отрисовки задачи
function renderTask(task) {
    const li = document.createElement('li');
    
    const taskContent = document.createElement('span');
    taskContent.className = 'task-content';
    taskContent.textContent = task.text;
    
    // Добавляем класс completed, если задача выполнена
    if (task.completed) {
        taskContent.classList.add('completed');
    }
    
    // Клик на задачу отмечает её выполненной/невыполненной
    taskContent.addEventListener('click', () => {
        task.completed = !task.completed;
        taskContent.classList.toggle('completed');
        saveTasks();
        applyFilter();
    });
    
    const taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Удалить';
    
    // Удаление задачи
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал клик на задачу
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });
    
    taskButtons.appendChild(deleteBtn);
    li.appendChild(taskContent);
    li.appendChild(taskButtons);
    
    return li;
}

// Функция отрисовки всех задач с учётом фильтра
function renderTasks() {
    taskList.innerHTML = '';
    
    // Фильтруем задачи
    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === 'uncompleted') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    
    // Если задач нет, показываем сообщение
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        
        if (tasks.length === 0) {
            emptyMessage.textContent = '📝 Список задач пуст. Добавьте первую задачу!';
        } else if (currentFilter === 'completed') {
            emptyMessage.textContent = '🎉 Нет выполненных задач. Так держать!';
        } else if (currentFilter === 'uncompleted') {
            emptyMessage.textContent = '✅ Все задачи выполнены! Вы молодец!';
        } else {
            emptyMessage.textContent = '📝 Список задач пуст. Добавьте первую задачу!';
        }
        
        taskList.appendChild(emptyMessage);
        return;
    }
    
    // Отрисовываем отфильтрованные задачи
    filteredTasks.forEach(task => {
        taskList.appendChild(renderTask(task));
    });
}

// Функция применения фильтра
function applyFilter() {
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем активный класс текущей кнопке
    if (currentFilter === 'all') {
        filterAllBtn.classList.add('active');
    } else if (currentFilter === 'completed') {
        filterCompletedBtn.classList.add('active');
    } else if (currentFilter === 'uncompleted') {
        filterUncompletedBtn.classList.add('active');
    }
    
    // Перерисовываем задачи
    renderTasks();
}

// Добавление новой задачи
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Пожалуйста, введите текст задачи!');
        taskInput.focus();
        return;
    }
    
    // Создаём новую задачу
    const newTask = {
        id: Date.now(), // Уникальный ID на основе времени
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    
    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
});

// Добавляем возможность добавления задачи по Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Настройка фильтров
filterAllBtn.addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
});

filterCompletedBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    applyFilter();
});

filterUncompletedBtn.addEventListener('click', () => {
    currentFilter = 'uncompleted';
    applyFilter();
});

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    applyFilter();
    
    // Загружаем последнюю введённую задачу (опционально)
    const lastTask = localStorage.getItem('lastTask');
    if (lastTask) {
        taskInput.value = lastTask;
    }
});

// Сохраняем ввод пользователя при изменении (опционально)
taskInput.addEventListener('input', () => {
    localStorage.setItem('lastTask', taskInput.value);
});