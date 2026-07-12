// =========================================================
// planner.js
// Academic Planner: add / complete / delete tasks, backed by
// an array of task objects and persisted to localStorage.
// =========================================================

const STORAGE_KEY = 'cos106-planner-tasks';

// Single source of truth: every task is an object like
// { id, text, priority, completed }. The DOM is just a
// reflection of this array — we never read task state back
// out of the HTML, only ever out of this array.
let tasks = loadTasks();

// Cache DOM references once, instead of re-querying on every render
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const prioritySelect = document.getElementById('task-priority');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const statTotal = document.getElementById('stat-total');
const statCompleted = document.getElementById('stat-completed');
const statRemaining = document.getElementById('stat-remaining');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the page from reloading
    addTask(input.value, prioritySelect.value);
    form.reset();
    prioritySelect.value = 'medium';
    input.focus();
  });

  renderTasks(); // draw whatever was loaded from storage on page load
}

/**
 * Adds a new task to the array, then re-renders and persists.
 * @param {string} text
 * @param {string} priority - 'low' | 'medium' | 'high'
 */
function addTask(text, priority) {
  const trimmed = text.trim();
  if (!trimmed) return; // guard against empty/whitespace-only input

  tasks.push({
    id: Date.now(),       // simple unique id — good enough for a client-only list
    text: trimmed,
    priority: priority || 'medium',
    completed: false
  });

  saveTasks();
  renderTasks();
}

/**
 * Flips a task's completed state by id.
 * @param {number} id
 */
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

/**
 * Removes a task from the array by id.
 * @param {number} id
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

/**
 * Clears the task list DOM and rebuilds it from the current
 * tasks array, then updates the stats row.
 */
function renderTasks() {
  if (!list) return;

  list.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;

    // Show incomplete tasks first, completed ones sink to the bottom
    const sorted = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
    sorted.forEach((task) => list.appendChild(buildTaskElement(task)));
  }

  updateStats();
}

/**
 * Builds the <li> element for a single task, wiring up its
 * own checkbox and delete button.
 * @param {{id:number, text:string, priority:string, completed:boolean}} task
 * @returns {HTMLLIElement}
 */
function buildTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Mark "${task.text}" as completed`);
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const content = document.createElement('div');
  content.className = 'task-content';

  const textEl = document.createElement('span');
  textEl.className = 'task-text';
  textEl.textContent = task.text;

  const priorityEl = document.createElement('span');
  priorityEl.className = 'task-priority-label';
  priorityEl.textContent = `${task.priority} priority`;

  content.append(textEl, priorityEl);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'task-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  li.append(checkbox, content, deleteBtn);
  return li;
}

/**
 * Recalculates and displays total / completed / remaining counts.
 */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  statTotal.textContent = total;
  statCompleted.textContent = completed;
  statRemaining.textContent = total - completed;
}

/**
 * Reads any previously saved tasks from localStorage.
 * @returns {Array}
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Could not load saved tasks:', err);
    return [];
  }
}

/**
 * Writes the current tasks array to localStorage as JSON.
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Could not save tasks:', err);
  }
}