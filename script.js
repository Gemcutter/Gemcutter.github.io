myData = null;

$(document).ready(function(){
    myData = minerals;
    $("#idTab").click(function(){
        document.getElementById("mineralIdentifier").style.display = 'grid';
        document.getElementById('idTab').style.backgroundColor = "#CABEBC";
        document.getElementById("rockIdentifier").style.display = 'none';
        document.getElementById("home").style.display = 'none';
        document.getElementById('homeTab').style.backgroundColor = "#ECDEDC";
        document.getElementById('rockIdTab').style.backgroundColor = "#ECDEDC";
    });
    $("#rockIdTab").click(function(){
        document.getElementById("rockIdentifier").style.display = 'grid';
        document.getElementById('rockIdTab').style.backgroundColor = "#CABEBC";
        document.getElementById("mineralIdentifier").style.display = 'none';
        document.getElementById("home").style.display = 'none';
        document.getElementById('idTab').style.backgroundColor = "#ECDEDC";
        document.getElementById('homeTab').style.backgroundColor = "#ECDEDC";
    });
    $("#homeTab").click(function(){
        document.getElementById("home").style.display = 'grid';
        document.getElementById('homeTab').style.backgroundColor = "#CABEBC";
        document.getElementById("mineralIdentifier").style.display = 'none';
        document.getElementById("rockIdentifier").style.display = 'none';
        document.getElementById('idTab').style.backgroundColor = "#ECDEDC";
        document.getElementById('rockIdTab').style.backgroundColor = "#ECDEDC";
    });
    $("#add").click(function(){
        mineralName = document.getElementById("name").value
        minHardness = document.getElementById("minHard").value
        maxHardness = document.getElementById("maxHard").value
        minSG = document.getElementById("minSG").value
        maxSG = document.getElementById("maxSG").value
        streak = document.getElementById("streak").value
        lustre = document.getElementById("lustre").value
        colour = document.getElementById("colour").value
        notes = document.getElementById("notes").value
        myMineral = new mineral(mineralName, minHardness, maxHardness, minSG, maxSG, streak, lustre, colour, notes)
        password = document.getElementById("password").value
        socket.emit("addMineral", myMineral, password);

        
        document.getElementById("name").value = '';
        document.getElementById("minHard").value = '';
        document.getElementById("maxHard").value = '';
        document.getElementById("minSG").value = '';
        document.getElementById("maxSG").value = '';
        document.getElementById("streak").value = '';
        document.getElementById("lustre").value = '';
        document.getElementById("colour").value = '';
        document.getElementById("notes").value = '';
    });
    $("#search").click(function(){
        search();
    });
});

class mineral {
    constructor(name, minHardness, maxHardness, minSg, maxSg, streak, lustre, colour, notes) {
        this.name = name
        this.hardness = {
            'min':minHardness,
            'max':maxHardness
        }
        this.sg = {
            'min':minSg,
            'max':maxSg
        }
        this.streak = streak
        this.lustre = lustre
        this.colour = colour
        this.notes = notes
    }
}


function search() {
    hardness = document.getElementById("searchhardness").value;
    sg = document.getElementById("searchsg").value;
    streak = document.getElementById("searchstreak").value;
    lustre = document.getElementById("searchlustre").value;
    colour = document.getElementById("searchcolour").value;
    possibleMinerals = [];
    options = {}
    if (hardness == "") {
        options["hardness"]=[];
    }
    if (sg == "") {
        options["sg"]=[];
    }
    if (streak == "") {
        options["streak"]=[];
    }
    if (lustre == "") {
        options["lustre"]=[];
    }
    if (colour == "") {
        options["colour"]=[];
    }
    for (let i in myData) {
        if (hardness!="") {
            if (myData[i].hardness.min>hardness||myData[i].hardness.max<hardness) {
                continue
            }
        }
        if (sg!="") {
            if (myData[i].sg.min>sg||myData[i].sg.max<sg) {
                continue
            }
        }
        if (streak!="") {
            if (myData[i].streak!=streak) {
                continue
            }
        }
        if (lustre!="") {
            inArray = false;
            for (let j in myData[i].lustre) {
                if (myData[i].lustre[j]==lustre) {
                    inArray = true;
                }
            }
            if (!inArray) {
                continue;
            }
        }
        if (colour!="") {
            inArray = false;
            for (let j in myData[i].colour) {
                if (myData[i].colour[j]==colour) {
                    inArray = true;
                }
            }
            if (!inArray) {
                continue;
            }
        }
        for (let k in options) {
            if (k == "hardness"||k == "sg") {
                exists = false
                for (let j in options[k]) {
                    if (options[k][j].min==myData[i][k].min&&options[k][j].max==myData[i][k].max) {                        
                        exists = true;
                    }
                }
                if (!exists) {
                    options[k].push(myData[i][k])
                }
            }
            else {
                if (typeof myData[i][k]=="string") {
                    exists = false;
                    for (let j in options[k]) {
                        if (options[k][j]==myData[i][k]) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        options[k].push(myData[i][k])
                    }
                }
                else {
                    for (let l in myData[i][k]) {
                        exists = false;
                        for (let j in options[k]) {
                            if (options[k][j]==myData[i][k][l]) {
                                exists = true;
                            }
                        }
                        if (!exists) {
                            options[k].push(myData[i][k][l])
                        }
                    }
                }
            }
        }
        possibleMinerals.push(i)
    }
    if (possibleMinerals.length>1) {
        document.getElementById("output").innerHTML = "There are "+possibleMinerals.length+" possible matches in our dataset.<br>"
    }
    else if (possibleMinerals.length==1) {
        document.getElementById("output").innerHTML = "We believe your mineral may be"
    }
    else {
        document.getElementById("output").innerHTML = "Sorry, we found no matches in our dataset"
    }
    if (possibleMinerals.length<=5) {
        txt = "";
        for (let i in possibleMinerals) {
            txt += possibleMinerals[i]
            if (i<possibleMinerals.length-1) {
                txt +=", "
            }
        }
        document.getElementById("output").innerHTML += " "+txt
    }
    if (possibleMinerals.length>1) {
        option = "your inputs differently";
        len = 0;
        for (let i in options) {
            if (options[i].length>len) {
                option = i;
                len = options[i].length;
            }
        }
        document.getElementById("output").innerHTML += "<br> We recommend filling in "+option+" to narrow down the results fastest."
    
    }
    else if (possibleMinerals.length==1) {
        document.getElementById("output").innerHTML += "<br><br> Some information on "+possibleMinerals[0]+":";
        document.getElementById("output").innerHTML += "<br>"+myData[possibleMinerals[0]].notes
    }
    if (possibleMinerals.length==3) {
        document.getElementById("output").innerHTML += "<br><br> Some information on the minerals:";
        document.getElementById("output").innerHTML += "<table><tr><td>"+possibleMinerals[0]+"</td><td>"+myData[possibleMinerals[0]].notes+"</td></tr><tr><td>"+possibleMinerals[1]+"</td><td>"+myData[possibleMinerals[1]].notes+"</td></tr><tr><td>"+possibleMinerals[2]+"</td><td>"+myData[possibleMinerals[2]].notes+"</td></tr></table>";
    
    }
    else if (possibleMinerals.length==2) {
        document.getElementById("output").innerHTML += "<br><br> Some information on the minerals:";
        document.getElementById("output").innerHTML += "<table><tr><td>"+possibleMinerals[0]+"</td><td>"+myData[possibleMinerals[0]].notes+"</td></tr><tr><td>"+possibleMinerals[1]+"</td><td>"+myData[possibleMinerals[1]].notes+"</td></tr></table>";
    
    }
}
