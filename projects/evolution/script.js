
var storedCreatures = [];
var storedFood = [];
var storedData = {"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[]};
var selected = null;
var logs=0;

class creature {
    constructor() {
        this.xPos = Math.floor(Math.random()*500);
        this.yPos = Math.floor(Math.random()*500);
        this.maxSpeed = Math.random();
        this.maxRotation = Math.random()/10;
        this.colour = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+1+")";
        this.brain = null;//implement neural network here
        this.size = Math.random()/5+0.90;
        this.range = Math.random()*30;
        this.variation = Math.random()/10;
        this.replicationEnergy = Math.random()*500+300;
        this.energy = this.replicationEnergy;
        this.facing = Math.random()*2*Math.PI;
        this.currentSpeed = this.maxSpeed;
        this.species = storedCreatures.length;
    }
    static makeNewCreature(parent) {
        var myNewCreature = new creature;
        if (parent!=null) {
            myNewCreature.xPos = parent.xPos;
            myNewCreature.yPos = parent.yPos;
            myNewCreature.variation = parent.variation*((1-(parent.variation/2))+Math.random()*parent.variation);
            myNewCreature.maxSpeed = parent.maxSpeed*((1-(myNewCreature.variation/2))+Math.random()*myNewCreature.variation);
            myNewCreature.maxRotation = parent.maxRotation*((1-(myNewCreature.variation/2))+Math.random()*myNewCreature.variation);
            myNewCreature.colour = parent.colour;
            myNewCreature.brain = parent.brain //make the brain slightly different;
            myNewCreature.replicationEnergy = parent.replicationEnergy*((1-(myNewCreature.variation/2))+Math.random()*myNewCreature.variation);
            myNewCreature.energy = myNewCreature.replicationEnergy;
            myNewCreature.size = parent.size*((1-(myNewCreature.variation/2))+Math.random()*myNewCreature.variation);
            myNewCreature.range = parent.range*((1-(myNewCreature.variation/2))+Math.random()*myNewCreature.variation);
            myNewCreature.species = parent.species;
            myNewCreature.currentSpeed = myNewCreature.maxSpeed;
        }
        storedCreatures.push(myNewCreature)
        return myNewCreature;
    }
    static kill(creature, arrayLocation) {
        food.makeFood(creature);
        storedCreatures.splice(arrayLocation,1);
    }
    static logData(isNewSpecies) {
        selected = document.getElementById('select').value;
        var output = document.getElementById('output');
        if (isNewSpecies&&storedData[selected]!=null) {
            output.innerHTML="<tr><th>Colour</th><th>Average Speed</th><th>Average Maximum Rotation</th><th>Average Replication Energy</th><th>Average Size</th><th>Average Range</th><th>Count</th></tr>";
            for (var i=0;i<storedData[selected].length;i++) {
                var row = output.insertRow();
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);
                var cell6 = row.insertCell(6);
                cell0.innerHTML = "<div style='background-color:"+storedData[selected][i].colour+";height:20px;width:20px;'></div>";
                cell1.innerHTML = Math.floor(storedData[selected][i].avgMaxSpeed*100)/100;
                cell2.innerHTML = Math.floor(storedData[selected][i].avgMaxRotation*1000)/1000;
                cell3.innerHTML = Math.floor(storedData[selected][i].avgReplicationEnergy*100)/100;
                cell4.innerHTML = Math.floor(storedData[selected][i].avgSize*100)/100;
                cell5.innerHTML = Math.floor(storedData[selected][i].avgRange*100)/100;
                cell6.innerHTML = storedData[selected][i].count;
            }
        }
        else if (storedData[selected]!=null&&storedData[selected].length==logs) {
            var row = output.insertRow();
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            var cell6 = row.insertCell(6);
            cell0.innerHTML = "<div style='background-color:"+storedData[selected][storedData[selected].length-1].colour+";height:20px;width:20px;'></div>";
            cell1.innerHTML = Math.floor(storedData[selected][storedData[selected].length-1].avgMaxSpeed*100)/100;
            cell2.innerHTML = Math.floor(storedData[selected][storedData[selected].length-1].avgMaxRotation*1000)/1000;
            cell3.innerHTML = Math.floor(storedData[selected][storedData[selected].length-1].avgReplicationEnergy*100)/100;
            cell4.innerHTML = Math.floor(storedData[selected][storedData[selected].length-1].avgSize*100)/100;
            cell5.innerHTML = Math.floor(storedData[selected][storedData[selected].length-1].avgRange*100)/100;
            cell6.innerHTML = storedData[selected][storedData[selected].length-1].count;
        }
    }
    static storeData() {
        logs++;
        var existingSpecies = {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]};
        for (var i=0;i<storedCreatures.length;i++) {
            existingSpecies[storedCreatures[i].species].push(storedCreatures[i]);
        }
        for (var i=0;i<10;i++) {
            if(existingSpecies[i].length>0) {
                var speciesData = {"colour":0,"avgMaxSpeed":0,"avgMaxRotation":0,"avgReplicationEnergy":0,"avgSize":0,"avgRange":0,"count":0};
                speciesData.colour=existingSpecies[i][0].colour;
                speciesData.count=existingSpecies[i].length;
                for (var j=0;j<existingSpecies[i].length;j++) {
                    speciesData.avgMaxSpeed+=existingSpecies[i][j].maxSpeed;
                    speciesData.avgMaxRotation+=existingSpecies[i][j].maxRotation;
                    speciesData.avgReplicationEnergy+=existingSpecies[i][j].replicationEnergy;
                    speciesData.avgSize+=existingSpecies[i][j].size;
                    speciesData.avgRange+=existingSpecies[i][j].range;
                }
                speciesData.avgMaxSpeed/=existingSpecies[i].length;
                speciesData.avgMaxRotation/=existingSpecies[i].length;
                speciesData.avgReplicationEnergy/=existingSpecies[i].length;
                speciesData.avgSize/=existingSpecies[i].length;
                speciesData.avgRange/=existingSpecies[i].length;
                storedData[i].push(speciesData);
            }
        }
    }
}

