var idleTime = 0;
var records = [];

$(document).ready(function () {

  //Set up counter for reload every 15 second of inactive
  var idleInterval = setInterval(timerIncrement, 1000);

  $(this).mousemove(function (e) {
    idleTime = 0;
  });

  $(this).keypress(function (e) {
    idleTime = 0;
  });

  function timerIncrement() {
    idleTime++;
    if (idleTime > 15) {
      window.location.reload();
    }
  }

  //Main content
  function hourUpdater() {

    // get current number of hours
    var currentHour = moment().hours();

    //console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function () {

      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }

      // textArea and save-button are added here to avoid duplicate in html
      var textArea = document.createElement("textarea");
      textArea.classList.add("col-md-10", "description");
      var button = document.createElement("button");
      button.classList.add("btn", "saveBtn", "col-md-1");
      var icon = document.createElement("i");
      icon.classList.add("fas", "fa-save");
      textArea.id = "rmEl";
      button.id = "rmEl";
      icon.id = "rmEl";

      $(this).append(textArea);
      $(this).append(button);
      $(button).append(icon);

      //Display any data from record array
      $.each(records, function (indexInArray, valueOfElement) {

        if (parseInt(valueOfElement.time.split("-")[1]) === blockHour) {

          textArea.innerHTML = valueOfElement.value;
        }

      });

    });

    //trigger actions after clicking on save button
    $(".saveBtn").click(function (e) {
      event.preventDefault(e);

      //Get this values
      var value = $(this).siblings(".description").val();
      var time = $(this).parent().attr("id");
      var day = moment().format("Do");
      records.push({
        time,
        value,
        day
      })
      localStorage.setItem("time", JSON.stringify(records));

    });

  }

  // load any saved data from localStorage
  var recordStored = JSON.parse(window.localStorage.getItem("time"));

  if (recordStored !== null) {
    if (recordStored[0].day === moment().format("Do")) {
      records = recordStored;
    } else {
      // new day, new records
      window.localStorage.setItem("time", null)
    }
  }

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  hourUpdater();
});