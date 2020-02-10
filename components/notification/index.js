import createElement from "../../lib/create-element.js";

class Notification {
  constructor(html, type, timeout) {
    this.elem = createElement(`<div class="notification notification_${type}">
      <div class="notification__content">
        ${html}
      </div>
    </div>`);

    document.body.append(this.elem);
    this.elem.classList.add("show");

    this.timeOut = timeout;

    setTimeout(() => this.close(), this.timeOut);
  }

  close() {
    this.elem.remove();
  }
}

export class ErrorNotification extends Notification {
  constructor(html, timeout) {
    super(html, "success", timeout);
  }
}