class food {
    constructor() {
        this.xPos = Math.floor(Math.random()*500);
        this.yPos = Math.floor(Math.random()*500);
        this.colour = "#f573cd"
        this.type = "natural"
        this.age = 0;
        this.energyValue = 500;
    }
    static makeFood(creature) {
        var myNewFood = new food;
        if (creature!=null) {
            myNewFood.xPos = creature.xPos;
            myNewFood.yPos = creature.yPos;
            myNewFood.colour = creature.colour;
            myNewFood.type = "corpse";
            myNewFood.energyValue = creature.replicationEnergy;
        }
        storedFood.push(myNewFood);
    }
}
class world {
    static drawWorld() {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0,0,500,500);
        for (var i=0;i<storedCreatures.length;i++) {
            ctx.fillStyle = storedCreatures[i].colour;
            ctx.beginPath()
            ctx.rect(storedCreatures[i].xPos-2*storedCreatures[i].size,storedCreatures[i].yPos-2*storedCreatures[i].size,5*storedCreatures[i].size,5*storedCreatures[i].size);
            ctx.fill();
            if (storedCreatures[i].species==selected) {
                ctx.beginPath()
                ctx.rect(storedCreatures[i].xPos-4,storedCreatures[i].yPos-4,9,9);
                ctx.stroke();
            }
        }
        for (var i=0;i<storedFood.length;i++) {
            ctx.fillStyle = storedFood[i].colour;
            ctx.beginPath()
            ctx.rect(storedFood[i].xPos-1,storedFood[i].yPos-1,3,3);
            ctx.fill();
        }
    }
    static ageWorld() {
        for (var i=0;i<storedFood.length;i++) {
            storedFood[i].age += 1;
            if (storedFood[i].age>1000&&storedFood[i].type=="corpse") {
                storedFood.splice(i,1)
            }
            else if (storedFood[i].age>5000&&storedFood[i].type=="natural") {
                storedFood.splice(i,1)
            }
        }
        for (var i=0;i<storedCreatures.length;i++) {
            storedCreatures[i].energy = storedCreatures[i].energy-(Math.pow(storedCreatures[i].currentSpeed,1.3)*Math.pow(storedCreatures[i].size,2.3));
            if (storedCreatures[i].energy<0) {
                creature.kill(storedCreatures[i],i)
            }
            else if (storedCreatures[i].energy>storedCreatures[i].replicationEnergy*2) {
                creature.makeNewCreature(storedCreatures[i])
                storedCreatures[i].energy-=storedCreatures[i].replicationEnergy;
            }
        } 
    }
    static moveWorld() {
        for (var i=0;i<storedCreatures.length;i++) {
            if(storedCreatures[i].facing<0) {
                storedCreatures[i].facing+=Math.PI*2;
            }
            else if(storedCreatures[i].facing>Math.PI*2) {
                storedCreatures[i].facing-=Math.PI*2;
            }
            var foodStats = {"distances":[],"directions":[]};
            var closest = {"distance":storedCreatures[i].range+1,"direction":0,"index":-1};
            for (var j=0;j<storedFood.length;j++) {
                if (storedFood[j].xPos<storedCreatures[i].xPos+3&&storedFood[j].xPos>storedCreatures[i].xPos-3&&storedFood[j].yPos<storedCreatures[i].yPos+3&&storedFood[j].yPos>storedCreatures[i].yPos-3&&storedFood[j].colour!=storedCreatures[i].colour) {
                    storedCreatures[i].energy+=storedFood[j].energyValue;
                    storedFood.splice(j,1);
                }
                else if (storedFood[j].xPos<storedCreatures[i].xPos+storedCreatures[i].range&&storedFood[j].xPos>storedCreatures[i].xPos-storedCreatures[i].range&&storedFood[j].yPos<storedCreatures[i].yPos+storedCreatures[i].range&&storedFood[j].yPos>storedCreatures[i].yPos-storedCreatures[i].range&&storedFood[j].colour!=storedCreatures[i].colour) {
                    foodStats.distances.push(mathFunctions.getDist(storedFood[j].xPos,storedFood[j].yPos,storedCreatures[i].xPos,storedCreatures[i].yPos));
                    foodStats.directions.push(mathFunctions.getDir(storedFood[j].xPos,storedFood[j].yPos,storedCreatures[i].xPos,storedCreatures[i].yPos));
                }
            }
            for (var j=0;j<storedCreatures.length;j++) {
                if (storedCreatures[j].xPos<storedCreatures[i].xPos+3&&storedCreatures[j].xPos>storedCreatures[i].xPos-3&&storedCreatures[j].yPos<storedCreatures[i].yPos+3&&storedCreatures[j].yPos>storedCreatures[i].yPos-3&&storedCreatures[j].size+storedCreatures[j].size/5<storedCreatures[i].size&&storedCreatures[j].colour!=storedCreatures[i].colour) {
                    storedCreatures[i].energy+=storedCreatures[j].energy;
                    storedCreatures.splice(j,1);
                }
            }
            for (j in foodStats.distances) {
                if (foodStats.distances[j]>storedCreatures[i].range) {
                    foodStats.distances.splice(j,1);
                    foodStats.directions.splice(j,1);
                }
            }
            for (j in foodStats.distances) {
                if (foodStats.distances[j]<closest.distance){
                    closest.distance=foodStats.distances[j];
                    closest.index = j;
                    if(foodStats.directions[j]<0) {
                        foodStats.directions[j]+=Math.PI*2;
                    }
                    else if(foodStats.directions[j]>Math.PI*2) {
                        foodStats.directions[j]-=Math.PI*2;
                    }
                    closest.direction=foodStats.directions[j];
                }
            }
            if (closest.index>-1) {
                var rightDist = closest.direction-storedCreatures[i].facing;
                var leftDist = storedCreatures[i].facing-closest.direction;

                if (rightDist>Math.PI) {
                    leftDist = 2*Math.PI-rightDist;
                }
                else {
                    rightDist = 2*Math.PI-leftDist;
                }

                if (leftDist<rightDist&&leftDist>storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3)) {
                    storedCreatures[i].facing -= Math.abs(storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3));
                }
                else if (leftDist>rightDist&&rightDist>storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3)) {
                    storedCreatures[i].facing += Math.abs(storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3));
                }
                else if (rightDist<storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3)) {
                    storedCreatures[i].facing = closest.direction;
                }
                else if (leftDist<storedCreatures[i].maxRotation/(storedCreatures[i].currentSpeed/3)) {
                    storedCreatures[i].facing = closest.direction;
                }
            }
            else {
                storedCreatures[i].facing+=(Math.random()*storedCreatures[i].maxRotation)-(storedCreatures[i].maxRotation/2);
            }

            storedCreatures[i].xPos -= storedCreatures[i].currentSpeed*Math.cos(storedCreatures[i].facing)
            storedCreatures[i].yPos -= storedCreatures[i].currentSpeed*Math.sin(storedCreatures[i].facing)

            if(storedCreatures[i].xPos<0) {
                storedCreatures[i].xPos+=500;
            }
            else if(storedCreatures[i].xPos>500) {
                storedCreatures[i].xPos-=500;
            }
            else if(storedCreatures[i].yPos<0) {
                storedCreatures[i].yPos+=500;
            }
            else if(storedCreatures[i].yPos>500) {
                storedCreatures[i].yPos-=500;
            }
        }
    }
}

