import templateContent from './templateContent.html';

import {
  mockProductList,
  mockMacBookPro14InchesInfo,
  mockIphone14ProInfo,
} from 'MockApiData';

const template = document.createElement('template');
template.innerHTML = templateContent;

class HomePage extends HTMLElement {
  constructor() {
    super();
    this._props = {};
    this._isMounted = false;
    this.template = template;
    this._productList = [];
    this._selectedValue = '';

    this.openModal = this.openModal.bind(this);
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

  get productList() {
    return this._productList;
  }

  set productList(newVal) {
    this._productList = newVal;

    if (this._isMounted) {
      this.render();
    }
  }

  openModal() {
    let productData;
    switch (this._selectedValue) {
      case 'i14Pro':
        productData = mockIphone14ProInfo;
        break;

      case 'macBookPro14Inches':
        productData = mockMacBookPro14InchesInfo;
        break;

      default:
        break;
    }

    if (productData) {
      const productPageNode = document.createElement('product-page');
      productPageNode.props = {
        ...productPageNode.props,
        productData,
      };

      const modalNode = document.createElement('modal-shell');
      modalNode.props = {
        ...modalNode.props,
        children: productPageNode,
      };

      document.querySelector('app-component').shadowRoot.appendChild(modalNode);
    }
  }

  async getProductListApi() {
    this.querySelector('.open-modal .spinner').classList.remove('d-none');
    // mock api
    setTimeout(() => {
      this.productList = mockProductList;
      this._selectedValue = mockProductList[0].value;
      this.querySelector('.open-modal .spinner').classList.add('d-none');
      this.querySelector('.open-modal .text ').classList.remove('d-none');
    }, 1000);
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector('.open-modal').addEventListener('click', this.openModal);
    this.getProductListApi();

    this.render();
    this._isMounted = true;
  }

  disconnectedCallback() {
    this.querySelector('.open-modal').removeEventListener(
      'click',
      this.openModal
    );
  }

  render() {
    const oldNode = this.querySelector('select');
    const newNode = oldNode.cloneNode(false);

    const handleChange = (event) => {
      this._selectedValue = event.target.value;
    };
    newNode.addEventListener('change', handleChange);
    const appendOptionNodes = (option) => {
      const optionNode = document.createElement('option');
      optionNode.setAttribute('value', option.value);
      optionNode.innerText = option.label;
      newNode.appendChild(optionNode);
    };
    this.productList.forEach(appendOptionNodes);
    newNode.required = true;
    this.querySelector('.form-container').replaceChild(newNode, oldNode);
  }
}

export default HomePage;
