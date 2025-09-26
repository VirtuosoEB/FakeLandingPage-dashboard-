import {displayPopup, hidePopup, rgbToHex} from "./modules/popup.js";

// Elements
const tPFS = document.getElementById("tPFS");
const picker = document.getElementById('colorPicker');
const hexInput = document.getElementById('colorHex');
const bPicker = document.getElementById('bColorPicker');
const bHexInput = document.getElementById('bColorHex');
const confirm = document.getElementById("confirm");
const bConfirm = document.getElementById("bConfirm");
const preview = document.getElementById("content");

let selectedElement = null; // Track the clicked element in iframe
let previewBody = null;

// Sync color picker ↔ hex input (text)
picker.addEventListener('input', () => {
  hexInput.value = picker.value;
});

hexInput.addEventListener('input', () => {
  if(/^#([0-9A-Fa-f]{6})$/.test(hexInput.value)) {
    picker.value = hexInput.value;
  }
});
// Sync color picker ↔ hex input (text)
bPicker.addEventListener('input', () => {
  bHexInput.value = bPicker.value;
});

bHexInput.addEventListener('input', () => {
  if(/^#([0-9A-Fa-f]{6})$/.test(bHexInput.value)) {
    bPicker.value = bHexInput.value;
  }
});



// When iframe loads
preview.onload = function() {
  
  const previewDoc = preview.contentWindow.document;
  previewBody = previewDoc.body;
  
  // Detect clicks inside iframe
 previewDoc.addEventListener("click", (event) => {
   console.log(event.target.tagName)
  if (event.target.tagName === "H1") {
    selectedElement = event.target;
    displayPopup("textPopup");

    //font size
    const computedSize = preview.contentWindow.getComputedStyle(event.target).fontSize;
    const computedColor = preview.contentWindow.getComputedStyle(event.target).color

    tPFS.value = parseInt(computedSize, 10);
    hexInput.value = rgbToHex(computedColor)
    picker.value = rgbToHex(computedColor)

    console.log("Preset font size:", computedSize);
  } else if (event.target.tagName === "SECTION") {
    selectedElement = event.target;
    displayPopup("backgroundPopup");
    
    const bComputedColor = preview.contentWindow.getComputedStyle(event.target).backgroundColor;
bHexInput.value = rgbToHex(bComputedColor);
bPicker.value = rgbToHex(bComputedColor);
  };
});
};

// Confirm button applies changes
confirm.addEventListener("click", () => {
  if (selectedElement) {
    selectedElement.style.fontSize = String(tPFS.value) + "px";
    selectedElement.style.color = picker.value;
    resizeIframe(); // update iframe size after change
  }
});

bConfirm.addEventListener("click", () => {
  if (selectedElement) {
    selectedElement.style.backgroundColor = bPicker.value;
    previewBody.style.backgroundColor = bPicker.value;
  }
});