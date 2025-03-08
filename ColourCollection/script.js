let colour = "#000000";
$(document).ready(function(){
    document.addEventListener("input", (e) => {
        let newColour = document.getElementById('input').value;
        if (newColour!=colour) {
            colour = newColour
            document.getElementById("bg").style.backgroundColor = newColour;

            let rgb = hexToRgb(newColour)
            let hsl = rgbToHsl(rgb[0],rgb[1],rgb[2])
            let text = document.getElementsByClassName('text')
            document.getElementById("output").value = newColour
            if (hsl[2]>0.5) {
                text.item(0).style.color = "#101010"
                text.item(1).style.color = "#101010"
            }
            else {
                text.item(0).style.color = "#f0f0f0"
                text.item(1).style.color = "#f0f0f0"
            }
        }
      });
});

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h, s, l ];
  }
  function hexToRgb(hex) {
    let map = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15}
    r=map[hex[1]]*16+map[hex[2]];
    g=map[hex[3]]*16+map[hex[4]];
    b=map[hex[5]]*16+map[hex[6]];
    return [r, g, b]
  }