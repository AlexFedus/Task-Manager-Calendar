current = new Date();
var curmonth = current.getMonth();
var curYear = current.getFullYear();
var curday = current.getDay();
var holidayarr = [];
var allevents = [];
const months = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

window.onload = pageLoad;





// Function called when page is loaded. Calls load date function to load the date when the page is loaded.
function pageLoad() {

    loadDate();

    var taskbutton = document.getElementById("taskbutton");
    var nextbutton = document.getElementById("next");
    var prevbutton = document.getElementById("previous");
    var savetasks = document.getElementById("savetofile");

    taskbutton.onclick = addtasks;
    nextbutton.onclick = nextMonth;
    prevbutton.onclick = prevMonth;
    savetasks.onclick = savetaskfile;

}

// Displays the current date and year and calls function to create calendar cells.
function loadDate() {
    monthandyear = months[curmonth] + ", " + curYear;

    document.getElementById("monthyear").innerHTML = monthandyear;
    loadCells(curmonth, curYear);

}

// Loads cells of the calendar based on the current month and year
function loadCells(currmonth, curYear) {
    today = new Date();
    daysinmonth = new Date(curYear, currmonth + 1, 0).getDate();
    firstDay = (new Date(curYear, currmonth)).getDay();


    caltable = document.getElementById("calbody");
    caltable.innerHTML = "";


    date = 1;

    //Creates a row of cells for each week of the month
    for (i = 0; i < 6; i++) {
        row = document.createElement("tr");

        // Creates a cell for each day in the week
        for (let j = 0; j < 7; j++) {

            //Creates a blank cell with no date if cell is before first day in a month
            if (i === 0 & j < firstDay) {
                datebox = document.createElement("td");

                dateText = document.createTextNode("");
                datebox.appendChild(dateText);
                row.appendChild(datehbox);
            }
            else if (date > daysinmonth) {
                break;
            }

            else {

                // Adds a preceding 0, used to make id's uniform
                if (currmonth < 9) {
                    var updatemonth = "0" + (currmonth + 1);
                }
                else {
                    var updatemonth = (currmonth + 1);
                }

                idname = curYear + "-" + updatemonth + "-" + date;
                datebox = document.createElement("td");
                datebox.setAttribute("id", idname);

                //pushes id to array used to match holidays within current month
                holidayarr.push(idname);



                //Adds elements to page
                dateText = document.createTextNode(date);
                datebox.appendChild(dateText);
                row.appendChild(datebox);
                date++;
            }



        }

        caltable.appendChild(row);

    }
    //Called to load holidays in
    holidays();

}


//Reads JSON file
function holidays() {
    new Ajax.Request("holidays.json",
        {
            method: "get",
            onSuccess: listHolidays,
            onFailure: ajaxFailure,
        }
    );

}



// Lists holidays from Json file depending on the current month being viewed
function listHolidays(ajax) {


    var data = JSON.parse(ajax.responseText);
    for (var i = 0; i < data.holidays.length; i++) {
        if (holidayarr.includes(data.holidays[i].date)) {


            holidayid = data.holidays[i].date;

            //Creates id and adds holidays to correct date on calendar
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + data.holidays[i].date;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + data.holidays[i].name;


            document.getElementById(data.holidays[i].date).appendChild(taskspantag);






        }

    }


}

// Throws error when ajax fails
function ajaxFailure(ajax, exception) {
    alert("Error making Ajax request:" + "\n\nServer status:\n"
        + ajax.status + " " + ajax.statusText
        + "\n\nServer response text:\n" + ajax.responseText);
    if (exception) {
        console.log(exception);
        throw exception;
    }
}



// Adds tasks to tasklist and to calendar
function addtasks() {
    if (document.getElementById("taskname").value != "") {
        var name = document.getElementById("taskname").value;


        date = document.getElementById("date").value;
        var newdate = date.split("-");
        var newdateday = newdate[2];

        //Gets rid of preceding 0; used to match id names
        if (newdateday < 10) {
            newdateday = newdateday.replace("0", "");
            date = newdate[0] + "-" + newdate[1] + "-" + newdateday;
        }



       
        //Sets up info to be pushed to array; array is used when saving txt file
        var taskinfo = name + "-" + date;
        allevents.push(taskinfo);

        //id name for label
        var labelinfo = "label" + "-" + name + "-" + date;
        taskdiv = document.createElement("div");
        taskdiv.setAttribute("id", labelinfo);

        //creates check box along with the label
        task = document.createElement("input");
        task.type = "checkbox";
        task.name = "task"
        var label = document.createElement("label");
        label.htmlFor = taskinfo;
        label.appendChild(document.createTextNode(taskinfo));



        taskdiv.appendChild(label);
        taskdiv.appendChild(task);
        list.appendChild(taskdiv);





        //checks if task created is located in current month being viewed
        //if so, adds task to the calendar
        if (document.getElementById(date)) {
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + name + "-" + date;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + name;


            document.getElementById(date).appendChild(taskspantag);
        }

        task.setAttribute("id", taskinfo);

        var deleteButton = document.getElementById("deleteButton");
        deleteButton.onclick = deleteTasks;



    }

}


