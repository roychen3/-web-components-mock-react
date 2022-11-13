import ModalShell from 'Components/modalShell';
import PaymentMethod from 'Components/paymentMethod';
import SelectField from 'Components/selectField';
import SelectComponent from 'Components/selectComponent';

import ProductPage from 'ModalPages/productPage';
import AddedMessagePage from 'ModalPages/addedMessagePage';

import HomePage from 'Pages/homePage';

import templateContent from './templateContent.html';
import globalStyles from './global.scss';

const template = document.createElement('template');
template.innerHTML += `<style>${globalStyles}</style>`;
template.innerHTML += templateContent;

class AppComponent extends HTMLElement {
  constructor() {
    super();

    this._props = {
      productInfo: {},
    };
    this._isMounted = false;
    this.template = template;

    this.render = this.render.bind(this);

    this.registerCustomElements();
    this.attachShadow({ mode: 'open' });
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

  // eslint-disable-next-line class-methods-use-this
  registerCustomElements() {
    if (!window.customElements.get('modal-shell')) {
      window.customElements.define('modal-shell', ModalShell);
    }
    if (!window.customElements.get('payment-method')) {
      window.customElements.define('payment-method', PaymentMethod);
    }
    if (!window.customElements.get('select-field')) {
      window.customElements.define('select-field', SelectField);
    }
    if (!window.customElements.get('select-component')) {
      window.customElements.define('select-component', SelectComponent);
    }

    if (!window.customElements.get('product-page')) {
      window.customElements.define('product-page', ProductPage);
    }
    if (!window.customElements.get('added-message-page')) {
      window.customElements.define('added-message-page', AddedMessagePage);
    }

    if (!window.customElements.get('home-page')) {
      window.customElements.define('home-page', HomePage);
    }
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.render();
    this._isMounted = true;
  }

  render() {}
}

export default AppComponent;
