current = new Date();
var curmonth = current.getMonth();
var curYear = current.getFullYear();
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
    }

}

function addtasks() {
    if (document.getElementById("taskname").value != "") {
        var name = document.getElementById("taskname").value;
        console.log(name);

        date = document.getElementById("date").value;
        console.log(date);

        time = document.getElementById("time").value;
        console.log(time);

        //taskinfo = document.createTextNode(name + " - "+ date + " - " + time);
        var taskinfo = name + "-" + date;
        var labelinfo = "label" + "-" + name + "-" + date;

        task = document.createElement("input");
        task.type = "checkbox";
        task.name = "task"
        var label = document.createElement("label");
        label.setAttribute("id", labelinfo);
        label.htmlFor = taskinfo;
        label.appendChild(document.createTextNode(taskinfo));

        var br = document.createElement("br");



        //task.appendChild(taskinfo);

        list.appendChild(label);
        list.appendChild(task);
        //document.getElementById("list").appendChild(task);
        list.appendChild(br);




        if (document.getElementById(date)) {
            var taskspantag = document.createElement("span");
            taskspantagname = "span-"+ name + "-" + date;
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
            var test = "label-"+checkbox.id;
            console.log(test);
            document.getElementById(test).remove();
            checkboxtospan = checkbox.id.replace("label", "");
            checkboxtospan = "span-"+ checkboxtospan;
            console.log(checkboxtospan);
            document.getElementById(checkboxtospan).remove();
            checkbox.remove();  

        
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
}


