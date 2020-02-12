export default class Tooltip {
  constructor() {
    document.addEventListener("pointerover", e => this.renderTooltip(e));

    document.addEventListener("pointerout", e => this.removeTooltip(e));
  }

  static instance() {
    if (!this._instance) {
      this._instance = new Tooltip();
    }
    return this._instance;
  }

  renderTooltip(e) {
    let target = e.target.closest("[data-tooltip]");
    if (!target) return;

    this.elem = document.createElement("div");
    this.elem.className = "tooltip";
    this.elem.innerHTML = e.target.dataset.tooltip;
    document.body.append(this.elem);

    let coords = target.getBoundingClientRect();

    let top = coords.top + target.offsetHeight + 5;
    let left = coords.left - (this.elem.offsetWidth - target.offsetWidth) / 2;
    if (left < 0) left = 0;

    this.elem.style.top = top + "px";
    this.elem.style.left = left + "px";
  }

  removeTooltip() {
    if (this.elem) {
      this.elem.remove();
      this.elem = null;
    }
  }
}

Tooltip.instance();
