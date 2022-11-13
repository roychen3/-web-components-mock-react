import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class PaymentMethod extends HTMLElement {
  constructor() {
    super();

    this._props = {};
    this._isMounted = false;
    this.template = template;

    this.render = this.render.bind(this);
  }

  get props() {
    return this._props;
  }

  set props(newVal) {
    this._props = {
      ...this._props,
      ...newVal,
    };

    if (this._isMounted) {
      this.render();
    }
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.render();
    this._isMounted = true;
  }

  render() {}
}

export default PaymentMethod;
