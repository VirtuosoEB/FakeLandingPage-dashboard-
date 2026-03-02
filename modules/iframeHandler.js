import { displayPopup, hidePopup, rgbToHex } from "./popup.js";

export function setupIframeClick(preview, tPFS, picker, bPicker, bHexInput, btnTPFS, btnPicker, btnHexInput, btnBPicker, btnBHexInput) {
  let selectedElement = null;
  let previewBody = null;

  function attachClickListener() {
    const previewDoc = preview.contentWindow.document;
    previewBody = previewDoc.body;
    console.log("iframe loaded");

    previewDoc.addEventListener("click", (event) => {
      const target = event.target;
      const textTags = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "LI", "TD", "TH"];
      console.log(target);
      
      if (textTags.includes(target.tagName)) {
        console.log("text clicked");
        selectedElement = target;
        displayPopup("textPopup");
        hidePopup("backgroundPopup");
        hidePopup("btnPopup");

        const computedStyle = preview.contentWindow.getComputedStyle(target);
        tPFS.value = parseInt(computedStyle.fontSize, 10);
        picker.value = rgbToHex(computedStyle.color);

      } else if (target.tagName === "SECTION") {
        selectedElement = target;
        displayPopup("backgroundPopup");
        hidePopup("textPopup");
        hidePopup("btnPopup");

        const bgColorHex = rgbToHex(preview.contentWindow.getComputedStyle(target).backgroundColor);
        bHexInput.value = bgColorHex;
        bPicker.value = bgColorHex;

      } else if (target.tagName === "BUTTON") {
        selectedElement = target;
        displayPopup("btnPopup");
        hidePopup("textPopup");
        hidePopup("backgroundPopup");

        const computedStyle = preview.contentWindow.getComputedStyle(target);
        btnTPFS.value = parseInt(computedStyle.fontSize, 10);
        const colorHex = rgbToHex(computedStyle.color);
        btnPicker.value = colorHex;
        btnHexInput.value = colorHex;
        const bColorHex = rgbToHex(computedStyle.backgroundColor);
        btnBHexInput.value = bColorHex;
        btnBPicker.value = bColorHex;
      }
    });
  }

  // If iframe is already loaded, attach immediately
  if (preview.contentDocument.readyState === "complete") {
    attachClickListener();
  } else {
    preview.addEventListener("load", attachClickListener);
  }

  return { getSelected: () => selectedElement, getBody: () => previewBody };
}
