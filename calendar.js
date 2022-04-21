window.onload = pageLoad;





function pageLoad() {
    loadDate();
    
}

function loadDate() {
    current = new Date();
    curmonth = current.getMonth();
    curYear = current.getFullYear();

    var months = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "Ocotober", "November", "December"]

    monthandyear = months[curmonth] +", " + curYear;
  
    document.getElementById("monthyear").innerHTML = monthandyear;
    loadCells(curmonth, curYear);

}

function loadCells(currmonth, curYear){
    daysinmonth = new Date(curYear, currmonth + 1, 0).getDate();
    console.log(daysinmonth);
    firstDay = new Date(curYear, currmonth, 1);
    console.log(firstDay);

  
    

}