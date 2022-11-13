import { closeModal, removeAllChild } from 'Utils';

import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class ModalShell extends HTMLElement {
  constructor() {
    super();

    this._props = {
      children: null,
    };
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
    document.body.style.overflow = 'hidden';
    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector('.close').addEventListener('click', closeModal);

    this.render();
    this._isMounted = true;
  }

  disconnectedCallback() {
    document.body.style.overflow = 'initial';
    this.querySelector('.close').removeEventListener('click', closeModal);
  }

  render() {
    const { children } = this.props;

    const modalBodyNode = this.querySelector('.modal-body');
    removeAllChild(modalBodyNode);

    if (children) {
      modalBodyNode.appendChild(children);
    }
  }
}

export default ModalShell;
