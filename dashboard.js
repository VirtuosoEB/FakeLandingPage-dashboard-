
import { syncColorPicker } from "./modules/colorsync.js";
import { setupIframeClick } from "./modules/iframeHandler.js";
import { applyTextStyle, applyBackgroundStyle, applyButtonStyle} from "./modules/styleApplier.js";
import { displayPopup, hidePopup, rgbToHex } from "./modules/popup.js";
import { resizeIframe } from "./modules/iframe.js";
import { storeChanges, applyChanges, loadChanges} from "./modules/store.js";

//===Elements======================================
const preview = document.getElementById("content");

  //text popup
const tPFS = document.getElementById("tPFS");
const picker = document.getElementById('colorPicker');
const hexInput = document.getElementById('colorHex');
const confirm = document.getElementById("confirm");
const cancel = document.getElementById("cancel");


  //background popup
const bHexInput = document.getElementById('bColorHex');
const bPicker = document.getElementById('bColorPicker');
const bConfirm = document.getElementById("bConfirm");
const bCancel = document.getElementById("bCancel");


  //button popup
const btnTPFS = document.getElementById("btnTPFS");
const btnPicker = document.getElementById('btnColorPicker');
const btnHexInput = document.getElementById('btnColorHex');
const btnBPicker = document.getElementById('btnBColorPicker');
const btnBHexInput = document.getElementById('btnBColorHex');
const btnConfirm = document.getElementById("btnConfirm");
const btnCancel = document.getElementById("btnCancel");
//===================================================

// Sync color pickers
syncColorPicker(picker, hexInput);
syncColorPicker(bPicker, bHexInput);
syncColorPicker(btnPicker, btnHexInput);
syncColorPicker(btnBPicker, btnBHexInput); 

// Setup iframe click detection
const { getSelected, getBody } = setupIframeClick(preview, tPFS, picker, bPicker, bHexInput, btnTPFS, btnPicker, btnHexInput, btnBPicker, btnBHexInput);

// Event listeners for applying styles
confirm.addEventListener("click", () => applyTextStyle(getSelected(), tPFS, picker, "textPopup"));
bConfirm.addEventListener("click", () => applyBackgroundStyle(getSelected(), getBody(), bPicker, "backgroundPopup"));
btnConfirm.addEventListener("click", () => applyButtonStyle(getSelected(), btnTPFS, btnPicker, btnBPicker, "btnPopup"));

// Event liseners for canceling stylechange
cancel.addEventListener("click", () => hidePopup("textPopup"));
bCancel.addEventListener("click", () => hidePopup("backgroundPopup"));
btnCancel.addEventListener("click", () => hidePopup("btnPopup"));

// Saving changes to local storage
let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", storeChanges);
console.log("loaded");

async function init() {
  await loadChanges();
  await applyChanges(preview);
}

init();

console.log(preview);

const iframe = document.getElementById("content");

console.log("iframe exists?", !!iframe);
iframe.addEventListener("load", () => {
  console.log("iframe loaded");
});
console.log("iframe src:", iframe.src);


