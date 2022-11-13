import AppComponent from 'Src/appComponent';

window.customElements.define('app-component', AppComponent);
const appNode = document.createElement('app-component');
document.body.appendChild(appNode);
