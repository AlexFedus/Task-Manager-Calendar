current = new Date();
var curmonth = current.getMonth();
var curYear = current.getFullYear();
var curday = current.getDay();
const months = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

window.onload = pageLoad;





function pageLoad() {
    loadDate();
    var taskbutton = document.getElementById("taskbutton");
    var nextbutton = document.getElementById("next");
    var prevbutton = document.getElementById("previous");

    taskbutton.onclick = addtasks;
    nextbutton.onclick = nextMonth;
    prevbutton.onclick = prevMonth;
}

function loadDate() {
    monthandyear = months[curmonth] + ", " + curYear;

    document.getElementById("monthyear").innerHTML = monthandyear;
    loadCells(curmonth, curYear);

}

function loadCells(currmonth, curYear) {
    today = new Date();
    daysinmonth = new Date(curYear, currmonth + 1, 0).getDate();
    console.log(daysinmonth);
    firstDay = (new Date(curYear, currmonth)).getDay();
    console.log(firstDay);


    caltable = document.getElementById("calbody");
    caltable.innerHTML = "";


    date = 1;

    for (i = 0; i < 6; i++) {
        row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 & j < firstDay) {
                cell = document.createElement("td");

                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysinmonth) {
                break;
            }

            else {

                if (currmonth < 10) {
                    var updatemonth = "0" + (currmonth + 1);
                }
                else {
                    var updatemonth = (currmonth + 1);
                }

                idname = curYear + "-" + updatemonth + "-" + date;
                cell = document.createElement("td");
                cell.setAttribute("id", idname);


                cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }



        }

        caltable.appendChild(row);
        //holidays();
    }

}



  

function addtasks() {
    if (document.getElementById("taskname").value != "") {
        var name = document.getElementById("taskname").value;
        console.log(name);

        date = document.getElementById("date").value;
        var newdate = date.split("-");
        var newdateday = newdate[2];

        if (newdateday < 10) {
            newdateday = newdateday.replace("0", "");
            console.log(newdateday);
            date = newdate[0] + "-" + newdate[1] + "-" + newdateday;
            console.log(date);
        }


        console.log(date);

        time = document.getElementById("time").value;
        console.log(time);

        //taskinfo = document.createTextNode(name + " - "+ date + " - " + time);
        var taskinfo = name + "-" + date;
        var labelinfo = "label" + "-" + name + "-" + date;

        taskdiv = document.createElement("div");
        taskdiv.setAttribute("id", labelinfo);

        task = document.createElement("input");
        task.type = "checkbox";
        task.name = "task"
        var label = document.createElement("label");
        //label.setAttribute("id", labelinfo);
        label.htmlFor = taskinfo;
        label.appendChild(document.createTextNode(taskinfo));

        //var br = document.createElement("br");


        //task.appendChild(taskinfo);


        //list.appendChild(br);

        taskdiv.appendChild(label);
        taskdiv.appendChild(task);
        list.appendChild(taskdiv);

        //list.appendChild(label);
        //list.appendChild(task);
        //document.getElementById("list").appendChild(task);





        if (document.getElementById(date)) {
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + name + "-" + date;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + name;

            console.log(taskspantag);
            document.getElementById(date).appendChild(taskspantag);
        }

        task.setAttribute("id", taskinfo);

        var deleteButton = document.getElementById("deleteButton");
        deleteButton.onclick = deleteTasks;



    }

}



function deleteTasks() {
    var checkboxes = document.getElementsByName("task");
    for (var checkbox of checkboxes) {
        if (checkbox.checked) {
            var test = "label-" + checkbox.id;
            console.log(test);
            document.getElementById(test).remove();
            checkboxtospan = checkbox.id.replace("label", "");



            checkboxtospan = "span-" + checkboxtospan;
            console.log(checkboxtospan);

            checkmonthspan = checkboxtospan.split("-")[3];
            console.log(checkmonthspan);
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



function nextMonth() {

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

    console.log(labelinformation);

    for (var i = 0; i < labelinformation.length; i++) {
        var tasklabel = labelinformation[i].attributes[0].nodeValue;

        taskname = (tasklabel.split("-")[1]);
        taskyear = (tasklabel.split("-")[2])
        taskmonth = (tasklabel.split("-")[3])
        taskday = (tasklabel.split("-")[4])
        console.log(taskyear);
        console.log(taskmonth);

        if (taskday < 10) {
            console.log(taskday);
            taskday = taskday.replace("0", "");
        }





        if (curmonth < 10) {
            var newmonth = "0" + (curmonth + 1);
        }

        console.log(newmonth);

        if (curYear == taskyear & newmonth == taskmonth) {
            console.log(taskname);
            var taskdate = taskyear + "-" + taskmonth + "-" + taskday;
            console.log(taskdate);
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + taskname + "-" + taskdate;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + taskname;

            console.log(taskspantag);
            document.getElementById(taskdate).appendChild(taskspantag);
        }
    }

}

function prevMonth() {
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
        console.log(taskyear);
        console.log(taskmonth);

        if (taskday < 10) {
            console.log(taskday);
            taskday = taskday.replace("0", "");
        }



        if (curmonth < 10) {
            var newmonth = "0" + (curmonth + 1);
        }

        console.log(newmonth);

        if (curYear == taskyear & newmonth == taskmonth) {
            console.log(taskname);
            var taskdate = taskyear + "-" + taskmonth + "-" + taskday;
            console.log(taskdate);
            var taskspantag = document.createElement("span");
            taskspantagname = "span-" + taskname + "-" + taskdate;
            taskspantag.id = taskspantagname;


            taskspantag.innerHTML += "<br>" + taskname;

            console.log(taskspantag);
            document.getElementById(taskdate).appendChild(taskspantag);
        }
    }
}


