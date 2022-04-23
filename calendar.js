window.onload = pageLoad;





function pageLoad() {
    loadDate();
    var taskbutton = document.getElementById("button");
    taskbutton.onclick = addtasks;

}

function loadDate() {
    current = new Date();
    curmonth = current.getMonth();
    curYear = current.getFullYear();

    var months = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "Ocotober", "November", "December"]

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

                if (currmonth < 10){
                    var updatemonth = "0" + (currmonth + 1);
                }
                else{
                    var updatemonth = (currmonth + 1);
                }

                idname = curYear + "-" + updatemonth+ "-" + date ;
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

        task = document.createElement("li");
        taskinfo = document.createTextNode(name +" "+ date + " " + time);
        task.appendChild(taskinfo);
        document.getElementById("list").appendChild(task);


        document.getElementById(date).innerHTML += "<br>" + name;
        
       
        
    }
}







