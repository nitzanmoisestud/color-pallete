"use strict";
window.addEventListener("load", init);
const boards = document.querySelectorAll(".color-board");
const select = document.querySelector("#harmonies");
const colorInput = document.querySelector("#color-input");

function init() {
  select.addEventListener("change", setHarmony);
  colorInput.addEventListener("input", getMainColor);
  const hexColor = setHex();
  const rgbColor = generateRgb(hexColor);
  const hslColor = generateHsl(rgbColor.r, rgbColor.g, rgbColor.b);
  setDefaultHarmony(select.value, hslColor);
}

function getMainColor(event) {
  const hexColor = setHex(event.target.value);
  const rgbColor = generateRgb(hexColor);
  const hslColor = generateHsl(rgbColor.r, rgbColor.g, rgbColor.b);
  setDefaultHarmony(select.value, hslColor);
}
function setHex() {
  let hexColor = colorInput.value;
  return hexColor;
}

function generateRgb(hexColor) {
  let hex = hexColor;
  let r = hex.substring(1, 3);
  let g = hex.substring(3, 5);
  let b = hex.substring(5, 7);
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  const rgbObj = { r, g, b };
  return rgbObj;
}

function generateHex(rgbObj) {
  let red = rgbObj.r.toString(16);
  let green = rgbObj.g.toString(16);
  let blue = rgbObj.b.toString(16);
  if (red.length === 1) {
    red = "0" + red;
  } else if (green.length === 1) {
    green = "0" + green;
  } else if (blue.length === 1) {
    blue = "0" + blue;
  }
  let hex = "#" + red + green + blue;
  console.log(hex);
  return hex;
}

function generateHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return { h: Math.floor(h), s: Math.floor(s), l: Math.floor(l) };
}
function setHarmony(event) {
  const hexColor = setHex(event.target.value);
  const rgbColor = generateRgb(hexColor);
  const hslColor = generateHsl(rgbColor.r, rgbColor.g, rgbColor.b);
  const chosenHarmony = event.target.value;
  if (chosenHarmony === "Analogous") {
    generateAnalogousColors(hslColor);
  } else if (chosenHarmony === "Monochromatic") {
    generateMonochromaticColors(hslColor);
  } else if (chosenHarmony === "Triad") {
    generateTriadColors(hslColor);
  } else if (chosenHarmony === "Complementary") {
    generateComplementaryColors(hslColor);
  } else if (chosenHarmony === "Compound") {
    generateCompoundColors(hslColor);
  } else if (chosenHarmony === "Shades") {
    generateShadesColors(hslColor);
  }
}
function setDefaultHarmony(defaultHarmony, hslColor) {
  const chosenHarmony = defaultHarmony;
  if (chosenHarmony === "Analogous") {
    generateAnalogousColors(hslColor);
  } else if (chosenHarmony === "Monochromatic") {
    generateMonochromaticColors(hslColor);
  } else if (chosenHarmony === "Triad") {
    generateTriadColors(hslColor);
  } else if (chosenHarmony === "Complementary") {
    generateComplementaryColors(hslColor);
  } else if (chosenHarmony === "Compound") {
    generateCompoundColors(hslColor);
  } else if (chosenHarmony === "Shades") {
    generateShadesColors(hslColor);
  }
}

function hslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
}

function rgbToCss(rgbObj) {
  const cssColor = `rgb(${rgbObj.r},${rgbObj.g}, ${rgbObj.b})`;
  return cssColor;
}

function generateAnalogousColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.h = hsl.h;
    } else if (index === 3) {
      hslObj.h = hsl.h + 5;
    } else if (index === 4) {
      hslObj.h = hsl.h + 10;
    } else if (index === 1) {
      hslObj.h = hsl.h + 15;
    } else if (index === 0) {
      hslObj.h = hsl.h + 20;
    }

    hslObj.s = hsl.s;
    hslObj.l = hsl.l;
    handleDisply(hslObj, index);
  });
}

function generateMonochromaticColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.s = hsl.s;
      hslObj.l = hsl.l;
    } else if (index === 3) {
      hslObj.s = hsl.s + 5;
      hslObj.l = hsl.l;
    } else if (index === 4) {
      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l;
    } else if (index === 1) {
      hslObj.s = hsl.s;
      hslObj.l = hsl.l + 5;
    } else if (index === 0) {
      hslObj.s = hsl.s;
      hslObj.l = hsl.l + 10;
    }
    hslObj.h = hsl.h;

    handleDisply(hslObj, index);
  });
  console.log("in mono", hsl);
}
function generateTriadColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.h = hsl.h;
      hslObj.s = hsl.s;
      hslObj.l = hsl.l;
    } else if (index === 3) {
      let triadValue = hsl.h + 60;
      hslObj.s = hsl.s;
      hslObj.l = hsl.l;
      if (triadValue > 360) {
        hslObj.h = triadValue - 360;
      } else {
        hslObj.h = triadValue;
      }
    } else if (index === 4) {
      let triadValue = hsl.h + 60;
      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l + 10;

      if (triadValue > 360) {
        hslObj.h = triadValue - 360;
      } else {
        hslObj.h = triadValue;
      }
    } else if (index === 1) {
      let triadValue = hsl.h + 120;
      hslObj.s = hsl.s;
      hslObj.l = hsl.l;
      if (triadValue > 360) {
        hslObj.h = triadValue - 360;
      } else {
        hslObj.h = triadValue;
      }
    } else if (index === 0) {
      hslObj.h = hsl.h;

      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l + 10;
    }

    handleDisply(hslObj, index);
  });
  console.log("in triad", hsl);
}
function generateComplementaryColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.h = hsl.h;
    } else if (index === 3) {
      let complementaryValue = hsl.h + 180;
      hslObj.s = hsl.s;
      hslObj.l = hsl.l;
      if (complementaryValue > 360) {
        hslObj.h = complementaryValue - 360;
      } else {
        hslObj.h = complementaryValue;
      }
    } else if (index === 4) {
      let complementaryValue = hsl.h + 180;
      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l + 10;

      if (complementaryValue > 360) {
        hslObj.h = complementaryValue - 360;
      } else {
        hslObj.h = complementaryValue;
      }
    } else if (index === 1) {
      hslObj.h = hsl.h;
      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l + 10;
    } else if (index === 0) {
      hslObj.h = hsl.h;
      hslObj.s = hsl.s - 10;
      hslObj.l = hsl.l - 10;
    }

    handleDisply(hslObj, index);
  });
  console.log("in complementary", hsl);
}
function generateCompoundColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.h = hsl.h;
    } else if (index === 3) {
      let compoundValue = hsl.h + 190;
      hslObj.s = hsl.s;
      hslObj.l = hsl.l + 10;
      if (compoundValue > 360) {
        hslObj.h = compoundValue - 360;
      } else {
        hslObj.h = compoundValue;
      }
    } else if (index === 4) {
      let compoundValue = hsl.h + 200;
      hslObj.s = hsl.s - 10;
      hslObj.l = hsl.l - 10;

      if (compoundValue > 360) {
        hslObj.h = compoundValue - 360;
      } else {
        hslObj.h = compoundValue;
      }
    } else if (index === 1) {
      hslObj.h = hsl.h + 10;
      hslObj.s = hsl.s + 10;
      hslObj.l = hsl.l + 10;
    } else if (index === 0) {
      hslObj.h = hsl.h - 10;
      hslObj.s = hsl.s - 10;
      hslObj.l = hsl.l + 10;
    }

    handleDisply(hslObj, index);
  });
  console.log("in compound", hsl);
}
function generateShadesColors(hsl) {
  boards.forEach((board, index) => {
    let hslObj = Object.create(hsl);
    if (index === 2) {
      hslObj.l = hsl.l;
    } else if (index === 3) {
      hslObj.l = hsl.l + 10;
    } else if (index === 4) {
      hslObj.l = hsl.l + 20;
    } else if (index === 1) {
      hslObj.l = hsl.l - 10;
    } else if (index === 0) {
      hslObj.l = hsl.l - 20;
    }
    hslObj.h = hsl.h;
    hslObj.s = hsl.s;

    handleDisply(hslObj, index);
  });
  console.log("in shades", hsl);
}
function handleDisply(hslObj, index) {
  const rgbObj = hslToRgb(hslObj.h, hslObj.s, hslObj.l);
  const cssColor = rgbToCss(rgbObj);
  const hex = generateHex(rgbObj);
  showText(hex, rgbObj, hslObj, index);
  showColor(cssColor, index);
}
function showColor(color, index) {
  boards[index].style.backgroundColor = color;
}
function showText(hex, rgb, hsl, index) {
  const hexElements = document.querySelectorAll("#hex");
  hexElements[index].textContent = hex;
  const rgbElements = document.querySelectorAll("#rgb");
  rgbElements[index].textContent = `${rgb.r} , ${rgb.g} , ${rgb.b}`;
  const hslElements = document.querySelectorAll("#hsl");
  hslElements[index].textContent = `${hsl.h}% , ${hsl.s}% , ${hsl.l}%`;
}
