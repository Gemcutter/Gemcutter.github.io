$(document).ready(function(){
    $("#burger").click(function(){
        toggleMenu()
    });
    $("#cast").click(function(){
        alert(cast());
    });
    x = document.cookie;
    x = x.split(";")
    cookies = {};
    for (let i in x) {
        tmp = x[i].split("=");
        cookies[tmp[0]] = tmp[1]
    }
    setTimeout(function() {
        if (cookies["menuOpen"]=="true") {
            menuOpen = true
            document.getElementById("sidebar").style.left = "0"
        }
        else {
            menuOpen = false;
        }
        setTimeout(function() {
            document.getElementById("sidebar").style.transition = "0.5s"
        },25)
    },20)
    
});

let menuOpen;
function toggleMenu() {
    if (menuOpen) {
        menuOpen = false;
        document.cookie = "menuOpen=false";
        document.getElementById("sidebar").style.left = "-12rem"
    }
    else {
        menuOpen = true;
        document.cookie = "menuOpen=true";
        document.getElementById("sidebar").style.left = "0"
    }
}
function cast() {
    lines = document.getElementById("code").value.split(";\n")
    variables = {};
    let output = "";
    for (let i in lines) {
        if (lines[i].search("\n")!=-1) {
            output = "Missing ; on line "+(parseInt(i)+1);
            break;
        }
        let line = lines[i].split(" ")
        if (line[0]=="input") {
            variables[line[1]] = prompt("value of "+line[1])
        }
    }
    return output;
}

applicationTypes = {}
lumenosityFunction = [
    0.000039,
    0.000064,
    0.000120,
    0.000217,
    0.000396,
    0.000640,
    0.001210,
    0.002180,
    0.004000,
    0.007300,
    0.011600,
    0.016840,
    0.023000,
    0.029800,
    0.038000,
    0.048000,
    0.060000,
    0.073900,
    0.090980,
    0.112600,
    0.139020,
    0.169300,
    0.208020,
    0.258600,
    0.323000,
    0.407300,
    0.503000,
    0.608200,
    0.710000,
    0.793200,
    0.862000,
    0.914850,
    0.954000,
    0.980300,
    0.994950,
    1.000000,
    0.995000,
    0.978600,
    0.952000,
    0.915400,
    0.870000,
    0.816300,
    0.757000,
    0.694900,
    0.631000,
    0.566800,
    0.503000,
    0.441200,
    0.381000,
    0.321000,
    0.265000,
    0.217000,
    0.175000,
    0.138200,
    0.107000,
    0.081600,
    0.061000,
    0.044580,
    0.032000,
    0.023200,
    0.017000,
    0.011920,
    0.008210,
    0.005723,
    0.004102,
    0.002929,
    0.002091,
    0.001484,
    0.001047,
    0.000740,
    0.000520,
    0.000361,
    0.000249,
    0.000172,
    0.000120,
    0.000085,
    0.000060,
    0.000042,
    0.000030,
    0.000021,
    0.000015
]

class energyApplicationType {
    constructor(setEnergy,applicationLocation,setDuration,energyType) {
        // Is the energy input set i.e. provided upfront, or drawn out over time.
        this.setEnergy = setEnergy;
        // Is the duration set or can it end early.
        this.setDuration = setDuration;
        this.applicationLocation = applicationLocation;
        if (energyType=="Light") {
            this.colourFixed = false;
        }
    }
    setColourFixed() {
        this.colourFixed = true;
    }
}
// Pros of upfront energy input:
// Will not suck you dry (danger)
// Pros of drawn out energy input:
// More likely to have a consistent result,
// Won't have an outburst of power if disrupted early.


applicationTypes["Balthander's Light Standard"] = new energyApplicationType(true,"Point",false,"Light")
let c = 299792458;

let colourMap = {
    "Tri-Spike White":[
        {
            "min":100,
            "max":1000,
            "value":0
        },
        {
            "min":625,
            "max":635,
            "value":1/10
        },
        {
            "min":525,
            "max":535,
            "value":2/10
        },
        {
            "min":465,
            "max":475,
            "value":1/30
        }
    ],
    "White":[
        {
            "min":100,
            "max":1000,
            "value":0
        },
        {
            "min":380,
            "max":780,
            "value":0.012345
        }
    ],
    "555":[
        {
            "min":100,
            "max":1000,
            "value":0
        },
        {
            "min":555,
            "max":555,
            "value":1
        }
    ]
}


