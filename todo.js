const form = document.getElementById("todoform");
const todoItem = document.getElementById("todoitem");
const todoEmail = document.getElementById("todoemail");
const todoPassword = document.getElementById("todopassword");
const table = document.getElementById("table");

let todo = JSON.parse(localStorage.getItem('todoList')) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tod = {
    task: todoItem.value,
    email: todoEmail.value,
    password: todoPassword.value,
  };

  todo.push(tod);

  todoItem.value = "";
  todoEmail.value = "";
  todoPassword.value = "";

  showTodo();
  updateLocalStorage();
});

function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todo));
}

function updateTodo(index) {
  const updatedTask = prompt("Update task:", todo[index].task);
  const updatedEmail = prompt("Update email:", todo[index].email);
  const updatedPassword = prompt("Update password:", todo[index].password);

  if (updatedTask !== null) todo[index].task = updatedTask;
  if (updatedEmail !== null) todo[index].email = updatedEmail;
  if (updatedPassword !== null) todo[index].password = updatedPassword;

  showTodo();
  updateLocalStorage();
}

function showTodo() {
  table.innerHTML = "";
  todo.forEach((item, index) => {
    table.innerHTML += `
      <tr style =" display:flex; flex-direction:column;">
        <td>Name : ${item.task}</td>
        <td>Email : ${item.email}</td>
        <td>Password : ${item.password}</td><br>
        <br>
        <td>
          <button class="action" onclick="updateTodo(${index})"><b>Update</b></button><br>
          <button class="action"onclick="deleteTodo(${index})">
          <b>Delete</b></button>
        </td>
       
      </tr>
    `;
  });
}

function deleteTodo(index) {
  todo.splice(index, 1);
  showTodo();
  updateLocalStorage();
}

showTodo();