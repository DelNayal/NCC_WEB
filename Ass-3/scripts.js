const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

contents[0].classList.add('active');
tabs[0].classList.add('active');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    contents[index].classList.add('active');
  });
});
//for alert-box
const openDialogButton = document.getElementById('open-dialog');
const closeDialogButton = document.getElementById('close-dialog');
const dialog = document.getElementById('dialog');

openDialogButton.addEventListener('click', () => {
  dialog.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

closeDialogButton.addEventListener('click', () => {
  dialog.style.display = 'none';
  document.body.style.overflow = 'auto';
});
//for todo app
const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");
const searchInput = document.getElementById("searchInput");

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <img src="delete.png" width="20px" height="20px" class="deleteButton"></img>
  `;

  taskList.appendChild(li);
  newTaskInput.value = "";

  li.querySelector(".deleteButton").addEventListener("click", () => {
    taskList.removeChild(li);
  });
}

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const tasks = taskList.querySelectorAll("li");

  tasks.forEach((task) => {
    const taskText = task.querySelector("span").textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});
// for form
const form = document.getElementById("submit");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");

form.addEventListener("click", function(event) {
  validateInput(nameInput, "Name must include a lowercase letter and a number!", errorName,isValidNamePattern);
  validateInput(emailInput, "Invalid email format!", errorEmail, isValidEmail);
  validateInput(passwordInput, "Password must be at least 6 characters", errorPassword,isValidPasswordLength);

  if (!isFormValid()) {
   event.preventDefault();
    
  }
});

function validateInput(inputElement, errorMessage, errorElement, validationFunction = null) {
  const inputValue = inputElement.value.trim();
  if (inputValue === "" || (validationFunction && !validationFunction(inputValue))) {
    showError(errorMessage, errorElement);
    inputElement.classList.add("error"); // Add error class to input element
} else {
  hideError(errorElement);
  inputElement.classList.remove("error"); // Remove error class from input element
}
}

function showError(message, errorElement) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function hideError(errorElement) {
  errorElement.style.display = "none";
}
function isValidNamePattern(name) {
    const lowercaseLetterRegex = /[a-z]/;
    const numberRegex = /\d/;
    return lowercaseLetterRegex.test(name) && numberRegex.test(name);
  }

  function isValidPasswordLength(password) {
    return password.length >= 6;
  }

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isFormValid() {
    let name = isValidNamePattern(nameInput.value.trim());
    let email = isValidEmail(emailInput.value.trim());
    let pass = isValidPasswordLength(passwordInput.value.trim());
    return (name & email & pass);
}

nameInput.addEventListener("input", function() {
    hideError(errorName);
    
    nameInput.classList.remove("error"); 
  });

  emailInput.addEventListener("input", function() {
    hideError(errorEmail);
    emailInput.classList.remove("error"); 
  });

  passwordInput.addEventListener("input", function() {
    hideError(errorPassword);
    passwordInput.classList.remove("error");
  });