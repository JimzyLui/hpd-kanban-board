// Declare my columns which will be empty arrays that will take task objects
var arrToDoList = [{
  title: "Wake up",
  desc: "Alarm clock",
  assignee: "jimzy",
  id: 0,
  type: "todo"
}];

var uniqueIdCounter = 0;
var arrInProgressList = [{
  title: "Old Task",
  desc: "In Progress",
  assignee: "jimzy",
  id: 1,
  type: "inProgress"
}];
var arrCompletedList = [{
  title: "Completed",
  desc: "Completed",
  assignee: "jimzy",
  id: 2,
  type: "completed"
}];
var arrAcceptedList = [{
  title: "Old Task",
  desc: "Some Accepted Task",
  assignee: "jimzy",
  id: 3,
  type: "accepted"
}];
var arrArchivedList = [{
  title: "Old Task",
  desc: "Archived Task",
  assignee: "jimzy",
  id: 4,
  type: "archived"
}];

var toDoColumn = document.getElementById('toDo');
var inProgressColumn = document.getElementById('inProgress');
var completedColumn = document.getElementById('completed');
var acceptedColumn = document.getElementById('accepted');
var archivedColumn = document.getElementById('archived');
var formContainer = document.getElementById('formcontainer');

// gets called every time the columns are redrawn
function renderColumns(){
  toDoColumn.innerHTML = "<h3>To Do </h3>";
  inProgressColumn.innerHTML = "<h3>In Progress</h3>";
  completedColumn.innerHTML = "<h3>Completed</h3>";
  acceptedColumn.innerHTML = "<h3>Accepted</h3>";
  archivedColumn.innerHTML = "<h3>Archived</h3>";
 
//   toDoColumn.innerHTML = "<h3>To Do ("+arrToDoList.length +")</h3>";
//   inProgressColumn.innerHTML = "<h3>In Progress("+arrInProgressList.length +")</h3>";
//   completedColumn.innerHTML = "<h3>Completed ("+arrCompletedList.length +")</h3>";
//   acceptedColumn.innerHTML = "<h3>Accepted ("+arrAcceptedList.length +")</h3>";
//   archivedColumn.innerHTML = "<h3>Archived ("+arrArchivedList.length +")</h3>";
 
  populateArray(arrToDoList, toDoColumn);  
  populateArray(arrInProgressList, inProgressColumn);  
  populateArray(arrCompletedList, completedColumn);  
  populateArray(arrAcceptedList, acceptedColumn);  
  populateArray(arrArchivedList, archivedColumn); 

 
}
function populateArray(arrList, column){
  for(var i=0; i< arrList.length;i++){
    var newCard = createCardElement(
      arrList[i].title,
      arrList[i].desc,
      arrList[i].assignee,
      arrList[i].id,
      arrList[i].type);
    column.appendChild(newCard);
  }  
}
renderColumns();

function createCardElement(title, desc, assignee, id, type){
    var card = document.createElement('div');
    card.className='card';
    var cardTitle = document.createElement('div');
    cardTitle.innerHTML = title;
    cardTitle.className = "cardTitle";
    var cardDesc = document.createElement('div');
    cardDesc.innerHTML = desc;
    cardDesc.className = "description";
    var cardAssignee = document.createElement('div');
    cardAssignee.innerHTML = assignee;
    var cardID = document.createElement('div');
    cardID.innerHTML = id;
    card.id = id;
  
    var deleteTaskForm = document.createElement('form');
    deleteTaskForm.onsubmit = deleteCard;
    
    var deleteTaskIdInput = document.createElement('input');  
    deleteTaskIdInput.value = id;
    deleteTaskIdInput.name="id";
    deleteTaskIdInput.type = "hidden";
    var deleteTaskTypeInput = document.createElement('input'); 
    deleteTaskTypeInput.value = type;
    deleteTaskTypeInput.name = "type";
    deleteTaskTypeInput.type = "hidden";
  
    var deleteTaskButton = document.createElement('button');
    deleteTaskButton.type = 'submit';
    deleteTaskButton.innerHTML = "X";
    deleteTaskButton.className = "deleteTaskButton";
  
    deleteTaskForm.appendChild(deleteTaskIdInput);
    deleteTaskForm.appendChild(deleteTaskTypeInput);
    deleteTaskForm.appendChild(deleteTaskButton);
  
    var moveTaskForm = document.createElement('form');
    moveTaskForm.onsubmit = moveCard;
  
    var moveTaskIdInput = document.createElement('input');
    moveTaskIdInput.value = id;
    moveTaskIdInput.name="id";
    moveTaskIdInput.type = "hidden";
  
    var moveTaskTypeInput = document.createElement('input');
    moveTaskTypeInput.value = type;
    moveTaskTypeInput.name = "type";
    moveTaskTypeInput.type = "hidden";
    
    var moveTaskButton = document.createElement('button');
    moveTaskButton.type = 'submit';
    moveTaskButton.innerHTML = "→";
    moveTaskButton.value = id;
    moveTaskButton.className = "moveTaskButton";
  
    moveTaskForm.appendChild(moveTaskIdInput);
    moveTaskForm.appendChild(moveTaskTypeInput);
    moveTaskForm.appendChild(moveTaskButton);
  
    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardAssignee);
    card.appendChild(cardID);
    card.appendChild(deleteTaskForm);
    if(type !== 'archived'){
      card.appendChild(moveTaskForm);
    }
    //toDoColumn.appendChild(card);  
    return card;
}

