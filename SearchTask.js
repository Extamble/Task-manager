const searchInput = document.querySelector(".searchTask");
const dataContainer = document.querySelector(".dataStore");
const tasks = document.getElementsByClassName("gridItem--name");

searchInput.addEventListener("input", filterTask);

function filterTask(e) {
  const taskArray = [...tasks];
  const searchInputValue = searchInput.value;

  filteredArrayB = taskArray.filter(
    (task) =>
      !task.innerHTML.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  filteredArrayG = taskArray.filter((task) =>
    task.innerHTML.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  filteredArrayB.forEach((element) => {
    element.parentElement.classList.add("invisible");
    console.log("done");
  });

  filteredArrayG.forEach((element) => {
    element.parentElement.classList.remove("invisible");
    console.log("done");
  });
}