// Deletes tasks from task list and calendar
function deleteTasks() {
    var checkboxes = document.getElementsByName("task");

    //Checks which checkboxes are checked to see what to delete
    //Removes checkboxes that are checked
    //Removes labels for checkboxes
    for (var checkbox of checkboxes) {
        if (checkbox.checked) {
            var test = "label-" + checkbox.id;

            document.getElementById(test).remove();
            checkboxtospantemp = checkbox.id.replace("label", "");

            allevents = allevents.filter(e => e !== checkboxtospantemp);

            checkboxtospan = "span-" + checkboxtospantemp;

            checkmonthspan = checkboxtospan.split("-")[3];
            checkmonth = curmonth + 1;

            if (checkmonth < 10) {
                checkmonth = "0" + checkmonth;
            }

            if (checkmonth == checkmonthspan) {
                document.getElementById(checkboxtospan).remove();
            }


        }
    }



}


// Displays the next month when the next arrow is clicked.
function nextMonth() {

    //Clears array of holidays in current month
    holidayarr = [];

    //Displays current month and year for the next month
    if (curmonth < 11) {
        curmonth += 1;
        monthandyear = months[curmonth] + ", " + curYear;

        document.getElementById("monthyear").innerHTML = monthandyear;
        loadCells(curmonth, curYear);
    }
    else {
        curmonth -= 11;
        curYear += 1;

        monthandyear = months[curmonth] + ", " + curYear;

        document.getElementById("monthyear").innerHTML = monthandyear;
        loadCells(curmonth, curYear);
    }


    var labelinformation = document.getElementById("list").getElementsByTagName("div");


    for (var i = 0; i < labelinformation.length; i++) {
        var tasklabel = labelinformation[i].attributes[0].nodeValue;

        taskname = (tasklabel.split("-")[1]);
        taskyear = (tasklabel.split("-")[2])
        taskmonth = (tasklabel.split("-")[3])
        taskday = (tasklabel.split("-")[4])


        //Removes and adds 0's for id matching
        if (taskday < 10) {
            taskday = taskday.replace("0", "");
        }

        if (curmonth < 10) {
            var newmonth = "0" + (curmonth + 1);
        }


        // Adds tasks from tasklist that are in the next month to the calendar
        if (curYear == taskyear & newmonth == taskmonth) {
            var taskdate = taskyear + "-" + taskmonth + "-" + taskday;
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + taskname + "-" + taskdate;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + taskname;

            document.getElementById(taskdate).appendChild(taskspantag);
        }
    }

}


// Displays the previous month when the previous arrow is clicked.
function prevMonth() {

    //clears array of holidays in current month
    holidayarr = [];

    //Displays the previous month and year
    if (curmonth > 0) {
        curmonth -= 1;
        monthandyear = months[curmonth] + ", " + curYear;

        document.getElementById("monthyear").innerHTML = monthandyear;
        loadCells(curmonth, curYear);
    }
    else {
        curYear -= 1;
        curmonth = 11;

        monthandyear = months[curmonth] + ", " + curYear;

        document.getElementById("monthyear").innerHTML = monthandyear;
        loadCells(curmonth, curYear);
    }


    var labelinformation = document.getElementById("list").getElementsByTagName("div");
    for (var i = 0; i < labelinformation.length; i++) {
        var tasklabel = labelinformation[i].attributes[0].nodeValue;

        taskname = (tasklabel.split("-")[1]);
        taskyear = (tasklabel.split("-")[2])
        taskmonth = (tasklabel.split("-")[3])
        taskday = (tasklabel.split("-")[4])


        if (taskday < 10) {
            taskday = taskday.replace("0", "");
        }


        if (curmonth < 10) {
            var newmonth = "0" + (curmonth + 1);
        }


        // Adds tasks from tasklist that are in the previous month to the calendar
        if (curYear == taskyear & newmonth == taskmonth) {
            var taskdate = taskyear + "-" + taskmonth + "-" + taskday;
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + taskname + "-" + taskdate;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + taskname;

            document.getElementById(taskdate).appendChild(taskspantag);
        }
    }
}


//Saves current tasks in list to a txt file when save tasks button is clicked.
//Utilizes an async function to write and save the file

async function savetaskfile() {

    var blob = new Blob([allevents], { type: "text/plain" });



    // Await used to write contents to the file before being able to save it.
    var savebox = await window.showSaveFilePicker({
        types: [{ accept: { "text/plain": [".txt"] } }]
    });

    var filecontents = await savebox.createWritable();



    // writes contents to files
    filecontents.write(blob);
    filecontents.close();

}