var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added', function (data) {
    console.log(data.val())
    // if (todo_item.value != "") {
    //creating li tag with text node
    var li = document.createElement('li'); //this tag created here because multiple li will be created
    var liText = document.createTextNode(data.val().value)
    li.setAttribute("class", "list")
    li.appendChild(liText);

    //creating delete button
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE");
    delBtn.setAttribute("class", "btnn")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText);

    //creating edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    editBtn.setAttribute("class", "btnn")
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")

    li.appendChild(delBtn)
    li.appendChild(editBtn)

    list.appendChild(li);
    // }
    // else {
    // alert("Please enter something.")
    // }

})

function addTodo() {
    var todo_item = document.getElementById("todo-item")
    var database = firebase.database().ref("todos");
    var key = database.push().key;
    var todo = {
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo);
    todo_item.value = "";

}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function deleteAll() {
    list.innerHTML = ""
    firebase.database().ref('todos').remove()
}

function editItem(e) {
    var val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue)
    var editTodo = {
        value: val,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue = val;
}