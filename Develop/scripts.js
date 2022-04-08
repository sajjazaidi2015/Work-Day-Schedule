// define a variable for today as moment
// eg. var today = moment();

var currentDate = moment();

$('#currentDay').text(currentDate.format('dddd, MMMM Do'))

//define the variable of start time of the day
var startTimeOfTheDay = 09;

// define start of the day
var start = currentDate.clone().set("hour", startTimeOfTheDay);

// define end of the day
var end = currentDate.clone().set("hour", 17);
// define the difference between start and end in number of hours
var duration = moment.duration(end.diff(start));
var hours = duration.asHours();
// loop over number of hours
// render html
const dateInLocalStorage = localStorage.getItem("scheduleDate");
localStorage.setItem("scheduleDate", currentDate.format("YYYY/MM/DD"));

if (dateInLocalStorage != null) {
  if (dateInLocalStorage != currentDate.format("YYYY/MM/DD")) {
    localStorage.removeItem("schedule");
  }
}

const schedule = JSON.parse(localStorage.getItem("schedule"));
if (schedule == null) {
  let schedulerStorage = [];
  for (let i = 0; i <= hours; i++) {
    schedulerStorage.push({ value: "" });
  }
  localStorage.setItem("schedule", JSON.stringify(schedulerStorage));
}
const scheduleStorage = JSON.parse(localStorage.getItem("schedule"));
for (let i = 0; i <= hours; i++) {
  const timeOfBlock = currentDate.clone().set("hour", startTimeOfTheDay + i);
  let currentState = "";
  if (currentDate.isAfter(timeOfBlock)) {
    currentState = "past";
  }
  if (currentDate.isBefore(timeOfBlock)) {
    currentState = "future";
  }
  if (
    currentDate.isSameOrAfter(timeOfBlock) &&
    currentDate.isBefore(timeOfBlock.clone().add(1, "hours"))
  ) {
    currentState = "present";
  }
  const $divTimeBlock = $("<div>", { class: "row time-block" });
  const $divHour = $("<div>", { class: "col-md-2 hour" });
  const $textArea = $("<textarea>", {
    class: "col-md-9 description " + currentState,
  });

  $textArea.val(scheduleStorage[i].value);
  const $icon = $("<i>", { class: "fas fa-save" });
  const $button = $("<button>", { class: "btn saveBtn col-md-1" });
  const timeInText = timeOfBlock.format("hh A");
  $divHour.text(timeInText);
  $divTimeBlock.append($divHour);
  $divTimeBlock.append($textArea);
  $("#container").append($divTimeBlock);
  $button.append($icon);
  $divTimeBlock.append($button);
  $button.on("click", function () {
    console.log($textArea.val());
    scheduleStorage[i].value = $textArea.val();
    localStorage.setItem("schedule", JSON.stringify(scheduleStorage));
  });
}