class mathFunctions {
    static getDist(x1,y1,x2,y2) {
        var xDist = x2-x1;
        var yDist = y2-y1;
        var totalDist = Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
        return totalDist;
    }
    static getDir(x1,y1,x2,y2) {
        var xDist = x2-x1;
        var yDist = y2-y1;
        if(xDist<0&&yDist<0||xDist<0&&yDist>0) {
            return Math.atan(yDist/xDist)+Math.PI;
        }
        if(xDist>0&&yDist<0||xDist>0&&yDist>0) {
            return Math.atan(yDist/xDist);
        }
    }
}


var counter=0
var mainInterval = null;
var drawInterval = null;
function main() {
    mainInterval = setInterval(function() {
        startTime = new Date();
        world.ageWorld()
        world.moveWorld()
        if(counter%100==0) {
            food.makeFood()
            document.getElementById("population").innerHTML = storedCreatures.length;
        }
        if(counter%1000==0) {
            creature.storeData()
            creature.logData();
        }
        counter++
        endTime = new Date();
        console.log("mainInterval: "+(endTime-startTime)+"ms")
    },10)
    
    drawInterval = setInterval(function() {
        startTime = new Date();
        world.drawWorld()
        endTime = new Date();
        console.log("drawInterval: "+(endTime-startTime)+"ms")
    }, 20)
    
}
function run() {
    startTime = new Date();
    clearInterval(mainInterval);
    clearInterval(drawInterval);
    counter=0;
    logs = 0;
    storedCreatures = [];
    storedFood = [];
    storedData = {"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[]};
    creature.logData(true);
    for (var i=0;i<10;i++) {
        creature.makeNewCreature();
    }
    for (var i=0;i<100;i++) {
        food.makeFood()
    }
    main()
    endTime = new Date();
    console.log("run: "+(endTime-startTime)+"ms")
}
var pauseState = "play";
function pausePlay() {
    if (pauseState=='play') {
        pauseState = "pause";
        clearInterval(mainInterval);
        clearInterval(drawInterval);
    }
    else {
        pauseState = "play";
        main();
    }
}