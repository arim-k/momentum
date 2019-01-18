const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

// function filterFn(toDo) {
//   return toDo.id === 1;
// }

function deleteToDo(event) {
  console.dir(event.target);
  console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);  
  });
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  const newId = toDos.length + 1;  
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
 
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // console.log(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) { 
      console.log(loadedToDos);
      const parsedToDos = JSON.parse(loadedToDos);
      console.log(parsedToDos);
      parsedToDos.forEach(function(toDo) {
        console.log(toDo.text);
        paintToDo(toDo.text);
      });
    }
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();