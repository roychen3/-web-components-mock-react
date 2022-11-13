export const formatPriceComma = (price) => {
  const stringPrice = price ? String(price) : '0';
  return String(stringPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formNodeToData = (formNode) => {
  const formData = new FormData(formNode);
  const formatedFormData = {};
  formData.forEach((value, key) => {
    formatedFormData[key] = value;
  });

  return formatedFormData;
};

export const removeAllChild = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

export const closeModal = () => {
  const appComponentNode = document.querySelector('app-component');
  const modalShellNode =
    appComponentNode.shadowRoot.querySelector('modal-shell');
  if (modalShellNode) {
    appComponentNode.shadowRoot.removeChild(modalShellNode);
  }
};
