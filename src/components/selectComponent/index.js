import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class SelectComponent extends HTMLElement {
  constructor() {
    super();

    this._props = {
      name: '',
      options: [],
      handleChange: undefined,
      required: false,
    };
    this._isMounted = false;
    this.template = template;
    this._isOptionsListOpen = false;

    this.switchOptionList = this.switchOptionList.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
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

  switchOptionList(event) {
    event.preventDefault();
    const selectOptionWrapperNode = this.querySelector(
      '.select-option-wrapper'
    );
    if (selectOptionWrapperNode.classList.contains('d-none')) {
      selectOptionWrapperNode.classList.remove('d-none');
    } else {
      selectOptionWrapperNode.classList.add('d-none');
    }
  }

  handleOptionClick(event) {
    event.preventDefault();
    const targetNode = event.target;
    const targetDataValue = event.target.getAttribute('data-value');
    const selectedOptionNodes = this.querySelectorAll(
      '.select-option.selected'
    );
    selectedOptionNodes.forEach((selectedOptionNode) => {
      selectedOptionNode.classList.remove('selected');
    });
    targetNode.classList.add('selected');

    this.querySelector('.select-value').innerText = targetNode.innerText;
    this.querySelector('input').value = targetDataValue;
  }

  handleOutSideClick(event) {
    if (event.target.getAttribute('name') !== this.props.name) {
      const selectOptionWrapperNode = this.querySelector(
        '.select-option-wrapper'
      );
      if (!selectOptionWrapperNode.classList.contains('d-none')) {
        selectOptionWrapperNode.classList.add('d-none');
      }
    }
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.addEventListener('click', this.switchOptionList);
    document
      .querySelector('app-component')
      .shadowRoot.addEventListener('click', this.handleOutSideClick);

    this.render();
    this._isMounted = true;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.switchOptionList);
    document
      .querySelector('app-component')
      .shadowRoot.removeEventListener('click', this.handleOutSideClick);
  }

  render() {
    const { name, options, handleChange, required } = this.props;

    const inputNode = this.querySelector('input');
    inputNode.required = required;
    inputNode.setAttribute('name', name);
    inputNode.setAttribute('value', options[0] ? options[0].value : 0);

    this.querySelector('.select-value').setAttribute('name', name);
    this.querySelector('.select-value').innerText = options[0]
      ? options[0].label
      : 0;

    const oldSelectOptionWrapperNode = this.querySelector(
      '.select-option-wrapper'
    );
    const newSelectOptionWrapperNode = document.createElement('div');
    newSelectOptionWrapperNode.classList.add('select-option-wrapper', 'd-none');
    const appendOptionNodes = (option) => {
      const optionNode = document.createElement('div');
      optionNode.setAttribute('data-value', option.value);
      optionNode.classList.add('select-option');
      optionNode.innerText = option.label;
      optionNode.addEventListener('click', this.handleOptionClick);
      if (handleChange) {
        optionNode.addEventListener('click', handleChange);
      }
      newSelectOptionWrapperNode.appendChild(optionNode);
    };
    options.forEach(appendOptionNodes);
    if (newSelectOptionWrapperNode.firstChild) {
      newSelectOptionWrapperNode.firstChild.classList.add('selected');
    }
    this.replaceChild(
      newSelectOptionWrapperNode,
      oldSelectOptionWrapperNode
    );
  }
}

export default SelectComponent;
