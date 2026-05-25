/* image-slot — drag-and-drop image placeholder component */
class ImageSlot extends HTMLElement {
  connectedCallback() {
    if (this.children.length) return;
    const ph = this.getAttribute('placeholder') || 'Image';
    this.style.display = this.style.display || 'block';
    this.style.position = this.style.position || 'relative';
    this.style.background = this.style.background || 'linear-gradient(135deg,#cdb8f3,#b9d4f0)';
    this.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:1.6rem;text-align:center;font-size:1.1rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,0,0,0.5);">${ph}</div>`;

    this.addEventListener('dragover', e => { e.preventDefault(); this.style.outline = '2px dashed #000'; });
    this.addEventListener('dragleave', () => { this.style.outline = ''; });
    this.addEventListener('drop', e => {
      e.preventDefault();
      this.style.outline = '';
      const file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const url = URL.createObjectURL(file);
      this.innerHTML = `<img src="${url}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />`;
    });
  }
}
customElements.define('image-slot', ImageSlot);
