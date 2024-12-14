const lighting = document.getElementById("lighting");
const lightingColors = [
    [173, 216, 230],
    [255, 165, 0],
    [0, 0, 0],
    [255, 165, 0]
];
let prevLightingColor = 0;
let nextLightingColor = 1;
let lightingOnCooldown = false;

const scrollSteps = 10;
let scrollStepCtr = 1;

document.addEventListener("wheel", () => {
    if (lightingOnCooldown) {
        return;
    }

    const color = getComputedStyle(lighting).backgroundColor;
    const rgb = color.match(/\d+/g).map((item) => parseInt(item, 10));

    scrollStepCtr++;
    if (scrollStepCtr >= scrollSteps) {
        prevLightingColor = prevLightingColor >= lightingColors.length - 1 ? 0 : prevLightingColor + 1;
        nextLightingColor = nextLightingColor >= lightingColors.length - 1 ? 0 : nextLightingColor + 1;

        scrollStepCtr = 1;
    }

    const change = lightingColors[nextLightingColor].map((num, index) => num - lightingColors[prevLightingColor][index]);
    const delta = change.map((num) => Math.floor(num / scrollSteps));

    const newColor = `rgb(${rgb[0] + delta[0]},${rgb[1] + delta[1]},${rgb[2] + delta[2]})`;
    lighting.style.backgroundColor = newColor;

    lightingOnCooldown = true;
    setTimeout(() => {
        lightingOnCooldown = false;
    }, 100);
})