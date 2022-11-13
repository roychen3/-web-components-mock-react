import { closeModal } from 'Utils';

import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class AddedMessagePage extends HTMLElement {
  constructor() {
    super();

    this._props = {};
    this._isMounted = false;
    this.template = template;

    this.goToCheck = this.goToCheck.bind(this);
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

  goToCheck() {
    alert('go to Check');
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector('.go-to-check').addEventListener(
      'click',
      this.goToCheck
    );
    this.querySelector('.continue-shopping').addEventListener(
      'click',
      closeModal
    );

    this.render();
    this._isMounted = true;
  }

  disconnectedCallback() {
    this.querySelector('.go-to-check').removeEventListener(
      'click',
      this.goToCheck
    );
    this.querySelector('.continue-shopping').removeEventListener(
      'click',
      closeModal
    );
  }

  render() {}
}

export default AddedMessagePage;
