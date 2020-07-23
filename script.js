$(document).ready(function() {
  


 


 

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();

    //console.log(document.body.childNodes[3].childNodes[5].id);
    //console.log(records[0].time);
    
    //console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function() {

      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      console.log(blockHour);
      console.log(records[0].time.split("-")[1]);
      ;
      
      
     
     

      

      //console.log("block hour:", blockHour);

      // check if we've moved past this time
      
      // if the current hour is greater than the block hour
      // then add class "past"
  
      if (blockHour < currentHour) {
        $(this).addClass("past");
      }
      
      // if they are equal
      // then remove class "past" and add class "present"
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      }
      // else
      // remove class "past", remove class "present", add class "future"
      else {
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
      
      $(this).append(textArea);
      $(this).append(button);
      $(button).append(icon);
  
      $.each(records, function (indexInArray, valueOfElement) { 

        if (parseInt(valueOfElement.time.split("-")[1]) === blockHour) {
          console.log(valueOfElement.value);
          textArea.innerHTML=valueOfElement.value;
          //textArea = valueOfElement.value;
          console.log(textArea.value);
        }
      
        //console.log(indexInArray);
        console.log(valueOfElement.time);
      });

    });
  }
  var records = [];
  

  // Moved this section to the bottom because the buttons was not created before hourUpdater()
  // listen for save button clicks
  $(".saveBtn").on("click", function() {
    console.log("success");
    // // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

    // save the value in localStorage as time
    records.push({time: time, value: value})
    localStorage.setItem("time", JSON.stringify(records));

    
    
  });

  // set up interval to check if current time needs to be updated
  // which means execute hourUpdater function every 15 seconds

  // load any saved data from localStorage
    var recordStored = JSON.parse(window.localStorage.getItem("time"));
    if (recordStored !== null) {
      records = recordStored;
    }

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  hourUpdater();
});
