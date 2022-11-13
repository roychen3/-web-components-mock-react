`npm install`

`npm run dev`

`npm run build`

<br />
<br />

# Develop Rule

### All code scope is under `AppComponent` shadow root

## HTML

naming convention: Kebeb-Case

<br />
<br />

## CSS

naming convention: Kebeb-Case

mobile first

mobile \< 768px \< desktop

default css only write in global.scss

Build files only have one empty html and one `.js` file, so this project can't generate `.css` file.

<br />
<br />

# Image file

Build files only have one empty `.html` and one `.js` file, so this project can't generate image file. And limit from 'softmap' website, image `src` only use link.

<br />
<br />

# JavaScript

naming convention: camelCase

<br />
<br />

# Web Components

naming convention: UpperCamelCase

Only `AppComponent` open shadow root

## Browser Support

This project written in 2022.11.12, only supports developers to use `HTMLElement`. Mobile browser still not support other Element such as `HTMLButtonElement`、`HTMLInputElement`.

If browser support updates in the future, developers can update this description.

<br />
<br />

## Examples

### No props component

- `template` append to component in `connectedCallback` lifecycle
- `_isMounted` set true in the end of `connectedCallback`

```js
import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class ExampleComponet extends HTMLElement {
  constructor() {
    super();

    this._isMounted = false;
    this.template = template;
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this._isMounted = true;
  }
}

export default ExampleComponet;
```

<br />
<br />

### Pass props to component

- using `getter`、`setter` pass props to component
- call `render` method when set props and component is did mount
- using `getter`、`setter` instead of `setAttribute`:
  - benefit: can pass `array`、`object` and `function`
  - drawbacks: can't use `attributeChangedCallback` & `observedAttributes` lifecycle

component.js

```js
import templateContent from './templateContent.html';

const template = document.createElement('template');
template.innerHTML = templateContent;

class ExampleComponet extends HTMLElement {
  constructor() {
    super();

    this._props = {
      message: '',
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
    const { message } = this.props;
    this.querySelector('.message').innerText = message;
  }
}

export default ExampleComponet;
```

<br />

create component, and pass props:

```js
const exampleComponetNode = document.createElement('example-componet');
exampleComponetNode.props = {
  message: 'write your message',
};
this.appendChild(exampleComponetNode);
```

<br />

change component props:

```js
const exampleComponetNode = this.querySelector('example-componet');
exampleComponetNode.props = {
  message: 'write your message',
};
```

<br />
<br />

### Inherit component:

#### NOTE! `React` recommend using composition instead of inheritance to reuse code between components.

https://reactjs.org/docs/composition-vs-inheritance.html

- `ErrorMessageComponent` inherit `MessageComponent`
- write same method name to overwrite parent method

  e.g. `class ErrorMessageComponent extends MessageComponent { ... }`

- call `super` method can extension method.

  e.g. `super.parentMethod();`

- in `constructor` can edit template to change component

  e.g.

  ```js
  import MessageComponent from 'Components/messageComponent';

  class ErrorMessageComponent extends MessageComponent {
    constructor() {
      super();

      // change template ..
      this.template.content
        .querySelector('.message').innerHTML = '<div>custom template<div>';

      ...
    }

    ...
  }

  export default ErrorMessageComponent;
  ```

<br />
<br />

### Use SelectComponent:

ProductPage

```diff
class ProductPage extends HTMLElement {
  ...

  generateSpecSelectFieldNode(specification, idx) {
    const handleChange = (event) => {
-     this.selectedSpecKeys[idx] = event.target.value;
+     this.selectedSpecKeys[idx] = event.target.getAttribute('data-value');
      this.selectedSpecDetail =
        this.props.productData.specificationDetails[
          this.selectedSpecKeys.join('-')
        ];
      this.updateProductSpecDetail();
    };

    ...
  }

  ...
}

```

<br />

SelectField

```diff
<div class="select-field">
  <label></label>
- <select class="form-select"></select>
+ <select-component></select-component>
</div>
```

```diff
class SelectField extends HTMLElement {
  ...

  render() {
    const { labelText, name, options, handleChange, required } = this.props;
    this.querySelector('label').innerText = labelText || '請選擇';
    this.setAttribute('name', name);
    this.setAttribute('for', name);

-   const oldNode = this.querySelector('select');
-   const newNode = oldNode.cloneNode(false);
-   if (handleChange) {
-     newNode.addEventListener('change', handleChange);
-   }
-   const appendOptionNodes = (option) => {
-     const optionNode = document.createElement('option');
-     optionNode.setAttribute('value', option.value);
-     optionNode.innerText = option.label;
-     newNode.appendChild(optionNode);
-   };
-   options.forEach(appendOptionNodes);
-   newNode.required = required;
-   newNode.setAttribute('name', name);
-   this.querySelector('.select-field').replaceChild(newNode, oldNode);

+   const selectComponetNode = this.querySelector('select-component');
+   selectComponetNode.props = {
+     ...selectComponetNode.props,
+     name,
+     options,
+     handleChange,
+     required,
+   };
  }
}
```

<br />
<br />
<br />
<br />

# Postscript

Since this technology is not yet mature and the browser does not fully support it, and I am a `react.js` developer, this project was mocked react component to develop.

If there are someone who has capable optimize this project, refactor it is very welcome.

by Roy Chen 2022.11.12
