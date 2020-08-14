var list = document.getElementById("list");

function addTodo() {
    var todo_item = document.getElementById("todo-item")
    if (todo_item.value != "") {

        //creating li tag with text node
        var li = document.createElement('li'); //this tag created here because multiple li will be created
        var liText = document.createTextNode(todo_item.value)
        li.setAttribute("class", "list")
        li.appendChild(liText);

        var key = firebase.database().ref('todo_item').push(todo_item.value).key;

        //creating delete button
        var delBtn = document.createElement("button");
        var delText = document.createTextNode("DELETE");
        delBtn.setAttribute("class", "btnn")
        delBtn.setAttribute("onclick", "deleteItem(this)")
        delBtn.appendChild(delText);

        //creating edit button
        var editBtn = document.createElement("button");
        var editText = document.createTextNode("EDIT");
        editBtn.appendChild(editText);
        editBtn.setAttribute("class", "btnn")
        editBtn.setAttribute("onclick", "editItem(this)")

        li.appendChild(delBtn)
        li.appendChild(editBtn)

        list.appendChild(li);
        todo_item.value = "";
    }
    else {
        alert("Please enter something.")
    }
}

function deleteItem(e) {
    e.parentNode.remove()
}

function deleteAll() {
    list.innerHTML = ""
    firebase.database().ref('todo_item').remove()
}

function editItem(e) {
    var val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue)
    e.parentNode.firstChild.nodeValue = val;
}