export function displayPopup(popupId){
  const pId = document.getElementById(popupId);
  console.log(pId)
  pId.style.display = "block";
}
export function hidePopup(popupId){
  const pId = document.getElementById(popupId);
  pId.style.display = "none";
}


export function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


