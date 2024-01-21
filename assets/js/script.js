$(document).ready(function() {      //Start when loading the page
    // Use Day.js to display the current day 
    var todaysDate = dayjs().format("dddd, D MMMM YYYY"); // Tuesday, 23 January 2024 format
    $("#currentDay").text(todaysDate);

    //Generate Timeblocks from 9am to 5pm
    //Input the timeblocks inside the tbody element of the table for simple formatting
    let tbody = $("#tbody");
    
    for(let i = 9; i <= 17; i++) {
        //Generate timeblock row
        var timeBlock = $("<tr>").addClass("row time-block");
        var hour = dayjs().hour(i).format("hA"); //
        var timeHeader = $("<td>").addClass("col-1 hour").text(hour);
        var taskDescription = $("<td>").addClass("col-10").attr("time", i);
        var textArea = $("<textarea>")
            .addClass("description")
            .attr({placeholder: "Add task here",
                    id: i,});
        var saveBtnHeader = $("<td>").addClass("col-1 saveBtn");
        var saveBtn = $("<button>").addClass("savBtn").text("💾").attr("time",i);

        //Append each element to relevant element
        saveBtnHeader.append(saveBtn);
        taskDescription.append(textArea);
        timeBlock.append(timeHeader,taskDescription,saveBtnHeader);
        tbody.append(timeBlock);

        //Track timeblock to determine if it is past, present or future
        if(dayjs().hour() > i) {
            timeBlock.addClass("past");
        } else if(dayjs().hour() === i) {
            timeBlock.addClass("present");
        } else if(dayjs().hour() < i) {
            timeBlock.addClass("future");
        };

        //Save button event listener when clicked add the tasks to the array
        //and save to the local storage.
        $('.savBtn').on("click", function() {
            //Assign the time and text input to variables
            var timeBlockHour = $(this).parent().siblings(".hour").text();
            var taskInput = $(this).parent().siblings("td.col-10").children("textarea").val();

            //Save the text input to local storage with corresponding time
            localStorage.setItem(JSON.stringify(timeBlockHour),JSON.stringify(taskInput));
        });

        //When the page is refreshed, loop through the localStorage to repopulate
        //the tasks if data present for given timeblock
            $(".hour").each(function() {
                if($(this).text() === hour) {
                    var storedTask = JSON.parse(localStorage.getItem(JSON.stringify(hour)));
                    $(this).siblings("td.col-10").children("textarea").val(storedTask);
                }
            })
    };
});