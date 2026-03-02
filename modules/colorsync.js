export function syncColorPicker(picker, hexInput) {
  picker.addEventListener('input', () => {
    hexInput.value = picker.value;
  });

  hexInput.addEventListener('input', () => {
    if (/^#([0-9A-Fa-f]{6})$/.test(hexInput.value)) {
      picker.value = hexInput.value;
    }
  });
}
