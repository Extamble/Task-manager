const taskName = document.querySelector(".js-input-name");
const description = document.querySelector(".element__input--area");
const letters = document.querySelector(".js-letters");
const creationDate = document.querySelector(".element__input--create");
const deadline = document.querySelector(".element__input--deadline");
const state = document.querySelector(".element__input--state");
const errorState = [false, false];
const errorDescription = document.querySelector(".js-para--description");
const errorName = document.querySelector(".js-para--name");
const newContainer = "";
const tableHook = document.querySelector(".dataStore");
const taskNr = document.querySelector(".taskCounter__span");
description.addEventListener("input", validateDescription);
taskName.addEventListener("change", validateName);

const elements = [
  [taskName, "name"],
  [description, "description"],
  [creationDate, "creation"],
  [deadline, "deadline"],
  [state, "state"],
];

const addButton = document.querySelector(".addNewElement");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const exitButton = document.querySelector(".modal__exit");
const cancel = document.querySelector(".form__button--cancel");
const submit = document.querySelector(".form__button--continue");
const change = document.querySelector(".form__button--change");
const del = document.querySelector(".form__button--delete");

let obj;
let objName;
let objDescription;
let objCreation;
let objRemind;
let objDeadline;
let objState;

addButton.addEventListener("click", openNewTask);
exitButton.addEventListener("click", close);
overlay.addEventListener("click", close);
cancel.addEventListener("click", close);
submit.addEventListener("click", addElement);
change.addEventListener("click", changeElement);
del.addEventListener("click", function () {
  deleteElement(obj);
});

function open() {
  overlay.classList.add("overlay--active");
  modal.classList.add("modal--active");
}

function openNewTask() {
  open();
  reset();
  change.classList.add("form__button--invisible");
  submit.classList.remove("form__button--invisible");
  del.classList.add("form__button--invisible");
  cancel.classList.remove("form__button--invisible");
}

function close() {
  overlay.classList.remove("overlay--active");
  modal.classList.remove("modal--active");
}

function addElement() {
  const flag = createTask();
  if (!flag) {
    close();
  }
}

function reset() {
  taskName.value = "";
  errorName.classList.remove("element__para--visible");
  taskName.style.background = "white";
  description.value = "";
  validateDescription();
  creationDate.value = "";
  deadline.value = "";
  state.value = "Awaits";
}

function validateDescription() {
  letters.textContent = description.value.length;
  if (description.value.length > 100) {
    letters.style.color = "red";
    description.style.background = "red";
    errorDescription.classList.add("element__para--visible");
    errorState[0] = true;
  } else {
    letters.style.color = "black";
    description.style.background = "white";
    errorDescription.classList.remove("element__para--visible");
    errorState[0] = false;
  }
}

function validateName() {
  if (taskName.value.length < 5) {
    errorName.classList.add("element__para--visible");
    taskName.style.background = "red";
    errorState[1] = true;
  } else {
    errorName.classList.remove("element__para--visible");
    taskName.style.background = "white";
    errorState[1] = false;
  }
}

validateState = (element) => {
  switch (state.value) {
    case "Awaits":
      element.style.background = "#FF6D69";
      break;
    case "Done":
      element.style.background = "#21FF85";
      break;
    case "In progress":
      element.style.background = "#FFF536";
  }
};

addZeros = (data) => {
  if (data < 10) {
    return (data = `0${data}`);
  } else {
    return data;
  }
};

validateCreationDate = () => {
  if (creationDate.value == "") {
    newDate = "";
    newDate = new Date();

    newDateString = `${newDate.getFullYear()}-${addZeros(
      newDate.getMonth() + 1
    )}-${addZeros(newDate.getDate())}`;

    creationDate.value = newDateString;
  }
};

createTask = () => {
  validateDescription();
  validateName();

  if (errorState.find((error) => error == true)) {
    return true;
  } else {
    let newContainer = document.createElement("div");
    newContainer.classList.add("gridContainer");

    validateCreationDate();
    tableHook.insertBefore(newContainer, tableHook.firstChild);

    elements.forEach((element) => {
      const newElement = document.createElement("div");
      newElement.classList.add("gridItem", `gridItem--${element[1]}`);
      newElement.textContent = element[0].value;

      if (newElement.classList.contains("gridItem--state")) {
        validateState(newElement);
      }

      newContainer.appendChild(newElement);
    });

    newContainer.addEventListener("click", updateTask);
    taskNr.textContent = `${parseInt(taskNr.textContent) + 1}`;

    return false;
  }
};

function updateTask() {
  reset();

  obj = this;
  objName = this.querySelector(".gridItem--name");
  objDescription = this.querySelector(".gridItem--description");
  objCreation = this.querySelector(".gridItem--creation");
  objDeadline = this.querySelector(".gridItem--deadline");
  objState = this.querySelector(".gridItem--state");

  taskName.value = objName.textContent;
  description.value = objDescription.textContent;
  creationDate.value = objCreation.textContent;
  deadline.value = objDeadline.textContent;
  state.value = objState.textContent;
  open();
  change.classList.remove("form__button--invisible");
  submit.classList.add("form__button--invisible");
  del.classList.remove("form__button--invisible");
  cancel.classList.add("form__button--invisible");
}

function changeElement() {
  if (errorState.find((error) => error == true)) {
    return;
  } else {
    objName.textContent = taskName.value;
    objDescription.textContent = description.value;
    objCreation.textContent = creationDate.value;
    objDeadline.textContent = deadline.value;
    objState.textContent = state.value;
    validateState(objState);
    close();
  }
}

deleteElement = (task) => {
  task.parentNode.removeChild(task);
  taskNr.textContent = `${parseInt(taskNr.textContent) - 1}`;
  close();
};