function moveCard(event){
  event.preventDefault();
  
  console.log(event.target.id.value);
  console.log(event.target.type.value);

//     var moveTaskObject = {
//       title: event.target.title.value,
//       desc: event.target.description.value,
//       assignee: event.target.assignee.value,
//       id: event.target.id.value,
//       type: event.target.type.value
//     };
  switch(event.target.type.value){
    case 'todo':
      var taskToMove = arrToDoList.find(function(task){
        return task.id == event.target.id.value;
      });
      taskToMove.type = 'inProgress';
      deleteCard(event);
      arrInProgressList.push(taskToMove);
      break;
    case 'inProgress':
      var taskToMove = arrInProgressList.find(function(task){
        return task.id == event.target.id.value;
      });
      taskToMove.type = 'completed';
//       arrInProgressList = arrInProgressList.filter(function(task){
//         return task.id != event.target.id.value;
//       });
      deleteCard(event);
      arrCompletedList.push(taskToMove);
      break;
    case 'completed':
      var taskToMove = arrCompletedList.find(function(task){
        return task.id == event.target.id.value;
      });
      taskToMove.type = 'accepted';
//       arrCompletedList = arrCompletedList.filter(function(task){
//         return task.id != event.target.id.value;
//       });
      deleteCard(event);
      arrAcceptedList.push(taskToMove);
      break;
    case 'accepted':
      var taskToMove = arrAcceptedList.find(function(task){
        return task.id == event.target.id.value;
      });
      taskToMove.type = 'archived';
//       arrAcceptedList = arrAcceptedList.filter(function(task){
//         return task.id != event.target.id.value;
//       });
      deleteCard(event);
      arrArchivedList.push(taskToMove);
      break;
  }
  renderColumns();
}

/* create a form fx to 
 * handle when a new task is submited */
function handleSubmit(event){
  event.preventDefault();
 
  var newTaskObject = {
    title: event.target.title.value,
    desc: event.target.description.value,
    assignee: event.target.assignee.value,
    id: 'task' + uniqueIdCounter,
    type: 'todo'
  };
  uniqueIdCounter++;
  arrToDoList.push(newTaskObject);
  renderColumns();
}

function deleteCard(event){
  event.preventDefault();
  console.log('deleted this card');
  console.log(event.target.id.value);
  console.log(event.target.type.value);
  
  switch (event.target.type.value){
    case 'todo':
      arrToDoList = arrToDoList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'inProgress':
      arrInProgressList = arrInProgressList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'completed':
      arrCompletedList = arrCompletedList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'accepted':
      arrAcceptedList = arrAcceptedList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
    case 'archived':
      arrArchivedList = arrArchivedList.filter(function(task){
        return task.id != event.target.id.value;
      });
      break;
  }
  renderColumns();
}
// function moveCard(event){
//   //console.log('deleted this card');
//   var cardToMove = document.getElementById(this.value);
//   console.log(cardToMove.type);
//   switch (cardToMove.type){
//     case 'todo':
//       toDoColumn.removeChild(cardToMove);
//       break;
//     case 'inProgress':
//       inProgressColumn.removeChild(cardToMove);
//       break;
//     case 'completed':
//       completedColumn.removeChild(cardToMove);
//       break;
//     case 'accepted':
//       acceptedColumn.removeChild(cardToMove);
//       break;
//   } 
// }

var newTaskForm = document.createElement('form');
newTaskForm.onsubmit = handleSubmit;

var titleInput = document.createElement('input');
titleInput.placeholder = 'title';
titleInput.name = 'title';
titleInput.required = true;
//titleInput.className='cardTitle';

var descInput = document.createElement('input');
descInput.placeholder = 'description';
descInput.name = 'description';
descInput.required = true;

var assigneeInput = document.createElement('input');
assigneeInput.placeholder = 'assignee';
assigneeInput.name = 'assignee';
assigneeInput.required = true;

var submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerHTML = "ADD";

newTaskForm.appendChild(titleInput);
newTaskForm.appendChild(descInput);
newTaskForm.appendChild(assigneeInput);
newTaskForm.appendChild(submitButton);
formContainer.appendChild(newTaskForm);

























