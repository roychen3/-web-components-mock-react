import { removeAllChild, formatPriceComma, formNodeToData } from 'Utils';

import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class ProductPage extends HTMLElement {
  constructor() {
    super();

    this._props = {
      productData: {},
    };
    this._isMounted = false;
    this.template = template;
    this.selectedSpecKeys = [];
    this.selectedSpecDetail = {};

    this.detectIsPreOder = this.detectIsPreOder.bind(this);
    this.detectIsNoStock = this.detectIsNoStock.bind(this);
    this.generateStockOptions = this.generateStockOptions.bind(this);
    this.updateProductSpecDetail = this.updateProductSpecDetail.bind(this);
    this.generateSpecSelectFieldNode =
      this.generateSpecSelectFieldNode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  detectIsPreOder() {
    const preOderProductNode = this.querySelector('.pre-oder-note');
    preOderProductNode.querySelector(
      '[name="pre-oder-note-agree"'
    ).checked = false;
    if (this.selectedSpecDetail.isPreOrder) {
      preOderProductNode.classList.remove('d-none');
      preOderProductNode
        .querySelector('input')
        .setAttribute('type', 'checkbox');
    } else {
      preOderProductNode.classList.add('d-none');
      preOderProductNode.querySelector('input').setAttribute('type', 'hidden');
    }
  }

  detectIsNoStock() {
    const stock = parseInt(this.selectedSpecDetail.stock, 10);
    const noStockNode = this.querySelector('.no-stock');
    const addToCarNode = this.querySelector('.add-to-car');

    if (stock) {
      noStockNode.classList.add('d-none');
      addToCarNode.disabled = false;
    } else {
      noStockNode.classList.remove('d-none');
      addToCarNode.disabled = true;
    }
  }

  generateStockOptions(stock) {
    const options = Array(parseInt(stock, 10))
      .fill()
      .map((_, index) => ({
        value: index + 1,
        label: index + 1,
      }));
    return options;
  }

  updateProductSpecDetail() {
    const productImageNode = this.querySelector('.product-image');
    productImageNode.src = this.selectedSpecDetail.image;

    const priceNode = this.querySelector('.price');
    priceNode.textContent = formatPriceComma(this.selectedSpecDetail.price);

    const countSelectFieldNode = this.querySelector(
      'select-field[name="count-select"]'
    );

    const options = this.generateStockOptions(this.selectedSpecDetail.stock);
    countSelectFieldNode.props = {
      ...countSelectFieldNode.props,
      options,
    };

    this.detectIsPreOder();
    this.detectIsNoStock();
  }

  generateSpecSelectFieldNode(specification, idx) {
    const handleChange = (event) => {
      this.selectedSpecKeys[idx] = event.target.value;
      this.selectedSpecDetail =
        this.props.productData.specificationDetails[
          this.selectedSpecKeys.join('-')
        ];
      this.updateProductSpecDetail();
    };

    const selectFieldNode = document.createElement('select-field');
    selectFieldNode.props = {
      options: specification.options,
      labelText: specification.name,
      name: specification.id + '-select',
      handleChange,
      required: true,
    };
    return selectFieldNode;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = formNodeToData(event.target);
    console.log('formData', formData);

    // change page
    const addedMessagePageNode = document.createElement('added-message-page');
    const appComponentNode = document.querySelector('app-component');
    const modalShellNode =
      appComponentNode.shadowRoot.querySelector('modal-shell');
    modalShellNode.props = {
      children: addedMessagePageNode,
    };
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector('form').addEventListener('submit', this.handleSubmit);

    this.render();
    this._isMounted = true;
  }

  disconnectedCallback() {
    this.querySelector('form').removeEventListener('submit', this.handleSubmit);
  }

  render() {
    const { productData } = this.props;

    const initialSpecKeys = Object.keys(productData.specificationDetails)[0];
    this.selectedSpecKeys = initialSpecKeys.split('-');
    this.selectedSpecDetail = productData.specificationDetails[initialSpecKeys];

    const productNameNode = this.querySelector('.product-name');
    productNameNode.innerText = productData.productName;

    const selectContainerNode = this.querySelector('.select-container');
    removeAllChild(selectContainerNode);

    const appendChilds = (node) => {
      selectContainerNode.appendChild(node);
    };
    const specSelectFieldNodes = productData.specifications.map(
      this.generateSpecSelectFieldNode
    );
    specSelectFieldNodes.forEach(appendChilds);

    const countSelectFieldNode = document.createElement('select-field');
    countSelectFieldNode.props = {
      labelText: '數量',
      name: 'count-select',
      required: true,
    };
    selectContainerNode.appendChild(countSelectFieldNode);

    this.updateProductSpecDetail();
  }
}

export default ProductPage;
