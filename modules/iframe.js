export function resizeIframe(preview) {
  preview.style.height = preview.contentWindow.document.body.scrollHeight + 'px';
  preview.style.width = preview.contentWindow.document.body.scrollWidth + 'px';
}