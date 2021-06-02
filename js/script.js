const inputBox = document.querySelector("#inputField input");
const addButton = document.querySelector("#inputField button");  
const todoList = document.querySelector("#todo-list");  
const pendingNumb = document.querySelector("#pendingNumb");
const deleteAllButton = document.querySelector("#deleteAll");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addButton.classList.add("active");
    } else {
        addButton.classList.remove("active");
    }
} 

showTasks();

document.onkeyup = function (e) {
    var evt = window.event || e;   
        if (evt.keyCode == 13) {
            if(inputBox.value == "") {
                alert("Digite algo para poder adicionar")
            } else {
                addTask();
            }
        }
}

addButton.onclick = () => {
    addTask();
} 

function addTask() {
    let userData = inputBox.value;;
    let getLocalStorage = localStorage.getItem("Novo Todo");
    if(getLocalStorage == null ) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("Novo Todo", JSON.stringify(listArr));
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("Novo Todo");
    if(getLocalStorage == null ) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
        listArr = listArr.reverse();
    }
     
    pendingNumb.textContent = listArr.length;

    if(listArr.length > 0) {
        deleteAllButton.classList.add("active");
    } else {
        deleteAllButton.classList.remove("active");
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li><p>${element}</p> <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Novo Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem("Novo Todo", JSON.stringify(listArr));
    showTasks();
}

deleteAllButton.onclick = () => {
    listArr = [];

    localStorage.setItem("Novo Todo", JSON.stringify(listArr));
    showTasks();
}