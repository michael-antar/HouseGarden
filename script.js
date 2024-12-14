const scrollSteps = 100;
let scrollStepCtr = 0;
let scrollOnCooldown = false;

const lighting = document.getElementById("lighting");
const lightingColors = [
    [173, 216, 230],
    [173, 216, 230],
    [173, 216, 230],
    [255, 165, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [255, 165, 0],
    [173, 216, 230],
    [173, 216, 230]
];
const lightingColorTriggers = [];
for (let i = 0; i < scrollSteps; i += scrollSteps / lightingColors.length) {
    lightingColorTriggers.push(Math.round(i));
    // console.log(Math.round(i));
}
console.log(lightingColorTriggers)
let lightingColorIterator = 0;
let lightingColorChangeRate;
let currLightingColor = lightingColors[0];

let lightingColorDiff = lightingColors[lightingColorIterator].map((num, index) => num - currLightingColor[index]);

const sun = document.getElementById("sun");
const sunPositions = [0, 100];
let sunPositionIterator = 0;
let currSunPosition = 0;




const sunOpacities = [0, 100]

const windowFrame = document.getElementById("window-frame");

document.addEventListener("wheel", () => {
    if (scrollOnCooldown) {
        return;
    }

    if (lightingColorTriggers.includes(scrollStepCtr)) {
        console.log(scrollStepCtr)
        currLightingColor = lightingColors[lightingColorIterator];

        lightingColorChangeRate = lightingColorIterator + 1 < lightingColors.length 
            ? lightingColorTriggers[lightingColorIterator + 1] - lightingColorTriggers[lightingColorIterator]
            : scrollSteps - lightingColorTriggers[lightingColorIterator];

        lightingColorIterator = lightingColorIterator + 1 < lightingColors.length 
            ? lightingColorIterator + 1 
            : 0;

        lightingColorDiff = lightingColors[lightingColorIterator].map((num, index) => num - currLightingColor[index]);
    }

    const lightingColorDelta = lightingColorDiff.map((num) => num / lightingColorChangeRate);
    currLightingColor = currLightingColor.map((num, index) => num + lightingColorDelta[index]);
    console.log(currLightingColor);

    const newLightingColor = `rgb(
        ${Math.round(currLightingColor[0])},
        ${Math.round(currLightingColor[1])},
        ${Math.round(currLightingColor[2])}
    )`;

    lighting.style.backgroundColor = newLightingColor;
    windowFrame.style.backgroundColor = newLightingColor;


    sun.style.top = 50 * Math.sin(2 * Math.PI * ((scrollStepCtr + 75) / 100)) + 50 + "%";
    sun.style.opacity = 0.04 * Math.pow(scrollStepCtr - 50, 2) + "%";


    if (scrollStepCtr < scrollSteps - 1) {
        scrollStepCtr++;
    }
    else {
        scrollStepCtr = 0;
    }

    scrollOnCooldown = true;
    setTimeout(() => {
        scrollOnCooldown = false;
    }, 100);
});

// const array = 

// var first = 0;
// var last = 100;
// var skip = 100 / 6;
// for( var i = first; i < last; i += skip ){
//  //work with array[i]
//  console.log(Math.round(i));
// }