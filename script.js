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
}

let currLightingColor = lightingColors[0];
let lightingColorIterator = 0;
let lightingColorChangeRate = lightingColorIterator + 1 < lightingColors.length 
    ? lightingColorTriggers[lightingColorIterator + 1] - lightingColorTriggers[lightingColorIterator]
    : scrollSteps - lightingColorTriggers[lightingColorIterator];

let lightingColorDiff = lightingColors[lightingColorIterator].map((num, index) => num - currLightingColor[index]);

const sun = document.getElementById("sun");

const windowFrame = document.getElementById("window-frame");

document.addEventListener("wheel", () => {
    if (scrollOnCooldown) {
        return;
    }

    if (lightingColorTriggers.includes(scrollStepCtr)) {
        currLightingColor = lightingColors[lightingColorIterator];

        if (lightingColorIterator + 1 < lightingColors.length) {
            lightingColorChangeRate = lightingColorTriggers[lightingColorIterator + 1] - lightingColorTriggers[lightingColorIterator];
            lightingColorIterator++; 
        }
        else {
            lightingColorChangeRate = scrollSteps - lightingColorTriggers[lightingColorIterator];
            lightingColorIterator = 0;
        }

        lightingColorDiff = lightingColors[lightingColorIterator].map((num, index) => num - currLightingColor[index]);
    }

    const lightingColorDelta = lightingColorDiff.map((num) => num / lightingColorChangeRate);
    currLightingColor = currLightingColor.map((num, index) => num + lightingColorDelta[index]);

    const newLightingColor = `rgb(
        ${Math.round(currLightingColor[0])},
        ${Math.round(currLightingColor[1])},
        ${Math.round(currLightingColor[2])}
    )`;

    lighting.style.backgroundColor = newLightingColor;
    windowFrame.style.backgroundColor = newLightingColor;


    sun.style.top = 50 * Math.sin(2 * Math.PI * ((scrollStepCtr + 75) / 100)) + 50 + "%";
    sun.style.opacity = 0.04 * Math.pow(scrollStepCtr - 50, 2) + "%";
    sun.style.left = scrollStepCtr <= 50 ? (scrollStepCtr + 50) * 0.75 + "%" : (scrollStepCtr - 50) * 0.75 + "%";


    if (scrollStepCtr < scrollSteps - 1) {
        scrollStepCtr++;
    }
    else {
        scrollStepCtr = 0;
    }

    scrollOnCooldown = true;
    setTimeout(() => {
        scrollOnCooldown = false;
    }, 50);
});