class light {
    constructor() {
        //Defaults
        this.energyApplicationType = applicationTypes["Balthander's Light Standard"];
        this.energyInput = 0;
        this.duration = 0;
        this.colour = "White";
        this.brightness = 0;
        this.calculatedColourNm = 0;
        this.watts = 0;
    }
    setWatts() {
        this.watts = this.energyInput/this.duration
        return this.watts
    }
    getSpecralFlux(wavelength,colour = colourMap[this.colour]) {
        let val;
        for (let j in colour) {
            if (colour[j].min<=wavelength&&colour[j].max>=wavelength) {
                val = colour[j].value;
            }
        }
        return (this.watts*val)/wavelength
    }
    getLuminosity(wavelength) {
        let key = (wavelength-380)/5;
        if (key>=0&&key<81) {
            return lumenosityFunction[key];
        }
        else {
            return 0;
        }
    }
    calculateLumenousFlux() {
        let maxEfficiency = 683.002;
        let sum = 0;
        for (let i=100;i<=1000;i+=5) {
            let Φe = this.getSpecralFlux(i);
            let y = this.getLuminosity(i);
            sum += i*Φe*y;
        }
        return maxEfficiency*sum*this.watts;
    }
    recursiveRedShift(colour,tooMuchEnergy,recursions = 0) {
        let maxEfficiency = 683.002;
        let sum = 0;
        for (let i=100;i<=1000;i+=5) {
            let Φe = this.getSpecralFlux(i,colour);
            let y = this.getLuminosity(i);
            sum += i*Φe*y;
        }
        let lumenosity = maxEfficiency*sum*this.watts;
        if (tooMuchEnergy&&lumenosity<this.brightness) {
            return colour, math.pow(1.025,recursions);
        }
        else if (!tooMuchEnergy&&lumenosity>this.brightness) {
            return colour, math.pow(1.025,recursions);
        }
        recursions++;
        for (let i in colour) {
            if (colour[i].value != 0) {
                let tally1 = 0;
                for (j=colour[i].min;j<colour[i].max;j++) {
                    if (j%5==0) {
                        tally1++;
                    }
                }
                colour[i].min *= 1.025;
                colour[i].max *= 1.025;
                let tally2 = 0;
                for (j=colour[i].min;j<colour[i].max;j++) {
                    if (j%5==0) {
                        tally2++;
                    }
                }
                colour[i].value = colour[i].value*tally1/tally2
            }
        }
        return recursiveRedShift(colour,tooMuchEnergy,recursions)
    }
    recursiveBlueShift(colour,tooMuchEnergy,recursions = 0) {
        let maxEfficiency = 683.002;
        let sum = 0;
        for (let i=100;i<=1000;i+=5) {
            let Φe = this.getSpecralFlux(i,colour);
            let y = this.getLuminosity(i);
            sum += i*Φe*y;
        }
        let lumenosity = maxEfficiency*sum*this.watts;
        if (tooMuchEnergy&&lumenosity<this.brightness) {
            return colour, math.pow(1.025,0-recursions);
        }
        else if (!tooMuchEnergy&&lumenosity>this.brightness) {
            return colour, math.pow(1.025,0-recursions);
        }
        recursions++;
        for (let i in colour) {
            if (colour[i].value != 0) {
                let tally1 = 0;
                for (j=colour[i].min;j<colour[i].max;j++) {
                    if (j%5==0) {
                        tally1++;
                    }
                }
                colour[i].min /= 1.025;
                colour[i].max /= 1.025;
                let tally2 = 0;
                for (j=colour[i].min;j<colour[i].max;j++) {
                    if (j%5==0) {
                        tally2++;
                    }
                }
                colour[i].value = colour[i].value*tally1/tally2
            }
        }
        return recursiveBlueShift(colour,tooMuchEnergy,recursions)
    }
    calculateColorShift() {
        let calculatedLumens = this.calculateLumenousFlux()
        if (this.brightness>this.watts*683.002) {
            if (this.energyApplicationType.setDuration == false) {
                this.watts = this.brightness/683.002;
                this.duration = this.energyInput/this.watts;
            }
            return "The light emitted is all 555nm (yellow-green) and only lasts " + this.duration + "s";
        }
        if (this.brightness>0) {
            let diff = calculatedLumens-this.brightness;
            if (diff>0) {
                return "Emits purpler light than expected.";
            }
            else if (diff<0) {
                return "Emits greener light than expected.";
    
            }
            else {
                return "Emits light as expected.";
    
            }
        }
        else {
            let diff = calculatedLumens+this.brightness;
            if (diff>0) {
                return "Absorbs purpler light than expected, leaving it looking greener.";
            }
            else if (diff<0) {
                return "Absorbs greener light than expected, leaving it looking purpler.";
    
            }
            else {
                return "Absorbs light as expected.";
    
            }
        }
        
    }
    runCalculations() {
        this.setWatts()
        if (this.energyApplicationType.colourFixed==true) {
            this.brightness = this.calculateLumenousFlux();
        }
        else {
            if (this.brightness==0) {
                return "Emits/Absorbs UV and/or Infrared Light.";
            }
            else {
                return this.calculateColorShift()
            }
        }
    }
}

