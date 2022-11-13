import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class SelectField extends HTMLElement {
  constructor() {
    super();

    this._props = {
      labelText: '',
      name: '',
      options: [],
      handleChange: undefined,
      required: false,
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
    this.appendChild(this.template.content.cloneNode(true));
    this.render();
    this._isMounted = true;
  }

  render() {
    const { labelText, name, options, handleChange, required } = this.props;
    this.querySelector('label').innerText = labelText || '請選擇';
    if (name) {
      this.setAttribute('name', name);
    }

    const oldNode = this.querySelector('select');
    const newNode = oldNode.cloneNode(false);
    if (handleChange) {
      newNode.addEventListener('change', handleChange);
    }
    const appendOptionNodes = (option) => {
      const optionNode = document.createElement('option');
      optionNode.setAttribute('value', option.value);
      optionNode.innerText = option.label;
      newNode.appendChild(optionNode);
    };
    options.forEach(appendOptionNodes);
    newNode.required = required;
    newNode.setAttribute('name', name);
    this.replaceChild(newNode, oldNode);
  }
}

export default SelectField;
