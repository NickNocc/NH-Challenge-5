var currentTime = moment().format("dddd, MMMM Qo");
var timeDisplay = $("#currentDay").text(currentTime);
var taskList = {};
var taskHolder = $(".row")

// loads the js when document is fully loaded
$(document).ready(function() {
    // sets whether we are in am or pm
    var ampm = "AM";
    // variable that remembers what time to start the planner at
    var time = 8;

    
    
    taskList = JSON.parse(localStorage.getItem("tasks"));
    

    // starts planner at 8am to 9pm
    for (var i = 8; i < 22; i++) {
        // changes time from am to pm and restarts time to match
        if (time > 12) {
            time = 1;
            ampm = "PM";
        };  
        var allTime = time + ampm;

        // Makes our planner boxes and gives them ids for later | Also inserts other elements 
        $(taskHolder).append('<div class="col-1 bg-primary h-100 border border-dark left-box"><span><p>' + allTime + '</p></span></div>');
        $(taskHolder).append('<div class="col-10 bg-success h-100 border border-dark center-box" id="frickFrack' + time + '" data-time=' + allTime + '><p> </p></div>');
        $(taskHolder).append('<div class="col-1 bg-info h-100 border border-dark right-box" data-time=' + allTime + '></div>');
        
        // to keep up with the for loop
        time++;
    };

    // changes text to input field on click
    $(".center-box").on("click", "p", function(){
        // selects closest p element to what was clicked
        var clickedBox = $(this).closest("p").text().trim();

        var textInput = $("<textarea>").addClass("col-10").val(clickedBox);
        // replaces our p with a text field
        $(this.closest("p")).replaceWith(textInput);

        textInput.trigger("focus");

    });
    // When the user clicks off of the text area, it is replaced with another p element
    $(".center-box").on("blur", "textarea", function(){
        var text = $(this).val();
        var status = $(this).closest(".center-box").attr("id");
        saveTask();
        console.log(taskList);
        // re-adds our p element with space to avoid an unclickable box
        var taskP = $("<p>").addClass("m-1").text(text + "      ");
        $(this).replaceWith(taskP);
    });

    

    // create 3 boxes for each hour using i to set unique values for events
    // left box displays time + am/pm
    // middle box displays the event + lets you input text when you click on center
    // right box has an icon and on click will save whatever you have inputted into the box



    if (!taskList) {
        taskList = {
            hour: []
        };
    }
    // Loop that replaces empty blank blocks with previous tasks
    var saveTask = function() {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    };

    $(".right-box").on("click", function(){
        var taskText = $(".center-box").find("p").text().trim();
        var saveHour = $(this).data();
        var test = $(this).closest("p").data();

        for (var i = 0; i < 13; i++) {
            if (time > 12) {
                time = 1;
            }
            console.log("time:" + allTime);
            var testy = $("#frickFrack" + time).data();
            console.log(testy);
            if (saveHour === testy) {
                alert("pog");
            }

            time++;
        }
        // console.log(test);
        // console.log(saveHour);
        saveTask();
    });



    // check every 5m to see if an event has passed, if it has remove it's current class and add the appropriate class

});

