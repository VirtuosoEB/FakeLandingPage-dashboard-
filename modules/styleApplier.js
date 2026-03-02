import { saveChange } from "./store.js";
import { hidePopup } from "./popup.js";

export function applyTextStyle(selectedElement, fontSizeInput, colorPicker, popupId) {
  if (selectedElement) {
    selectedElement.style.fontSize = fontSizeInput.value + "px";
    selectedElement.style.color = colorPicker.value;
    const newFontSize = fontSizeInput.value + "px";
    const newColor = colorPicker.value;

    selectedElement.style.fontSize = newFontSize;
    selectedElement.style.color = newColor;

    let changes = {
      fontSize: newFontSize, 
      color: newColor,
      text: selectedElement.textContent
    };

    saveChange(selectedElement.id, 'text', changes);
    if (!popupId){
      return
    } else {
      hidePopup(popupId);
    };
  }
}

export function applyBackgroundStyle(selectedElement, body, bgPicker, popupId) {
  if (selectedElement) {
    selectedElement.style.backgroundColor = bgPicker.value;
    body.style.backgroundColor = bgPicker.value;
    const newBgColor = bgPicker.value;
    selectedElement.style.backgroundColor = newBgColor;

    let changes = {
      backgroundColor: newBgColor,
    };

    saveChange(selectedElement.id, 'background', changes);

     if (!popupId){
      return
    } else {
      hidePopup(popupId);
    };
  }
}

export function applyButtonStyle(selectedElement, fontSizeInput, colorPicker, bgPicker, popupId){
  if (selectedElement){
    console.log("button clicked")
    selectedElement.style.fontSize = fontSizeInput.value + "px";
    selectedElement.style.backgroundColor = bgPicker.value;
    selectedElement.style.color = colorPicker.value;
    

    let changes = {
      fontSize: fontSizeInput.value,
      backgroundColor: bgPicker.value,
      color: colorPicker.value, 
      text: selectedElement.textContent
    };

    saveChange(selectedElement.id, 'button', changes);

     if (!popupId){
      return
    } else {
      hidePopup(popupId);
    };
  }
}